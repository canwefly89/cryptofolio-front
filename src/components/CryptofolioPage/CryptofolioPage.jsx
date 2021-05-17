import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import CryptoFolioList from "../CryptoFolioList/CryptoFolioList";
import Button from "../shared/Button/Button";

import useUpdatePrice from "../../hooks/useUpdatePrice";

import calculateProfit from "../../utils/calculateProfit";
import getMonthlySorted from "../../utils/getMonthlySorted";
import getWeeklySorted from "../../utils/getWeeklySorted";

const CryptoFolioContainer = styled.div`
  padding: 40px;
  background-color: black;
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

const CryptoFolioPage = () => {
  const [cryptofolios, setCryptofolios] = useState({});
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
    const monthlyCryptoFolios = getMonthlySorted(allCryptoFolios, coinData);
    const weeklyCryptoFolios = getWeeklySorted(allCryptoFolios, coinData);
    const allTimeCryptoFolios = calculateProfit(allCryptoFolios, coinData).sort(
      (a, b) => b.profitPercent - a.profitPercent
    );

    const caculatedCryptoFolios = {
      myCryptoFolios,
      monthlyCryptoFolios,
      weeklyCryptoFolios,
      allTimeCryptoFolios,
    };

    setCryptofolios(caculatedCryptoFolios);
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
        <ListTitle>Weekly Top Profit</ListTitle>
        <CryptoFolioList cryptofolios={cryptofolios.weeklyCryptoFolios} />
      </ListContainer>
      <ListContainer>
        <ListTitle>Monthly Top Profit</ListTitle>
        <CryptoFolioList cryptofolios={cryptofolios.monthlyCryptoFolios} />
      </ListContainer>
      <ListContainer>
        <ListTitle>All Time Top Profit</ListTitle>
        <CryptoFolioList cryptofolios={cryptofolios.allTimeCryptoFolios} />
      </ListContainer>
    </CryptoFolioContainer>
  );
};

export default CryptoFolioPage;
