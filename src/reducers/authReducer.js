import getActionTypes from "../actions/actionTypes";
import _ from "lodash";

const initialState = {};

const authReducer = (state = initialState, action) => {
  const ACTION_TYPES = getActionTypes();
  const copiedState = _.cloneDeep(state);

  switch (action.type) {
    case ACTION_TYPES.CHECK_AUTHORIZATION:
    case ACTION_TYPES.PLAYER_LOGIN:
    case ACTION_TYPES.PLAYER_LOGOUT:
      return copiedState;

    case ACTION_TYPES.CHECK_AUTHORIZATION_SUCCESS:
    case ACTION_TYPES.PLAYER_LOGIN_SUCCESS:
    case ACTION_TYPES.PLAYER_LOGOUT_SUCCESS:
      return copiedState;

    case ACTION_TYPES.CHECK_AUTHORIZATION_FAIL:
    case ACTION_TYPES.PLAYER_LOGIN_FAIL:
    case ACTION_TYPES.PATCH_RESULT_FAIL:
    case ACTION_TYPES.UNAUTH_MODE_FAIL:
      copiedState.isAuthorized = false;
      return copiedState;

    default:
      return copiedState;
  }
};

export default authReducer;
