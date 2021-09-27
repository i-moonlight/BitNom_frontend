export const addChatDialogues = (data) => {
  return (dispatch) => {
    dispatch({ type: "ADD_CHAT_DIALOGUES", data });
  };
};
export const setCurrentChat = (data) => {
  return (dispatch) => {
    dispatch({ type: "SET_CURRENT_CHAT", data });
  };
};
