import {
  CURRENT_FEN,
} from '../types';

const fenReducer = (
  state = 'start',
  action,
) => {
  const { type, payload } = action;
  switch (type) {
    case CURRENT_FEN:
      return payload;
    default:
      return state;
  }
};

export default fenReducer;
