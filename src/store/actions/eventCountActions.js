export const setEventCount = (eventCount) => {
    return (dispatch) => {
        dispatch({ type: 'SET_EVENT_COUNT', eventCount });
    };
};
