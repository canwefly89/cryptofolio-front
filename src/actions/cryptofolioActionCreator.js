import getActionTypes from "./actionTypes.js";

const createCryptofolioAction = (name, coinSet, totalValue, history) => async (
  dispatch,
  getState
) => {
  dispatch({ type: getActionTypes().CREATE_CRYPTOFOLIO });

  const createdBy = getState().authReducer.user._id;
  const data = { name, coinSet, createdValue: totalValue, createdBy };

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
  createCryptofolioAction,
};

export default cryptofolioActionCreator;
