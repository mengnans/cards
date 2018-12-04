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

  return (
        <Grid container className="Drawer-header">
          <Grid item xs={10}>
            {props.number}
          </Grid>
          <Grid item xs={2} className="Drawer-exit" onClick={props.onClickExit}>
            x
          </Grid>
        </Grid>
  );
};

drawerHeader.propTypes = {
  number: PropTypes.string.isRequired,
};

export default withStyles(styles)(drawerHeader);