import React, { useCallback } from "react";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Button from "../shared/Button/Button";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import actionCreator from "../../actions/actionCreator";
import useErrorMessage from "../../hooks/useErrorMessage";
import useInput from "../../hooks/useInput";
import validateInput from "../../utils/validateInput";

const SigninPage = ({ authService }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, onChangeEmail] = useInput("");
  const [name, onChangeName] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordConfirm, onChangePasswordConfirm] = useInput("");
  const [error, showErrorMessage] = useErrorMessage("");

  const handleSignin = useCallback(
    (event) => {
      event.preventDefault();

      const inputData = {
        email,
        name,
        password,
        passwordConfirm,
      };

      const validationResult = validateInput(inputData);

      if (validationResult) {
        return showErrorMessage(validationResult);
      }

      dispatch(actionCreator.signinAction(inputData));
    },
    [dispatch, email, name, password, passwordConfirm, showErrorMessage]
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

  return (
    <>
      {error.length > 0 && <ErrorMessage error={error} />}
      <form onSubmit={handleSignin}>
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
          <label htmlFor="user-name">이름</label>
          <br />
          <input
            name="user-name"
            value={name}
            onChange={onChangeName}
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
        <div>
          <label htmlFor="user-passwordConfirm">비밀번호 확인</label>
          <br />
          <input
            name="user-passwordConfirm"
            value={passwordConfirm}
            type="password"
            onChange={onChangePasswordConfirm}
            required
          />
        </div>
        <>
          <Button
            name="Login"
            onClick={() => history.push("/login")}
            margin={["2vh", "0", "0", "0"]}
          >
            Log In
          </Button>
          <Button
            name="Google"
            onClick={handleSignin}
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
        </>
      </form>
    </>
  );
};

export default SigninPage;
