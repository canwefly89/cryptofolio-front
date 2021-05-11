import React from "react";

import CoinItem from "../CoinItem/CoinItem";

const CoinList = ({ coinList, handleSelect, selectedList, handleAmount }) => {
  return (
    <>
      {coinList
        .sort((a, b) => b.marketCap.marketCap - a.marketCap.marketCap)
        .map((coin) => {
          return (
            <CoinItem
              key={coin.name}
              coin={coin}
              onClick={handleSelect}
              selectedList={selectedList}
              handleAmount={handleAmount}
            />
          );
        })}
    </>
  );
};
export default CoinList;
