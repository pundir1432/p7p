import { combineReducers } from 'redux';
import authReducer from '../src/redux/Login/reducer';
import {productReducer,cartReducer} from './redux/Product/reducer';


const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart:cartReducer,

});

export default rootReducer;
