import * as types from '../constants/ActionTypes';

const defaultState = {
  nextTurn: 'X',
  winner: '',
  matrix: [['', '', ''], ['', '', ''], ['', '', '']],
};

/**
 * @returns 'X' | '0' | 'draw' | ''
 */
function getWinner(matrix) {
  const getWinnerOfLines = (lines) => {
    const cellNumberToCoordinates = num => ({ x: num % 3, y: Math.floor(num / 3) });

    if (lines.length === 0) {
      return '';
    }
    const [h, ...tail] = lines;
    const lineStr = h.map(cellNumberToCoordinates).map(coords => matrix[coords.y][coords.x]).join('');
    if (lineStr === 'XXX') {
      return 'X';
    } else if (lineStr === '000') {
      return '0';
    }
    return getWinnerOfLines(tail);
  };

  if (matrix.reduce((acc, x) => acc.concat(x)).filter(x => !!x).length === 9) {
    return 'draw';
  }

  return getWinnerOfLines([[0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]) || '';
}

function isCellEmpty(matrix, x, y) {
  return !matrix[y][x];
}

function cloneState(state) {
  const newState = { ...state };
  newState.matrix = state.matrix.map(x => [...x]);
  return newState;
}

const board = (state = defaultState, ev) => {
  switch (ev.type) {
    case types.BOARD_NEXT_TURN: {
      const coordinates = ev.coordinates;
      if (!!state.winner || !isCellEmpty(state.matrix, coordinates.x, coordinates.y)) {
        return state;
      }
      const newState = cloneState(state);
      newState.matrix[coordinates.y][coordinates.x] = state.nextTurn;
      newState.nextTurn = state.nextTurn === 'X' ? '0' : 'X';
      newState.winner = getWinner(newState.matrix);
      return newState;
    }
    case types.BOARD_NEW_GAME:
      return defaultState;
    default:
      return state;
  }
};

export default board;
