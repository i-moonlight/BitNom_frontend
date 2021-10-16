import { combineReducers } from 'redux';
import authReducer from './authReducer';
import themeReducer from './themeReducer';
import countReducer from './countReducer';
import chatReducer from './chatReducers';
import postCountReducer from './postCountReducer';
import eventCountReducer from './eventCountReducer';

const appReducer = combineReducers({
    auth: authReducer,
    theme: themeReducer,
    count: countReducer,
    chats: chatReducer,
    postCount: postCountReducer,
    eventCount: eventCountReducer,
});

export default appReducer;
