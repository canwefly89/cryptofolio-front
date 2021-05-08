import Cookies from "universal-cookie";
import getActionTypes from "./actionTypes.js";

const cookies = new Cookies();

const checkAuthAction = () => async (dispatch) => {
  dispatch({ type: getActionTypes().CHECK_AUTHORIZATION });

  try {
    const token = cookies.get("jwt");

    if (!token || token === "undefined") {
      return dispatch({ type: getActionTypes().CHECK_AUTHORIZATION_UNAUTH });
    }

    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/auth/check_auth`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );

    const result = await response.json();

    if (result.message === "success") {
      return dispatch({
        type: getActionTypes().CHECK_AUTHORIZATION_SUCCESS,
        payload: result.data.user,
      });
    }

    if (result.message === "Unauthorized") {
      return dispatch({ type: getActionTypes().CHECK_AUTHORIZATION_UNAUTH });
    }
  } catch (err) {
    dispatch({ type: getActionTypes().CHECK_AUTHORIZATION_FAIL, payload: err });
  }
};

const loginAction = (data) => async (dispatch) => {
  dispatch({ type: getActionTypes().USER_LOGIN });

  try {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/sociallogin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    cookies.set("jwt", result.token);

    dispatch({
      type: getActionTypes().USER_LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    dispatch({ type: getActionTypes().USER_LOGIN_FAIL, payload: err });
  }
};

const socialLoginAction = (data) => async (dispatch) => {
  dispatch({ type: getActionTypes().SOCIAL_LOGIN });

  try {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/auth/social_login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    cookies.set("jwt", result.data.token);

    dispatch({
      type: getActionTypes().SOCIAL_LOGIN_SUCCESS,
      payload: result.data.user,
    });
  } catch (err) {
    dispatch({ type: getActionTypes().SOCIAL_LOGIN_FAIL, payload: err });
  }
};

const signinAction = (data) => async (dispatch) => {
  dispatch({ type: getActionTypes().USER_SIGNIN });

  try {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/auth/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    cookies.set("jwt", result.data.token);

    dispatch({
      type: getActionTypes().USER_SIGNIN_SUCCESS,
      payload: result.data.user,
    });
  } catch (err) {
    dispatch({ type: getActionTypes().USER_SIGNIN_FAIL, payload: err });
  }
};

const logoutAction = () => async (dispatch) => {
  cookies.remove("jwt");
  return {
    type: getActionTypes().user_LOGOUT,
  };
};

const authActionCreator = {
  checkAuthAction,
  loginAction,
  socialLoginAction,
  signinAction,
  logoutAction,
};

export default authActionCreator;
