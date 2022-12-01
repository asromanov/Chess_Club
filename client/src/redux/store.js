import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers/authReducer';
import playersReducer from './reducers/playersReducer';
import wsReducer from './reducers/wsReducer';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    authUser: authReducer,
    players: playersReducer,
    wsStatus: wsReducer,
  },
  middleware: (mid) => [...mid(), sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

export default store;
