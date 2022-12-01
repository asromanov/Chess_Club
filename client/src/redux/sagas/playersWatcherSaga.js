import {
  take, put, call, takeEvery, fork,
} from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { SET_WS, SOCKET_INIT, UPDATE_STATUS } from '../types';

function createSocketChannel(socket, action) {
  return eventChannel((emit) => {
    socket.onopen = () => {
      console.log('action --->', action);
      emit({ type: SET_WS, payload: true });
    };

    socket.onerror = function (error) {
      emit({ type: SET_WS, payload: null });
    };

    socket.onmessage = function (event) {
      console.log('message --->>', JSON.parse(event.data));
      emit(JSON.parse(event.data));
    };

    socket.onclose = function (event) {
      emit({ type: SET_WS, payload: null });
    };

    return () => {
      console.log('Socket off');
      emit(END);
    };
  });
}

function createWebSocketConnection() {
  const newSocket = new WebSocket(process.env.REACT_APP_WSURL);
  console.log('Created WS:', newSocket);
  return newSocket;
}

function* updateStatus(socket) {
  while (true) {
    const message = yield take(UPDATE_STATUS);
    socket.send(JSON.stringify(message));
  }
}

function* closeConnection(socket) {
  const message = yield take('CLOSE_WEBSOCKET');
  // socket.send(JSON.stringify(message));
  socket.close();
  yield put({ type: SET_WS, payload: null });
}

function* friendsListWorker(action) {
  const socket = yield call(createWebSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket, action);

  yield fork(updateStatus, socket);
  yield fork(closeConnection, socket);

  while (true) {
    try {
      const backAction = yield take(socketChannel);
      yield put(backAction);
    } catch (err) {
      console.error('socket error:', err);
    }
  }
}

export default function* initWebSocketWatcher() {
  yield takeEvery(SOCKET_INIT, friendsListWorker);
}
