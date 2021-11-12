export const setPostCount = (postCount) => {
    return (dispatch) => {
        dispatch({ type: 'SET_POST_COUNT', postCount });
    };
};
