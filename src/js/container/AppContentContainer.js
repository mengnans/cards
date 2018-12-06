/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, {Component} from "react";
import "../../styles/AppContent.css";
import {
  initialLoad,
  load,
  loadMoreCache,
  setRecentlyReloadedFlag
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
    setRecentlyReloadedFlag: (page, flag) => dispatch(setRecentlyReloadedFlag(page, flag)),
    loadMoreCache: (startPage, endPage) => dispatch(loadMoreCache(startPage, endPage))
  };
};


const calcCacheNeeded = (currentPage, cache) => {
  let forwardCachedDataLeft = 0;
  let mostForwardPage = currentPage;
  let cacheNeededObject = {};

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
        cacheNeededObject.maxPageToLoad = i;
        break;
      }
    }
  } else {
    cacheNeededObject.isMoreCacheNeeded = false;
    // no data needed to load
  }
  return cacheNeededObject;
};

class AppContentContainer extends Component {

  componentDidMount() {
    let {initialLoad} = this.props;

    initialLoad(0, INITIAL_LOAD_NUMBER * DATA_PER_PAGE);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let {currentPageData, load, initialLoad, loadMoreCache, totalPage, removeIsRecentlyLoadedFlag, cache} = nextProps;
    let page = currentPageData.page;

    // if no total page and it's not loading, it means the initial load has failed
    // also only load the data when the data is not recently loaded
    if (totalPage === "?" && !currentPageData.isLoading && !currentPageData.isRecentlyReLoaded) {
      initialLoad(0, INITIAL_LOAD_NUMBER * DATA_PER_PAGE);
      // the reload can only occur at most once every 5 seconds
      if (currentPageData.attemptTimes >= 1) {
        setRecentlyReloadedFlag(page, true);
        setTimeout(() => setRecentlyReloadedFlag(page, false), RE_LOAD_INTERVAL * 1000);
      }
    }
    // if no data and it's not loading, then load it
    // also only load the data when the data is not recently loaded
    else if (!currentPageData.data && !currentPageData.isLoading && !currentPageData.isRecentlyReLoaded) {
      load(page - 1, DATA_PER_PAGE);
      console.log("load page " + (page - 1) + "  per Page " + DATA_PER_PAGE);
      // if it's not the first time to load the data
      // then it's a reload
      // the reload can only occur at most once every 5 seconds
      if (currentPageData.attemptTimes >= 1) {
        setRecentlyReloadedFlag(page, true);
        setTimeout(() => setRecentlyReloadedFlag(page, false), RE_LOAD_INTERVAL * 1000);
      }
    } else {
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
        console.log("load more page " + page + "  per Page " + perPage);
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
