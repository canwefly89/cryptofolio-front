import React from "react";

const CoinSearch = ({ searchTerm, onSearch }) => {
  return (
    <input
      placeholder="search"
      type="text"
      onChange={(e) => onSearch(e.target.value)}
      value={searchTerm}
    />
  );
};

export default CoinSearch;
