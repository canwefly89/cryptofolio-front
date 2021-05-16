import React, { Suspense, useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import Header from "../Header/Header";
import LoginPage from "../LoginPage/LoginPage";
import LogoutPage from "../LogoutPage/LogoutPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import LandingPage from "../LandingPage/LandingPage";
import CryptoFolioPage from "../CryptoFolioPage/CryptoFolioPage";
import CreateCryptoFolio from "../CreateCryptoFolio/CreateCryptoFolio";
import CryptoFolioDetail from "../CryptoFolioDetail/CryptoFolioDetail";
import SignupPage from "../SignupPage/SignupPage";
import Loading from "../Loading/Loading";
import Footer from "../Footer/Footer";

import actionCreator from "../../actions/actionCreator";
import AllCryptoFolio from "../AllCryptoFolio/AllCryptoFolio";

const App = ({ authService }) => {
  const { isAuthorized } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const authPath = ["login", "signup"];
    const isAuthPath = authPath.some((path) =>
      location.pathname.includes(path)
    );

    if (isAuthorized && isAuthPath) {
      history.push("/");
    }
  }, [dispatch, history, isAuthorized, location.pathname]);

  useEffect(() => {
    dispatch(actionCreator.getHomeAction());
    dispatch(actionCreator.getCryptofoliosAction());
    dispatch(actionCreator.checkAuthAction());
  }, [dispatch]);

  return (
    <>
      <Header />

      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route exact path="/cryptofolio">
            <CryptoFolioPage />
          </Route>

          {isAuthorized ? (
            <Switch>
              <Route exact path="/cryptofolio/new">
                <CreateCryptoFolio />
              </Route>

              <Route exact path="/cryptofolio/all">
                <AllCryptoFolio />
              </Route>

              <Route exact path="/cryptofolio/:cryptofolioId">
                <CryptoFolioDetail />
              </Route>

              <Route path="/logout">
                <LogoutPage authService={authService} />
              </Route>
            </Switch>
          ) : (
            <Route
              path={[
                "/cryptofolio/new",
                "/cryptofolio/:cryptofolioId",
                "/logout",
                "/login",
              ]}
            >
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
