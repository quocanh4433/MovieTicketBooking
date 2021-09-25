import React, { Fragment } from 'react'
import { Route } from 'react-router'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { history } from '../../App';

export default function CheckoutTemplate(props) {
    let { Component, ...restProps } = props
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    return <Route  {...restProps} render={(propsRoute) => {
        return (
            <Route  {...restProps} render={(propsRoute) => {
                return (
                    <Fragment>
                        <header className="checkout__header">
                            <div className="checkout__header-wrapper">
                                <figure onClick={() => {
                                    history.goBack()
                                }}>
                                    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M33.3333 27.0833V22.9167H14.5833V16.6667L4.16663 25L14.5833 33.3333V27.0833H33.3333Z" fill="#FF8A00" />
                                        <path d="M41.6667 6.25H22.9167C20.6188 6.25 18.75 8.11875 18.75 10.4167V18.75H22.9167V10.4167H41.6667V39.5833H22.9167V31.25H18.75V39.5833C18.75 41.8812 20.6188 43.75 22.9167 43.75H41.6667C43.9646 43.75 45.8333 41.8812 45.8333 39.5833V10.4167C45.8333 8.11875 43.9646 6.25 41.6667 6.25Z" fill="#FF8A00" />
                                    </svg>
                                </figure>
                                <div>
                                    <NavLink to="/home"><img src="/images/header/logo.svg" alt="Logo" /></NavLink>
                                </div>
                                <div className="header__wrapper--info">
                                    <p>{userLogin.taiKhoan}</p>
                                    <div className="avatar">
                                        <img src="/images/header/avatar.fif" alt="UserName" onError={(e) => { e.target.onError = null; e.target.src = `/images/header/avatar-user.jpg` }} />
                                    </div>
                                </div>
                            </div>
                        </header>

                        <Component {...propsRoute} />
                        
                    </Fragment>
                )
            }} />
        )
    }} />
}
