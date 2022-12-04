import axios from 'axios';
import { SET_ONLINE_PLAYERS, SET_PLAYERS_LIST, UPDATE_STATUS } from '../types';

// Action creators
export const setPlayersList = (payload) => ({
  type: SET_PLAYERS_LIST,
  payload,
});

export const setOnlinePlayersList = (payload) => ({
  type: SET_ONLINE_PLAYERS,
  payload,
});

export const updateStatus = (payload) => ({
  type: UPDATE_STATUS,
  payload,
});

// Async Thunk actions
export const setPlayersListAsync = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users');
    dispatch(setPlayersList(res.data));
    // dispatch(setOnlinePlayersList());
  } catch (e) {
    dispatch(setPlayersList([]));
  }
};
