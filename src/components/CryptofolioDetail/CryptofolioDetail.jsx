import React from "react";
import { useParams } from "react-router-dom";

const CryptofolioDetail = (props) => {
  const { cryptofolioId } = useParams();

  console.log(cryptofolioId);

  return (
    <div>
      <div>CryptofolioDetail</div>
    </div>
  );
};

export default CryptofolioDetail;
