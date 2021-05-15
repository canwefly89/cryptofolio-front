import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CryptoFolioItem from "../CryptoFolioItem/CryptoFolioItem";

const CryptoFolioList = ({ cryptofolios }) => {
  const { user } = useSelector((state) => state.authReducer);
  const history = useHistory();

  return (
    <div>
      <div>CryptoFolioList</div>
      {cryptofolios &&
        cryptofolios.map((cryptofolio) => (
          <div key={cryptofolio._id}>
            <div
              onClick={() => history.push(`/cryptofolio/${cryptofolio._id}`)}
            >
              <CryptoFolioItem selectedList={cryptofolio?.selectedList} />
            </div>
            <div>
              <span>작성자</span>
              <span>
                {cryptofolio.createdBy.name
                  ? cryptofolio.createdBy.name
                  : user.name}
              </span>
            </div>
            <div>
              <span>현재 수익금</span>
              <span>${cryptofolio.profit}</span>
            </div>
            <div>
              <span>현재 수익률</span>
              <span>{cryptofolio.profitPercent}%</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CryptoFolioList;
