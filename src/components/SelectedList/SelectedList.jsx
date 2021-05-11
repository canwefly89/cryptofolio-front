import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import setNumberFormat from "../../utils/setNumberFormat";

const SelectedList = ({ selectedList, coinSet, totalValue }) => {
  const { coinData } = useSelector((state) => state.coinReducer);

  return (
    <>
      {selectedList &&
        selectedList.map((ticker) => {
          return (
            <div key={ticker}>
              <img src={coinData[ticker].imagePath} width="20px" alt="ticker" />
              <span>{ticker}&nbsp;&nbsp;</span>
              {coinSet[ticker] && (
                <>
                  <span>
                    $
                    {setNumberFormat(
                      coinSet[ticker] * coinData[ticker].price.price
                    )}
                  </span>
                  <span>
                    &nbsp;&nbsp;
                    {(
                      ((coinSet[ticker] * coinData[ticker].price.price) /
                        totalValue) *
                      100
                    ).toFixed(2)}
                    %
                  </span>
                </>
              )}
            </div>
          );
        })}
      <div>
        <span>Total</span>
        <span>${setNumberFormat(totalValue)}</span>
      </div>
    </>
  );
};

export default SelectedList;
