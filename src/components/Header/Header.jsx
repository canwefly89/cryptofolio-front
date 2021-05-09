import React from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import Button from "../shared/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const MetaDataContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding-left: 20px;
  border-bottom: 0.8px solid lightgray;
  font-size: 0.75rem;
`;

const MetaDataItem = styled.div`
  margin-left: 20px;
  display: flex;

  span {
    display: block;
    margin-left: 6px;
  }
  span:last-child {
    font-weight: 800;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 40px;
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

const SearchContainer = styled.div`
  margin-left: auto;
  margin-right: 40px;

  input:focus {
    color: #00b4cc;
  }

  button {
  }
`;

const HeaderAuthContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8em;
  font-weight: 800;
`;

const HeaderLogin = styled.div`
  margin-right: 20px;
  cursor: pointer;
`;

const Header = (props) => {
  const { isAuthorized } = useSelector((state) => state.authReducer);
  const history = useHistory();

  return (
    <>
      <MetaDataContainer>
        <MetaDataItem>
          <span>기준 시점</span>
          <span>2021-05-09 08:00</span>
        </MetaDataItem>
        <MetaDataItem>
          <span>전체 시가총액(달러)</span>
          <span>23,907억</span>
        </MetaDataItem>
        <MetaDataItem>
          <span>전체 시가총액(원)</span>
          <span>2,391조</span>
        </MetaDataItem>
        <MetaDataItem>
          <span>비트코인 비중</span>
          <span>45.1%</span>
        </MetaDataItem>
        <MetaDataItem>
          <span>김치 프리미엄</span>
          <span>10.28%</span>
        </MetaDataItem>
      </MetaDataContainer>
      <HeaderContainer>
        <HeaderLogo onClick={() => history.push("/")}>CryptoFolio</HeaderLogo>
        <HeaderItemContainer onClick={() => history.push("/cryptofolio")}>
          <div>CryptoFolios</div>
          <div>Charts</div>
        </HeaderItemContainer>
        <WelcomeMessage>
          서성주님 환영합니다. 현재 최고 수익은
          <span> 123,450원</span> 입니다.
        </WelcomeMessage>
        <SearchContainer>
          <input placeholder="Search" type="text" />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </SearchContainer>
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
