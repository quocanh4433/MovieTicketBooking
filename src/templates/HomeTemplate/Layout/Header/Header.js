import React, { Fragment, useState } from 'react'
import { MenuOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll'
import { Drawer, Button, Space } from 'antd';
import { TOKEN_CYBERSOFT, USER_LOGIN } from '../../../../utils/setting';
import { history } from '../../../../App';
import MiniAvartar from '../../../../components/MiniAvartar/MiniAvartar';

/** Check user logged  */
let userLogin = null;
if (localStorage.getItem(USER_LOGIN)) {
    userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}

//========================================
// COMPONENT NAVBARMENUMOBILE
//========================================
export function NavbarMobile() {
    const [visible, setVisible] = useState(false);
    const [size, setSize] = useState();
    const PADDING_TOP = -75;

    const showDefaultDrawer = () => {
        setSize('default');
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const checkSignInBtnMobile = () => {
        if (userLogin !== null) {
            return (
                <div className="navbarMobile-btn">
                    <button activeClassName="nav-active" onClick={() => {
                        localStorage.removeItem(USER_LOGIN);
                        localStorage.removeItem(TOKEN_CYBERSOFT);
                        history.push('/home');
                        window.location.reload()
                    }}>Đăng Xuất</button>
                </div>
            )
        } else {
            return (
                <div className="navbarMobile-btn">
                    <NavLink to="/register" activeClassName="nav-active">Đăng Ký</NavLink>
                    <NavLink to="/login" activeClassName="nav-active">Đăng Nhập</NavLink>
                </div>
            )
        }
    }

    const checkUserInfoMobile = () => {
        if (userLogin !== null) {
            return (
                <Fragment>
                    <p>{userLogin?.taiKhoan}</p>
                    <div className="avatar">
                        <img src="/images/header/avatar.fif" alt="UserName" onError={(e) => { e.target.onError = null; e.target.src = `/images/header/avatar-user.jpg` }} />
                    </div>
                </Fragment>
            )
        }
        return <img src="/images/header/logo.svg" alt="Logo" />
    }

    return (
        <Fragment>
            <MenuOutlined className="navbarMobile--toggle" onClick={showDefaultDrawer} />
            <Drawer
                className="navbarMobile"
                title={`${size} Drawer`}
                placement="right"
                closeIcon={<CloseCircleOutlined />}
                size={size}
                onClose={onClose}
                visible={visible}
                extra={
                    <Space>
                        <Button onClick={() => { onClose() }}>Cancel</Button>
                        <Button type="primary" onClick={() => { onClose() }}>
                            OK
                        </Button>
                    </Space>
                }
            >
                <nav className="navbarMobile__inner">
                    {/* User info on mobile */}
                    <div className="userInfo">{checkUserInfoMobile()}</div>
                    {/* Main menu on PC and mobile */}
                    <NavLink to="/home" activeClassName="nav-active">Trang Chủ</NavLink>
                    <a href="#news" activeClass="nav-active" spy={true} offset={PADDING_TOP} onClick={() => { onClose() }}>Tin Tức</a>
                    <a href="#event" activeClass="nav-active" spy={true} offset={PADDING_TOP} onClick={() => { onClose() }}>Sự kiện</a>
                    <a href="#homeapp" activeClass="nav-active" spy={true} >Ứng Dụng</a>

                    <NavLink to="/profile/generalprofile" activeClassName="nav-active">Thông Tin</NavLink>
                    <NavLink to="/admin/statistic" activeClassName="nav-active">Quản Trị</NavLink>
                    {checkSignInBtnMobile()}
                </nav>
            </Drawer>
        </Fragment>
    )
}

//========================================
// MAIN COMPONENT HEADER
//========================================
export default function () {
    const [headerOnScroll, setHeaderOnScroll] = useState(false);
    const [menuOnMobile, setMenuOnMobile] = useState(false);
    const PADDING_TOP = -75;

    const headeronScroll = () => {
        const POSITION_DEFAULT = 80
        if (window.scrollY >= POSITION_DEFAULT) {
            setHeaderOnScroll(true)
        } else {
            setHeaderOnScroll(false)
        }
    };

    window.addEventListener("scroll", headeronScroll)

    return (
        <header className={headerOnScroll ? "header header-onScroll" : "header"}>
            <div className="header__wrapper container">
                <h1 onClick={() => { window.scrollTo(0, 0) }}>
                    <NavLink to="/home"><img src="/images/header/logo.svg" alt="Logo" /></NavLink>
                </h1>
                <nav className={menuOnMobile ? "header__wrapper--nav nav-activeOnMobile" : "header__wrapper--nav"}>
                    <NavLink to="/home" activeClassName="nav-active" onClick={() => { setMenuOnMobile(false) }}>Trang Chủ</NavLink>
                    <Link to="news" activeClass="nav-active" spy={true} offset={PADDING_TOP} onClick={() => { setMenuOnMobile(false) }}>Tin Tức</Link>
                    <Link to="event" activeClass="nav-active" spy={true} offset={PADDING_TOP} onClick={() => { setMenuOnMobile(false) }}>Sự kiện</Link>
                    <Link to="homeapp" activeClass="nav-active" spy={true} onClick={() => { setMenuOnMobile(false) }}>Ứng Dụng</Link>
                </nav>
                <MiniAvartar />
                <NavbarMobile />
            </div>
        </header>
    )
}
