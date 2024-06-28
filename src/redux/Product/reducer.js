import { PRODUCT_LOADING, PRODUCT_SUCCESS, PRODUCT_ERROR, ADD_TO_CART, REMOVE_FROM_CART } from './constaint';

const initialState = {
  data: [],
  loading: false,
  error: null,
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
        data: action.payload.map(product => ({ ...product, liked: false })),
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


