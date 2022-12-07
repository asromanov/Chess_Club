import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import fenReducer from './reducers/fenReducer';
import moveReducer from './reducers/moveReducer';

const store = configureStore({
  reducer: {
    authUser: authReducer,
    move: moveReducer,
    fen: fenReducer,
  },
});

export default store;
