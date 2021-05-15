import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { COLOR_SET } from "../../constants/constants";
import setNumberFormat from "../../utils/setNumberFormat";
import usePieChart from "../../hooks/usePieChart";

import SVG from "../shared/SVG/SVG";
import styled from "styled-components";

const SelectedContainer = styled.div``;
const SelectedCoin = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 0;
  margin-left: 50px;

  img {
    display: block;
    margin-right: 10px;
  }

  span {
    display: block;
    font-weight: 600;
  }
`;

const TotalContainer = styled.div`
  margin: 20px 0 30px 97px;
  font-weight: 800;
  font-size: 1.3rem;
`;

const size = { height: 400, width: 400, radius: 180 };

const SelectedList = ({ selectedList, totalValue }) => {
  const { coinData } = useSelector((state) => state.coinReducer);
  const svgRef = useRef();
  const colorRef = useRef(
    COLOR_SET[Math.floor(Math.random() * COLOR_SET.length)]
  );

  usePieChart(svgRef, selectedList, coinData, size, colorRef.current);

  return (
    <SelectedContainer>
      <SVG ref={svgRef}></SVG>
      {selectedList &&
        selectedList.map((coin) => {
          return (
            <SelectedCoin key={coin.name}>
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
            </SelectedCoin>
          );
        })}
      <TotalContainer>
        <span>합계</span>
        &nbsp;&nbsp;
        <span>${setNumberFormat(totalValue)}</span>
      </TotalContainer>
    </SelectedContainer>
  );
};

export default SelectedList;
