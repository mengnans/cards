import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import extractData from "../data-fetch/data-extract";
import '../../styles/Drawer.css';
import {connect} from "react-redux";
import {toggleDrawer} from "../actions/actions";
import DrawerHeader from "../presentational/DrawerHeader";
import DrawerList from "../presentational/DrawerList";

const mapStateToProps = state => {
  return {drawerData: state.drawerData, data: state.pageData}
};

const mapDispatchToProps = dispatch => {
  return {
    toggleDrawer: drawerData => dispatch(toggleDrawer(drawerData)),
  };
};

class Drawer extends React.Component {

  render() {
    let id = this.props.drawerData.id;
    let children = id ?
      <div className="Drawer">
        <DrawerHeader number={this.props.drawerData.number}/>
        <DrawerList extractedData={extractData(this.props.data, id)} id={id}/>
      </div>
      : null;
    return (
      <div>
        <SwipeableDrawer
          anchor="right"
          open={this.props.drawerData.isOpen}
          onClose={() => {
            let drawerData = {};
            drawerData.isOpen = false;
            this.props.toggleDrawer(drawerData);
          }}
          onOpen={() => {
            let drawerData = {};
            drawerData.isOpen = true;
            this.props.toggleDrawer(drawerData);
          }}
        >
          {children}
        </SwipeableDrawer>
      </div>
    );
  }
}

const ConnectedDrawer = connect(mapStateToProps, mapDispatchToProps)(Drawer);

export default ConnectedDrawer;