import React, {Component} from 'react';
import '../../styles/AppContent.css';
import CardsListContainer from "../container/CardsListContainer";
import Grid from "@material-ui/core/Grid";
import DrawerContainer from "../container/DrawerContainer";
import ContentFooterContainer from "../container/ContentFooterCotainer";


const AppContent = () => {
  return (
    <div className="App-content">
      <Grid container spacing={16}>
        <CardsListContainer/>
        <ContentFooterContainer/>
      </Grid>
      <DrawerContainer/>
    </div>
  );
};

export default AppContent;
