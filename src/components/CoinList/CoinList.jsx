import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import setNumberFormat from "../../utils/setNumberFormat";
import { CATEGORIES } from "../../constants/constants";

import SelectedList from "../SelectedList/SelectedList";
import CoinItem from "../CoinItem/CoinItem";
import Button from "../shared/Button/Button";
import useInput from "../../hooks/useInput";
import CoinFilter from "../CoinFilter/CoinFilter";

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

const CoinList = (props) => {
  const { coinData } = useSelector((state) => state.coinReducer);
  const [coinList, setCoinList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [amount, setAmount] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [randomNumber, onChangeRandomNumber] = useInput(5);
  const [maxAsset, onChangeMaxAsset] = useInput(0);

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

  const handleValue = useCallback(
    (input, ticker) => {
      const newAmount = { ...amount, [ticker]: input };
      const newTotal = Object.entries(newAmount).reduce(
        (a, [key, value]) =>
          (a += parseFloat(value) * coinData[key].price.price),
        0
      );
      setAmount(newAmount);
      setTotalAmount(newTotal);
    },
    [amount, coinData]
  );

  const handleReset = useCallback(() => {
    setSelectedList([]);
    setAmount({});
    setTotalAmount(0);
  }, []);

  const handleRandom = useCallback(() => {}, []);

  useEffect(() => {
    if (coinData) {
      const coins = Object.values(coinData);
      setCoinList(coins);
    }
  }, [coinData]);

  return (
    <>
      <CreateContainer>
        <SelectContainer>
          <FilterContainer>
            <input
              placeholder="search"
              type="text"
              onChange={(e) => handleSearch(e.target.value)}
              value={searchTerm}
            />
            <CoinFilter handleFilter={handleFilter} />
          </FilterContainer>
          {coinList
            .sort((a, b) => b.marketCap.marketCap - a.marketCap.marketCap)
            .map((coin) => {
              return (
                <CoinItem
                  key={coin.name}
                  coin={coin}
                  onClick={handleSelect}
                  selected={selectedList}
                  handleValue={handleValue}
                />
              );
            })}
        </SelectContainer>
        <ResultContainer>
          <SelectedList
            selectedList={selectedList}
            amount={amount}
            totalAmount={totalAmount}
          />
          <div>
            <span>Total</span>
            <span>${setNumberFormat(totalAmount)}</span>
          </div>
          <Button>Create</Button>
          <Button onClick={handleReset}>Reset</Button>
          <div>
            <span>코인 개수</span>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={randomNumber}
              onChange={onChangeRandomNumber}
            />
            <span>{randomNumber}</span>
            <Button onClick={handleRandom}>Set Random</Button>
            <div>
              <span>한도 지정</span>
              <input
                type="text"
                placeholder="value"
                value={maxAsset}
                onChange={onChangeMaxAsset}
              />
            </div>
          </div>
        </ResultContainer>
      </CreateContainer>
    </>
  );
};

export default CoinList;
