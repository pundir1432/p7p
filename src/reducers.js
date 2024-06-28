import { combineReducers } from 'redux';
import authReducer from '../src/redux/Login/reducer';
import { countReducer, productReducer,cartReducer } from './redux/Product/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart:cartReducer,

  count:countReducer
});

export default rootReducer;
