import axios from 'axios';
import { GAME_INIT, ACTIVE_MOVE } from '../types';

// Action creators
export const setGame = (payload) => ({ type: GAME_INIT, payload });
export const setMove = (payload) => ({ type: ACTIVE_MOVE, payload });
