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
      let coreData;
      let noData = false;
      if (!this.props.isLoading) {
        if (this.props.pageData[index]) {
          coreData = this.props.pageData[index].coreData;
        } else {
          noData = true;
        }

      }
      return (
        <Grid key={index} item>
          <CardItem coreData={coreData}
                    onClick={() => this.props.onCardClick(coreData.id)}
                    isLoading={this.props.isLoading}
                    loadingInfo={this.props.loadingInfo}
                    progressBarColor={this.props.progressBarColor}
                    noData={noData}/>
        </Grid>
      )
    });

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
  pageData: PropTypes.array,
  onCardClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadingInfo: PropTypes.string.isRequired,
  progressBarColor: PropTypes.string.isRequired,
};

export default withStyles(styles)(CardsList);

