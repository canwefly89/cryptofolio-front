import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "../shared/Button/Button";
import setNumberFormat from "../../utils/setNumberFormat";
import CryptoFolioChart from "../CryptoFolioChart/CryptoFolioChart";
import calculateProfit from "../../utils/calculateProfit";

const CryptoFolioContainer = styled.div`
  padding: 40px;
  min-height: 87vh;
  background-color: black;
  color: white;
`;

const CryptoFolioItemContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 20px;
  align-items: center;
  background-color: black;
  color: white;
`;

const ListTitle = styled.h1`
  margin-top: 30px;
  font-family: "Roboto", sans-serif;
  font-size: 1.6em;
  font-weight: 800;
`;

const CryptoFolioItem = styled.div`
  cursor: pointer;
`;

const CryptoFolioInfo = styled.div`
  margin-top: 5px;
  margin-left: 35px;

  span:first-child {
    font-weight: 800;
  }
`;

const AllCryptoFolio = (props) => {
  const history = useHistory();
  const [cryptofolios, setCryptofolios] = useState([]);
  const { isAuthorized, user } = useSelector((state) => state.authReducer);
  const { coinData } = useSelector((state) => state.coinReducer);
  const { allCryptoFolios } = useSelector((state) => state.cryptofolioReducer);

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
          cryptofolios.slice(0, 10).map((cryptofolio) => (
            <CryptoFolioItem key={cryptofolio._id}>
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
                <span>${setNumberFormat(cryptofolio.profit, "int")}</span>
              </CryptoFolioInfo>
              <CryptoFolioInfo>
                <span>수익률&nbsp;&nbsp;</span>
                <span>{setNumberFormat(cryptofolio.profitPercent)}%</span>
              </CryptoFolioInfo>
            </CryptoFolioItem>
          ))}
      </CryptoFolioItemContainer>
    </CryptoFolioContainer>
  );
};

export default AllCryptoFolio;
