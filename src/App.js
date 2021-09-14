import React from "react";
/* Setup history */
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router';
import "./sass/main.scss";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import News from "./pages/News/News";
import Register from "./pages/Register/Register";
import Theater from "./pages/Theater/Theater";
import Apps from "./pages/App/Apps";

export const history = createBrowserHistory()

function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate exact path="/" Component={Home} />
        <HomeTemplate exact path="/home" Component={Home} />
        <HomeTemplate exact path="/theater" Component={Theater} />
        <HomeTemplate exact path="/news" Component={News} />
        <HomeTemplate exact path="/apps" Component={Apps} />
        <HomeTemplate exact path="/login" Component={Login} />
        <HomeTemplate exact path="/register" Component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
