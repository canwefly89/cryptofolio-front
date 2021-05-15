import React from "react";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBox from "../shared/SearchBox/SearchBox";
import styled from "styled-components";

const CoinSearchContainer = styled.div`
  width: 300px;
  margin: 0 auto;
  margin-bottom: 20px;
`;

const CoinSearch = ({ searchTerm, onSearch }) => {
  return (
    <CoinSearchContainer>
      <SearchBox action="submit" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          value={searchTerm}
          placeholder="Search Coin"
        />
        <button>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </SearchBox>
    </CoinSearchContainer>
  );
};

export default CoinSearch;
