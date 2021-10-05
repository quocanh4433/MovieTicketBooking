import React from 'react'
import { NavLink } from 'react-router-dom';
import { CloseCircleOutlined } from '@ant-design/icons';
import { history } from '../../App';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../redux/actions/QuanLyNguoiDungAction';

export default function Login() {
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
        },
        onSubmit: (values) => {
            dispatch(loginAction(values))
        },
    })

    return (
        <section className="form" >
            <CloseCircleOutlined className="form__btnClose" onClick={() => {
                history.push("/home")
            }} />
            <div className="form__bg" style={{ backgroundImage: "url(./images/form/form.jpg)" }}></div>
            <div className="form__content container2">
                <div className="form__content-logo">
                    <NavLink to="/home"><img src="./images/form/logo.svg" alt="Logo" /></NavLink>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <h3>Đăng nhập</h3>
                    <div className="form__group">
                        <label>Tài Khoản</label>
                        <input type="text" name="taiKhoan" onChange={formik.handleChange} />
                    </div>
                    <div className="form__group">
                        <label>Mật Khẩu</label>
                        <input type="password" name="matKhau" onChange={formik.handleChange} />
                    </div>
                    <div className="form__btnSubmit">
                        <button type="submit" className="c-main-btn">Đăng nhập</button>
                        <p>Bạn đã có tài khoản? <NavLink to="/register">Đăng Ký</NavLink></p>
                    </div>
                </form>
            </div>
        </section>
    )
}


