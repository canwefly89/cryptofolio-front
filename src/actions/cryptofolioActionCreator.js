import getActionTypes from "./actionTypes.js";

const getCryptofoliosAction = () => async (dispatch) => {
  dispatch({ type: getActionTypes().GET_CRYPTOFOLIOS });

  try {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/cryptofolio`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    dispatch({
      type: getActionTypes().GET_CRYPTOFOLIOS_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    dispatch({ type: getActionTypes().GET_CRYPTOFOLIOS_FAIL, payload: err });
  }
};

const createCryptofolioAction = (
  name,
  selectedList,
  totalValue,
  history
) => async (dispatch, getState) => {
  dispatch({ type: getActionTypes().CREATE_CRYPTOFOLIO });

  const createdBy = getState().authReducer.user._id;
  const data = { name, selectedList, createdValue: totalValue, createdBy };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/cryptofolio/new`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    dispatch({
      type: getActionTypes().CREATE_CRYPTOFOLIO_SUCCESS,
      payload: result.data,
    });

    history.push(`/cryptofolio/${result.data._id}`);
  } catch (err) {
    dispatch({ type: getActionTypes().CREATE_CRYPTOFOLIO_FAIL, payload: err });
  }
};

const cryptofolioActionCreator = {
  getCryptofoliosAction,
  createCryptofolioAction,
};

export default cryptofolioActionCreator;
