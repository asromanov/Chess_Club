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
      const friendsList = JSON.parse(JSON.stringify(state.friendsList));
      // eslint-disable-next-line no-restricted-syntax
      for (const friend of payload) {
        const index = friendsList.findIndex((el) => el.id === friend.id);
        if (index !== -1) friendsList[index].status = friend.status;
      }
      return { friendsOnline: payload, friendsList };
    }
    default:
      return state;
  }
};

export default playersReducer;
