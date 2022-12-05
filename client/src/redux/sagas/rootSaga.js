import { all } from 'redux-saga/effects';
import friendsWatcher from './friendsWatcherSaga';

export default function* rootSaga() {
  yield all([friendsWatcher()]);
}
