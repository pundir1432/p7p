import { call, put, takeLatest } from 'redux-saga/effects';
import { productLoading, productSuccess, productFailure } from './action';
import { productApi } from './api';

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
