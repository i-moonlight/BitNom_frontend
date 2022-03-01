//chat Dialogues:chat dialogue actions
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

export const addToInvites = (data) => {
    return (dispatch) => dispatch({ data, type: 'ADD_CHAT_TO_INVITES' });
};

export const removeFromInvites = (data) => {
    return (dispatch) => dispatch({ data, type: 'REMOVE_FROM_INVITES' });
};

export const updateDialogue = (data) => {
    return (dispatch) => dispatch({ data, type: 'UPDATE_DIALOGUE' });
};

export const addToChatDialogues = (data) => {
    return (dispatch) => dispatch({ data, type: 'ADD_CHAT_TO_DIALOGUES' });
};

//chat message actions
export const setDialogueMessages = (data = []) => {
    return (dispatch) => dispatch({ data, type: 'SET_CHAT_MESSAGES' });
};

export const addMessagesToCurrentChat = (data) => {
    return (dispatch) =>
        dispatch({ data, type: 'ADD_MESSAGES_TO_CURRENT_CHAT' });
};

export const updateMessage = (data) => {
    return (dispatch) => dispatch({ data, type: 'UPDATE_MESSAGE' });
};

export const setSearchOutput = (data) => {
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

//pinned chats::chat actions to manipulate state around pinned messages
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

//pinned chats:: chat pinned actions
export const addPinnedChat = (data = []) => {
    return (dispatch) => dispatch({ data, type: 'PIN_CHAT' });
};

export const addToPinnedChats = (data) => {
    return (dispatch) => dispatch({ data, type: 'ADD_TO_PINNED_CHATS' });
};

export const deletePinnedChat = (data) => {
    return (dispatch) => dispatch({ data, type: 'DELETE_PINNED_CHAT' });
};

export const clearPinnedChats = () => {
    return (dispatch) => dispatch({ type: 'CLEAR_PINNED_CHATs' });
};

//archived Chats::archived chats actions
export const setArchivedChats = (data = []) => {
    return (dispatch) => dispatch({ data, type: 'SET_ARCHIVED_CHATS' });
};

export const addToArchivedChats = (data) => {
    return (dispatch) => dispatch({ data, type: 'ADD_TO_ARCHIVED' });
};

export const deleteArchivedchat = (data) => {
    return (dispatch) => dispatch({ data, type: 'DELETE_ARCHIVED_CHAT' });
};

//total count
export const setTotalCount = (data) => {
    return (dispatch) => dispatch({ data, type: 'SET_TOTAL_COUNT' });
};

export const resetTotalCount = () => {
    return (dispatch) => dispatch({ type: 'RESET_TOTAL_COUNT' });
};

//chat searches
export const setChatSearchInput = (data = []) => {
    return (dispatch) => dispatch({ data, type: 'SET_CHAT_SRCH_DATA' });
};

export const clearSearchChatData = () => {
    return (dispatch) => dispatch({ type: 'CLEAR_CHAT_SRCH_DATA' });
};

export const clearAllChatData = () => {
    return (dispatch) => dispatch({ type: 'CLEAR_ALL_CHAT_DATA' });
};
