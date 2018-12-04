import React, {Component} from 'react';
import '../../styles/AppContent.css';
import {initialLoad} from "../actions/actions";
import {connect} from "react-redux";
import AppContent from "../presentational/AppContent";
import {DATA_PER_PAGE} from "../constants/data-fetch-constant";

const mapDispatchToProps = dispatch => {
  return {
    initialLoad: (page, dataPerPage) => dispatch(initialLoad(page, dataPerPage)),
  };
};

class AppContentContainer extends Component {

  componentDidMount(){
    // load 5 pages at the beginning
    // the first page for current page
    // other four for caching
    this.props.initialLoad(0, 5 * DATA_PER_PAGE);
  }

  render() {
    return (
      <AppContent/>
    );
  }
}

const connectedAppContentContainer = connect(null, mapDispatchToProps)(AppContentContainer);

export default connectedAppContentContainer;
