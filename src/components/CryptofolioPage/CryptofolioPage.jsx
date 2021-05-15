import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "../shared/Button/Button";
import CryptoFolioList from "../CryptoFolioList/CryptoFolioList";
import calculateProfit from "../../utils/calculateProfit";
import getMonthlySorted from "../../utils/getMonthlySorted";
import getWeeklySorted from "../../utils/getWeeklySorted";

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

    const myCryptofolios = calculateProfit(user?.cryptofolios, coinData);
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
    <div>
      <div>CryptofolioPage</div>
      {user && (
        <div>
          <h1>My Cryptofolios</h1>
          <CryptoFolioList cryptofolios={cryptofolios.myCryptofolios} />
        </div>
      )}
      <div>
        <h1>Weekly Top Profit</h1>
        <CryptoFolioList cryptofolios={cryptofolios.weeklyCryptofolios} />
      </div>
      <div>
        <h1>Monthly Top Profit</h1>
        <CryptoFolioList cryptofolios={cryptofolios.monthlyCryptofolios} />
      </div>
      <div>
        <h1>All Time Top Profit</h1>
        <CryptoFolioList cryptofolios={cryptofolios.allTimeCryptofolios} />
      </div>
      <Button onClick={() => history.push("/cryptofolio/new")}>
        New Cryptofolio
      </Button>
    </div>
  );
};

export default CryptofolioPage;
