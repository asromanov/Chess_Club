import { put, take } from 'redux-saga/effects';
import { SET_WS } from '../types';

export default function* closeConnection(socket) {
  const message = yield take('CLOSE_WEBSOCKET');
  // socket.send(JSON.stringify(message));
  socket.close();
  yield put({ type: SET_WS, payload: null });
}
