export const loadScrolls = (scrolls) => {
    return (dispatch) => {
        scrolls && dispatch({ type: 'LOAD_SCROLLS', scrolls });
    };
};

export const loadFeed = (feed) => {
    return (dispatch) => {
        feed && dispatch({ type: 'LOAD_FEED', feed });
    };
};

export const loadTrending = (trending) => {
    return (dispatch) => {
        trending && dispatch({ type: 'LOAD_TRENDING', trending });
    };
};

export const loadUsers = (users) => {
    return (dispatch) => {
        users && dispatch({ type: 'LOAD_USERS', users });
    };
};

export const loadComments = (comments, scrollId) => {
    const commentsData = { comments, scrollId };

    return (dispatch) => {
        comments && dispatch({ type: 'LOAD_COMMENTS', commentsData });
    };
};
