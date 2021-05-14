import React, { useState, useRef } from "react";

import { useSelector } from "react-redux";
import useBubbleChart from "../../hooks/useBubbleChart";
import useInput from "../../hooks/useInput";

import { CHART_TYPE, CIRCLE_TYPE } from "../../constants/constants";
import useSearchBubbleChart from "../../hooks/useSearchBubbleChart";
import SVG from "../shared/SVG/SVG";
import "../../styles/tooltip.css";

const ExchangeChart = () => {
  const { coinData } = useSelector((state) => state.coinReducer);
  const [searchTerm, onChangeSearchTerm] = useInput("");
  const [circleType, setCircleType] = useState(CIRCLE_TYPE.MARKETCAP);
  const svgRef = useRef();

  useBubbleChart(svgRef, coinData, CHART_TYPE.CATEGORY, circleType);
  const handleSearch = useSearchBubbleChart(
    svgRef,
    searchTerm,
    CHART_TYPE.CATEGORY
  );

  return (
    <div>
      <form action="submit" onSubmit={handleSearch}>
        <input type="text" value={searchTerm} onChange={onChangeSearchTerm} />
        <button type="submit">검색</button>
      </form>
      <button onClick={() => setCircleType(CIRCLE_TYPE.PRICE)}>가격기준</button>
      <button onClick={() => setCircleType(CIRCLE_TYPE.MARKETCAP)}>
        시가총액기준
      </button>
      <SVG ref={svgRef}></SVG>
    </div>
  );
};

export default ExchangeChart;
