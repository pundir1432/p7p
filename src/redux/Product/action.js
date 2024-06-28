import { PRODUCT_LOADING, PRODUCT_SUCCESS, PRODUCT_ERROR,INCREMENT_COUNT } from './constaint';

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
export const incrementCount = () => ({
    type: INCREMENT_COUNT,
  });
