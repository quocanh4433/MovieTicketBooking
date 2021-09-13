import React, { Fragment } from 'react';
import Header from './Header/Header';
import { Route } from 'react-router'
import Footer from './Footer/Footer';

export default function HomeTemplate(props) {
    let { Component, ...restProps } = props

    return <Route {...restProps} render={(propsRoute) => {
        return <Fragment>
            <Header {...propsRoute} />
            <Component {...propsRoute} />
            <Footer {...propsRoute} />
        </Fragment>
    }} />
}
