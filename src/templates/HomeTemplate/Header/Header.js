import React, { useState } from 'react'
import { CaretDownOutlined, UserOutlined, SecurityScanOutlined, LogoutOutlined } from '@ant-design/icons';


export default function Header() {
    const userLogin = true;
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
            <a href="#" className="signup">Đăng Ký</a>
            <a href="#" className="c-main-btn signin">Đăng Nhập</a>
        </div>
    };

    window.addEventListener("scroll", headeronScroll)

    return (
        <header className={headerOnScroll ? "header header-onScroll" : "header"}>
            <div className="header__wrapper container">
                <h1>
                    <a href="#"><img src="./images/header/logo.svg" alt="Logo" /></a>
                </h1>
                <nav className="header__wrapper--nav">
                    <a className="nav-active" href="#">Trang Chủ</a>
                    <a href="#">Cụm Rạp</a>
                    <a href="#">Tin Tức</a>
                    <a href="#">Ứng Dụng</a>
                </nav>
                {checkUserLogin()}
            </div>
        </header>
    )
}
