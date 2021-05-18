import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import CoinList from "../CoinList/CoinList";
import CoinSearch from "../CoinSearch/CoinSearch";
import CoinFilter from "../CoinFilter/CoinFilter";
import CreateRandom from "../CreateRandom/CreateRandom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SelectedList from "../SelectedList/SelectedList";
import Button from "../shared/Button/Button";

import useCoinFilter from "../../hooks/useCoinFilter";
import useCoinSelect from "../../hooks/useCoinSelect";
import useErrorMessage from "../../hooks/useErrorMessage";
import useInput from "../../hooks/useInput";

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
  bottom: 100px;
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
  const [searchTerm, setSearchTerm] = useState("");
  const { coinData } = useSelector((state) => state.coinReducer);
  const [name, onChangeName] = useInput("");
  const [coinList, setCoinList] = useState([]);
  const [error, showErrorMessage] = useErrorMessage("");

  const { handleSearch, handleFilter } = useCoinFilter(
    coinData,
    setSearchTerm,
    setCoinList
  );

  const { selectedList, totalValue, createHandler } = useCoinSelect(
    coinData,
    name,
    showErrorMessage,
    setCoinList
  );

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
            handleSelect={createHandler.handleSelect}
            selectedList={selectedList}
            handleAmount={createHandler.handleAmount}
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
            <Button
              onClick={createHandler.handleCreate}
              padding={["10px", "20px", "10px", "20px"]}
              fontSize={"1.2rem"}
            >
              Create
            </Button>
            <Button onClick={createHandler.handleReset} bgColor={"#d63031"}>
              Reset
            </Button>
          </CreateButtonContainer>
          <CreateRandom handleRandom={createHandler.handleRandom} />
        </ResultContainer>
      </CreateContainer>
    </>
  );
};

export default CreateCryptoFolio;
