import React from 'react';
import connect from "react-redux/es/connect/connect";
import {toggleDrawer} from "../actions/actions";
import CardsList from "../presentational/CardsList";
import PropTypes from "prop-types";

const mapStateToProps = state => {
  return {currentPageData: state.currentPageData,}
};

const mapDispatchToProps = dispatch => {
  return {
    openDrawer: selectedId => dispatch(toggleDrawer(selectedId)),
  };
};

class CardsListContainer extends React.Component {

  onCardClick(id) {
    this.props.openDrawer(id);
  }

  render() {
    let isLoading = !this.props.currentPageData.data;
    let attemptTimes = this.props.currentPageData.attemptTimes;
    let progressBarColor = "primary";
    let loadingInfo = "Loading";
    if (isLoading) {
      if (attemptTimes > 1) {
        progressBarColor = "secondary";
        loadingInfo = "Re-connecting";
      }
    }
    return (
      <CardsList
        pageData={this.props.currentPageData.data}
        onCardClick={(id) => this.onCardClick(id)}
        isLoading={isLoading}
        progressBarColor={progressBarColor}
        loadingInfo={loadingInfo}
      />
    );
  }
}

CardsListContainer.propTypes = {
  currentPageData: PropTypes.object.isRequired,
};

const ConnectedCardsListContainer = connect(mapStateToProps, mapDispatchToProps)(CardsListContainer);

export default ConnectedCardsListContainer;

