import getActionTypes from "../actions/actionTypes";
import _ from "lodash";

const initialState = {
  currentCryptoFolio: null,
  allCryptoFolios: [],
  myCryptoFolios: [],
  error: null,
};

const cryptofolioReducer = (state = initialState, action) => {
  const ACTION_TYPES = getActionTypes();
  const copiedState = _.cloneDeep(state);

  switch (action.type) {
    case ACTION_TYPES.CREATE_CRYPTOFOLIO:
      return copiedState;

    case ACTION_TYPES.CREATE_CRYPTOFOLIO_SUCCESS:
      copiedState.currentCryptoFolio = action.payload;
      return copiedState;

    case ACTION_TYPES.CREATE_CRYPTOFOLIO_FAIL:
      copiedState.error = action.payload;
      return copiedState;

    default:
      return copiedState;
  }
};

export default cryptofolioReducer;
