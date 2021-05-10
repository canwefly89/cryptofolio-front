import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actionCreator from "../../actions/actionCreator";
import CoinList from "../CoinList/CoinList";

const LandingPage = (props) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div>LandingPage</div>
      <CoinList />
    </div>
  );
};

export default LandingPage;
