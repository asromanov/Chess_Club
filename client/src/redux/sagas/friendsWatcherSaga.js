import {
  take, put, call, takeEvery, race, fork,
} from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import {
  USER_LOGGED_OUT,
  SET_WS, SOCKET_INIT, MOVE_MADE,
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

function* moveGame(socket) {
  while (true) {
    const message = yield take(MOVE_MADE);
    console.log(JSON.stringify(message), 'move game');
    socket.send(JSON.stringify(message));
  }
}

// function* sendInvite(socket) {
//   const message = yield take(SEND_INVITE);
//   socket.send(JSON.stringify(message));
// }
// function* acceptInvite(socket) {
//   const message = yield take(ACCEPT_INVITE);
//   socket.send(JSON.stringify(message));
// }
// function* gameOver(socket) {
//   const message = yield take(GAME_OVER);
//   socket.send(JSON.stringify(message));
// }
// function* closeConnection(socket) {
//   const message = yield take('CLOSE_WEBSOCKET');
//   console.log(message);
//   // socket.send(JSON.stringify(message));
//   socket.close();
//   yield put({ type: SET_WS, payload: null });
// }

function* friendsListWorker(action) {
  const socket = yield call(createWebSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket, action);

  yield fork(moveGame, socket);

  // yield fork(closeConnection, socket);
  // yield fork(sendInvite, socket);
  // yield fork(acceptInvite, socket);
  // yield fork(gameOver, socket);

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
