import React, { Fragment } from 'react'
import { Route } from 'react-router'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { USER_LOGIN } from '../../utils/setting';
import HeaderCheckout from './HeaderCheckout/HeaderCheckout';


export default function CheckoutTemplate(props) {
    let { Component, ...restProps } = props
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)

    if(!localStorage.getItem(USER_LOGIN)){
        return <Redirect to="/login" />
    }

    return <Route  {...restProps} render={(propsRoute) => {
        return (
            <Route  {...restProps} render={(propsRoute) => {
                return (
                    <Fragment>
                        <HeaderCheckout userLogin={userLogin} {...propsRoute}/>
                        <Component {...propsRoute} />
                    </Fragment>
                )
            }} />
        )
    }} />
}
