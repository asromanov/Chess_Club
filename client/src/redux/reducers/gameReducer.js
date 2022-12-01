import { ACTIVE_MOVE, GAME_INIT } from '../types';

const gameReducer = (
  state = {},
  action,
) => {
  const { type, payload } = action;
  switch (type) {
    case GAME_INIT:
      return { ...state, ...payload };
    case ACTIVE_MOVE:
      return payload;
    default:
      return state;
  }
};

export default gameReducer;
