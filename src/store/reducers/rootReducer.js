import { combineReducers } from 'redux';
import authReducer from './authReducer';
import themeReducer from './themeReducer';
import countReducer from './countReducer';

const appReducer = combineReducers({
    auth: authReducer,
    theme: themeReducer,
    count: countReducer,
});

export default appReducer;
