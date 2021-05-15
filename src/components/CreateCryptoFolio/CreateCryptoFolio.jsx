import React, { useState } from "react";
import { useSelector } from "react-redux";
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

const CreateContainer = styled.div`
  padding-top: 30px;
  display: flex;
  background-color: black;
  color: white;
  min-height: 90vh;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  width: 100%;
  justify-content: center;
  margin: 0 auto;
  background-color: black;
`;

const SelectContainer = styled.div``;

const ResultContainer = styled.div`
  position: fixed;
  left: 60vw;
  flex: 0.5;
  padding: 10px;
  background-color: #dfe6e9;
  color: black;
  border-radius: 30px;
`;

const CryptoFolioTitle = styled.input`
  display: block;
  padding: 10px 20px;
  margin: 0 auto;
  width: 80%;
  margin-top: 20px;
  margin-bottom: -10px;
  border-radius: 10px;
  border: 0.5px solid gray;
  font-size: 16px;
  font-weight: 600;
`;

const CreateButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  button {
    margin: 0 5px;
  }
`;

const CreateCryptoFolio = () => {
  const { coinData } = useSelector((state) => state.coinReducer);
  const [name, onChangeName] = useInput("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, showErrorMessage] = useErrorMessage("");

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
      {error.length > 0 && <ErrorMessage error={error} />}
      <FilterContainer>
        <CoinSearch searchTerm={searchTerm} onSearch={handleSearch} />
        <CoinFilter handleFilter={handleFilter} />
      </FilterContainer>
      <CreateContainer>
        <SelectContainer>
          <CoinList
            coinList={coinList}
            handleSelect={handleSelect}
            selectedList={selectedList}
            handleAmount={handleAmount}
          />
        </SelectContainer>
        <ResultContainer>
          <CryptoFolioTitle
            type="text"
            value={name}
            onChange={onChangeName}
            required={true}
            placeholder="Enter Name"
          />
          <SelectedList selectedList={selectedList} totalValue={totalValue} />
          <CreateButtonContainer>
            <Button onClick={handleCreate}>Create</Button>
            <Button onClick={handleReset} bgColor={"#d63031"}>
              Reset
            </Button>
          </CreateButtonContainer>
          <CreateRandom handleRandom={handleRandom} />
        </ResultContainer>
      </CreateContainer>
    </>
  );
};

export default CreateCryptoFolio;
