import getActionTypes from "../actions/actionTypes";
import _ from "lodash";

const initialState = {
  metadata: null,
  coinData: null,
  error: null,
};

const coinReducer = (state = initialState, action) => {
  const ACTION_TYPES = getActionTypes();
  const copiedState = _.cloneDeep(state);

  switch (action.type) {
    case ACTION_TYPES.GET_HOME:
      return copiedState;

    case ACTION_TYPES.GET_HOME_SUCCESS:
      copiedState.metadata = action.payload.metadata;
      copiedState.coinData = action.payload.coinData;
      return copiedState;

    case ACTION_TYPES.GET_HOME_FAIL:
      copiedState.error = action.payload;
      return copiedState;

    default:
      return copiedState;
  }
};

export default coinReducer;
