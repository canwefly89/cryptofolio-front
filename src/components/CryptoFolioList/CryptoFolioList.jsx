import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import changeNumberFormat from "../../utils/changeNumberFormat";
import CryptoFolioChart from "../CryptoFolioChart/CryptoFolioChart";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const ShowMoreButton = styled.div`
  font-size: 3em;
  cursor: pointer;
`;

const CryptoFolioList = ({ cryptofolios, onClick }) => {
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
      <ShowMoreButton onClick={onClick}>
        <FontAwesomeIcon icon={faPlusCircle} style={{ color: "#f5f6fa" }} />
      </ShowMoreButton>
    </CryptoFolioItemContainer>
  );
};

export default CryptoFolioList;
