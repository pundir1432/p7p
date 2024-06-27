import { combineReducers } from 'redux';
import authReducer from '../src/redux/Login/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
