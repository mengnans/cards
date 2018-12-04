import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import '../../styles/DrawerList.css'
import {withStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";

const styles = {
  root: {
    flexGrow: 1,
  },
};

const drawerList = (props) => {
  return (
    props.drawerListData.map((data) => (
      <Grid key={props.id + data.label} container className="Drawer-list">
        <Grid item xs={2}>
          {data.label}
        </Grid>
        <Grid item xs={10} className="List-content">
          {data.description}
        </Grid>
      </Grid>
      )
    )
  );
};

drawerList.propTypes = {
  drawerListData: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};

export default withStyles(styles)(drawerList);