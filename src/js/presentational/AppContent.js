import React, {Component} from 'react';
import '../../styles/AppContent.css';
import CardsListContainer from "../container/CardsListContainer";
import Grid from "@material-ui/core/Grid";
import DrawerContainer from "../container/DrawerContainer";
import ContentFooterContainer from "../container/ContentFooterCotainer";


class AppContent extends Component {
  render() {
    const spacing = 16;
    return (
      <div className="App-content">
        <Grid container spacing={spacing}>
          <CardsListContainer/>
          <ContentFooterContainer/>
        </Grid>
        <DrawerContainer/>
      </div>
    );
  }
}

export default AppContent;
