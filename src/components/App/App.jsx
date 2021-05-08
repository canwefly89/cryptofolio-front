import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import LoginPage from "../LoginPage/LoginPage";
import LogoutPage from "../LogoutPage/LogoutPage";
import ErrorPage from "../ErrorPage/ErrorPage";

import LandingPage from "../LandingPage/LandingPage";
import CryptofolioPage from "../CryptofolioPage/PortfolioPage";
import CreateCryptoFolio from "../CreateCryptoFolio/CreateCryptoFolio";
import CryptofolioDetail from "../CryptofolioDetail/CryptofolioDetail";
import SigninPage from "../SigninPage/SigninPage";

const App = ({ authService }) => {
  const { isAuthorized } = useSelector((state) => state.authReducer);

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
          </>
        ) : (
          <Route exact path="/login">
            <LoginPage authService={authService} />
          </Route>
        )}

        <Route exact path="/login">
          <LoginPage authService={authService} />
        </Route>

        <Route path="/logout">
          <LogoutPage authService={authService} />
        </Route>

        <Route path="/signin">
          <SigninPage />
        </Route>

        <Route path="/error">
          <ErrorPage />
        </Route>
      </Switch>
    </Suspense>
  );
};

App.propTypes = {
  authService: PropTypes.object.isRequired,
};

export default App;
