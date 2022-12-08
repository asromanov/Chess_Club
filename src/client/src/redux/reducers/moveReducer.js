import {
  CURRENT_MOVE,
} from '../types';

const moveReducer = (
  state = [],
  action,
) => {
  const { type, payload } = action;
  switch (type) {
    case CURRENT_MOVE:
      return payload;
    default:
      return state;
  }
};

export default moveReducer;
