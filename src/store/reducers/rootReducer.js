import { combineReducers } from 'redux';
import authReducer from './authReducer';
import themeReducer from './themeReducer';

const appReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
});

export default appReducer;
