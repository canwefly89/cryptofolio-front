import React, { useState, memo } from "react";
import styled from "styled-components";

import BubbleChart from "../BubbleChart/BubbleChart";

import TypeButton from "../shared/TypeButton/TypeButton";
import { CHART_TYPE } from "../../constants/constants";

const LandingPageContainer = styled.div`
  background-color: black;
  padding-top: 30px;
`;

const BubbleButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 600px;
  margin: 0 auto;
`;

const BubbleChartContainer = styled.div`
  margin-top: 20px;
`;

const LandingPage = memo(() => {
  const [type, setType] = useState(CHART_TYPE.EXCHANGE);

  return (
    <LandingPageContainer>
      <BubbleButtonContainer>
        <TypeButton
          name={CHART_TYPE.EXCHANGE}
          onClick={(e) => setType(e.target.name)}
          picked={type === CHART_TYPE.EXCHANGE}
        >
          Exchange
        </TypeButton>
        <TypeButton
          name={CHART_TYPE.CATEGORY}
          onClick={(e) => setType(e.target.name)}
          picked={type === CHART_TYPE.CATEGORY}
        >
          Category
        </TypeButton>
        <TypeButton
          name={"capital-portfolio"}
          onClick={(e) => setType(e.target.name)}
          picked={type === "capital-portfolio"}
        >
          Capital PortFolio
        </TypeButton>
        <TypeButton
          name={"my-portfolio"}
          onClick={(e) => setType(e.target.name)}
          picked={type === "my-portfolio"}
        >
          My PortFolio
        </TypeButton>
      </BubbleButtonContainer>
      <BubbleChartContainer>
        <BubbleChart type={type || CHART_TYPE.EXCHANGE} />
      </BubbleChartContainer>
    </LandingPageContainer>
  );
});

export default LandingPage;
