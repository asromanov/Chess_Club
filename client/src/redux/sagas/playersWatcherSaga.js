import {
  take, put, call, takeEvery, fork,
} from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import {
  ACCEPT_INVITE,
  GAME_OVER,
  MOVE_MADE,
  SEND_INVITE,
  SET_WS, SOCKET_INIT,
} from '../types';
// import closeConnection from '../sagasFunctions/authFunctions';

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
  const newSocket = new WebSocket(process.env.REACT_APP_WSURL);
  console.log('Created WS:', newSocket);
  return newSocket;
}
function* moveGame(socket) {
  const message = yield take(MOVE_MADE);
  socket.send(JSON.stringify(message));
}
function* sendInvite(socket) {
  const message = yield take(SEND_INVITE);
  socket.send(JSON.stringify(message));
}
function* acceptInvite(socket) {
  const message = yield take(ACCEPT_INVITE);
  socket.send(JSON.stringify(message));
}
function* gameOver(socket) {
  const message = yield take(GAME_OVER);
  socket.send(JSON.stringify(message));
}
function* closeConnection(socket) {
  socket.close();
  yield put({ type: SET_WS, payload: null });
}

function* playersListWorker(action) {
  const socket = yield call(createWebSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket, action);

  yield fork(closeConnection, socket);
  yield fork(moveGame, socket);
  yield fork(sendInvite, socket);
  yield fork(acceptInvite, socket);
  yield fork(gameOver, socket);

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
  yield takeEvery(SOCKET_INIT, playersListWorker);
}
