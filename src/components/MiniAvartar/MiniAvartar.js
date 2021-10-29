import React, { Fragment, useState } from 'react'
import { CaretDownOutlined, UserOutlined, SecurityScanOutlined, LogoutOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { TOKEN_CYBERSOFT, USER_LOGIN } from '../../utils/setting';
import { history } from '../../App';

export default function MiniAvartar() {
    const [visible, setVisible] = useState(false)

    /** Check user logged  */
    let userLogin = null;
    if (localStorage.getItem(USER_LOGIN)) {
        userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
    }

    const logout = () => {
        localStorage.removeItem(USER_LOGIN);
        localStorage.removeItem(TOKEN_CYBERSOFT);
        history.push('/home');
        window.location.reload()
    };

    const openSubmenu = () => {
        if (visible) {
            setVisible(false)
        } else {
            setVisible(true)
        }
        /* Close submenu when press ESC */
        document.addEventListener("keydown", (e) => {
            e = e || window.event;
            if (e.keyCode === 27) {
                setVisible(false)
            }
        })

        /* Close submenu when click another place */
        document.addEventListener('mouseup', () => {
            setVisible(false)
        });
    };

    const checkUserIsAdmin = () => {
        if (userLogin.maLoaiNguoiDung === "QuanTri" || userLogin.maLoaiNguoiDung === 'KhachHang') {
            return (
                <div className={visible ? "submenu submenu-active" : "submenu"} >
                    <NavLink to={`/profile/generalprofile/${userLogin.taiKhoan}`}>
                        <UserOutlined />
                        <span>Thông Tin</span>
                    </NavLink>
                    <NavLink to="/admin/statistic">
                        <SecurityScanOutlined />
                        <span>Quản Trị</span>
                    </NavLink>
                    <button onClick={logout}>
                        <LogoutOutlined />
                        <span>Đăng Xuất</span>
                    </button>
                </div>
            )
        } else {
            return (
                <div className={visible ? "submenu submenu-active" : "submenu"} >
                    <NavLink to={`/profile/generalprofile/${userLogin.taiKhoan}`}>
                        <UserOutlined />
                        <span>Thông Tin</span>
                    </NavLink>
                    <button onClick={logout}>
                        <LogoutOutlined />
                        <span>Đăng Xuất</span>
                    </button>
                </div>
            )
        }

    };

    const checkUserIsLogin = () => {
        if (userLogin !== null) {
            return (
                <div className="miniAvartar__wrapper--info">
                    <p>{userLogin.taiKhoan}</p>
                    <div className="avatar">
                        <img src="/images/header/avatar.fif" alt="UserName" onError={(e) => { e.target.onError = null; e.target.src = `/images/header/avatar-user.jpg` }} />
                    </div>
                    <CaretDownOutlined onClick={() => { openSubmenu() }} />
                    {checkUserIsAdmin()}
                </div>
            )
        }
        return (
            <div className="miniAvartar__wrapper--signin">
                <NavLink to="/register" className="signup">Đăng Ký</NavLink>
                <NavLink to="/login" className="c-main-btn signin">Đăng Nhập</NavLink>
            </div>
        )
    };
    return (
        <Fragment>
            {checkUserIsLogin()}
        </Fragment>
    )
}
