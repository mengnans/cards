import React from "react";
import "../../styles/ContentFooter.css"
import ContentFooter from "../presentational/ContentFooter";
import connect from "react-redux/es/connect/connect";
import {pageChange} from "../actions/actions";
import PropTypes from "prop-types";

const mapStateToProps = state => {
  return {currentPage: state.currentPageData.page, totalPage: state.totalPage,}
};

const mapDispatchToProps = dispatch => {
  return {
    pageChange: pageNumber => dispatch(pageChange(pageNumber)),
  };
};

const ContentFooterContainer = (props) => {
  let {totalPage, currentPage, pageChange} = props;
  return (
    <ContentFooter
      totalPage={totalPage}
      currentPage={currentPage}
      onClickNext={() => pageChange(currentPage + 1)}
      onClickBack={() => pageChange(currentPage - 1)}
    />
  )
};

ContentFooterContainer.propTypes = {
  totalPage: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageChange: PropTypes.func.isRequired,
};

const ConnectedContentFooterContainer = connect(mapStateToProps, mapDispatchToProps)(ContentFooterContainer);

export default ConnectedContentFooterContainer;

