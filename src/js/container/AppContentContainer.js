import React, {Component} from 'react';
import '../../styles/AppContent.css';
import {initialLoad, load} from "../actions/actions";
import {connect} from "react-redux";
import AppContent from "../presentational/AppContent";
import {DATA_PER_PAGE} from "../constants/data-fetch-constant";
import PropTypes from "prop-types";

const mapStateToProps = state => {
  return {
    currentPageData: state.currentPageData,
    totalPage: state.totalPage,
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
    let {initialLoad} = this.props;

    initialLoad(0, 5 * DATA_PER_PAGE);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let {currentPageData, load, initialLoad, totalPage} = nextProps;
    let page = currentPageData.page - 1;

    // if no total page and it's not loading, it means the initial load has failed
    if (totalPage === "?" && !currentPageData.isLoading) {
      initialLoad(0, 5 * DATA_PER_PAGE);
    }
    // if no data, then load it
    else if (!currentPageData.data && !currentPageData.isLoading) {
      load(page, DATA_PER_PAGE);
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
  load: PropTypes.func.isRequired,
};

const connectedAppContentContainer = connect(mapStateToProps, mapDispatchToProps)(AppContentContainer);

export default connectedAppContentContainer;
