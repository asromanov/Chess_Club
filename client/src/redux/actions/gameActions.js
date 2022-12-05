import {
  ACCEPT_INVITE, GAME_INIT, MOVE_MADE, SEND_INVITE, SHOW_INVITE,
} from '../types';

// Action creators
// export const setStartGame = (id1, id2, board) => ({
//   type: GAME_INIT, payload: { id1, id2, board },
// });
export const setMove = (actualBoard) => ({ type: MOVE_MADE, payload: actualBoard });
export const setSendInvite = (idSecondPlayer) => ({ type: SEND_INVITE, payload: idSecondPlayer });
export const setShowInvite = (idFirstPlayer) => ({ type: SHOW_INVITE, payload: idFirstPlayer });
export const setAcceptInvite = (idFirstPlayer) => ({ type: ACCEPT_INVITE, payload: idFirstPlayer });
export const setGameOver = (statusGameOver) => ({ type: MOVE_MADE, payload: statusGameOver });
dispatch(setStartGame());
