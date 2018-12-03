import React, { Component } from 'react';
import '../styles/AppContent.css';
import CardsList from "./CardsList";

class AppContent extends Component {
  render() {
    return (
      <div className="App-content">
        <CardsList/>
      </div>
    );
  }
}

export default AppContent;
