// reducer.js
import {
  PRODUCT_LOADING,
  PRODUCT_SUCCESS,
  PRODUCT_ERROR,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_COUNT,
  SELECT_CATEGORY
} from './constaint';

const initialState = {
  data: [],
  filteredData: [],
  selectedCategory: 'All',
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
        filteredData: action.payload,
        loading: false,
        error: null,
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SELECT_CATEGORY:
      const filteredData = action.payload === 'All'
        ? state.data
        : state.data.filter(product => product.category === action.payload);
      return {
        ...state,
        selectedCategory: action.payload,
        filteredData,
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
        items: state.items.filter(item => item._id !== action.payload),
      };
    default:
      return state;
  }
};
