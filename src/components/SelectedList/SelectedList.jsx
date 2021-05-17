import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { COLOR_SET } from "../../constants/constants";
import changeNumberFormat from "../../utils/changeNumberFormat";
import usePieChart from "../../hooks/usePieChart";

import SVG from "../shared/SVG/SVG";
import styled from "styled-components";

const SelectedContainer = styled.div``;
const SelectedCoin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 10px 0;

  img {
    display: block;
    margin-right: 10px;
    width: 25px;
  }

  span {
    display: block;
    font-weight: 600;
  }
`;

const TotalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 20px 0;
  font-weight: 800;
  font-size: 1.2rem;
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
                {changeNumberFormat(
                  coin.amount * coinData[coin.name].price.price
                )}
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
        <span>${changeNumberFormat(totalValue)}</span>
      </TotalContainer>
    </SelectedContainer>
  );
};

export default SelectedList;
