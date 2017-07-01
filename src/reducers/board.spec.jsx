/* global describe, it, expect */

import board from './board';
import * as types from '../constants/ActionTypes';

describe('board reducer', () => {
  it('should handle initial state', () => {
    expect(board(undefined, {})).toEqual({
      nextTurn: 'X',
      winner: undefined,
      matrix: [['', '', ''], ['', '', ''], ['', '', '']],
    });
  });

  it('should handle BOARD_NEW_GAME', () => {
    expect(board(
      { nextTurn: 'X', winner: 'X', matrix: [['', '', ''], ['', '', ''], ['', '', '']] },
      { type: types.BOARD_NEW_GAME },
    )).toEqual({ nextTurn: 'X', winner: undefined, matrix: [['', '', ''], ['', '', ''], ['', '', '']] });
  });

  describe('board -> BOARD_NEXT_TURN', () => {
    it('should set initally set `X` to specified coordinates', () => {
      expect(board(undefined, { type: types.BOARD_NEXT_TURN, coordinates: { x: 0, y: 0 } }))
        .toEqual({ nextTurn: '0', winner: undefined, matrix: [['X', '', ''], ['', '', ''], ['', '', '']] });
    });

    it('should NOT affect state if value in matrix already set', () => {
      expect(board(
        { nextTurn: '0', winner: undefined, matrix: [['X', '', ''], ['', '', ''], ['', '', '']] },
        { type: types.BOARD_NEXT_TURN, coordinates: { x: 0, y: 0 } },
      )).toEqual({ nextTurn: '0', winner: undefined, matrix: [['X', '', ''], ['', '', ''], ['', '', '']] });
    });

    it('should set winner to `draw` when there is no winner and all fields already taken', () => {
      expect(board(
        { nextTurn: 'X', winner: undefined, matrix: [['X', '0', 'X'], ['X', '0', 'X'], ['0', '0', '']] },
        { type: types.BOARD_NEXT_TURN, coordinates: { x: 2, y: 2 } },
      )).toEqual({ nextTurn: '0', winner: 'draw', matrix: [['X', '0', 'X'], ['X', '0', 'X'], ['0', '0', 'X']] });
    });

    it('should set winner to `X`', () => {
      expect(board(
        { nextTurn: 'X', winner: undefined, matrix: [['X', 'X', ''], ['', '', ''], ['', '', '']] },
        { type: types.BOARD_NEXT_TURN, coordinates: { x: 2, y: 0 } },
      )).toEqual({ nextTurn: '0', winner: 'X', matrix: [['X', 'X', 'X'], ['', '', ''], ['', '', '']] });
    });

    it('should set winner to `0`', () => {
      expect(board(
        { nextTurn: '0', winner: undefined, matrix: [['0', '', ''], ['', '0', ''], ['', '', '']] },
        { type: types.BOARD_NEXT_TURN, coordinates: { x: 2, y: 2 } },
      )).toEqual({ nextTurn: 'X', winner: '0', matrix: [['0', '', ''], ['', '0', ''], ['', '', '0']] });
    });
  });
});
