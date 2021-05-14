import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "../shared/Button/Button";
import actionCreator from "../../actions/actionCreator";

const CryptofolioPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const { allCryptoFolios } = useSelector((state) => state.cryptofolioReducer);

  console.log(user);
  console.log(allCryptoFolios);

  useEffect(() => {}, [dispatch]);

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
