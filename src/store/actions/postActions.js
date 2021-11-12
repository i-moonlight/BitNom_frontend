export const loadScrolls = (scrolls) => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_SCROLLS', scrolls });
    };
};

export const loadTrending = (trending) => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_TRENDING', trending });
    };
};
