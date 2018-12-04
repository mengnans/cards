import React from 'react';
import extractData from "../data-fetch/data-extract";
import '../../styles/Drawer.css';
import {connect} from "react-redux";
import Drawer from "../presentational/Drawer";
import {toggleDrawer} from "../actions/actions";

const mapStateToProps = state => {
  return {pageData: state.pageData, id: state.selectedId}
};

const mapDispatchToProps = dispatch => {
  return {
    closeDrawer: () => dispatch(toggleDrawer(null)),
  };
};

class DrawerContainer extends React.Component {

  render() {
    let isOpen, extractedData;
    if (!this.props.id) {
      isOpen = false;
    } else {
      isOpen = true;
      // extract the data needed for the drawer
      extractedData = extractData(this.props.pageData, this.props.id);
    }
    return (
      <Drawer
        extractedData={extractedData}
        isOpen={isOpen}
        closeDrawer={this.props.closeDrawer}
      />
    );
  }
}

const ConnectedDrawerContainer = connect(mapStateToProps, mapDispatchToProps)(DrawerContainer);

export default ConnectedDrawerContainer;