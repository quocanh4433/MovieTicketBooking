import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function Loading() {

    const { isLoading } = useSelector(state => state.LoadingReducer)

    return (
        <Fragment>
            {
                isLoading ? (
                    <div style={{
                        position: "fixed",
                        width: "100%",
                        height: "100%",
                        top: "0",
                        left: "0",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        fontSize: "30px",
                        fontWeight: "bold",
                        zIndex: 99999,
                    }}>
                        LOADING ...........
                    </div>
                ) : (
                    ""
                )
            }
        </Fragment>

    )
}
