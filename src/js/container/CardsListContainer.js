import React from 'react';
import connect from "react-redux/es/connect/connect";
import {toggleDrawer} from "../actions/actions";
import CardsList from "../presentational/CardsList";
import PropTypes from "prop-types";

const mapStateToProps = state => {
  return {pageData: state.pageData,}
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
        pageData={this.props.pageData}
        onCardClick={(id) => this.onCardClick(id)}
      />
    );
  }
}

CardsListContainer.propTypes = {
  pageData: PropTypes.array,
};

const ConnectedCardsListContainer = connect(mapStateToProps, mapDispatchToProps)(CardsListContainer);

export default ConnectedCardsListContainer;

