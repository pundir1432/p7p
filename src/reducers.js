import { combineReducers } from 'redux';
import authReducer from '../src/redux/Login/reducer';
import { countReducer, productReducer } from './redux/Product/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  count:countReducer
});

export default rootReducer;
