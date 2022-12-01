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
      for (const friend of payload) {
        const index = friends.findIndex((el) => el.id === friend.id);
        if (index !== -1) friends[index].status = friend.status;
      }

      return { friendsOnline: payload, friendsList: payload };
    }
    default:
      return state;
  }
};

export default playersReducer;
