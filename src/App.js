import React from "react";
/* Setup history */
import { createBrowserHistory } from 'history';
import { Router, Switch } from 'react-router';
import "./sass/main.scss";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import News from "./pages/News/News";
import Register from "./pages/Register/Register";
import Theater from "./pages/Theater/Theater";
import Apps from "./pages/App/Apps";
import UserTemplate from "./templates/UsesTemplate/UserTemplate";
import Detail from "./pages/Detail/Detail";
import Checkout from "./pages/Checkout/Checkout";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import Loading from "./components/Loading/Loading";

export const history = createBrowserHistory()

function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <HomeTemplate exact path="/" Component={Home} />
        <HomeTemplate exact path="/home" Component={Home} />
        <HomeTemplate exact path="/theater" Component={Theater} />
        <HomeTemplate exact path="/news" Component={News} />
        <HomeTemplate exact path="/apps" Component={Apps} />
        <HomeTemplate exact path="/detail/:id" Component={Detail} />
        <CheckoutTemplate exact path="/checkout/:id" Component={Checkout} />
        <UserTemplate exact path="/login" Component={Login} />
        <UserTemplate exact path="/register" Component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
