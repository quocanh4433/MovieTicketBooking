import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Spin } from "antd"

export default function Loading() {

    const { isLoading } = useSelector(state => state.LoadingReducer)

    return (
        <Fragment>
            {
                isLoading ? (
                    <div className="loading">
                        <Spin size="large"/>
                    </div>
                ) : ""
            }
        </Fragment>

    )
}
