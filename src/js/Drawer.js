import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import DrawerList from "./DrawerList";
import DrawerHeader from "./DrawerHeader";
import extractData from "./data-fetch/data-extract";
import '../styles/Drawer.css';
import {connect} from "react-redux";
import {toggleDrawer} from "./actions/actions";

const mapStateToProps = state => {
  return {drawerData: state.drawerData, data: state.pageData}
};

const mapDispatchToProps = dispatch => {
  return {
    toggleDrawer: drawerData => dispatch(toggleDrawer(drawerData)),
  };
};

class Drawer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let id = this.props.drawerData.id;
    if (typeof id === "undefined") {
      return null;
    }
    const number = this.props.drawerData.number;
    const extractedData = extractData(this.props.data, id);
    return (
      <div>
        <SwipeableDrawer
          className="Drawer"
          anchor="right"
          open={this.props.drawerData.isOpen}
          onClose={() => {
            let drawerData = {};
            drawerData.isOpen = false;
            this.props.toggleDrawer(drawerData);
          }}
          onOpen={() => {
            console.log("Open")
          }}
        >
          <DrawerHeader number={number}/>
          <DrawerList extractedData={extractedData} id={id}/>
        </SwipeableDrawer>
      </div>
    );
  }
}

const ConnectedDrawer = connect(mapStateToProps, mapDispatchToProps)(Drawer);

export default ConnectedDrawer;