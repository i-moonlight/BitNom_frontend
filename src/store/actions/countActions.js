export const setCount = (count) => {
    return (dispatch) => {
        dispatch({ type: 'SET_COUNT', count });
    };
};

export const resetCount = () => {
    return (dispatch) => {
        dispatch({ type: 'RESET_COUNT' });
    };
};
