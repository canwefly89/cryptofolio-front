import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLOR_SET } from "../../constants/constants";
import usePieChart from "../../hooks/usePieChart";

import { useLocation, useParams, useHistory } from "react-router-dom";
import actionCreator from "../../actions/actionCreator";
import SVG from "../shared/SVG/SVG";
import Button from "../shared/Button/Button";
import setNumberFormat from "../../utils/setNumberFormat";
import calculateProfit from "../../utils/calculateProfit";
import styled from "styled-components";

const CryptoFolioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
  background-color: black;
  color: white;
`;

const CryptoFolioName = styled.h1`
  font-size: 1.6rem;
  font-weight: 800;
`;

const CryptoFolioInfoContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 40px;
  font-size: 1.2em;
`;

const CryptoFolioInfo = styled.div`
  margin-bottom: 10px;

  span:first-child {
    font-weight: 800;
  }
`;

const CrypoFolioCoins = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 30%;

  span {
    display: block;
    width: 200px;
    margin-left: 10px;
  }
`;

const CoinTicker = styled.div`
  width: 60px;
`;

const Section = styled.span`
  font-weight: 800;
`;

const size = { height: 600, width: 600, radius: 300 };

const CryptofolioDetail = (props) => {
  const { user } = useSelector((state) => state.authReducer);
  const { coinData } = useSelector((state) => state.coinReducer);
  const { allCryptoFolios } = useSelector((state) => state.cryptofolioReducer);
  const svgRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const param = useParams();
  const [currentFolio, setCurrentFolio] = useState({});
  const colorRef = useRef(
    COLOR_SET[Math.floor(Math.random() * COLOR_SET.length)]
  );
  const { state } = useLocation();

  const handleDelete = () => {
    dispatch(
      actionCreator.deleteCryptofolioAction(
        user?._id,
        currentFolio?._id,
        history
      )
    );
  };

  useEffect(() => {
    let thisFolio = allCryptoFolios.filter(
      (cryptofolio) => cryptofolio._id === param.cryptofolioId
    )[0];

    if (!thisFolio && state) {
      thisFolio = state;
    }

    if (coinData) {
      const calculatedFolio = calculateProfit([thisFolio], coinData);
      setCurrentFolio(calculatedFolio[0]);
    }
  }, [allCryptoFolios, coinData, param.cryptofolioId, state]);

  usePieChart(
    svgRef,
    currentFolio?.selectedList,
    coinData,
    size,
    colorRef.current
  );

  return (
    <CryptoFolioContainer>
      <CryptoFolioName>{currentFolio?.name}</CryptoFolioName>
      <SVG ref={svgRef}></SVG>
      <CryptoFolioInfoContainer>
        <CryptoFolioInfo>
          <span>작성자</span>
          &nbsp;&nbsp;
          <span>{currentFolio.createdBy?.name}</span>
        </CryptoFolioInfo>
        <CryptoFolioInfo>
          <span>현재 가치</span>
          &nbsp;&nbsp;
          <span>${setNumberFormat(currentFolio.currentValue)}</span>
        </CryptoFolioInfo>
        <CryptoFolioInfo>
          <span>현재 수익</span>
          &nbsp;&nbsp;
          <span>${currentFolio.profit}</span>
        </CryptoFolioInfo>
        <CryptoFolioInfo>
          <span>수익률</span>
          &nbsp;&nbsp;
          <span>{currentFolio.profitPercent}%</span>
        </CryptoFolioInfo>
      </CryptoFolioInfoContainer>
      <CrypoFolioCoins>
        <CoinTicker></CoinTicker>
        <Section>코인명</Section>
        <Section>현재 가격</Section>
        <Section>코인 수</Section>
        <Section>총 가치</Section>
      </CrypoFolioCoins>
      {coinData &&
        currentFolio?.selectedList?.map((coin) => {
          const currentCoin = coinData[coin.name];
          return (
            <CrypoFolioCoins key={coin.name}>
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
            </CrypoFolioCoins>
          );
        })}
      {user?._id === currentFolio.createdBy?._id && (
        <Button
          onClick={handleDelete}
          bgColor={"#f1c40f"}
          color={"black"}
          margin={["10px", 0, 0, 0]}
        >
          Delete
        </Button>
      )}
    </CryptoFolioContainer>
  );
};

export default CryptofolioDetail;
