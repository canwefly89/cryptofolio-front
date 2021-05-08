import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

import actionCreator from "../../actions/actionCreator";
import Button from "../shared/Button/Button";

const LogoutContainer = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoutMessage = styled.div`
  font-size: 3rem;
  font-weight: 600;
`;

const LogoutPage = ({ authService }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = useCallback(async () => {
    dispatch(actionCreator.logoutAction());
    await authService.logout();
    history.push("/");
  }, [authService, dispatch, history]);

  return (
    <LogoutContainer>
      <LogoutMessage>로그아웃 하시겠습니까?</LogoutMessage>
      <Button
        onClick={onLogout}
        margin={["5vh", "0", "0", "1vw"]}
        bgColor={"#eb4d4b"}
        fontWeight={"600"}
      >
        로그아웃
      </Button>
      <Button
        onClick={() => history.push("/")}
        margin={["1vh", "0", "0", "1vw"]}
        fontWeight={"600"}
      >
        돌아가기
      </Button>
    </LogoutContainer>
  );
};

LogoutPage.propTypes = {
  authService: PropTypes.object.isRequired,
};

export default LogoutPage;
