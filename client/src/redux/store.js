import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers/authReducer';
import fenReducer from './reducers/fenReducer';
import moveReducer from './reducers/moveReducer';
import rootSaga from './sagas/rootSaga';
import friendsReducer from './reducers/friendsReducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    authUser: authReducer,
    friends: friendsReducer,
    move: moveReducer,
    fen: fenReducer,
  },
  middleware: (mid) => [...mid(), sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

export default store;
