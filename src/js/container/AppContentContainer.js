import React, {Component} from 'react';
import '../../styles/AppContent.css';
import {initialLoad} from "../actions/actions";
import {connect} from "react-redux";
import AppContent from "../presentational/AppContent";

const mapDispatchToProps = dispatch => {
  return {
    initialLoad: (page, dataPerPage) => dispatch(initialLoad(page, dataPerPage)),
  };
};

class AppContentContainer extends Component {

  componentDidMount(){
    this.props.initialLoad(0, 60);
  }

  render() {
    return (
      <AppContent/>
    );
  }
}

const connectedAppContentContainer = connect(null, mapDispatchToProps)(AppContentContainer);

export default connectedAppContentContainer;
