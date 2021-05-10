import React, { useState } from "react";
import { useCallback } from "react";
import styled from "styled-components";
import setNumberFormat from "../../utils/setNumberFormat";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import useErrorMessage from "../../hooks/useErrorMessage";

const CoinContainer = styled.div`
  background-color: ${(props) => (props.bgColor ? "#ccddfe" : "white")};
  cursor: pointer;
`;

const CoinItem = ({ coin, onClick, selected, handleValue }) => {
  const [error, showErrorMessage] = useErrorMessage("");
  const [value, setValue] = useState("");

  const handleClick = useCallback(() => {
    if (selected.length > 9 && !selected) {
      showErrorMessage("10개 이하로 선택해주세요!");
    } else {
      onClick(coin.ticker);
    }
  }, [coin.ticker, onClick, selected, showErrorMessage]);

  const handleChangeValue = useCallback(
    (input) => {
      setValue(input);
      handleValue(input, coin.ticker);
    },
    [coin.ticker, handleValue]
  );

  return (
    <>
      {error.length > 0 && <ErrorMessage error={error} />}
      <CoinContainer
        onClick={handleClick}
        bgColor={selected.includes(coin.ticker)}
      >
        <img src={coin.imagePath} width="20px" alt="" />
        <span>&nbsp;&nbsp;{coin.ticker}&nbsp;&nbsp;</span>
        <span>${setNumberFormat(coin.price.price)}&nbsp;&nbsp;</span>
        <span>${setNumberFormat(coin.marketCap.marketCap)}&nbsp;</span>
        {coin.exchanges.map((exchange) => (
          <span key={exchange}>{exchange}&nbsp;&nbsp;</span>
        ))}
      </CoinContainer>
      {selected.includes(coin.ticker) && (
        <input
          type="textarea"
          placeholder="value"
          onChange={(e) => handleChangeValue(e.target.value)}
          value={value}
        />
      )}
    </>
  );
};

export default CoinItem;
