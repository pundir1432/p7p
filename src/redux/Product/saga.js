import { call, put, takeLatest } from 'redux-saga/effects';
import { productApi } from './api';
import { productDataData, productError } from './action';
import { PRODUCT_LOADING } from './constaint';

function* fetchProducts() {
  try {
    const data = yield call(productApi);
    yield put(productDataData(data));
  } catch (error) {
    yield put(productError(error.message));
  }
}

function* productSaga() {
  yield takeLatest(PRODUCT_LOADING, fetchProducts);
}

export default productSaga;
