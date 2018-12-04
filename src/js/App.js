import React, { Component } from 'react';
import '../styles/App.css';
import AppContentContainer from "./container/AppContentContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppContentContainer/>
      </div>
    );
  }
}

export default App;
