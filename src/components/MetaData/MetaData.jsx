import React from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import setNumberFormat from "../../utils/setNumberFormat";

const MetaDataContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding-left: 20px;
  border-bottom: 0.8px solid lightgray;
  font-size: 0.75rem;
`;

const MetaDataItem = styled.div`
  margin-left: 20px;
  display: flex;

  span {
    display: block;
    margin-left: 6px;
  }
  span:last-child {
    font-weight: 800;
  }
`;

const MetaData = () => {
  const { metadata } = useSelector((state) => state.coinReducer);

  return (
    <MetaDataContainer>
      <MetaDataItem>
        <span>기준 시점</span>
        <span>{metadata?.time}</span>
      </MetaDataItem>
      <MetaDataItem>
        <span>시가총액(달러)</span>
        <span>
          {metadata && setNumberFormat(metadata.marketCapDollar, "cut")}
        </span>
      </MetaDataItem>
      <MetaDataItem>
        <span>시가총액(원)</span>
        <span>{metadata && setNumberFormat(metadata.marketCapWon, "cut")}</span>
      </MetaDataItem>
      <MetaDataItem>
        <span>비트코인 도미넌스</span>
        <span>{metadata?.dominance}</span>
      </MetaDataItem>
      <MetaDataItem>
        <span>김치 프리미엄</span>
        <span>{metadata?.premium}%</span>
      </MetaDataItem>
      <button>업데이트</button>
    </MetaDataContainer>
  );
};

export default MetaData;
