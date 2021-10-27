export const loadScrolls = (data) => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_SCROLLS', data });
    };
};

export const loadTrending = (data) => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_TRENDING', data });
    };
};
