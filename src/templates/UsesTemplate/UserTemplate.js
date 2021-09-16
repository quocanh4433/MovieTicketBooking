import React, { Fragment } from 'react'

export default function UserTemplate(props) {
    let { Component, ...restProps } = props
    return (
        <Fragment {...restProps}>
            <Component {...restProps} />
        </Fragment>
    )
}
