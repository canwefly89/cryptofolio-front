import React, { useRef } from "react";
import { useSelector } from "react-redux";
import setNumberFormat from "../../utils/setNumberFormat";
import usePieChart from "../../hooks/usePieChart";

import SVG from "../shared/SVG/SVG";

const SelectedList = ({ selectedList, totalValue }) => {
  const { coinData } = useSelector((state) => state.coinReducer);
  const svgRef = useRef();

  usePieChart(svgRef, selectedList, coinData);

  return (
    <>
      <SVG ref={svgRef}></SVG>
      {selectedList &&
        selectedList.map((coin) => {
          return (
            <div key={coin.name}>
              <img
                src={coinData[coin.name].imagePath}
                width="20px"
                alt="ticker"
              />
              <span>{coin.name}&nbsp;&nbsp;</span>

              <span>
                $
                {setNumberFormat(coin.amount * coinData[coin.name].price.price)}
              </span>
              <span>
                &nbsp;&nbsp;
                {totalValue !== 0
                  ? (
                      ((coin.amount * coinData[coin.name].price.price) /
                        totalValue) *
                      100
                    ).toFixed(2)
                  : 0.0}
                %
              </span>
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
