import { combineReducers } from 'redux';
import authReducer from './authReducer';
import chatReducer from './chatReducers';
import countReducer from './countReducer';
import eventCountReducer from './eventCountReducer';
import userUpdateReducer from './userUpdateReducer';
import postCountReducer from './postCountReducer';
import postReducer from './postReducer';
import themeReducer from './themeReducer';

const appReducer = combineReducers({
    posts: postReducer,
    auth: authReducer,
    theme: themeReducer,
    count: countReducer,
    chats: chatReducer,
    postCount: postCountReducer,
    eventCount: eventCountReducer,
    user: userUpdateReducer,
});

export default appReducer;
