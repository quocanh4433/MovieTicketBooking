import React from "react";
/* Setup history */
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router';
import "./sass/main.scss";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";

export const history = createBrowserHistory()

function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate exact to="/" Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
