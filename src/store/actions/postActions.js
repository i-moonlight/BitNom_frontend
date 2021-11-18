export const loadScrolls = (scrolls) => {
    return (dispatch) => {
        scrolls && dispatch({ type: 'LOAD_SCROLLS', scrolls });
    };
};

export const loadTrending = (trending) => {
    return (dispatch) => {
        trending && dispatch({ type: 'LOAD_TRENDING', trending });
    };
};
