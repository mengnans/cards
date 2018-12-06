/* eslint-disable no-unused-vars */
import React from "react";
import "../../styles/ContentFooter.css";
import Footer from "../presentational/Footer";
import connect from "react-redux/es/connect/connect";
import {pageChange} from "../actions/actions";
import PropTypes from "prop-types";

const mapStateToProps = state => {
  return {currentPage: state.currentPageData.page, totalPage: state.totalPage,};
};

const mapDispatchToProps = dispatch => {
  return {
    pageChange: pageNumber => dispatch(pageChange(pageNumber)),
  };
};

/**
 * the container for the footer
 */
const FooterContainer = (props) => {
  let {totalPage, currentPage, pageChange} = props;
  return (
    <Footer
      totalPage={totalPage}
      currentPage={currentPage}
      onClickNext={() => pageChange(currentPage + 1)}
      onClickBack={() => pageChange(currentPage - 1)}
    />
  );
};

FooterContainer.propTypes = {
  totalPage: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageChange: PropTypes.func.isRequired,
};

const ConnectedFooterContainer = connect(mapStateToProps, mapDispatchToProps)(FooterContainer);

export default ConnectedFooterContainer;

