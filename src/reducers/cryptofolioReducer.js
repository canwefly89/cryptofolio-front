import getActionTypes from "../actions/actionTypes";
import _ from "lodash";

const initialState = {
  error: null,
};

const cryptofolioReducer = (state = initialState, action) => {
  const ACTION_TYPES = getActionTypes();
  const copiedState = _.cloneDeep(state);

  switch (action.type) {
    default:
      return copiedState;
  }
};

export default cryptofolioReducer;
