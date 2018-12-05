import React, {Component} from 'react';
import '../../styles/AppContent.css';
import {initialLoad, load} from "../actions/actions";
import {connect} from "react-redux";
import AppContent from "../presentational/AppContent";
import {DATA_PER_PAGE} from "../constants/data-fetch-constant";

const mapStateToProps = state => {
  return {
    currentPageData: state.currentPageData,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    initialLoad: (page, dataPerPage) => dispatch(initialLoad(page, dataPerPage)),
    load: (page, dataPerPage) => dispatch(load(page, dataPerPage)),
  };
};

class AppContentContainer extends Component {

  componentDidMount() {
    // load 5 pages at the beginning
    // the first page for current page
    // other four for caching
    this.props.initialLoad(0, 5 * DATA_PER_PAGE);
  }

  componentWillReceiveProps(props, state) {
    let currentPageData = props.currentPageData;
    let page = currentPageData.page - 1;
    // if no data
    if(!currentPageData.data && !currentPageData.isLoading) {
      this.props.load(page, DATA_PER_PAGE);
    }
  }

  render() {
    return (
      <AppContent/>
    );
  }
}

const connectedAppContentContainer = connect(mapStateToProps, mapDispatchToProps)(AppContentContainer);

export default connectedAppContentContainer;
