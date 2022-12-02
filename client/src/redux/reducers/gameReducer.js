import {
  ACCEPT_INVITE,
  GAME_INIT, MOVE_MADE, SEND_INVITE, SHOW_INVITE,
} from '../types';

const gameReducer = (
  state = {},
  action,
) => {
  const { type, payload } = action;
  switch (type) {
    case GAME_INIT:
      return payload;
    case MOVE_MADE:
      return payload;
    case SEND_INVITE:
      return payload;
    case SHOW_INVITE:
      return payload;
    case ACCEPT_INVITE:
      return payload;
    default:
      return state;
  }
};

export default gameReducer;
