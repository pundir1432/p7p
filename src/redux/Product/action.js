import { PRODUCT_LOADING, PRODUCT_SUCCESS, PRODUCT_ERROR } from './constaint';

export const productLoading = () => ({
  type: PRODUCT_LOADING,
});

export const productSuccess = (data) => ({
  type: PRODUCT_SUCCESS,
  payload: data,
});

export const productFailure = (error) => ({
  type: PRODUCT_ERROR,
  payload: { error },
});
