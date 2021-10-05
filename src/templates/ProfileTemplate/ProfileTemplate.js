import React, { Fragment } from 'react'
import { Route } from 'react-router'
import { NavLink } from 'react-router-dom';
import {
    FileDoneOutlined,
    SettingOutlined,
    FileSearchOutlined
} from '@ant-design/icons';
import HeaderCheckout from '../CheckoutTemplate/HeaderCheckout/HeaderCheckout';



export default function ProfileTemplate(props) {
    let { Component, ...restProps } = props
    const userLogin = JSON.parse(localStorage.getItem('userLogin'))

    return <Route  {...restProps} render={(propsRoute) => {
        return (
            <Route  {...restProps} render={(propsRoute) => {
                return (
                    <Fragment>
                        <HeaderCheckout userLogin={userLogin} {...propsRoute} />
                        <section className="profile container2">
                            <div className="profile__item-left">
                                <div className="profile__avatar">
                                    <div className="avatar">
                                        <img src="/images/header/avatar.fif" alt="UserName" onError={(e) => { e.target.onError = null; e.target.src = `/images/header/avatar-user.jpg` }} />
                                    </div>
                                    <p>
                                        <span>{userLogin.taiKhoan}</span>
                                        <span>{userLogin.maLoaiNguoiDung === 'KhachHang' ? "Khách Hang" : "Quản Trị"}</span>
                                    </p>
                                </div>
                                <ul>
                                    <li><NavLink to={`/profile/generalprofile/${userLogin.taiKhoan}`} activeClassName="item_active"><FileDoneOutlined /><span>Thông Tin Chung</span></NavLink></li>
                                    <li><NavLink to="/profile/changepassword" activeClassName="item_active"><SettingOutlined /><span>Thay Đổi Mật Khẩu</span></NavLink></li>
                                    <li><NavLink to={`/profile/bookinghistory/${userLogin.taiKhoan}`} activeClassName="item_active"><FileSearchOutlined /><span>Lịch Sử Đặt Vé</span></NavLink></li>
                                </ul>
                            </div>
                            <div className="profile__item-right">
                                <Component {...propsRoute} />
                            </div>
                        </section>
                    </Fragment>
                )
            }} />
        )
    }} />
}
