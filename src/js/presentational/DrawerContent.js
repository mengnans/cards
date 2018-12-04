import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import '../../styles/DrawerHeader.css'
import {withStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";

const styles = {
  root: {
    flexGrow: 1,
  },
};

const drawerHeader = (props) => {
  if(true){
    return();
  } else {
    return null
  }

};

drawerHeader.propTypes = {
  number: PropTypes.string.isRequired,
};

export default withStyles(styles)(drawerHeader);