export const setUpdateUser = (userData) => {
    return (dispatch) => {
        dispatch({ type: 'USER_UPDATE', userData });
    };
};
