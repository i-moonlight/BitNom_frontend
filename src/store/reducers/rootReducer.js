import { combineReducers } from "redux";
import authReducer from "./authReducer";
import themeReducer from "./themeReducer";
import countReducer from "./countReducer";
import chatReducer from "./chatReducers";

const appReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  count: countReducer,
  chats: chatReducer,
});

export default appReducer;
