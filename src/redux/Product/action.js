import { PRODUCT_LOADING, PRODUCT_SUCCESS, PRODUCT_ERROR, ADD_TO_CART, REMOVE_FROM_CART} from './constaint';

export const addToCart = (data) => ({
  type: "ADD_TO_CART",
  payload: data,
});

export const removeFromCart = (dataId) => ({
  type: "REMOVE_FROM_CART",
  payload: dataId,
});
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
