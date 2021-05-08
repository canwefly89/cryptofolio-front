import Cookies from "universal-cookie";
import getActionTypes from "./actionTypes.js";

const checkAuthorization = () => async (dispatch) => {
  dispatch({ type: getActionTypes().CHECK_AUTHORIZATION });

  try {
    const cookies = new Cookies();
    const token = cookies.get("jwt");

    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/check_auth`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );

    const result = await response.json();

    if (result.message === "Authorization Success") {
      dispatch({
        type: getActionTypes().CHECK_AUTHORIZATION_SUCCESS,
        payload: result.data,
      });
    } else {
      dispatch({ type: getActionTypes().CHECK_AUTHORIZATION_FAIL });
    }
  } catch (err) {
    dispatch({ type: getActionTypes().CHECK_AUTHORIZATION_FAIL, payload: err });
  }
};

const userLogin = (data) => async (dispatch) => {
  dispatch({ type: getActionTypes().user_LOGIN });

  try {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    const cookies = new Cookies();

    cookies.set("jwt", result.token);

    dispatch({
      type: getActionTypes().user_LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    dispatch({ type: getActionTypes().user_LOGIN_FAIL, payload: err });
  }
};

const userSignin = () => {};

const userLogout = () => {
  const cookies = new Cookies();

  cookies.remove("jwt");

  return {
    type: getActionTypes().user_LOGOUT,
  };
};

const authActionCreator = {
  checkAuthorization,
  userSignin,
  userLogin,
  userLogout,
};

export default authActionCreator;
