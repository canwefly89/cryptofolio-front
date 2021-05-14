import React from "react";
import { CATEGORIES, PORTFOLIOS } from "../../constants/constants";

const CoinFilter = ({ handleFilter }) => {
  return (
    <>
      <button onClick={(e) => handleFilter(e.target.value, "all")} value="all">
        All
      </button>
      <button
        onClick={(e) => handleFilter(e.target.value, "exchange")}
        value="upbit"
      >
        Upbit
      </button>
      <button
        onClick={(e) => handleFilter(e.target.value, "exchange")}
        value="binance"
      >
        Binance
      </button>
      <select
        name="category"
        onChange={(e) => handleFilter(e.target.value, "category")}
      >
        {CATEGORIES.sort().map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
      <select
        name="portfolio"
        onChange={(e) => handleFilter(e.target.value, "portfolio")}
      >
        {PORTFOLIOS.sort().map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </>
  );
};

export default CoinFilter;
