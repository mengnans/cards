import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MyCard from "./Card";
import mockData from "./data-fetch/mock-data"


const styles = ({
  root: {
    flexGrow: 1,
  },
});

class GuttersGrid extends React.Component {

  render() {
    const spacing = 16;

    return (
      <Grid container className={"root"} spacing={spacing}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={Number(spacing)}>
            {mockData.map((cardData) => (
                <Grid key={cardData.coreData.id} item>
                  <MyCard key={cardData.coreData.id} data={cardData}/>
                </Grid>
              )
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={Number(spacing)}>
            Back 1/1414 Next
          </Grid>
        </Grid>
      </Grid>
    );
  }
}


export default withStyles(styles)(GuttersGrid);