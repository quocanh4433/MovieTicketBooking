import React, { Fragment } from 'react';
import { Route } from 'react-router'
import Footer from './Layout/Footer/Footer';
import Header from './Layout/Header/Header';

export default function HomeTemplate(props) {
    let { Component, ...restProps } = props
    return <Route  {...restProps} render={(propsRoute) => {
        return (
            <Fragment>
                <Header {...propsRoute} />
                <Component {...propsRoute} />
                <Footer {...propsRoute} />
            </Fragment>
        )
    }} />
}
