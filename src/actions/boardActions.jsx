import * as types from '../constants/ActionTypes';

export const newGame = () => ({ type: types.BOARD_NEW_GAME });
export const makeTurn = (x, y) => {
  if (x > 2 || x < 0) {
    throw new Error(`Coordinates error: expected 'x' to be between 0 and 2, '${x}' received`);
  }
  if (y > 2 || y < 0) {
    throw new Error(`Coordinates error: expected 'y' to be between 0 and 2, '${y}' received`);
  }
  return { type: types.BOARD_NEXT_TURN, coordinates: { x, y } };
};

