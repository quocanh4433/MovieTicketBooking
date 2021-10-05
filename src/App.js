import React, { Suspense, lazy } from "react";
/* Setup history */
import { createBrowserHistory } from 'history';
import { Router, Switch } from 'react-router';
import "./sass/main.scss";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import Checkout from "./pages/Checkout/Checkout";
import Loading from "./components/Loading/Loading";
import Statistics from "./pages/Admin/Statistics/Statistics";
import ListFilm from "./pages/Admin/ListFilm/ListFilm";
import AddFilm from "./pages/Admin/AddFilm/AddFilm";
import ListUser from "./pages/Admin/ListUser/ListUser";
import AddUser from "./pages/Admin/AddUser/AddUser";
import EditFilm from "./pages/Admin/EditFilm/EditFilm";
import EditUser from "./pages/Admin/EditUser/EditUser";
import ChangePassword from "./pages/Profile/ChangePassword/ChangePassword";
import GeneralProfile from "./pages/Profile/GeneralProfile/GeneralProfile";
import BookingHistory from "./pages/Profile/BookingHistory/BookingHistory";
import CreateShowtime from "./pages/Admin/CreateShowtime/CreateShowtime";
import Lazyload from "./components/Lazyload/Lazyload";

export const history = createBrowserHistory()
const CheckoutTempalteLazy = lazy(() => import('./templates/CheckoutTemplate/CheckoutTemplate'));
const ProfileTemplateLazy = lazy(() => import('./templates/ProfileTemplate/ProfileTemplate'));
const AdminTemplateLazy = lazy(() => import('./templates/AdminTemplate/AdminTemplate'));
const UserTemplateLazy = lazy(() => import('./templates/UsesTemplate/UserTemplate'));
const HomeTemplateLazy = lazy(() => import('./templates/HomeTemplate/HomeTemplate'));


function App() {
  return (
    <Router history={history}>
      <Loading />
      <Suspense fallback={<Lazyload />}>
        <Switch>

          <HomeTemplateLazy exact path="/" Component={Home} />
          <HomeTemplateLazy exact path="/home" Component={Home} />
          <HomeTemplateLazy exact path="/detail/:id" Component={Detail} />

          <AdminTemplateLazy exact path="/admin/statistic" Component={Statistics} />
          <AdminTemplateLazy exact path="/admin/listfilm" Component={ListFilm} />
          <AdminTemplateLazy exact path="/admin/addfilm" Component={AddFilm} />
          <AdminTemplateLazy exact path="/admin/editfilm/:id" Component={EditFilm} />
          <AdminTemplateLazy exact path="/admin/listuser" Component={ListUser} />
          <AdminTemplateLazy exact path="/admin/adduser" Component={AddUser} />
          <AdminTemplateLazy exact path="/admin/edituser/:account" Component={EditUser} />
          <AdminTemplateLazy exact path="/admin/createshowtime/:id" Component={CreateShowtime} />

          <ProfileTemplateLazy exact path="/profile/generalprofile/:account" Component={GeneralProfile} />
          <ProfileTemplateLazy exact path="/profile/changepassword" Component={ChangePassword} />
          <ProfileTemplateLazy exact path="/profile/bookinghistory/:account" Component={BookingHistory} />

          <CheckoutTempalteLazy exact path="/checkout/:id" Component={Checkout} />
          <UserTemplateLazy exact path="/login" Component={Login} />
          <UserTemplateLazy exact path="/register" Component={Register} />

        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
