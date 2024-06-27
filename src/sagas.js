import { all } from 'redux-saga/effects';
import watchAuthSaga from './redux/Login/saga';

export default function* rootSaga() {
  yield all([
    watchAuthSaga(),
  ]);
}
