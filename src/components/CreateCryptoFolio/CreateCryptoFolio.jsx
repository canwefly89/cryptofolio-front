import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import SelectedList from "../SelectedList/SelectedList";
import CoinSearch from "../CoinSearch/CoinSearch";
import CoinList from "../CoinList/CoinList";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Button from "../shared/Button/Button";

import useErrorMessage from "../../hooks/useErrorMessage";
import useInput from "../../hooks/useInput";
import CoinFilter from "../CoinFilter/CoinFilter";
import CreateRandom from "../CreateRandom/CreateRandom";
import actionCreator from "../../actions/actionCreator";
import { useHistory } from "react-router-dom";

const CreateContainer = styled.div`
  display: flex;
`;

const FilterContainer = styled.div`
  margin-left: auto;
  margin-right: 40px;

  input:focus {
    color: #00b4cc;
  }

  button {
  }
`;

const SelectContainer = styled.div``;

const ResultContainer = styled.div`
  position: fixed;
  left: 50vw;
  flex: 0.5;
`;

const CreateCryptoFolio = (props) => {
  const { coinData } = useSelector((state) => state.coinReducer);
  const dispatch = useDispatch();
  const [name, onChangeName] = useInput("");
  const [coinList, setCoinList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [coinSet, setCoinSet] = useState({});
  const [error, showErrorMessage] = useErrorMessage("");
  const [totalValue, setTotalValue] = useState(0);
  const history = useHistory();

  const handleSearch = useCallback(
    (value) => {
      setSearchTerm(value);

      const filtered = Object.values(coinData).filter(
        (v) =>
          v.name.toLowerCase().includes(value.toLowerCase()) ||
          v.ticker.toLowerCase().includes(value.toLowerCase())
      );

      setCoinList(filtered);
    },
    [coinData]
  );

  const handleFilter = useCallback(
    (value, type) => {
      let filtered = [];
      if (type === "all") {
        filtered = Object.values(coinData);
      }

      if (type === "exchange") {
        filtered = Object.values(coinData).filter((v) =>
          v.exchanges.includes(value)
        );
      }

      if (type === "category") {
        filtered = Object.values(coinData).filter((v) => {
          return v.categories.includes(value);
        });
      }

      setCoinList(filtered);
    },
    [coinData]
  );

  const handleSelect = useCallback(
    (ticker) => {
      if (selectedList.includes(ticker)) {
        const index = selectedList.indexOf(ticker);
        selectedList.splice(index, 1);

        setSelectedList([...selectedList]);
      } else {
        setSelectedList([...selectedList, ticker]);
      }
    },
    [selectedList]
  );

  const handleAmount = useCallback(
    (amount, ticker) => {
      const newCoinSet = { ...coinSet, [ticker]: amount };
      const newTotal = Object.entries(newCoinSet).reduce(
        (a, [key, value]) =>
          (a += parseFloat(value) * coinData[key].price.price),
        0
      );

      setCoinSet(newCoinSet);
      setTotalValue(newTotal);
    },
    [coinData, coinSet]
  );

  const handleReset = useCallback(() => {
    setSelectedList([]);
    setCoinSet({});
  }, []);

  const handleRandom = useCallback((coinNumber, maxAsset) => {
    console.log(coinNumber, maxAsset);
  }, []);

  const handleCreate = useCallback(() => {
    if (name.length === 0) {
      return showErrorMessage("크립토폴리오 이름을 입력해주세요.");
    }

    dispatch(
      actionCreator.createCryptofolioAction(name, coinSet, totalValue, history)
    );
  }, [coinSet, dispatch, history, name, showErrorMessage, totalValue]);

  useEffect(() => {
    if (coinData) {
      const coins = Object.values(coinData);
      setCoinList(coins);
    }
  }, [coinData]);

  return (
    <>
      <h1>CreateCryptoFolio</h1>
      {error.length > 0 && <ErrorMessage error={error} />}
      <input type="text" value={name} onChange={onChangeName} required={true} />
      <CreateContainer>
        <SelectContainer>
          <FilterContainer>
            <CoinSearch searchTerm={searchTerm} onSearch={handleSearch} />
            <CoinFilter handleFilter={handleFilter} />
          </FilterContainer>
          <CoinList
            coinList={coinList}
            handleSelect={handleSelect}
            selectedList={selectedList}
            handleAmount={handleAmount}
          />
        </SelectContainer>
        <ResultContainer>
          <SelectedList
            selectedList={selectedList}
            coinSet={coinSet}
            totalValue={totalValue}
          />
          <CreateRandom handleRandom={handleRandom} />
          <Button onClick={handleCreate}>Create</Button>
          <Button onClick={handleReset}>Reset</Button>
        </ResultContainer>
      </CreateContainer>
    </>
  );
};

export default CreateCryptoFolio;
