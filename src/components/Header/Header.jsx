import React from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import MetaData from "../MetaData/MetaData.jsx";
import Button from "../shared/Button/Button";
import actionCreator from "../../actions/actionCreator";

import { useHistory } from "react-router-dom";
import setNumberFormat from "../../utils/setNumberFormat";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 5vw;
  height: 80px;
  font-size: 1.1em;
`;

const WelcomeMessage = styled.div`
  font-size: 0.8em;
  margin-left: 30px;

  span {
    font-weight: 800;
  }
`;

const HeaderLogo = styled.div`
  font-size: 1.7em;
  font-weight: 800;
  cursor: pointer;
`;

const HeaderItemContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8em;
  font-weight: 800;
  margin-left: 40px;

  div {
    margin-left: 20px;
    cursor: pointer;
  }
`;

const HeaderAuthContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  font-size: 0.8em;
  font-weight: 800;
`;

const HeaderLogin = styled.div`
  margin-right: 20px;
  cursor: pointer;
`;

const Header = () => {
  const { isAuthorized, user } = useSelector((state) => state.authReducer);
  const history = useHistory();

  return (
    <>
      <MetaData />
      <HeaderContainer>
        <HeaderLogo onClick={() => history.push("/")}>CryptoFolio</HeaderLogo>
        <HeaderItemContainer>
          <div onClick={() => history.push("/cryptofolio")}>CryptoFolio</div>
          <div onClick={() => history.push("/coin")}>Coin</div>
        </HeaderItemContainer>
        <WelcomeMessage>
          {user?.name}님 환영합니다. 현재 크립토폴리오 최고 수익은
          <span> 123,450원</span> 입니다.
        </WelcomeMessage>

        <HeaderAuthContainer>
          {isAuthorized ? (
            <Button onClick={() => history.push("/logout")}>Log out</Button>
          ) : (
            <>
              <HeaderLogin onClick={() => history.push("/login")}>
                Log In
              </HeaderLogin>
              <Button onClick={() => history.push("/signup")}>Sign Up</Button>
            </>
          )}
        </HeaderAuthContainer>
      </HeaderContainer>
    </>
  );
};

export default Header;
