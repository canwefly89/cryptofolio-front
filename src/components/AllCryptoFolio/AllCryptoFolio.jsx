import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Button from "../shared/Button/Button";
import CryptoFolioChart from "../CryptoFolioChart/CryptoFolioChart";

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import calculateProfit from "../../utils/calculateProfit";
import changeNumberFormat from "../../utils/changeNumberFormat";

const CryptoFolioContainer = styled.div`
  padding: 40px;
  min-height: 87vh;
  background-color: black;
  color: white;
`;

const ListTitle = styled.h1`
  margin-top: 30px;
  font-family: "Roboto", sans-serif;
  font-size: 1.6em;
  font-weight: 800;
`;

const CryptoFolioItemContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, 1fr);
  margin-top: 26px;
  row-gap: 20px;
  column-gap: 5px;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
`;

const CryptoFolioItem = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const CryptoFolioName = styled.div`
  font-weight: 800;
`;

const CryptoFolioInfo = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;

  span {
    display: block;
    text-align: left;
  }
  span:first-child {
    font-weight: 800;
  }
`;

const AllCryptoFolio = () => {
  const [cryptofolios, setCryptofolios] = useState([]);
  const { isAuthorized, user } = useSelector((state) => state.authReducer);
  const { coinData } = useSelector((state) => state.coinReducer);
  const { allCryptoFolios } = useSelector((state) => state.cryptofolioReducer);
  const history = useHistory();

  useEffect(() => {
    if (!coinData) {
      return;
    }

    const allCryptofolios = calculateProfit(allCryptoFolios, coinData).sort(
      (a, b) => b.profitPercent - a.profitPercent
    );

    setCryptofolios(allCryptofolios);
  }, [allCryptoFolios, coinData, user?.cryptofolios]);

  return (
    <CryptoFolioContainer>
      {isAuthorized && (
        <Button
          onClick={() => history.push("/cryptofolio/new")}
          bgColor={"#e84118"}
        >
          New Cryptofolio
        </Button>
      )}
      <ListTitle>All CryptoFolios</ListTitle>
      <CryptoFolioItemContainer>
        {cryptofolios.length > 0 &&
          cryptofolios.map((cryptofolio) => (
            <CryptoFolioItem key={cryptofolio._id}>
              <CryptoFolioInfo style={{ marginTop: "15px" }}>
                <CryptoFolioName>{cryptofolio.name}</CryptoFolioName>
              </CryptoFolioInfo>
              <div
                onClick={() => history.push(`/cryptofolio/${cryptofolio._id}`)}
              >
                <CryptoFolioChart selectedList={cryptofolio?.selectedList} />
              </div>
              <CryptoFolioInfo style={{ marginTop: "15px" }}>
                <span>작성자&nbsp;&nbsp;</span>
                <span>
                  {cryptofolio.createdBy.name
                    ? cryptofolio.createdBy.name
                    : user.name}
                </span>
              </CryptoFolioInfo>
              <CryptoFolioInfo>
                <span>현재 수익&nbsp;&nbsp;</span>
                <span>${changeNumberFormat(cryptofolio.profit, "int")}</span>
              </CryptoFolioInfo>
              <CryptoFolioInfo>
                <span>수익률&nbsp;&nbsp;</span>
                <span>{changeNumberFormat(cryptofolio.profitPercent)}%</span>
              </CryptoFolioInfo>
              <CryptoFolioInfo>
                <span>작성일&nbsp;&nbsp;</span>
                <span>{cryptofolio.createdAt?.slice(5, 10)}</span>
              </CryptoFolioInfo>
            </CryptoFolioItem>
          ))}
      </CryptoFolioItemContainer>
    </CryptoFolioContainer>
  );
};

export default AllCryptoFolio;
