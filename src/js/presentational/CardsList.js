/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React from "react";
import Grid from "@material-ui/core/Grid";
import CardItem from "./Card";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import {TWELVE_ARRAY} from "../constants/constant";

const styles = ({
  root: {
    flexGrow: 1,
  },
});

/**
 * render a list of cards
 */
function CardsList(props) {

  const spacing = 16;
  let {pageData, onCardClick, isLoading, loadingInfo, progressBarColor} = props;
  let children = TWELVE_ARRAY.map((value, index) => {
    let coreData, id;
    let noData = false;
    if (!isLoading) {
      if (pageData[index]) {
        coreData = pageData[index].coreData;
        id = coreData.id;
      } else {
        noData = true;
      }
    }
    return (
      <Grid key={index} item>
        <CardItem coreData={coreData}
                  onClick={() => onCardClick(id)}
                  isLoading={isLoading}
                  loadingInfo={loadingInfo}
                  progressBarColor={progressBarColor}
                  noData={noData}/>
      </Grid>
    );
  });

  return (
    <Grid item xs={12}>
      <Grid container justify="center" spacing={Number(spacing)}>
        {children}
      </Grid>
    </Grid>
  );
}

CardsList.propTypes = {
  pageData: PropTypes.array,
  onCardClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadingInfo: PropTypes.string.isRequired,
  progressBarColor: PropTypes.string.isRequired,
};

export default withStyles(styles)(CardsList);

