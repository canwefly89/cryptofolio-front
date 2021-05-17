import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import MetaData from "../MetaData/MetaData";
import Button from "../shared/Button/Button";

import { useHistory } from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 5vw;
  height: 80px;
  font-size: 1.1em;
  background-color: #0d1315;
`;

const HeaderLogo = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.4em;
  font-weight: 800;
  color: white;
  cursor: pointer;
`;

const WelcomeMessage = styled.div`
  font-size: 0.8em;
  margin-left: 30px;
  color: white;

  span {
    font-weight: 800;
  }
`;

const HeaderItemContainer = styled.div`
  display: flex;
  align-items: center;
  color: white;
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
  color: white;
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
          <div onClick={() => history.push("/cryptofolio")}>Show List</div>
          {isAuthorized && (
            <>
              <div onClick={() => history.push("/cryptofolio/new")}>
                Creat Cryptofolio
              </div>
              <div onClick={() => history.push("/coin")}>My Cryptofolio</div>
            </>
          )}
        </HeaderItemContainer>
        {isAuthorized && (
          <WelcomeMessage>
            {user?.name}님 환영합니다. 현재 크립토폴리오 최고 수익은
            <span> 123,450원</span> 입니다.
          </WelcomeMessage>
        )}

        <HeaderAuthContainer>
          {isAuthorized ? (
            <Button
              onClick={() => history.push("/logout")}
              bgColor={"#eb4d4b"}
              fontWeight={"600"}
            >
              Log out
            </Button>
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
