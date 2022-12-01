import { all } from 'redux-saga/effects';
import initWebSocketWatcher from './playersWatcherSaga';

export default function* rootSaga() {
  yield all([initWebSocketWatcher()]);
}
