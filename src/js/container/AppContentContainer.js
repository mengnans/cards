/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import "../../styles/AppContent.css";
import {initialLoad, load, removeIsRecentlyLoadedFlag} from "../actions/actions";
import {connect} from "react-redux";
import AppContent from "../presentational/AppContent";
import {DATA_PER_PAGE, RE_LOAD_INTERVAL} from "../constants/constant";
import PropTypes from "prop-types";

const mapStateToProps = state => {
  return {
    currentPageData: state.currentPageData,
    totalPage: state.totalPage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initialLoad: (page, dataPerPage) => dispatch(initialLoad(page, dataPerPage)),
    load: (page, dataPerPage) => dispatch(load(page, dataPerPage)),
    removeIsRecentlyLoadedFlag: (pageToRemove) => dispatch(removeIsRecentlyLoadedFlag(pageToRemove)),
  };
};

class AppContentContainer extends Component {

  componentDidMount() {
    let {initialLoad} = this.props;

    initialLoad(0, 5 * DATA_PER_PAGE);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let {currentPageData, load, initialLoad, totalPage, removeIsRecentlyLoadedFlag} = nextProps;
    let page = currentPageData.page - 1;

    // if no total page and it's not loading, it means the initial load has failed
    // also only load the data when the data is not recently loaded
    if (totalPage === "?" && !currentPageData.isLoading && !currentPageData.isRecentlyReLoaded) {
      initialLoad(0, 5 * DATA_PER_PAGE);
      // the reload can only occur once every 5 seconds
      setTimeout(()=>removeIsRecentlyLoadedFlag(currentPageData.page), RE_LOAD_INTERVAL * 1000);
    }
    // if no data and it's not loading, then load it
    // also only load the data when the data is not recently loaded
    else if (!currentPageData.data && !currentPageData.isLoading && !currentPageData.isRecentlyReLoaded) {
      load(page, DATA_PER_PAGE);
      // if it's not the first time to load the data
      // then it's a reload
      // the reload can only occur once every 5 seconds
      if(currentPageData.attemptTimes >= 1){
        setTimeout(()=>removeIsRecentlyLoadedFlag(currentPageData.page), RE_LOAD_INTERVAL * 1000);

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
  removeIsRecentlyLoadedFlag: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
};

const connectedAppContentContainer = connect(mapStateToProps, mapDispatchToProps)(AppContentContainer);

export default connectedAppContentContainer;
