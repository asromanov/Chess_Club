import {
  take, put, call, takeEvery, fork,
} from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import {
   SET_WS, SOCKET_INIT
} from '../types';
import closeConnection from '../sagasFunctions/authFunctions';
import { acceptInvite, gameConnection, gameOver, moveGame, sendInvite, showInvite } from '../sagasFunctions/gameFunctions';

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

const closeConnection = closeConnection()
const gameConnection = gameConnection()
const moveGame = moveGame()
const sendInvite = sendInvite()
const showInvite = showInvite()
const acceptInvite = acceptInvite()
const gameOver = gameOver()


function* playersListWorker(action) {
  const socket = yield call(createWebSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket, action);


  yield fork(closeConnection, socket);
  yield fork(gameConnection, socket);
  yield fork(moveGame, socket);
  yield fork(sendInvite, socket);
  yield fork(showInvite, socket);
  yield fork(acceptInvite,socket)
  yield fork(gameOver, socket)

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
