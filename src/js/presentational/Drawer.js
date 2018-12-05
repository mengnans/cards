import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import '../../styles/Drawer.css';
import DrawerHeader from "../presentational/DrawerHeader";
import DrawerList from "../presentational/DrawerList";
import PropTypes from "prop-types";

function Drawer(props) {

  let {extractedData, isOpen, closeDrawer} = props;
  // no children elements when drawer is closed
  let children = isOpen ?

    <div className="Drawer">
      <DrawerHeader number={extractedData.number} onClickExit={() => closeDrawer()}/>
      <DrawerList drawerListData={extractedData.drawerListData} id={extractedData.id}/>
    </div>
    :
    null;
  return (
    <div>
      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onClose={() => {
          closeDrawer();
        }}
        onOpen={() => {
        }}
      >
        {children}
      </SwipeableDrawer>
    </div>
  );
}

Drawer.propTypes = {
  extractedData: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};


export default Drawer;