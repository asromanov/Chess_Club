import {
  CURRENT_FEN,
} from '../types';

export const setFen = (currentFen) => ({ type: CURRENT_FEN, payload: currentFen });
