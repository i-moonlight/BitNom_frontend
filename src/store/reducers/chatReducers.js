const initialState = {
  chats: [],
  current_chat_id: "",
  invites: [],
};
export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_CHAT_DIALOGUES":
      return { ...state, chats: action.chats };
    case "SET_CURRENT_CHAT":
      return { ...state, current_chat_id: action.current_chat_id };
    default:
      return { ...state };
  }
}
