const { WebSocketServer } = require('ws');
// const { User } = require('../db/models');

const wss = new WebSocketServer({ clientTracking: false, noServer: true });

wss.on('connection', (ws, request, wsMap) => {
  const { id } = request.session.user;
  wsMap.set(id, {
    ws,
    user: request.session.user,
    status: 'online', // ? gameover, in-game, mathcmaking, searching
    room: null,
    board: null,
    opponent: null,
  }); // id -> ws

  for (const [, wsClient] of wsMap) {
    wsClient.ws.send(
      JSON.stringify({
        type: 'SET_ONLINE_PLAYERS',
        payload: Array.from(wsMap.values()).map((el) => el.user),
      }),
    );
  }

  ws.on('message', async (data) => {
    const { type, payload } = JSON.parse(data);

    switch (type) {
      case 'SEND_INVITE':
      {
        const secPlayer = wsMap[payload];
        const firPlayer = id;
        secPlayer.ws.send(
          JSON.stringify({
            type: 'SHOW_INVITE',
            payload: firPlayer,
          }),
        );
      }
      case 'SHOW_INVITE': {
        const opponentId = wsMap[payload];
        opponentId.ws.send(
          JSON.stringify({
            type: 'ACCEPT_INVITE',
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
        firstPlayer.ws.send(
          JSON.stringify({
            type: 'GAME_INIT',
          }),
        );
      }
      case 'GAME_INIT': {
        const { brd, id1, id2 } = { ...wsMap[payload] };
        id1.board = brd;
        id2.board = brd;
        id1.ws.send(
          JSON.stringify({
            type: 'MOVE_MADE',
            payload: brd,
          }),
        );
        id2.ws.send(
          JSON.stringify({
            type: 'MOVE_MADE',
            payload: brd,
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
          type: 'SET_ONLINE_PLAYERS',
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
          type: 'SET_ONLINE_PLAYERS',
          payload: Array.from(wsMap.values()).map((el) => el.user),
        }),
      );
    }
  });
});

// ws.on('');
module.exports = wss;
