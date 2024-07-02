// action.js
import {
  PRODUCT_LOADING,
  PRODUCT_SUCCESS,
  PRODUCT_ERROR,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_COUNT,
  SELECT_CATEGORY
} from './constaint';

export const fetchProductData = () => ({
  type: PRODUCT_LOADING,
});

export const productDataData = (data) => ({
  type: PRODUCT_SUCCESS,
  payload: data,
});

export const productError = (error) => ({
  type: PRODUCT_ERROR,
  payload: { error },
});

export const addToCart = (data) => ({
  type: ADD_TO_CART,
  payload: data,
});

export const removeFromCart = (dataId) => ({
  type: REMOVE_FROM_CART,
  payload: dataId,
});

export const incrementCount = () => ({
  type: INCREMENT_COUNT,
});

export const selectCategory = (category) => ({
  type: SELECT_CATEGORY,
  payload: category,
});
