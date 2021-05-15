import React, { useRef, useState } from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import useBubbleChart from "../../../hooks/useBubbleChart";
import useInput from "../../../hooks/useInput";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  CHART_TYPE,
  CIRCLE_TYPE,
  VIEW_TYPE,
} from "../../../constants/constants";
import useSearchBubbleChart from "../../../hooks/useSearchBubbleChart";
import SVG from "../../shared/SVG/SVG";
import TypeButton from "../../shared/TypeButton/TypeButton";
import SearchBox from "../../shared/SearchBox/SearchBox";
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
  const [viewType, setViewType] = useState(VIEW_TYPE.BASIC);
  const [circleType, setCircleType] = useState(CIRCLE_TYPE.MARKETCAP);
  const svgRef = useRef();

  useBubbleChart(svgRef, coinData, CHART_TYPE.EXCHANGE, circleType, viewType);
  const handleSearch = useSearchBubbleChart(
    svgRef,
    searchTerm,
    CHART_TYPE.EXCHANGE
  );

  return (
    <>
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
          onClick={() => setViewType(VIEW_TYPE.BASIC)}
          picked={viewType === VIEW_TYPE.BASIC}
          padding={["6px", "12px", "6px", "12px"]}
          fontSize="0.8rem"
          bgColor="red"
          color="white"
        >
          모아보기
        </TypeButton>
        <TypeButton
          onClick={() => setViewType(VIEW_TYPE.SEPARATE)}
          picked={viewType === VIEW_TYPE.SEPARATE}
          padding={["6px", "12px", "6px", "12px"]}
          margin={["0px", "10px", "0px", "0px"]}
          fontSize="0.8rem"
          bgColor="red"
          color="white"
        >
          거래소별
        </TypeButton>
        <TypeButton
          onClick={() => setCircleType(CIRCLE_TYPE.MARKETCAP)}
          picked={circleType === CIRCLE_TYPE.MARKETCAP}
          padding={["6px", "12px", "6px", "12px"]}
          margin={["0px", "0px", "0px", "10px"]}
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
    </>
  );
};

export default ExchangeChart;
