const getActionTypes = () => ({
  CHECK_AUTHORIZATION: "CHECK_AUTHORIZATION",
  CHECK_AUTHORIZATION_SUCCESS: "CHECK_AUTHORIZATION_SUCCESS",
  CHECK_AUTHORIZATION_UNAUTH: "CHECK_AUTHORIZATION_UNAUTH",
  CHECK_AUTHORIZATION_FAIL: "CHECK_AUTHORIZATION_FAIL",

  USER_LOGIN: "USER_LOGIN",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",

  SOCIAL_LOGIN: "SOCIAL_LOGIN",
  SOCIAL_LOGIN_SUCCESS: "SOCIAL_LOGIN_SUCCESS",
  SOCIAL_LOGIN_FAIL: "SOCIAL_LOGIN_FAIL",

  USER_SIGNUP: "USER_SIGNUP",
  USER_SIGNUP_SUCCESS: "USER_SIGNUP_SUCCESS",
  USER_SIGNUP_FAIL: "USER_SIGNUP_FAIL",

  USER_LOGOUT: "USER_LOGOUT",
  RESET_ERROR_MESSAGE: "RESET_ERROR_MESSAGE",

  GET_HOME: "GET_HOME",
  GET_HOME_SUCCESS: "GET_HOME_SUCCESS",
  GET_HOME_FAIL: "GET_HOME_FAIL",

  GET_COINDATA: "GET_COINDATA",
  GET_COINDATA_SUCCESS: "GET_COINDATA_SUCCESS",
  GET_COINDATA_FAIL: "GET_COINDATA_FAIL",

  GET_CRYPTOFOLIOS: "GET_CRYPTOFOLIOS",
  GET_CRYPTOFOLIOS_SUCCESS: "GET_CRYPTOFOLIOS_SUCCESS",
  GET_CRYPTOFOLIOS_FAIL: "GET_CRYPTOFOLIOS_FAIL",

  CREATE_CRYPTOFOLIO: "CREATE_CRYPTOFOLIO",
  CREATE_CRYPTOFOLIO_SUCCESS: "CREATE_CRYPTOFOLIO_SUCCESS",
  CREATE_CRYPTOFOLIO_FAIL: "CREATE_CRYPTOFOLIO_FAIL",

  DELETE_CRYPTOFOLIO: "DELETE_CRYPTOFOLIO",
  DELETE_CRYPTOFOLIO_SUCCESS: "DELETE_CRYPTOFOLIO_SUCCESS",
  DELETE_CRYPTOFOLIO_FAIL: "DELETE_CRYPTOFOLIO_FAIL",

  UPDATE_METADATA: "UPDATE_METADATA",
  UPDATE_METADATA_SUCCESS: "UPDATE_METADATA_SUCCESS",
  UPDATE_METADATA_FAIL: "UPDATE_METADATA_FAIL",

  UPDATE_PRICE: "UPDATE_PRICE",
  UPDATE_PRICE_SUCCESS: "UPDATE_PRICE_SUCCESS",
  UPDATE_PRICE_FAIL: "UPDATE_PRICE_FAIL",
});

export default getActionTypes;
