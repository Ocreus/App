import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store/store";
import { loadUser } from "./store/action/auth";
import setAuthToken from "./store/utils/setAuthToken";

import Alert from "./components/layout/Alert";
import Navbar from "./components/layout/Navbar";
import Index from "./components/Index";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/secure/Dashboad";
import Forum from "./components/secure/Forum";
import Message from "./components/secure/Message";
import Account from "./components/secure/Account";
import NotFound from "./components/NotFound";

import PrivateRoute from "./routing/PrivateRoute";

function App() {
  useEffect(() => {
    setAuthToken();
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/anmelden" component={Login} />
            <Route exact path="/registrieren" component={Register} />
            <PrivateRoute
              exact
              path="/private/dashboard"
              component={Dashboard}
            />
            <PrivateRoute exact path="/private/forum" component={Forum} />
            <PrivateRoute
              exact
              path="/private/nachrichten"
              component={Message}
            />
            <PrivateRoute exact path="/private/konto" component={Account} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
