import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "../shared/Button/Button";
import CryptoFolioList from "../CryptoFolioList/CryptoFolioList";
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

const CryptofolioPage = (props) => {
  const history = useHistory();
  const [cryptofolios, setCryptofolios] = useState({});
  const { user } = useSelector((state) => state.authReducer);
  const { coinData } = useSelector((state) => state.coinReducer);
  const { allCryptoFolios } = useSelector((state) => state.cryptofolioReducer);

  useEffect(() => {
    if (!coinData) {
      return;
    }

    const myCryptofolios = calculateProfit(user?.cryptofolios, coinData).sort(
      (a, b) => b.profitPercent - a.profitPercent
    );
    const monthlyCryptofolios = getMonthlySorted(allCryptoFolios, coinData);
    const weeklyCryptofolios = getWeeklySorted(allCryptoFolios, coinData);
    const allTimeCryptofolios = calculateProfit(allCryptoFolios, coinData).sort(
      (a, b) => b.profitPercent - a.profitPercent
    );

    const caculatedProfit = {
      myCryptofolios,
      monthlyCryptofolios,
      weeklyCryptofolios,
      allTimeCryptofolios,
    };

    setCryptofolios(caculatedProfit);
  }, [allCryptoFolios, coinData, user?.cryptofolios]);

  return (
    <CryptoFolioContainer>
      {user && (
        <>
          <Button
            onClick={() => history.push("/cryptofolio/new")}
            bgColor={"#e84118"}
          >
            New Cryptofolio
          </Button>
          <ListContainer>
            <ListTitle>My Cryptofolios</ListTitle>
            <CryptoFolioList cryptofolios={cryptofolios.myCryptofolios} />
          </ListContainer>
        </>
      )}
      <ListContainer>
        <ListTitle>Weekly Top Profit</ListTitle>
        <CryptoFolioList cryptofolios={cryptofolios.weeklyCryptofolios} />
      </ListContainer>
      <ListContainer>
        <ListTitle>Monthly Top Profit</ListTitle>
        <CryptoFolioList cryptofolios={cryptofolios.monthlyCryptofolios} />
      </ListContainer>
      <ListContainer>
        <ListTitle>All Time Top Profit</ListTitle>
        <CryptoFolioList cryptofolios={cryptofolios.allTimeCryptofolios} />
      </ListContainer>
    </CryptoFolioContainer>
  );
};

export default CryptofolioPage;
