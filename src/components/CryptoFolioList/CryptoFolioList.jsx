import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import setNumberFormat from "../../utils/setNumberFormat";
import CryptoFolioChart from "../CryptoFolioChart/CryptoFolioChart";

const CryptoFolioItemContainer = styled.div`
  display: flex;
  background-color: black;
  color: white;
`;

const CryptoFolioItem = styled.div`
  margin-right: 40px;
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
        cryptofolios.map((cryptofolio) => (
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
              <span>${setNumberFormat(cryptofolio.profit, "int")}</span>
            </CryptoFolioInfo>
            <CryptoFolioInfo>
              <span>수익률&nbsp;&nbsp;</span>
              <span>{setNumberFormat(cryptofolio.profitPercent)}%</span>
            </CryptoFolioInfo>
          </CryptoFolioItem>
        ))}
    </CryptoFolioItemContainer>
  );
};

export default CryptoFolioList;
