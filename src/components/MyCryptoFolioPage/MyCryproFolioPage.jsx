import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import CryptoFolioChart from "../CryptoFolioChart/CryptoFolioChart";
import Button from "../shared/Button/Button";

import useUpdatePrice from "../../hooks/useUpdatePrice";

import calculateProfit from "../../utils/calculateProfit";
import changeNumberFormat from "../../utils/changeNumberFormat";

const CryptoFolioContainer = styled.div`
  padding: 40px;
  background-color: black;
  min-height: 87vh;
  color: white;
`;

const ListContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 60px;
`;

const ListTitle = styled.h1`
  font-family: "Roboto", sans-serif;
  font-size: 1.6em;
  font-weight: 800;
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

const MyCryptoFolioPage = () => {
  const [cryptoFolios, setCryptoFolios] = useState([]);
  const { isAuthorized, user } = useSelector((state) => state.authReducer);
  const { coinData } = useSelector((state) => state.coinReducer);
  const { allCryptoFolios } = useSelector((state) => state.cryptofolioReducer);
  const history = useHistory();

  const handleUpdatePrice = useUpdatePrice();

  useEffect(() => {
    if (!coinData) {
      return;
    }

    const myCryptoFolios = calculateProfit(user?.cryptofolios, coinData).sort(
      (a, b) => b.profitPercent - a.profitPercent
    );

    setCryptoFolios(myCryptoFolios);
  }, [allCryptoFolios, coinData, user?.cryptofolios]);

  return (
    <CryptoFolioContainer>
      {isAuthorized && (
        <Button
          onClick={() => history.push("/cryptofolio/new")}
          margin={[0, "10px", 0, 0]}
        >
          New Cryptofolio
        </Button>
      )}
      <Button
        onClick={() => history.push("/cryptofolio/all")}
        margin={[0, "10px", 0, 0]}
      >
        Show All
      </Button>
      <Button onClick={handleUpdatePrice} bgColor={"#f1c40f"} color={"black"}>
        Update Price
      </Button>
      <span>
        &nbsp;&nbsp;
        <strong>마지막 업데이트: {coinData?.BTC?.price?.date}</strong>
      </span>
      <ListContainer>
        <ListTitle>My CryptoFolios</ListTitle>
        <CryptoFolioItemContainer>
          {cryptoFolios.length > 0 &&
            cryptoFolios.map((cryptofolio) => (
              <CryptoFolioItem key={cryptofolio._id}>
                <div
                  onClick={() =>
                    history.push(`/cryptofolio/${cryptofolio._id}`)
                  }
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
      </ListContainer>
    </CryptoFolioContainer>
  );
};

export default MyCryptoFolioPage;
