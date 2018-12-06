/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, {Component} from "react";
import "../../styles/AppContent.css";
import {
  initialLoad,
  load,
  loadMoreCache, setRecentlyReloadedFlag,
} from "../actions/actions";
import {connect} from "react-redux";
import AppContent from "../presentational/AppContent";
import {
  DATA_PER_PAGE,
  FORWARD_CACHE_THRESHOLD,
  INITIAL_LOAD_NUMBER,
  MAX_CACHE_LENGTH,
  RE_LOAD_INTERVAL
} from "../constants/constant";
import PropTypes from "prop-types";

const mapStateToProps = state => {
  return {
    currentPageData: state.currentPageData,
    totalPage: state.totalPage,
    cache: state.cache,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initialLoad: (page, dataPerPage) => dispatch(initialLoad(page, dataPerPage)),
    load: (page, dataPerPage) => dispatch(load(page, dataPerPage)),
    loadMoreCache: (startPage, endPage) => dispatch(loadMoreCache(startPage, endPage)),
    setRecentlyReloadedFlag: (page, flag) => dispatch(setRecentlyReloadedFlag(page, flag)),
  };
};

/**
 * calculate how many cache do we need to load
 *
 * based on the assumption listed in the README.md
 * we tend to load more data in the forward (from left to right) direction
 * thus when the number of the cache in the forward direction is less or equal than the threshold (in this case 2)
 * we will load more data
 *
 * then, we should calculate how many page do we need to load
 * my algorithm is designed to load as more page as possible
 * firstly we need to find out the most forward(right) page data in the cache
 *
 * e.g. the right cache has 2 left, and the rightmost page is 14
 * since we already have 2 page in the right direction
 * so we at most load 8 - 2 = 6 pages
 * however, we can't load 6 pages right away, since backend only accepts page and perPage parameters
 * so my algorithm runs a for loop (from 6 to 1), to find out the biggest number that rightmost page % this number === 0
 * if this case, 14 is divisible by 2
 * then we can only load 2 pages, which is 15 and 16
 *
 * @param currentPage the number of current page
 * @param cache the cache
 * @return object that includes whether we need to load more data, most forward page number and how many page to load
 */
const calcCacheNeeded = (currentPage, cache) => {
  let forwardCachedDataLeft = 0;
  let mostForwardPage = currentPage;
  let cacheNeededObject = {};

  // find the most right(forward) page number
  // and clac the right(forward) cache left
  for (let i = 0; i < cache.length; i++) {
    let cachePage = cache[i].page;
    if (cachePage > currentPage) {
      forwardCachedDataLeft++;
      if (cachePage > mostForwardPage) {
        mostForwardPage = cachePage;
      }
    }
  }

  if (forwardCachedDataLeft <= FORWARD_CACHE_THRESHOLD) {
    cacheNeededObject.isMoreCacheNeeded = true;
    cacheNeededObject.mostForwardPage = mostForwardPage;
    let maxLoadPage = MAX_CACHE_LENGTH - forwardCachedDataLeft;
    for (let i = maxLoadPage; i > 0; i--) {
      if (mostForwardPage % i === 0) {
        // calc the max page to load
        cacheNeededObject.maxPageToLoad = i;
        break;
      }
    }
  } else {
    // no cache data needed
    cacheNeededObject.isMoreCacheNeeded = false;
  }
  return cacheNeededObject;
};

/**
 * the container of the whole app
 */
class AppContentContainer extends Component {

  componentDidMount() {
    let {initialLoad} = this.props;
    initialLoad(0, INITIAL_LOAD_NUMBER * DATA_PER_PAGE);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let {currentPageData, load, initialLoad, setRecentlyReloadedFlag, loadMoreCache, totalPage, cache} = nextProps;
    let page = currentPageData.page;

    // if no total page and it's not loading, it means the initial load has failed
    // also only load the data when the data is not recently loaded
    if (totalPage === "?" && !currentPageData.isLoading && !currentPageData.isRecentlyReLoaded) {

      // re dispatch the initial load
      initialLoad(0, INITIAL_LOAD_NUMBER * DATA_PER_PAGE);

      // if it's not the first time to load the data
      // then it's a reload
      // the reload can only occur at most once every 15 seconds
      if (currentPageData.attemptTimes >= 1) {
        // set recentlyReloadedFlag true
        setRecentlyReloadedFlag(page, true);
        // after 15 seconds, set this flag false
        setTimeout(() => setRecentlyReloadedFlag(page, false), RE_LOAD_INTERVAL * 1000);
      }
    }
    // if no data and it's not loading, then load it
    // also only load the data when the data is not recently loaded
    else if (!currentPageData.data && !currentPageData.isLoading && !currentPageData.isRecentlyReLoaded) {

      // load the current page
      load(page - 1, DATA_PER_PAGE);

      // if it's not the first time to load the data
      // then it's a reload
      // the reload can only occur at most once every 15 seconds
      if (currentPageData.attemptTimes >= 1) {
        setRecentlyReloadedFlag(page, true);
        setTimeout(() => setRecentlyReloadedFlag(page, false), RE_LOAD_INTERVAL * 1000);
      }
    } else {
      // in other cases, we can try to load more cache

      let cacheNeededObject = calcCacheNeeded(page, cache);

      if (cacheNeededObject.isMoreCacheNeeded) {
        let maxPageToLoad = cacheNeededObject.maxPageToLoad;
        let mostForwardPage = cacheNeededObject.mostForwardPage;
        let startPage = mostForwardPage + 1;
        let page = mostForwardPage / maxPageToLoad;
        let perPage = DATA_PER_PAGE * maxPageToLoad;

        // let redux know we are loading these data
        loadMoreCache(startPage, startPage + maxPageToLoad - 1);
        // start loading these data
        load(page, perPage);
      }
    }
  }

  render() {
    return (
      <AppContent/>
    );
  }
}

AppContentContainer.propTypes = {
  totalPage: PropTypes.string.isRequired,
  currentPageData: PropTypes.object.isRequired,
  initialLoad: PropTypes.func.isRequired,
  setRecentlyReloadedFlag: PropTypes.func.isRequired,
  loadMoreCache: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
  cache: PropTypes.array.isRequired,
};

const connectedAppContentContainer = connect(mapStateToProps, mapDispatchToProps)(AppContentContainer);

export default connectedAppContentContainer;
