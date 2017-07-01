import React from 'react';
import * as pt from 'prop-types';

export default class GameMatrix extends React.Component {
  static get propTypes() {
    return {
      matrix: pt.arrayOf(pt.arrayOf(pt.string.isRequired).isRequired).isRequired,
      makeTurn: pt.func.isRequired,
    };
  }

  matrix() {
    return this.props.matrix.map((line, y) => (
      <tr key={y}>
        {line.map((value, x) => (<td key={`${y}-${x}`} onClick={() => this.props.makeTurn(x, y)}>{value}</td>))}
      </tr>),
    );
  }

  render() {
    return <tbody>{this.matrix()}</tbody>;
  }
}

