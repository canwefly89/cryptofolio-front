import getActionTypes from "../actions/actionTypes";
import _ from "lodash";

const initialState = {
  metadata: null,
  coinData: null,
  isLoading: false,
  error: null,
};

const coinReducer = (state = initialState, action) => {
  const ACTION_TYPES = getActionTypes();
  const copiedState = _.cloneDeep(state);

  switch (action.type) {
    case ACTION_TYPES.GET_HOME:
    case ACTION_TYPES.UPDATE_METADATA:
    case ACTION_TYPES.UPDATE_PRICE:
      copiedState.isLoading = true;
      return copiedState;

    case ACTION_TYPES.GET_HOME_SUCCESS:
      copiedState.isLoading = false;
      copiedState.metadata = action.payload.metadata;
      copiedState.coinData = action.payload.coinData;
      return copiedState;

    case ACTION_TYPES.UPDATE_PRICE_SUCCESS:
      copiedState.isLoading = false;
      copiedState.coinData = action.payload;
      return copiedState;

    case ACTION_TYPES.UPDATE_METADATA_SUCCESS:
      copiedState.isLoading = false;
      copiedState.metadata = action.payload;
      return copiedState;

    case ACTION_TYPES.GET_HOME_FAIL:
    case ACTION_TYPES.UPDATE_METADATA_FAIL:
    case ACTION_TYPES.UPDATE_PRICE_FAIL:
      copiedState.isLoading = false;
      copiedState.error = action.payload;
      return copiedState;

    default:
      return copiedState;
  }
};

export default coinReducer;
