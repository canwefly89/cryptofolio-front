import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Button from "../shared/Button/Button";

import useErrorMessage from "../../hooks/useErrorMessage";
import actionCreator from "../../actions/actionCreator";
import useInput from "../../hooks/useInput";
import { useHistory } from "react-router-dom";
import validateInput from "../../utils/validateInput";

const LoginContainer = styled.section`
  width: 100vw;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background-color: black;
  color: white;
`;

const MainTitle = styled.div`
  margin-top: 300px;
  margin-bottom: 60px;
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-weight: 800;
  font-size: 3.7rem;
`;

const LoginPage = ({ authService }) => {
  const { loginError } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, showErrorMessage] = useErrorMessage("");
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const inputData = {
        email,
        password,
      };

      const validationResult = validateInput(inputData);

      if (validationResult) {
        return showErrorMessage(validationResult);
      }

      dispatch(actionCreator.loginAction(inputData));
    },
    [dispatch, email, password, showErrorMessage]
  );

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

  useEffect(() => {
    if (loginError) {
      showErrorMessage(loginError);
      dispatch(actionCreator.resetErrorMessage());
    }
  }, [dispatch, loginError, showErrorMessage]);

  return (
    <LoginContainer>
      {error.length > 0 && <ErrorMessage error={error} />}
      <MainTitle>Log In</MainTitle>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <input
            name="user-email"
            value={email}
            onChange={onChangeEmail}
            required
          />
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

        <Button
          name="Login"
          onClick={handleLogin}
          margin={["2vh", "0", "0", "0"]}
        >
          Log In
        </Button>
        <Button
          name="Google"
          onClick={() => history.push("/signin")}
          margin={["2vh", "0", "0", "0"]}
        >
          Sign In
        </Button>
        <Button
          name="Google"
          onClick={handleSocialLogin}
          margin={["2vh", "0", "0", "0"]}
        >
          Google Login
        </Button>
      </form>
    </LoginContainer>
  );
};

LoginPage.propTypes = {
  authService: PropTypes.object.isRequired,
};

export default LoginPage;
