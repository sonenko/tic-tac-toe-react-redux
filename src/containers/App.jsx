import React from 'react';
import * as pt from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as boardActions from '../actions/boardActions';
import Game from '../components/game';

const App = ({ board, actions }) => (
  <Game board={board} actions={actions} />
);

App.propTypes = {
  board: pt.shape({
    matrix: pt.arrayOf(pt.arrayOf(pt.string.isRequired).isRequired).isRequired,
    nextTurn: pt.string.isRequired,
    winner: pt.string.isRequired,
  }).isRequired,
  actions: pt.shape({
    newGame: pt.func.isRequired,
    makeTurn: pt.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({ board: state.board });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(boardActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
