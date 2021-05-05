import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import ErrorPage from "../ErrorPage/ErrorPage";

import { checkAuthorization } from "../../actions/authActionCreators";

const App = ({ authService }) => {
  const { isAuthorized } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Switch>
      {!isAuthorized ? (
        <Login authService={authService} />
      ) : (
        <>
          <Route exact path="/"></Route>

          <Route exact path="/games"></Route>

          <Route exact path="/games/littleForest"></Route>

          <Route path="/games/littleForest/:roomId"></Route>

          <Route exact path="/games/monsterEscape"></Route>

          <Route path="/games/monsterEscape/:roomId"></Route>

          <Route exact path="/games/energyBattle"></Route>

          <Route path="/games/energyBattle/:roomId"></Route>

          <Route path="/logout">
            <Logout authService={authService} />
          </Route>

          <Route path="/error">
            <ErrorPage />
          </Route>
        </>
      )}
    </Switch>
  );
};

App.propTypes = {
  authService: PropTypes.object.isRequired,
};

export default App;
