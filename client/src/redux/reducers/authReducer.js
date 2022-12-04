import { LOGOUT, SET_AUTH, SET_AUTH_EMPTY } from '../types';

export default function authReducer(state = null, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_AUTH:
      return payload;
    case SET_AUTH_EMPTY:
      return payload;
    case LOGOUT:
      return {};
    default:
      return state;
  }
}
