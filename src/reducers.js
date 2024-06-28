import { combineReducers } from 'redux';
import authReducer from '../src/redux/Login/reducer';
import productReducer from './redux/Product/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer
});

export default rootReducer;
