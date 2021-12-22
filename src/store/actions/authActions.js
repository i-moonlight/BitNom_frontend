export const login = (userdata, errors) => {
    return (dispatch) => {
        const setBusy = (busy) => {
            dispatch({ type: 'LOGIN_BUSY', busy });
        };

        setBusy(true);

        let err = null;
        dispatch({ type: 'USER_LOGIN_ERROR', err });

        const loginDate = new Date().getTime();

        const user = { ...userdata, loginDate };

        dispatch({ type: 'USER_LOGIN', user });
        setBusy(false);

        err = errors;
        errors && dispatch({ type: 'USER_LOGIN_ERROR', err });
    };
};

export const register = (userdata, errors) => {
    return (dispatch) => {
        const setBusy = (busy) => {
            dispatch({ type: 'REGISTER_BUSY', busy });
        };

        setBusy(true);

        let err = null;
        dispatch({ type: 'USER_LOGIN_ERROR', err });

        const user = userdata;
        dispatch({ type: 'USER_REGISTER', user });
        setBusy(false);

        err = errors;
        errors && dispatch({ type: 'USER_REGISTER_ERROR', err });
    };
};

export const verifySuccess = () => {
    return (dispatch) => {
        const setBusy = (busy) => {
            dispatch({ type: 'REGISTER_BUSY', busy });
        };

        setBusy(true);

        dispatch({ type: 'USER_VERIFY_SUCCESS' });
        setBusy(false);
    };
};

export const signout = () => {
    return (dispatch) => {
        // const [, , removeCookie] = useCookies(['connect.sid']);
        // removeCookie('connect.sid', {
        //   path: '/',
        //   domain: `${location.href}`,
        // });

        dispatch({ type: 'USER_LOGOUT' });
    };
};

export const checkSessionTimeOut = () => {
    return (dispatch, getState) => {
        const setBusy = (busy) => {
            dispatch({ type: 'LOGIN_BUSY', busy });
        };

        setBusy(true);

        const hours = 24;
        const now = new Date().getTime();

        const userData = getState().auth.user;

        if (!userData?.login_date) {
            return;
        }

        const loginDate = userData.login_date;
        const timeDiff = now - loginDate;

        if (timeDiff > hours * 60 * 60 * 1000) {
            dispatch({ type: 'USER_LOGOUT' });
            setBusy(false);
        }
    };
};

export const userUpdate = (userExt) => {
    const user = userExt;

    return (dispatch) => {
        user && dispatch({ type: 'USER_UPDATE', user });
    };
};
