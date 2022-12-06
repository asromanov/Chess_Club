import {
  take, put, call, takeEvery, race,
} from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import {
  USER_LOGGED_OUT,
  SET_WS, SOCKET_INIT,
} from '../types';

function createSocketChannel(socket, action) {
  return eventChannel((emit) => {
    socket.onopen = () => {
      console.log('action --->', action);
      emit({ type: SET_WS, payload: true });
    };

    socket.onerror = function (error) {
      console.log(error);
      emit({ type: SET_WS, payload: null });
    };

    socket.onmessage = function (event) {
      console.log('message --->>', JSON.parse(event.data));
      emit(JSON.parse(event.data));
    };

    socket.onclose = function (event) {
      console.log(event);
      emit({ type: SET_WS, payload: null });
    };

    return () => {
      console.log('Socket off');
      emit(END);
    };
  });
}

function createWebSocketConnection() {
  return new WebSocket(process.env.REACT_APP_WSURL);
}

function* friendsListWorker(action) {
  const socket = yield call(createWebSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket, action);
  while (true) {
    try {
      const { logoutAction, socketAction } = yield race({
        logoutAction: take(USER_LOGGED_OUT),
        socketAction: take(socketChannel),
      });

      if (logoutAction) {
        socket.close();
      } else {
        yield put(socketAction);
      }
    } catch (err) {
      console.error('socket error:', err);
    }
  }
}

export default function* initWebSocketWatcher() {
  yield takeEvery(SOCKET_INIT, friendsListWorker);
}
