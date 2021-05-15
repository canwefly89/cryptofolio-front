import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import actionCreator from "../actions/actionCreator";

/**
 *
 * @param {String} message
 * @returns error message & show message func
 */
const useCoinSelect = (coinData, name, showErrorMessage) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedList, setSelectedList] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const handleSelect = useCallback(
    (ticker) => {
      const newSet = selectedList.filter((coin) => coin.name !== ticker);

      if (newSet.length === selectedList.length) {
        setSelectedList([...newSet, { name: ticker, amount: 0 }]);
      } else {
        setSelectedList([...newSet]);
      }
    },
    [selectedList]
  );

  const handleAmount = useCallback(
    (amount, ticker) => {
      const newSelectedList = selectedList.map((coin) => {
        if (coin.name === ticker) {
          return { ...coin, amount };
        }
        return coin;
      });

      const newTotal = newSelectedList.reduce((accumulator, coin) => {
        if (!coin.amount) {
          return accumulator;
        }
        return (accumulator +=
          parseFloat(coin.amount) * coinData[coin.name].price.price);
      }, 0);

      setSelectedList(newSelectedList);
      setTotalValue(newTotal);
    },
    [coinData, selectedList]
  );

  const handleReset = useCallback(() => {
    setSelectedList([]);
  }, []);

  const handleRandom = useCallback((coinNumber, maxAsset) => {
    // console.log(coinNumber, maxAsset);
  }, []);

  const handleCreate = useCallback(() => {
    if (name.length === 0) {
      return showErrorMessage("크립토폴리오 이름을 입력해주세요.");
    }

    dispatch(
      actionCreator.createCryptofolioAction(
        name,
        selectedList,
        totalValue,
        history
      )
    );
  }, [name, dispatch, selectedList, totalValue, history, showErrorMessage]);

  return {
    selectedList,
    totalValue,
    handleSelect,
    handleAmount,
    handleReset,
    handleRandom,
    handleCreate,
  };
};

export default useCoinSelect;
