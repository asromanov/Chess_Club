import { take } from 'redux-saga/effects';
import {
  MOVE_MADE, GAME_INIT, SEND_INVITE, SHOW_INVITE, ACCEPT_INVITE, GAME_OVER,
} from '../types';

function* moveGame(socket) {
  const message = yield take(MOVE_MADE);
  socket.send(JSON.stringify(message));
}
function* sendInvite(socket) {
  const message = yield take(SEND_INVITE);
  socket.send(JSON.stringify(message));
}
function* showInvite(socket) {
  const message = yield take(SHOW_INVITE);
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
export {
  moveGame, sendInvite, showInvite, acceptInvite, gameOver,
};
