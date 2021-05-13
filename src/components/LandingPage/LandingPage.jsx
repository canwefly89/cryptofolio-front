import React, { useState, memo } from "react";
import styled from "styled-components";

import ExchangeChart from "../ExchangeChart/ExchangeChart";
import CategoryChart from "../CategoryChart/CategoryChart";
import MyPortfolioChart from "../MyPortfolioChart/MyPortfolioChart";
import CapitalPortfolioChart from "../CapitalPortfolioChart/CapitalPortfolioChart";

const LandingPage = memo((props) => {
  const [type, setType] = useState("exchange");

  return (
    <div>
      <div>LandingPage</div>
      <button name={"exchange"} onClick={(e) => setType(e.target.name)}>
        Exchange
      </button>
      <button name={"category"} onClick={(e) => setType(e.target.name)}>
        Category
      </button>
      <button
        name={"capital-portfolio"}
        onClick={(e) => setType(e.target.name)}
      >
        Capital PortFolio
      </button>
      <button name={"my-portfolio"} onClick={(e) => setType(e.target.name)}>
        My PortFolio
      </button>
      <div>
        {type === "exchange" && <ExchangeChart />}
        {type === "category" && <CategoryChart />}
        {type === "capital-portfolio" && <CapitalPortfolioChart />}
        {type === "my-portfolio" && <MyPortfolioChart />}
      </div>
    </div>
  );
});

export default LandingPage;
