import React from 'react';
import { NavLink } from 'react-router-dom';
import { CloseCircleOutlined } from '@ant-design/icons';
import { history } from '../../App';
import { useFormik } from 'formik'
import { GROUPID } from '../../utils/setting';
import { useDispatch } from "react-redux"
import { signupAction } from '../../redux/actions/QuanLyNguoiDungAction';
import * as Yup from "yup"


export default function Register(props) {
    const dispatch = useDispatch()
    const phoneRegex = /([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;
    const nameRegex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/

    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
            email: "",
            hoTen: "",
            soDt: "",
            maNhom: GROUPID,
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required("Tài khoản không được bỏ trống").min(6, "Tài khoản từ 6-32 ký tự").max(32, "Tài khoản từ 6-32 ký tự"),
            matKhau: Yup.string().required("Mật Khẩu không được bỏ trống"),
            hoTen: Yup.string().required("Họ Tên không được bỏ trống").matches(nameRegex, "Họ Tên không hợp lệ"),
            email: Yup.string().required("Email không được bỏ trống").email("Email không đúng định dạng"),
            soDt: Yup.string().required("Số điện thoại không được bỏ trống").matches(phoneRegex, "Số điện thoại không hợp lệ").min(10, "Số điện thoại tối thiểu 10 số").max(10, "Số điện thoại tối thiếu 10 số"),
        }),

        onSubmit: (values) => {
            dispatch(signupAction(values))
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
                    <h3>Đăng ký</h3>
                    <div className="form__group">
                        <label>Tài Khoản <span>*</span></label>
                        <input type="text" name="taiKhoan" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
                            <p>{formik.errors.taiKhoan}</p>
                        ) : null}
                    </div>
                    <div className="form__group">
                        <label>Mật Khẩu <span>*</span></label>
                        <input type="password" name="matKhau" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.matKhau && formik.errors.matKhau ? (
                            <p>{formik.errors.matKhau}</p>
                        ) : null}
                    </div>
                    <div className="form__group">
                        <label>Họ Tên <span>*</span></label>
                        <input type="text" name="hoTen" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.hoTen && formik.errors.hoTen ? (
                            <p>{formik.errors.hoTen}</p>
                        ) : null}
                    </div>
                    <div className="form__group">
                        <label>Email <span>*</span></label>
                        <input type="text" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.email && formik.errors.email ? (
                            <p>{formik.errors.email}</p>
                        ) : null}
                    </div>
                    <div className="form__group">
                        <label>Số Điện Thoại <span>*</span></label>
                        <input type="text" name="soDt" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.soDt && formik.errors.soDt ? (
                            <p>{formik.errors.soDt}</p>
                        ) : null}
                    </div>
                    <div className="form__btnSubmit">
                        <button type="submit" className="c-main-btn">Đăng ký</button>
                        <p>
                            Bạn đã có tài khoản? <NavLink to="/login">Đăng Nhập</NavLink>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    )
}
