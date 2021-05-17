import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import CryptoFolioChart from "../CryptoFolioChart/CryptoFolioChart";

import changeNumberFormat from "../../utils/changeNumberFormat";

const CryptoFolioItemContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 20px;
  align-items: center;
  background-color: black;
  color: white;
`;

const CryptoFolioItem = styled.div`
  cursor: pointer;
`;

const CryptoFolioInfo = styled.div`
  margin-top: 5px;
  margin-left: 35px;

  span:first-child {
    font-weight: 800;
  }
`;

const CryptoFolioList = ({ cryptofolios }) => {
  const { user } = useSelector((state) => state.authReducer);
  const history = useHistory();

  return (
    <CryptoFolioItemContainer>
      {!cryptofolios && <div>No Cryptofolios</div>}
      {cryptofolios &&
        cryptofolios.slice(0, 10).map((cryptofolio) => (
          <CryptoFolioItem key={cryptofolio._id}>
            <div
              onClick={() => history.push(`/cryptofolio/${cryptofolio._id}`)}
            >
              <CryptoFolioChart selectedList={cryptofolio?.selectedList} />
            </div>
            <CryptoFolioInfo style={{ marginTop: "15px" }}>
              <span>작성자&nbsp;&nbsp;</span>
              <span>
                {cryptofolio.createdBy.name
                  ? cryptofolio.createdBy.name
                  : user.name}
              </span>
            </CryptoFolioInfo>
            <CryptoFolioInfo>
              <span>현재 수익&nbsp;&nbsp;</span>
              <span>${changeNumberFormat(cryptofolio.profit, "int")}</span>
            </CryptoFolioInfo>
            <CryptoFolioInfo>
              <span>수익률&nbsp;&nbsp;</span>
              <span>{changeNumberFormat(cryptofolio.profitPercent)}%</span>
            </CryptoFolioInfo>
          </CryptoFolioItem>
        ))}
    </CryptoFolioItemContainer>
  );
};

CryptoFolioList.propTypes = {
  cryptofolios: PropTypes.array,
};

export default CryptoFolioList;
