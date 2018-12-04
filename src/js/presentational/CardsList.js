import React from 'react';
import Grid from '@material-ui/core/Grid';
import CardItem from "./Card";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import {TWELWE_ARRAY} from "../constants/data-fetch-constant";

const styles = ({
  root: {
    flexGrow: 1,
  },
});

class CardsList extends React.Component {

  render() {
    const spacing = 16;

    let children = TWELWE_ARRAY.map((value, index) => {
      let id, coreData, isLoading;
      isLoading = true;
      if(this.props.currentPageData && this.props.currentPageData[index]){
        coreData = this.props.currentPageData[index].coreData;
        id = coreData.id;
        isLoading = false;
      }
      return(
        <Grid key={index} item>
          <CardItem data={coreData}
                onClick={() => this.props.onCardClick(id)}
                isLoading={isLoading}/>
        </Grid>
    )});

    return (
      <Grid item xs={12}>
        <Grid container justify="center" spacing={Number(spacing)}>
          {children}
        </Grid>
      </Grid>
    );
  }
}

CardsList.propTypes = {
  currentPageData: PropTypes.array,
  onCardClick: PropTypes.func,
};

export default withStyles(styles)(CardsList);

