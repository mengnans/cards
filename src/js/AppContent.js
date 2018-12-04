import React, {Component} from 'react';
import '../styles/AppContent.css';
import CardsList from "./CardsList";
import Drawer from "./container/Drawer";
import ContentFooter from "./ContentFooter"
import Grid from "@material-ui/core/Grid";

class AppContent extends Component {
  render() {
    const spacing = 16;
    return (
      <div className="App-content">
        <Grid container spacing={spacing}>
          <CardsList/>
          <ContentFooter/>
        </Grid>
        <Drawer/>
      </div>
    );
  }
}

export default AppContent;
