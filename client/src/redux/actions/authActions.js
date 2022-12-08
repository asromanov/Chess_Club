import axios from 'axios';
import { LOGOUT, SET_AUTH, SET_AUTH_EMPTY } from '../types';

// Action creators
export const authLogout = () => ({ type: LOGOUT });
export const setAuth = (payload) => ({ type: SET_AUTH, payload });
export const setAuthEmpty = () => ({ type: SET_AUTH_EMPTY, payload: {} });

// Async Thunk actions
export const checkAuthAsync = () => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/check');
    dispatch(setAuth(res.data));
  } catch (e) {
    dispatch(setAuthEmpty());
    if (e.response.status === 401) {
      console.log('No session saved!');
    } else {
      console.log(e);
    }
  }
};

export const loginUserAsync = (data, setLoading) => async (dispatch) => {
  dispatch({ type: 'INIT_LOGIN' });
  try {
    const res = await axios.post('/api/auth/login', data);
    dispatch(setAuth(res.data));
  } catch (e) {
    setLoading(false);
    dispatch(setAuthEmpty());
    console.log('Auth failed:', e);
  }
};

export const logoutUserAsync = () => async (dispatch) => {
  try {
    await axios('/api/auth/logout');
    dispatch(authLogout());
  } catch (e) {
    dispatch(setAuthEmpty());
    console.log('Auth failed:', e);
  }
};

export const signupUserAsync = (data, setLoading) => async (dispatch) => {
  dispatch({ type: 'INIT_SIGNUP' });
  try {
    const res = await axios.post('/api/auth/signup', data);
    dispatch(setAuth(res.data));
  } catch (e) {
    setLoading(false);
    dispatch(setAuthEmpty());
    console.log('Auth failed:', e);
  }
};
