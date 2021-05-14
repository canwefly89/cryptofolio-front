import getActionTypes from "./actionTypes.js";

const getHomeAction = () => async (dispatch) => {
  dispatch({ type: getActionTypes().GET_HOME });

  try {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/coin`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    dispatch({ type: getActionTypes().GET_HOME_SUCCESS, payload: result.data });
  } catch (err) {
    dispatch({ type: getActionTypes().GET_HOME_FAIL, payload: err });
  }
};

const getCoinDataAction = () => async (dispatch) => {
  dispatch({ type: getActionTypes().GET_COINDATA });
  try {
    dispatch({ type: getActionTypes().GET_COINDATA_SUCCESS });
  } catch (err) {
    dispatch({ type: getActionTypes().GET_COINDATA_FAIL, payload: err });
  }
};

const getCryptofoliosAction = () => async (dispatch) => {
  dispatch({ type: getActionTypes().GET_CRYPTOFOLIOS });
  try {
    dispatch({ type: getActionTypes().GET_CRYPTOFOLIOS_SUCCESS });
  } catch (err) {
    dispatch({ type: getActionTypes().GET_CRYPTOFOLIOS_FAIL, payload: err });
  }
};

const coinActionCreator = {
  getHomeAction,
  getCoinDataAction,
  getCryptofoliosAction,
};

export default coinActionCreator;
