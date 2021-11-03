export const addChatDialogues = (data = []) => {
    if (data) {
        return (dispatch) => dispatch({ data, type: 'ADD_CHAT_DIALOGUES' });
    }
};
export const setCurrentChat = (chat) => {
    return (dispatch) => dispatch({ chat, type: 'SET_CURRENT_CHAT' });
};
export const clearCurrentChat = () => {
    return (dispatch) => dispatch({ type: 'RESET_CURRENT_CHAT' });
};
export const setChatInvites = (data = []) => {
    return (dispatch) => dispatch({ data, type: 'SET_CHAT_INVITES' });
};
export const setDialogueMessages = (data = []) => {
    return (dispatch) => dispatch({ data, type: 'SET_CHAT_MESSAGES' });
};
export const addMessagesToCurrentChat = (data) => {
    return (dispatch) =>
        dispatch({ data, type: 'ADD_MESSAGES_TO_CURRENT_CHAT' });
};
export const addToInvites = (data) => {
    return (dispatch) => dispatch({ data, type: 'ADD_CHAT_TO_INVITES' });
};
export const addToChatDialogues = (data) => {
    return (dispatch) => dispatch({ data, type: 'ADD_CHAT_TO_DIALOGUES' });
};
export const removeFromInvites = (data) => {
    return (dispatch) => dispatch({ data, type: 'REMOVE_FROM_INVITES' });
};
export const addArchivedChats = (data) => {
    return (dispatch) => dispatch({ data, type: 'ADD_TO_ARCHIVED' });
};
export const setArchivedChats = (data = []) => {
    return (dispatch) => dispatch({ data, type: 'SET_ARCHIVED_CHATS' });
};
export const setSearchOutput = (data = []) => {
    return (dispatch) => dispatch({ data, type: 'SET_SEARCH_OUTPUT' });
};
export const clearSearchOutput = () => {
    return (dispatch) => dispatch({ type: 'CLEAR_SEARCH_OUTPUT' });
};
export const chatIndexShift = (data) => {
    return (dispatch) => dispatch({ data, type: 'LATEST_MESSAGE_CHAT_SHIFT' });
};
export const removeFromMessages = (data) => {
    return (dispatch) => dispatch({ data, type: 'REMOVE_FROM_MESSAGES' });
};
export const addPinnedMessage = (data = []) => {
    return (dispatch) => dispatch({ data, type: 'ADD_PINNED_MESSAGES' });
};
export const addToPinnedMessage = (data) => {
    return (dispatch) =>
        dispatch({ data, type: 'ADD_MESSAGE_TO_PINNED_MESSAGES' });
};
export const deletePinnedMessage = (data) => {
    return (dispatch) => dispatch({ data, type: 'DELETE_PINNED_MESSAGE' });
};
export const clearPinnedMessage = () => {
    return (dispatch) => dispatch({ type: 'CLEAR_PINNED_MESSAGES' });
};
export const addPinnedChat = (data = []) => {
    return (dispatch) => dispatch({ data, type: 'PIN_CHAT' });
};
