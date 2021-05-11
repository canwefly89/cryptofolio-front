import React, { useEffect, useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import actionCreator from "../../actions/actionCreator";
import CoinList from "../CreateCryptoFolio/CreateCryptoFolio";

const LandingPage = (props) => {
  const dispatch = useDispatch();
  const { coinData } = useSelector((state) => state.coinReducer);
  const [marketCaps, setMarketCaps] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
    const filtered = [];
    console.log(svgRef);

    if (coinData) {
      Object.values(coinData).forEach((coin) => {
        filtered.push(coin.marketCap.marketCap / 10000000000);
      });
    }

    setMarketCaps(filtered);
    // console.log(filtered);
  }, [coinData]);

  return (
    <div>
      <div>LandingPage</div>
      <svg ref={svgRef}>
        {marketCaps.map((v, i) => {
          return <circle key={i} r={v}></circle>;
        })}
      </svg>
    </div>
  );
};

export default LandingPage;
