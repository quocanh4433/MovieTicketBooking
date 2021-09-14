import React, { useState } from 'react'
import { CaretDownOutlined, UserOutlined, SecurityScanOutlined, LogoutOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom'

export default function Header() {
    const userLogin = false;
    const maLoaiNguoiDung = "quantri";
    const [headerOnScroll, setHeaderOnScroll] = useState(false)

    const headeronScroll = () => {
        const POSITION_DEFAULT = 80
        if (window.scrollY >= POSITION_DEFAULT) {
            setHeaderOnScroll(true)
        } else {
            setHeaderOnScroll(false)
        }
    };

    const openSubmenu = () => {
        let submenu = document.querySelector(".submenu");
        submenu.classList.toggle("submenu-active");
        /* Close submenu when press ESC */
        document.addEventListener("keydown", (e) => {
            e = e || window.event;
            if (e.keyCode == 27) {
                submenu.classList.remove("submenu-active");
            }
        })
        /* Close submenu when click another place */
        document.addEventListener('mouseup', (e) => {
            let isActive = submenu.classList.contains("submenu-active");
            if (isActive) {
                submenu.classList.remove("submenu-active");
            }
        });
    };

    const checkUserIsAdmin = () => {
        if (maLoaiNguoiDung == "quantri") {
            return <div className="submenu" >
                <a href="#">
                    <UserOutlined />
                    <span>Thông Tin</span>
                </a>
                <a href="#">
                    <SecurityScanOutlined />
                    <span>Quản Trị</span>
                </a>
                <a href="#">
                    <LogoutOutlined />
                    <span>Đăng Xuất</span>
                </a>
            </div>
        }
        return <div className="submenu" >
            <a href="#">
                <UserOutlined />
                <span>Thông Tin</span>
            </a>
            <a href="#">
                <LogoutOutlined />
                <span>Đăng Xuất</span>
            </a>
        </div>
    };

    const checkUserLogin = () => {
        if (userLogin) {
            return <div className="header__wrapper--info">
                <p>David De Gea</p>
                <div className="avatar">
                    <img src="/images/header/avatar.jfif" alt="UserName" />
                </div>
                <CaretDownOutlined onClick={openSubmenu} />
                {checkUserIsAdmin()}
            </div>
        }
        return <div className="header__wrapper--signin">
            <NavLink to="/register" className="signup">Đăng Ký</NavLink>
            <NavLink to="/login" className="c-main-btn signin">Đăng Nhập</NavLink>
        </div>
    };

    window.addEventListener("scroll", headeronScroll)

    return (
        <header className={headerOnScroll ? "header header-onScroll" : "header"}>
            <div className="header__wrapper container">
                <h1>
                    <NavLink to="/home"><img src="./images/header/logo.svg" alt="Logo" /></NavLink>
                </h1>
                <nav className="header__wrapper--nav">
                    <NavLink to="/home" activeClassName="nav-active">Trang Chủ</NavLink>
                    <NavLink to="/theater" activeClassName="nav-active">Cụm Rạp</NavLink>
                    <NavLink to="/news" activeClassName="nav-active">Tin Tức</NavLink>
                    <NavLink to="/apps" activeClassName="nav-active">Ứng Dụng</NavLink>
                </nav>
                {checkUserLogin()}
            </div>
        </header>
    )
}
