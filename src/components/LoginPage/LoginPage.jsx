import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Button from "../shared/Button/Button";

import useErrorMessage from "../../hooks/useErrorMessage";
// import { loginAction, socialLoginAction } from "../../actions/actionCreator";
import actionCreator from "../../actions/actionCreator";
import useInput from "../../hooks/useInput";
import { useHistory } from "react-router-dom";

const LoginContainer = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainTitle = styled.div`
  width: 80%;
  text-align: center;
  font-size: 4rem;
  margin-top: 2vh;
`;

const LoginPage = ({ authService }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, showErrorMessage] = useErrorMessage("");
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");

  const handleLogin = useCallback(async () => {}, []);

  const handleSocialLogin = useCallback(
    async (event) => {
      try {
        const loginData = await authService.login(event.target.name);
        const data = {
          email: loginData.user.email,
          name: loginData.user.displayName,
        };

        dispatch(actionCreator.socialLoginAction(data));
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
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <input
          name="user-password"
          value={password}
          type="password"
          onChange={onChangePassword}
          required
        />
      </div>
      <>
        <Button
          name="Login"
          onClick={handleLogin}
          margin={["2vh", "0", "0", "0"]}
        >
          Login
        </Button>
        <Button
          name="Google"
          onClick={() => history.push("/signin")}
          margin={["2vh", "0", "0", "0"]}
        >
          SignIn
        </Button>
        <Button
          name="Google"
          onClick={handleSocialLogin}
          margin={["2vh", "0", "0", "0"]}
        >
          Google Login
        </Button>
      </>
    </LoginContainer>
  );
};

LoginPage.propTypes = {
  authService: PropTypes.object.isRequired,
};

export default LoginPage;
