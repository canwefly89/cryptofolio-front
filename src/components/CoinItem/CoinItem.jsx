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

const CoinItem = ({ coin, onClick, selectedList, handleAmount }) => {
  const [error, showErrorMessage] = useErrorMessage("");
  const [value, setValue] = useState("");

  const handleClick = useCallback(() => {
    if (
      selectedList.length > 9 &&
      !selectedList.some((selected) => selected.name === coin.ticker)
    ) {
      showErrorMessage("10개 이하로 선택해주세요!");
    } else {
      onClick(coin.ticker);
    }
  }, [coin.ticker, onClick, selectedList, showErrorMessage]);

  const handleChangeValue = useCallback(
    (input) => {
      if (
        Number.isNaN(parseInt(input[input.length - 1], 10)) &&
        input.length > 0
      ) {
        return showErrorMessage("숫자만 입력할 수 있습니다.");
      }

      setValue(input);

      if (input.length === 0) {
        handleAmount(0, coin.ticker);
      }
      handleAmount(input, coin.ticker);
    },
    [coin.ticker, handleAmount, showErrorMessage]
  );

  return (
    <>
      {error.length > 0 && <ErrorMessage error={error} />}
      <CoinContainer
        onClick={handleClick}
        bgColor={selectedList.some((selected) => selected.name === coin.ticker)}
      >
        <img src={coin.imagePath} width="20px" alt="" />
        <span>&nbsp;&nbsp;{coin.ticker}&nbsp;&nbsp;</span>
        <span>${setNumberFormat(coin.price?.price)}&nbsp;&nbsp;</span>
        <span>${setNumberFormat(coin.marketCap?.marketCap)}&nbsp;</span>
        {coin.exchanges.map((exchange) => (
          <span key={exchange}>{exchange}&nbsp;&nbsp;</span>
        ))}
      </CoinContainer>
      {selectedList.some((selected) => selected.name === coin.ticker) && (
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
