import React from 'react';
import * as pt from 'prop-types';

export default class GameHeader extends React.Component {
  static get propTypes() {
    return {
      nextTurn: pt.string.isRequired,
      winner: pt.string.isRequired,
      newGame: pt.func.isRequired,
    };
  }

  inner() {
    const newGameButton = () => <button onClick={this.props.newGame}>New Game</button>;

    if (this.props.winner === 'draw') {
      return <div>Draw! <br />{newGameButton()}</div>;
    }
    if (this.props.winner) {
      return <div>Winner is: <b>{this.props.winner}</b><br />{newGameButton()}</div>;
    }
    return <div>Next turn: <b>{this.props.nextTurn}</b></div>;
  }

  render() {
    return <div className="game-header">{this.inner()}</div>;
  }
}

