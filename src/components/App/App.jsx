import React, { Suspense, useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import Header from "../Header/Header";
import LoginPage from "../LoginPage/LoginPage";
import LogoutPage from "../LogoutPage/LogoutPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import LandingPage from "../LandingPage/LandingPage";
import CryptofolioPage from "../CryptofolioPage/PortfolioPage";
import CreateCryptoFolio from "../CreateCryptoFolio/CreateCryptoFolio";
import CryptofolioDetail from "../CryptofolioDetail/CryptofolioDetail";
import SignupPage from "../SignupPage/SignupPage";
import Loading from "../Loading/Loading";
import Footer from "../Footer/Footer";

import actionCreator from "../../actions/actionCreator";
import styled from "styled-components";

const Main = styled.div`
  flex: 1;
`;

const App = ({ authService }) => {
  const { isAuthorized } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    dispatch(actionCreator.checkAuthAction());

    const authPath = ["login", "signup"];
    const isAuthPath = authPath.some((path) =>
      location.pathname.includes(path)
    );

    if (isAuthorized && isAuthPath) {
      history.push("/");
    }
  }, [dispatch, history, isAuthorized, location.pathname]);

  return (
    <>
      <Header />
      <Main>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>

            <Route exact path="/cryptofolio">
              <CryptofolioPage />
            </Route>

            {isAuthorized ? (
              <>
                <Route exact path="/cryptofolio/new">
                  <CreateCryptoFolio />
                </Route>
                <Route path="/cryptofolio/:cryptofolioId">
                  <CryptofolioDetail />
                </Route>
                <Route path="/logout">
                  <LogoutPage authService={authService} />
                </Route>
              </>
            ) : (
              <Route path="/login">
                <LoginPage authService={authService} />
              </Route>
            )}

            <Route path="/signup">
              <SignupPage authService={authService} />
            </Route>

            <Route path="/error">
              <ErrorPage />
            </Route>
          </Switch>
        </Suspense>
      </Main>
      <Footer />
    </>
  );
};

App.propTypes = {
  authService: PropTypes.object.isRequired,
};

export default App;
