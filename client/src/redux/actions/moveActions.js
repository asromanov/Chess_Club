import {
  CURRENT_MOVE,
} from '../types';

export const setMoves = (currentMove) => ({ type: CURRENT_MOVE, payload: currentMove });
