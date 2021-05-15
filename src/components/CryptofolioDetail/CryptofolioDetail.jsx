import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { COLOR_SET } from "../../constants/constants";
import usePieChart from "../../hooks/usePieChart";

import { useParams } from "react-router-dom";
import SVG from "../shared/SVG/SVG";
import setNumberFormat from "../../utils/setNumberFormat";
import calculateProfit from "../../utils/calculateProfit";

const size = { height: 600, width: 600, radius: 300 };

const CryptofolioDetail = (props) => {
  const { coinData } = useSelector((state) => state.coinReducer);
  const { allCryptoFolios } = useSelector((state) => state.cryptofolioReducer);
  const svgRef = useRef();
  const param = useParams();
  const [currentFolio, setCurrentFolio] = useState({});
  const colorRef = useRef(
    COLOR_SET[Math.floor(Math.random() * COLOR_SET.length)]
  );

  useEffect(() => {
    const thisFolio = allCryptoFolios.filter(
      (cryptofolio) => cryptofolio._id === param.cryptofolioId
    )[0];

    if (coinData) {
      const calculatedFolio = calculateProfit([thisFolio], coinData);
      setCurrentFolio(calculatedFolio[0]);
    }
  }, [allCryptoFolios, coinData, param.cryptofolioId]);

  usePieChart(
    svgRef,
    currentFolio?.selectedList,
    coinData,
    size,
    colorRef.current
  );

  return (
    <div>
      <div>{currentFolio?.name}</div>
      <SVG ref={svgRef}></SVG>
      <div>
        <span>작성자</span> <span>{currentFolio.createdBy?.name}</span>
      </div>
      <div>
        <span>현재 가치</span> <span>${currentFolio.currentValue}</span>
      </div>
      <div>
        <span>수익금</span> <span>${currentFolio.profit}</span>
      </div>
      <div>
        <span>수익률</span> <span>{currentFolio.profitPercent}%</span>
      </div>
      {coinData &&
        currentFolio.selectedList?.map((coin) => {
          const currentCoin = coinData[coin.name];
          return (
            <div key={coin.name}>
              <img src={currentCoin.imagePath} alt="ticker" />
              <span>{coin.name}</span>
              <span>${setNumberFormat(currentCoin.price?.price)}&nbsp;</span>
              <span>{setNumberFormat(coin.amount, "int")}</span>
              <span>
                $
                {setNumberFormat(
                  currentCoin.price?.price * parseInt(coin.amount)
                )}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default CryptofolioDetail;
