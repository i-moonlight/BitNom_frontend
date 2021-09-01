export const login = (userdata, errors) => {
  return dispatch => {
    const setBusy = busy => {
      dispatch({ type: 'LOGIN_BUSY', busy });
    };

    setBusy(true);

    let err = null;
    dispatch({ type: 'USER_LOGIN_ERROR', err });

    const login_date = new Date().getTime();

    let user = { ...userdata, login_date };

    dispatch({ type: 'USER_LOGIN', user });
    setBusy(false);

    err = errors;
    errors && dispatch({ type: 'USER_LOGIN_ERROR', err });
  };
};

export const register = (userdata, errors) => {
  return dispatch => {
    const setBusy = busy => {
      dispatch({ type: 'REGISTER_BUSY', busy });
    };

    setBusy(true);

    let err = null;
    dispatch({ type: 'USER_LOGIN_ERROR', err });

    let user = userdata;
    dispatch({ type: 'USER_REGISTER', user });
    setBusy(false);

    err = errors;
    errors && dispatch({ type: 'USER_REGISTER_ERROR', err });
  };
};

export const signout = () => {
  return dispatch => {
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
    const setBusy = busy => {
      dispatch({ type: 'LOGIN_BUSY', busy });
    };

    setBusy(true);

    let hours = 24;
    let now = new Date().getTime();

    let userData = getState().auth.user;

    if (!userData.login_date) {
      return;
    }

    let login_date = userData.login_date;
    let time_diff = now - login_date;

    if (time_diff > hours * 60 * 60 * 1000) {
      dispatch({ type: 'USER_LOGOUT' });
      setBusy(false);
    }
  };
};
