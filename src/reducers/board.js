import _ from "lodash";

export class Action {
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const defaultState = {
  nextTurn: `X`,
  winner: undefined,
  matrix: [[``, ``, ``],[``, ``, ``],[``, ``, ``]]
};

const board = (state = defaultState, ev) => {
  switch(ev.type) {
  case `NEXT`: {
    const action = ev.action;
    if (!!state.winner || !canClick(state.matrix, action.x, action.y)) {
      return state;
    }
    const newState = _.cloneDeep(state);
    newState.matrix[action.y][action.x] = state.nextTurn;
    newState.nextTurn = state.nextTurn === `X` ? `0` : `X`;
    newState.winner = getWinner(newState.matrix);
    return newState;
  }
  case `NEW_GAME`:
    return defaultState;
  default:
    return state;
  }
};

export default board;

// X | Y | draw | undefined
function getWinner(matrix) {
  const winningLines = [];
  for (let i = 0; i < 3; i++) {
    winningLines.push([[0, i], [1, i], [2, i]]);
    winningLines.push([[i, 0], [i, 1], [i, 2]]);
  }
  winningLines.push([[0, 0], [1, 1], [2, 2]]);
  winningLines.push([[0, 2], [1, 1], [2, 0]]);
  for (let li = 0; li < winningLines.length; li++) {
    const ln = winningLines[li];
    const res = matrix[ln[0][0]][ln[0][1]] + matrix[ln[1][0]][ln[1][1]] + matrix[ln[2][0]][ln[2][1]];
    if (res === `XXX`) return `X`;
    if (res === `000`) return `0`;
  }
  if(_.chain(matrix).flatten().filter(x => !!x).value().length === 9) {
    return `draw`;
  }
}

function canClick(matrix, x, y) {
  return !matrix[y][x];
}
