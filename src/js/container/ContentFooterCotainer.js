import React from "react";
import "../../styles/ContentFooter.css"
import ContentFooter from "../presentational/ContentFooter";
import connect from "react-redux/es/connect/connect";
import {pageChange} from "../actions/actions";

const mapStateToProps = state => {
  return {currentPage: state.currentPageData.page, totalPage: state.totalPage,}
};

const mapDispatchToProps = dispatch => {
  return {
    pageChange: pageNumber => dispatch(pageChange(pageNumber)),
  };
};

class ContentFooterContainer extends React.Component {

  onClickNext() {
    this.props.pageChange(this.props.currentPage + 1);
  }

  onClickBack() {
    this.props.pageChange(this.props.currentPage - 1);
  }


  render() {
    return (
      <ContentFooter
        totalPage={this.props.totalPage}
        currentPage={this.props.currentPage}
        onClickNext={this.onClickNext.bind(this)}
        onClickBack={this.onClickBack.bind(this)}
      />
    )
  }
}

const ConnectedContentFooterContainer = connect(mapStateToProps, mapDispatchToProps)(ContentFooterContainer);

export default ConnectedContentFooterContainer;

