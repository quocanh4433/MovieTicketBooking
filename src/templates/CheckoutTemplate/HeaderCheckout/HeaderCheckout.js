import React from 'react'
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import { clearSeatOvertimeAction } from '../../../redux/actions/QuanLyDatVeAction';
import { useDispatch } from "react-redux"
import { NavbarMobile } from '../../HomeTemplate/Layout/Header/Header';
import MiniAvartar from '../../../components/MiniAvartar/MiniAvartar';


export default function HeaderCheckout(props) {
    const { userLogin } = props
    const dispatch = useDispatch()
    return (
        <header className="checkout__header">
            <div className="checkout__header-wrapper">
                <figure onClick={() => {
                    dispatch(clearSeatOvertimeAction())
                    history.push('/home')
                }}>
                    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M33.3333 27.0833V22.9167H14.5833V16.6667L4.16663 25L14.5833 33.3333V27.0833H33.3333Z" fill="#FF8A00" />
                        <path d="M41.6667 6.25H22.9167C20.6188 6.25 18.75 8.11875 18.75 10.4167V18.75H22.9167V10.4167H41.6667V39.5833H22.9167V31.25H18.75V39.5833C18.75 41.8812 20.6188 43.75 22.9167 43.75H41.6667C43.9646 43.75 45.8333 41.8812 45.8333 39.5833V10.4167C45.8333 8.11875 43.9646 6.25 41.6667 6.25Z" fill="#FF8A00" />
                    </svg>
                </figure>
                <div className="checkout__header-logo">
                    <NavLink to="/home"><img src="/images/header/logo.svg" alt="Logo" /></NavLink>
                </div>
                <MiniAvartar />
                <NavbarMobile />
            </div>
        </header>

    )
}
