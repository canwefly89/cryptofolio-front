import React from "react";
import { useSelector } from "react-redux";
import setNumberFormat from "../../utils/setNumberFormat";

const SelectedList = ({ selectedList, amount, totalAmount }) => {
  const { coinData } = useSelector((state) => state.coinReducer);

  return (
    <>
      {selectedList &&
        selectedList.map((ticker) => {
          return (
            <div key={ticker}>
              <img src={coinData[ticker].imagePath} width="20px" alt="ticker" />
              <span>{ticker}&nbsp;&nbsp;</span>
              {amount[ticker] && (
                <>
                  <span>
                    $
                    {setNumberFormat(
                      amount[ticker] * coinData[ticker].price.price
                    )}
                  </span>
                  <span>
                    &nbsp;&nbsp;
                    {(
                      ((amount[ticker] * coinData[ticker].price.price) /
                        totalAmount) *
                      100
                    ).toFixed(2)}
                    %
                  </span>
                </>
              )}
            </div>
          );
        })}
    </>
  );
};

export default SelectedList;
