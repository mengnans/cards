import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardItem from "./presentational/Card";
import connect from "react-redux/es/connect/connect";
import {toggleDrawer} from "./actions/actions";
import mockData from "./data-fetch/mock-data";
import {DATA_PER_PAGE} from "./constants/data-fetch-constant";

const styles = ({
  root: {
    flexGrow: 1,
  },
});

const mapStateToProps = state => {
  return {pageData: state.pageData, isLoading: state.isLoading, currentPage: state.currentPage}
};

const mapDispatchToProps = dispatch => {
  return {
    openDrawer: drawerData => dispatch(toggleDrawer(drawerData)),
  };
};

class CardsList extends React.Component {

  onCardClick(id, number) {
    let drawerData = {};
    // don't open drawer when the page is loading
    if (this.props.isLoading) {
      return;
    }
    drawerData.isOpen = true;
    drawerData.id = id;
    drawerData.number = number;
    this.props.openDrawer(drawerData);
  }

  render() {
    const spacing = 16;

    let children = [1,2,3,4,5,6,7,8,9,10,11,12].map((value, index) => {
      let id, number, coreData;
      if(this.props.pageData){
        coreData = this.props.pageData[index].coreData;
        id = coreData.id;
        number = coreData.number;
      }
      return(
        <Grid key={index} item>
          <CardItem data={coreData}
                onClick={() => this.onCardClick(id, number)}
                isLoading={this.props.isLoading}/>
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

const ConnectedCardsList = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CardsList));

export default ConnectedCardsList;

