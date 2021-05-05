const getActionTypes = () => ({
  CHECK_AUTHORIZATION: "CHECK_AUTHORIZATION",
  CHECK_AUTHORIZATION_SUCCESS: "CHECK_AUTHORIZATION_SUCCESS",
  CHECK_AUTHORIZATION_FAIL: "CHECK_AUTHORIZATION_FAIL",

  USER_LOGIN: "USER_LOGIN",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",

  USER_LOGOUT: "USER_LOGOUT",
  USER_LOGOUT_SUCCESS: "USER_LOGOUT",
  USER_LOGOUT_FAIL: "USER_LOGOUT",
});

export default getActionTypes;
