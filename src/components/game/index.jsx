import React from 'react';
import * as pt from 'prop-types';
import GameHeader from './GameHeader';
import GameMatrix from './GameMatrix';

export default class Game extends React.Component {
  static get propTypes() {
    return {
      board: pt.shape({
        matrix: pt.arrayOf(pt.arrayOf(pt.string.isRequired).isRequired).isRequired,
        nextTurn: pt.string.isRequired,
        winner: pt.string,
      }).isRequired,
      actions: pt.shape({
        newGame: pt.func.isRequired,
        makeTurn: pt.func.isRequired,
      }).isRequired,
    };
  }

  render() {
    return (<div className="game">
      <GameHeader
        nextTurn={this.props.board.nextTurn}
        winner={this.props.board.winner}
        newGame={this.props.actions.newGame}
      />
      <table className="game-table">
        <GameMatrix
          matrix={this.props.board.matrix}
          makeTurn={this.props.actions.makeTurn}
        />
      </table>
    </div>);
  }
}

