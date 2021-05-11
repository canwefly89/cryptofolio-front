import React, { Suspense, useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import Header from "../Header/Header";
import LoginPage from "../LoginPage/LoginPage";
import LogoutPage from "../LogoutPage/LogoutPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import LandingPage from "../LandingPage/LandingPage";
import CryptofolioPage from "../CryptofolioPage/CryptofolioPage";
import CreateCryptoFolio from "../CreateCryptoFolio/CreateCryptoFolio";
import CryptofolioDetail from "../CryptofolioDetail/CryptofolioDetail";
import SignupPage from "../SignupPage/SignupPage";
import Loading from "../Loading/Loading";
import Footer from "../Footer/Footer";

import actionCreator from "../../actions/actionCreator";

const App = ({ authService }) => {
  const { isAuthorized } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    dispatch(actionCreator.getHomeAction());
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

      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route exact path="/cryptofolio">
            <CryptofolioPage />
          </Route>

          {isAuthorized ? (
            <Switch>
              <Route exact path="/cryptofolio/new">
                <CreateCryptoFolio />
              </Route>

              <Route exact path="/cryptofolio/:cryptofolioId">
                <CryptofolioDetail />
              </Route>

              <Route path="/logout">
                <LogoutPage authService={authService} />
              </Route>
            </Switch>
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

      <Footer />
    </>
  );
};

App.propTypes = {
  authService: PropTypes.object.isRequired,
};

export default App;
