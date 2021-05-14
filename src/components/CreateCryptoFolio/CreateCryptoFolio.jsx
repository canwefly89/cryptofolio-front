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
import useCoinFilter from "../../hooks/useCoinFilter";
import useCoinSelect from "../../hooks/useCoinSelect";
import CoinFilter from "../CoinFilter/CoinFilter";
import CreateRandom from "../CreateRandom/CreateRandom";
// import actionCreator from "../../actions/actionCreator";
// import { useHistory } from "react-router-dom";

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
  left: 60vw;
  flex: 0.5;
`;

const CreateCryptoFolio = () => {
  const { coinData } = useSelector((state) => state.coinReducer);
  const [name, onChangeName] = useInput("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, showErrorMessage] = useErrorMessage("");
  // const dispatch = useDispatch();
  // const [selectedList, setSelectedList] = useState([]);

  const { coinList, handleSearch, handleFilter } = useCoinFilter(
    coinData,
    setSearchTerm
  );

  const {
    selectedList,
    totalValue,
    handleSelect,
    handleAmount,
    handleReset,
    handleRandom,
    handleCreate,
  } = useCoinSelect(coinData, name, showErrorMessage);

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
          <SelectedList selectedList={selectedList} totalValue={totalValue} />
          <CreateRandom handleRandom={handleRandom} />
          <Button onClick={handleCreate}>Create</Button>
          <Button onClick={handleReset}>Reset</Button>
        </ResultContainer>
      </CreateContainer>
    </>
  );
};

export default CreateCryptoFolio;

// const handleSelect = useCallback(
//   (ticker) => {
//     const newSet = selectedList.filter((coin) => coin.name !== ticker);

//     if (newSet.length === selectedList.length) {
//       setSelectedList([...newSet, { name: ticker, amount: 0 }]);
//     } else {
//       setSelectedList([...newSet]);
//     }
//   },
//   [selectedList]
// );

// const handleAmount = useCallback(
//   (amount, ticker) => {
//     const newSelectedList = selectedList.map((coin) => {
//       if (coin.name === ticker) {
//         return { ...coin, amount };
//       }
//       return coin;
//     });

//     const newTotal = newSelectedList.reduce(
//       (a, coin) =>
//         (a += parseFloat(coin.amount) * coinData[coin.name].price.price),
//       0
//     );

//     setSelectedList(newSelectedList);
//     setTotalValue(newTotal);
//   },
//   [coinData, selectedList]
// );

// const handleReset = useCallback(() => {
//   setSelectedList([]);
// }, []);

// const handleRandom = useCallback((coinNumber, maxAsset) => {
//   console.log(coinNumber, maxAsset);
// }, []);

// const handleCreate = useCallback(() => {
//   if (name.length === 0) {
//     return showErrorMessage("크립토폴리오 이름을 입력해주세요.");
//   }

//   dispatch(
//     actionCreator.createCryptofolioAction(
//       name,
//       selectedList,
//       totalValue,
//       history
//     )
//   );
// }, [selectedList, dispatch, history, name, showErrorMessage, totalValue]);
