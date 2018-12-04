import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import '../../styles/Drawer.css';
import DrawerHeader from "../presentational/DrawerHeader";
import DrawerList from "../presentational/DrawerList";
import PropTypes from "prop-types";

class Drawer extends React.Component {

  render() {
    // no children elements when drawer is closed
    let children = this.props.isOpen ?
      <div className="Drawer">
        <DrawerHeader number={this.props.extractedData.number} onClickExit={() => this.props.closeDrawer()}/>
        <DrawerList drawerListData={this.props.extractedData.drawerListData} id={this.props.extractedData.id}/>
      </div>
      :
      null;
    return (
      <div>
        <SwipeableDrawer
          anchor="right"
          open={this.props.isOpen}
          onClose={() => {
            this.props.closeDrawer();
          }}
          onOpen={() => {
          }}
        >
          {children}
        </SwipeableDrawer>
      </div>
    );
  }
}

Drawer.propTypes = {
  extractedData: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
};


export default Drawer;