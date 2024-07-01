import { call, put, takeLatest } from 'redux-saga/effects';
import { productApi } from './api';
import { productFailure, productLoading, productSuccess } from './action';

function* fetchProducts() {
  try {
    const data = yield call(productApi);
    yield put(productSuccess(data));
  } catch (error) {
    yield put(productFailure(error.message));
  }
}

function* productSaga() {
  yield takeLatest(productLoading, fetchProducts);
}

export default productSaga;
