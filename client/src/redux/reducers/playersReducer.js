import { SET_ONLINE_PLAYERS, SET_PLAYERS_LIST } from '../types';

const playersReducer = (
  state = { friendsList: [], friendsOnline: [] },
  action,
) => {
  const { type, payload } = action;
  switch (type) {
    case SET_PLAYERS_LIST:
      return { ...state, friendsList: payload };
    case SET_ONLINE_PLAYERS: {
      const friends = JSON.parse(JSON.stringify(state.friendsList));

      // eslint-disable-next-line no-restricted-syntax
      for (const player of payload) {
        const index = player.findIndex((el) => el.id === player.id);
        if (index !== -1) friends[index].status = player.status;
      }

      return { playersOnline: payload, playerList: payload };
    }
    default:
      return state;
  }
};

export default playersReducer;
