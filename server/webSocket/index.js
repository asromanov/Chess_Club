const { WebSocketServer } = require('ws');
// const { User } = require('../db/models');

const wss = new WebSocketServer({ clientTracking: false, noServer: true });

wss.on('connection', (ws, request, wsMap) => {
  const { id } = request.session.user;
  wsMap.set(id, { ws, user: request.session.user }); // id -> ws

  for (const [, wsClient] of wsMap) {
    wsClient.ws.send(
      JSON.stringify({
        type: 'SET_ONLINE_USERS',
        payload: Array.from(wsMap.values()).map((el) => el.user),
      }),
    );
  }

  ws.on('message', async (data) => {
    const { type, payload } = JSON.parse(data);

    switch (type) {
      case 'UPDATE_STATUS':
        {
          const user = await User.findByPk(id);
          user.status = payload;
          await user.save();

          wsMap.set(id, { ws, user });
          for (const [, wsClient] of wsMap) {
            wsClient.ws.send(
              JSON.stringify({
                type: 'SET_ONLINE_USERS',
                payload: Array.from(wsMap.values()).map((el) => el.user),
              }),
            );
          }
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
          type: 'SET_ONLINE_USERS',
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
