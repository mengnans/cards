import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from "./presentational/Card";
import connect from "react-redux/es/connect/connect";
import {toggleDrawer} from "./actions/actions";


const styles = ({
  root: {
    flexGrow: 1,
  },
});

const mapStateToProps = state => {
  return {data: state.pageData}
};

const mapDispatchToProps = dispatch => {
  return {
    openDrawer: drawerData => dispatch(toggleDrawer(drawerData)),
  };
};

class CardsList extends React.Component {

  onCardClick(id, number) {
    let drawerData = {};
    drawerData.isOpen = true;
    drawerData.id = id;
    drawerData.number = number;
    this.props.openDrawer(drawerData);
  }

  render() {
    const spacing = 16;

    return (
        <Grid item xs={12}>
          <Grid container justify="center" spacing={Number(spacing)}>
            {this.props.data.map((cardData) => (
                <Grid key={cardData.coreData.id} item>
                  <Card key={cardData.coreData.id} data={cardData.coreData}
                        onClick={() => this.onCardClick(cardData.coreData.id, cardData.coreData.number)}/>
                </Grid>
              )
            )}
          </Grid>
        </Grid>
    );
  }
}

const ConnectedCardsList = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CardsList));

export default ConnectedCardsList;

