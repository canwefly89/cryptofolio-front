import React from "react";
import { useSelector } from "react-redux";

const CryptoFolioList = (props) => {
  const {
    user: { cryptofolios },
  } = useSelector((state) => state.authReducer);

  console.log(cryptofolios);
  return (
    <div>
      <div>CryptoFolioList</div>
    </div>
  );
};

export default CryptoFolioList;
