import React from "react";
import { useHistory } from "react-router-dom";

import Button from "../shared/Button/Button";

const CryptofolioPage = (props) => {
  const history = useHistory();
  return (
    <div>
      <div>CryptofolioPage</div>
      <Button onClick={() => history.push("/cryptofolio/new")}>
        New Cryptofolio
      </Button>
    </div>
  );
};

export default CryptofolioPage;
