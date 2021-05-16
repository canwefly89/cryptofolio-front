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
import Input from "../shared/Input/Input";

const LoginContainer = styled.section`
  width: 100vw;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
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

const LoginForm = styled.form`
  width: 300px;
`;

const LoginLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const LoginInputBox = styled.div`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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
      <LoginForm onSubmit={handleLogin}>
        <LoginInputBox>
          <LoginLabel htmlFor="user-email">이메일</LoginLabel>

          <Input
            name="user-email"
            value={email}
            onChange={onChangeEmail}
            required
          />
        </LoginInputBox>
        <LoginInputBox>
          <LoginLabel htmlFor="user-password">비밀번호</LoginLabel>

          <Input
            name="user-password"
            value={password}
            type="password"
            onChange={onChangePassword}
            required
          />
        </LoginInputBox>

        <ButtonContainer>
          <Button
            name="Login"
            onClick={handleLogin}
            margin={["0", "5px", "0", "5px"]}
            bgColor={"#f1c40f"}
            color={"black"}
          >
            Log In
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button
            name="Signup"
            onClick={() => history.push("/signup")}
            margin={["10px", "5px", "0", "5px"]}
          >
            Sign Up
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button
            name="Google"
            onClick={handleSocialLogin}
            margin={["10px", "5px", "0", "5px"]}
          >
            Google Login
          </Button>
        </ButtonContainer>
      </LoginForm>
    </LoginContainer>
  );
};

LoginPage.propTypes = {
  authService: PropTypes.object.isRequired,
};

export default LoginPage;
