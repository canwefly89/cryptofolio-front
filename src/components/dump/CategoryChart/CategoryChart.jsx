import React, { useState, useRef } from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import useBubbleChart from "../../../hooks/useBubbleChart";
import useInput from "../../../hooks/useInput";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CHART_TYPE, CIRCLE_TYPE } from "../../../constants/constants";
import useSearchBubbleChart from "../../../hooks/useSearchBubbleChart";
import TypeButton from "../../shared/TypeButton/TypeButton";
import SearchBox from "../../shared/SearchBox/SearchBox";
import SVG from "../../shared/SVG/SVG";
import "../../styles/tooltip.css";

const SearchContainer = styled.div`
  width: 250px;
  margin: 0 auto;
`;

const CircleTypeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

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
      <SearchContainer>
        <SearchBox action="submit" onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={onChangeSearchTerm}
            placeholder="Search Coin"
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </SearchBox>
      </SearchContainer>
      <CircleTypeContainer>
        <TypeButton
          onClick={() => setCircleType(CIRCLE_TYPE.MARKETCAP)}
          picked={circleType === CIRCLE_TYPE.MARKETCAP}
          padding={["6px", "12px", "6px", "12px"]}
          fontSize="0.8rem"
          bgColor="blue"
          color="white"
        >
          시가총액별
        </TypeButton>
        <TypeButton
          onClick={() => setCircleType(CIRCLE_TYPE.PRICE)}
          picked={circleType === CIRCLE_TYPE.PRICE}
          padding={["6px", "12px", "6px", "12px"]}
          fontSize="0.8rem"
          bgColor="blue"
          color="white"
        >
          가격별
        </TypeButton>
      </CircleTypeContainer>
      <SVG ref={svgRef}></SVG>
    </div>
  );
};

export default ExchangeChart;
