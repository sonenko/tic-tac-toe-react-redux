/* global describe, it, expect */

import * as types from '../constants/ActionTypes';
import * as actions from './boardActions';

describe('board actions', () => {
  it('newGame should create BOARD_NEW_GAME action', () => {
    expect(actions.newGame()).toEqual({ type: types.BOARD_NEW_GAME });
  });

  it('makeTurn should create BOARD_NEX_TURN action', () => {
    expect(actions.makeTurn(1, 2)).toEqual({
      type: types.BOARD_NEXT_TURN,
      coordinates: { x: 1, y: 2 },
    });
  });

  it('makeTurn should throw exception for illegal arguments', () => {
    const tinyValue = -1;
    const bigValue = 3;

    expect(() => actions.makeTurn(tinyValue, 2))
      .toThrow(new Error(`Coordinates error: expected 'x' to be between 0 and 2, '${tinyValue}' received`));

    expect(() => actions.makeTurn(bigValue, 2))
      .toThrow(new Error(`Coordinates error: expected 'x' to be between 0 and 2, '${bigValue}' received`));

    expect(() => actions.makeTurn(1, tinyValue))
      .toThrow(new Error(`Coordinates error: expected 'y' to be between 0 and 2, '${tinyValue}' received`));

    expect(() => actions.makeTurn(1, bigValue))
      .toThrow(new Error(`Coordinates error: expected 'y' to be between 0 and 2, '${bigValue}' received`));

    expect(() => actions.makeTurn(tinyValue, bigValue))
      .toThrow(new Error(`Coordinates error: expected 'x' to be between 0 and 2, '${tinyValue}' received`));
  });
});
