

import { PRODUCT_LOADING, PRODUCT_SUCCESS, PRODUCT_ERROR,INCREMENT_COUNT,REMOVE_FROM_CART,ADD_TO_CART } from './constaint';
const initialState = {
    data: [],
    loading: false,
    error: null,
  };

const initialStateCount = {
    count: 0,
  };
  const ADD_TO_CART_initialState = {
    items: [],
  };
 export const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case PRODUCT_LOADING:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case PRODUCT_SUCCESS:
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      case PRODUCT_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
        };
      default:
        return state;
    }
  };
  
 export const countReducer = (state = initialStateCount, action) => {
    switch (action.type) {
      case INCREMENT_COUNT:
        return {
          ...state,
          count: state.count + 1,
        };
      default:
        return state;
    }
  };
  export const cartReducer = (state = ADD_TO_CART_initialState, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      case REMOVE_FROM_CART:
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  
