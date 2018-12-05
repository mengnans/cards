import React, {Component} from 'react';
import '../../styles/AppContent.css';
import {initialLoad, reLoad} from "../actions/actions";
import {connect} from "react-redux";
import AppContent from "../presentational/AppContent";
import {DATA_PER_PAGE} from "../constants/data-fetch-constant";

const mapStateToProps = state => {
  return {
    currentPageData: state.currentPageData,
    reLoadList: state.reLoadList,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    initialLoad: (page, dataPerPage) => dispatch(initialLoad(page, dataPerPage)),
    reLoad: (page, dataPerPage) => dispatch(reLoad(page, dataPerPage)),
  };
};

const isReLoadNeeded = (currentPage, reLoadPage, reLoadPerPage) => {
  // if current page is in the reload scope
  // of course we need to reload
  let reLoadStartPage = reLoadPage * (reLoadPerPage / DATA_PER_PAGE);
  let reLoadEndPage = reLoadPage + (reLoadPerPage / DATA_PER_PAGE);
  if (currentPage <= reLoadEndPage && currentPage >= reLoadStartPage) {
    return true;
  }

  // doesn't need to reload in other cases
  return false;

};

class AppContentContainer extends Component {

  componentDidMount() {
    // load 5 pages at the beginning
    // the first page for current page
    // other four for caching
    this.props.initialLoad(0, 5 * DATA_PER_PAGE);
  }

  componentWillReceiveProps(props, state) {
    let reLoadList = props.reLoadList;
    let reLoadListLength = reLoadList.length;
    if (reLoadListLength > 0) {
      let currentPage = props.currentPageData.page;
      for (let i = 0; i < reLoadListLength; i++) {
        let reLoadPage = reLoadList[i].page;
        let reLoadPerPage = reLoadList[i].perPage;
        if (isReLoadNeeded(currentPage, reLoadPage, reLoadPerPage)) {
          setTimeout(() => {
            console.log("reload");
            this.props.reLoad(reLoadPage, reLoadPerPage);
          }, 3000);
        }
      }
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
