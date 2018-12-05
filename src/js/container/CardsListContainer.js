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
    return (
      <CardsList
        currentPageData={this.props.currentPageData.data}
        onCardClick={(id) => this.onCardClick(id)}
      />
    );
  }
}

CardsListContainer.propTypes = {
  currentPageData: PropTypes.object,
};

const ConnectedCardsListContainer = connect(mapStateToProps, mapDispatchToProps)(CardsListContainer);

export default ConnectedCardsListContainer;

