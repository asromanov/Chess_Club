import axios from 'axios';
import {
  SET_FRIENDS_LIST,
  SET_ONLINE_FRIENDS,
  UPDATE_ONLINE_FRIENDS,
  USER_LOGGED_OUT,
} from '../types';

// Action creators
export const setFriendsList = (payload) => ({
  type: SET_FRIENDS_LIST,
  payload,
});

export const setOnlineFriends = () => ({
  type: SET_ONLINE_FRIENDS,
});

export const updateOnlineFriends = () => ({
  type: UPDATE_ONLINE_FRIENDS,
});

export const userLoggedOut = () => ({ type: USER_LOGGED_OUT });

// Async Thunk actions
export const setFriendsListAsync = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/friends');
    dispatch(setFriendsList(res.data));
  } catch (e) {
    dispatch(setFriendsList([]));
  }
};
