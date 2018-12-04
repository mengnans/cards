import React, {Component} from 'react';
import '../styles/AppContent.css';
import CardsList from "./CardsList";
import Drawer from "./container/Drawer";
import ContentFooter from "./ContentFooter"
import Grid from "@material-ui/core/Grid";
import {initialLoad, toggleDrawer} from "./actions/actions";
import {connect} from "react-redux";

const mapDispatchToProps = dispatch => {
  return {
    initialLoad: () => dispatch(initialLoad()),
  };
};

class AppContent extends Component {

  componentDidMount(){
    this.props.initialLoad();
  }

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

const connectedAppContent = connect(null, mapDispatchToProps)(AppContent);

export default connectedAppContent;
