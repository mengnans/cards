import React from 'react';
import Grid from '@material-ui/core/Grid';
import CardItem from "./Card";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";

const styles = ({
  root: {
    flexGrow: 1,
  },
});

class CardsList extends React.Component {

  render() {
    const spacing = 16;

    let children = [1,2,3,4,5,6,7,8,9,10,11,12].map((value, index) => {
      let id, coreData, isLoading;
      isLoading = true;
      if(this.props.pageData){
        coreData = this.props.pageData[index].coreData;
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
  pageData: PropTypes.array,
  onCardClick: PropTypes.func,
};

export default withStyles(styles)(CardsList);

