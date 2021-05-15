import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { COLOR_SET } from "../../constants/constants";
import usePieChart from "../../hooks/usePieChart";

import SVG from "../shared/SVG/SVG";

const size = { height: 200, width: 200, radius: 100 };

const CryptoFolioChart = ({ selectedList }) => {
  const { coinData } = useSelector((state) => state.coinReducer);
  const svgRef = useRef();
  const colorRef = useRef(
    COLOR_SET[Math.floor(Math.random() * COLOR_SET.length)]
  );

  usePieChart(svgRef, selectedList, coinData, size, colorRef.current);

  useEffect(() => {
    colorRef.current = COLOR_SET[Math.floor(Math.random() * COLOR_SET.length)];
  }, []);

  return <SVG ref={svgRef}></SVG>;
};

export default CryptoFolioChart;
