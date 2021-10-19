import { combineReducers } from 'redux';
import authReducer from './authReducer';
import chatReducer from './chatReducers';
import countReducer from './countReducer';
import eventCountReducer from './eventCountReducer';
import postCountReducer from './postCountReducer';
import themeReducer from './themeReducer';

const appReducer = combineReducers({
    auth: authReducer,
    theme: themeReducer,
    count: countReducer,
    chats: chatReducer,
    postCount: postCountReducer,
    eventCount: eventCountReducer,
});

export default appReducer;
