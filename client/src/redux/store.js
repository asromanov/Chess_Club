import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers/authReducer';
import fenReducer from './reducers/fenReducer';
import gameReducer from './reducers/gameReducer';
import moveReducer from './reducers/moveReducer';
import pagesReducer from './reducers/pagesReducer';
import playersReducer from './reducers/playersReducer';
import wsReducer from './reducers/wsReducer';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    authUser: authReducer,
    players: playersReducer,
    wsStatus: wsReducer,
    pages: pagesReducer,
    game: gameReducer,
    move: moveReducer,
    fen: fenReducer,
  },
  middleware: (mid) => [...mid(), sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

export default store;
