/* eslint-disable no-unused-vars */
import React from "react";
import extractData from "../data-fetch/data-extract";
import "../../styles/Drawer.css";
import {connect} from "react-redux";
import Drawer from "../presentational/Drawer";
import {toggleDrawer} from "../actions/actions";
import PropTypes from "prop-types";

const mapStateToProps = state => {
  return {currentPageData: state.currentPageData, id: state.selectedId};
};

const mapDispatchToProps = dispatch => {
  return {
    closeDrawer: () => dispatch(toggleDrawer(null)),
  };
};

/**
 * container for the drawer
 */
class DrawerContainer extends React.Component {

  render() {
    let {currentPageData, closeDrawer} = this.props;
    let isOpen, extractedData;

    if (!this.props.id) {
      isOpen = false;
    } else {
      isOpen = true;
      // extract the data needed for the drawer
      extractedData = extractData(currentPageData.data, this.props.id);
    }
    return (
      <Drawer
        extractedData={extractedData}
        isOpen={isOpen}
        closeDrawer={closeDrawer}
      />
    );
  }
}

DrawerContainer.propTypes = {
  currentPageData: PropTypes.object,
  closeDrawer: PropTypes.func.isRequired,
};

const ConnectedDrawerContainer = connect(mapStateToProps, mapDispatchToProps)(DrawerContainer);

export default ConnectedDrawerContainer;