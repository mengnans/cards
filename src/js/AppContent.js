import React, { Component } from 'react';
import '../styles/AppContent.css';
import CardsList from "./CardsList";
import Drawer from "./Drawer";

class AppContent extends Component {
  render() {
    return (
      <div className="App-content">
        <CardsList/>
        <Drawer/>
      </div>
    );
  }
}

export default AppContent;
