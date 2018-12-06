/* eslint-disable no-unused-vars */
import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import "../../styles/DrawerHeader.css";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = {
  root: {
    flexGrow: 1,
  },
};

/**
 * render the drawer header
 */
function drawerHeader(props) {
  let {number, onClickExit} = props;

  return (
    <Grid container className="Drawer-header">
      <Grid item xs={10}>
        {number}
      </Grid>
      <Grid item xs={2} className="Drawer-exit" onClick={onClickExit}>
        X
      </Grid>
    </Grid>
  );
}

drawerHeader.propTypes = {
  number: PropTypes.string.isRequired,
  onClickExit: PropTypes.func.isRequired,
};

export default withStyles(styles)(drawerHeader);