const getActionTypes = () => ({
  CHECK_AUTHORIZATION: "CHECK_AUTHORIZATION",
  CHECK_AUTHORIZATION_SUCCESS: "CHECK_AUTHORIZATION_SUCCESS",
  CHECK_AUTHORIZATION_FAIL: "CHECK_AUTHORIZATION_FAIL",

  USER_LOGIN: "USER_LOGIN",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",

  SOCIAL_LOGIN: "SOCIAL_LOGIN",
  SOCIAL_LOGIN_SUCCESS: "SOCIAL_LOGIN_SUCCESS",
  SOCIAL_LOGIN_FAIL: "SOCIAL_LOGIN_FAIL",

  USER_SIGNIN: "USER_SIGNIN",
  USER_SIGNIN_SUCCESS: "USER_SIGNIN_SUCCESS",
  USER_SIGNIN_FAIL: "USER_SIGNIN_FAIL",

  USER_LOGOUT: "USER_LOGOUT",
});

export default getActionTypes;
