import React from "react";

import Button from "../shared/Button/Button";
import useInput from "../../hooks/useInput";

const CreateRandom = ({ handleRandom }) => {
  const [randomNumber, onChangeRandomNumber] = useInput(5);
  const [maxAsset, onChangeMaxAsset] = useInput(0);

  return (
    <div>
      <span>코인 개수</span>
      <input
        type="range"
        min={1}
        max={10}
        step={1}
        value={randomNumber}
        onChange={onChangeRandomNumber}
      />
      <span>{randomNumber}</span>
      <Button onClick={() => handleRandom(randomNumber, maxAsset)}>
        Set Random
      </Button>
      <div>
        <span>금액 한도</span>
        <input
          type="text"
          placeholder="value"
          value={maxAsset}
          onChange={onChangeMaxAsset}
        />
      </div>
    </div>
  );
};

export default CreateRandom;
