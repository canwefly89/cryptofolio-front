import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Button from "../shared/Button/Button";

import useErrorMessage from "../../hooks/useErrorMessage";

const LoginContainer = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainImage = styled.img`
  max-width: 80vw;
`;

const MainTitle = styled.div`
  width: 80%;
  text-align: center;
  font-size: 4rem;
  margin-top: 2vh;
`;

const Login = ({ authService }) => {
  const dispatch = useDispatch();
  const [error, showErrorMessage] = useErrorMessage("");

  const handleLogin = useCallback(
    async (event) => {
      try {
        const loginData = await authService.login(event.target.name);
        const { email, uid, displayName } = loginData.user;
      } catch (err) {
        showErrorMessage("로그인에 실패하였습니다.");
      }
    },
    [authService, dispatch, showErrorMessage]
  );

  return (
    <LoginContainer>
      {error.length > 0 && <ErrorMessage error={error} />}
      <MainTitle>CryptoFolio</MainTitle>
      <Button
        name="Google"
        onClick={handleLogin}
        margin={["2vh", "0", "0", "0"]}
      >
        Google Login
      </Button>
    </LoginContainer>
  );
};

Login.propTypes = {
  authService: PropTypes.object.isRequired,
};

export default Login;
