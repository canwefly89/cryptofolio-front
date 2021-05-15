import React from "react";

import Button from "../shared/Button/Button";
import useInput from "../../hooks/useInput";
import styled from "styled-components";

const CreateRandomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  span {
    font-weight: 600;
  }

  div {
    margin-bottom: 10px;
  }
`;

const RandomSettingContainer = styled.div``;

const CreateRandom = ({ handleRandom }) => {
  const [randomNumber, onChangeRandomNumber] = useInput(5);
  const [maxAsset, onChangeMaxAsset] = useInput("");

  return (
    <CreateRandomContainer>
      <RandomSettingContainer>
        <div>
          <span>코인 개수</span>
          &nbsp;&nbsp;
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={randomNumber}
            onChange={onChangeRandomNumber}
          />
          <span>{randomNumber}</span>
        </div>
        <div>
          <span>금액 한도</span>
          &nbsp;&nbsp;
          <input
            type="text"
            placeholder="enter max value"
            value={maxAsset}
            onChange={onChangeMaxAsset}
          />
        </div>
      </RandomSettingContainer>
      <Button
        onClick={() => handleRandom(randomNumber, maxAsset)}
        bgColor={"#f1c40f"}
        color={"black"}
      >
        Set Random
      </Button>
    </CreateRandomContainer>
  );
};

export default CreateRandom;
