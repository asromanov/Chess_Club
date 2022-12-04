import { SET_AUTH_PAGES, SET_PUBLIC_PAGES } from '../types';

const publicPages = [
  { title: 'Home', link: '/' },
  { title: 'Login', link: '/login' },
  { title: 'Signup', link: '/signup' },
];
const authPages = [
  { title: 'Home', link: '/' },
  { title: 'Friends', link: '/friends' },
];

export default function pagesReducer(state = publicPages, action) {
  const { type } = action;
  switch (type) {
    case SET_PUBLIC_PAGES:
      return publicPages;
    case SET_AUTH_PAGES:
      return authPages;
    default:
      return state;
  }
}
