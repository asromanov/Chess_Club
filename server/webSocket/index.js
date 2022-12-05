const { WebSocketServer } = require('ws');
// const { User } = require('../db/models');

const wss = new WebSocketServer({ clientTracking: false, noServer: true });

wss.on('connection', (ws, request, wsMap) => {
  const { id } = request.session.user;
  wsMap.set(id, {
    ws,
    user: request.session.user,
    // status: 'online', // ? gameover, in-game, mathcmaking, searching
    // room: null,
    // board: null,
    // opponent: null,
  }); // id -> ws

  for (const [, wsClient] of wsMap) {
    wsClient.ws.send(
      JSON.stringify({
        type: 'SET_ONLINE_FRIENDS',
        payload: Array.from(wsMap.values()).map((el) => el.user),
      }),
    );
  }

  ws.on('message', async (resData) => {
    const { type, payload } = JSON.parse(resData);

    switch (type) {
      case 'SEND_INVITE':
      {
        const secPlayer = wsMap[payload];
        const firPlayer = wsMap[id];
        secPlayer.ws.send(
          JSON.stringify({
            type: 'SHOW_INVITE',
            payload: firPlayer,
          }),
        );
      }
      case 'INVITE_DECLINED': {
        const opponentId = wsMap[payload];
        opponentId.ws.send(
          JSON.stringify({
            type: 'INVITE_DECLINED',
            payload: opponentId,
          }),
        );
      }
      case 'ACCEPT_INVITE': {
        const firstPlayer = wsMap[payload];
        const secondPlayer = wsMap[id];
        firstPlayer.opponent = secondPlayer;
        secondPlayer.opponent = firstPlayer;
        firstPlayer.room = firstPlayer.id;
        secondPlayer.room = firstPlayer.id;
        const gameData = { firstPlayer, secondPlayer, board: {} };
        firstPlayer.ws.send(
          JSON.stringify({
            type: 'GAME_INIT',
            payload: gameData,
          }),
        );
        secondPlayer.ws.send(
          JSON.stringify({
            type: 'GAME_INIT',
            payload: gameData,
          }),
        );
      }
      case 'MOVE_MADE': {
        const playerMoved = wsMap[payload.playerId];
        const otherPlayer = playerMoved.opponent;
        // id1.board = brd;
        // id2.board = brd;
        otherPlayer.ws.send(
          JSON.stringify({
            type: 'MAKE_MOVE',
            payload,
          }),
        );
      }
        break;
      default:
        break;
    }
  });

  ws.on('error', () => {
    wsMap.delete(id);
    for (const [, wsClient] of wsMap) {
      wsClient.ws.send(
        JSON.stringify({
          type: 'SET_ONLINE_FRIENDS',
          payload: Array.from(wsMap.values()).map((el) => el.user),
        }),
      );
    }
  });

  ws.on('close', () => {
    wsMap.delete(id);
    for (const [, wsClient] of wsMap) {
      wsClient.ws.send(
        JSON.stringify({
          type: 'SET_ONLINE_FRIENDS',
          payload: Array.from(wsMap.values()).map((el) => el.user),
        }),
      );
    }
  });
});

module.exports = wss;
