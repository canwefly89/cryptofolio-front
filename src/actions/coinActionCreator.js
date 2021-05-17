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

const updateMetaDataAction = () => async (dispatch) => {
  dispatch({ type: getActionTypes().UPDATE_METADATA });
  try {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/coin/metadata`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!result) {
      dispatch({
        type: getActionTypes().UPDATE_METADATA_FAIL,
        payload: result.data,
      });
    }

    dispatch({
      type: getActionTypes().UPDATE_METADATA_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    dispatch({ type: getActionTypes().UPDATE_METADATA_FAIL, payload: err });
  }
};

const updatePriceAction = () => async (dispatch) => {
  dispatch({ type: getActionTypes().UPDATE_PRICE });
  try {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/coin/price`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    console.log(result);

    if (!result) {
      dispatch({
        type: getActionTypes().UPDATE_PRICE_FAIL,
        payload: result.data,
      });
    }

    dispatch({
      type: getActionTypes().UPDATE_PRICE_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    dispatch({ type: getActionTypes().UPDATE_METADATA_FAIL, payload: err });
  }
};

const coinActionCreator = {
  getHomeAction,
  getCoinDataAction,
  updateMetaDataAction,
  updatePriceAction,
};

export default coinActionCreator;
