import React from "react";
/* Setup history */
import { createBrowserHistory } from 'history';
import { Router, Switch } from 'react-router';
import "./sass/main.scss";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import UserTemplate from "./templates/UsesTemplate/UserTemplate";
import Detail from "./pages/Detail/Detail";
import Checkout from "./pages/Checkout/Checkout";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import Loading from "./components/Loading/Loading";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import Statistics from "./pages/Admin/Statistics/Statistics";
import ListFilm from "./pages/Admin/ListFilm/ListFilm";
import AddFilm from "./pages/Admin/AddFilm/AddFilm";
import ListUser from "./pages/Admin/ListUser/ListUser";
import AddUser from "./pages/Admin/AddUser/AddUser";
import EditFilm from "./pages/Admin/EditFilm/EditFilm";
import ChiTiet from "./pages/ChiTiet/ChiTiet";

export const history = createBrowserHistory()

function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <HomeTemplate exact path="/" Component={Home} />
        <HomeTemplate exact path="/home" Component={Home} />
        <HomeTemplate exact path="/detail/:id" Component={Detail} />

        <CheckoutTemplate exact path="/checkout/:id" Component={Checkout} />

        <AdminTemplate exact path="/admin" Component={Statistics} />
        <AdminTemplate exact path="/admin/listfilm" Component={ListFilm} />
        <AdminTemplate exact path="/admin/addfilm" Component={AddFilm} />
        <AdminTemplate exact path="/admin/editfilm/:id" Component={EditFilm} />
        <AdminTemplate exact path="/admin/listuser" Component={ListUser} />
        <AdminTemplate exact path="/admin/adduser" Component={AddUser} />
        
        <UserTemplate exact path="/login" Component={Login} />
        <UserTemplate exact path="/register" Component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
