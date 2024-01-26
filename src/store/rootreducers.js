// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './reducers/authReducers';


const rootReducer = combineReducers({
  auth: authReducer,
  // other reducers...
});

export default rootReducer;
