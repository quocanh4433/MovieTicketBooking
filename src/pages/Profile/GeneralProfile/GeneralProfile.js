import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik'
import { useDispatch } from "react-redux"
import { updateUserNotAdminAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { GROUPID } from '../../../utils/setting';
import { quanLyNguoiDungService } from '../../../services/QuanLyNguoiDungService';
import { message } from 'antd';
import * as Yup from "yup";

export default function GeneralProfile(props) {
    
    const [userLogin, setUserLogin] = useState({});
    const [changeValue, setChangeValue] = useState(false)
    const dispatch = useDispatch();
    const phoneRegex = /([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;
    const nameRegex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/

    useEffect(async () => {
        try {
            message.success({content: "Vui lòng đợi dữ liệu được tải về",}, 2)
            let account = props.match.params.account
            const result = await quanLyNguoiDungService.getUserDetail(account)
            setUserLogin(result.data.content)
        } catch (error) {
            console.log('Error: ', error)
        }
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: userLogin.taiKhoan,
            matKhau: userLogin.matKhau,
            email: userLogin.email,
            hoTen: userLogin.hoTen,
            soDt: '0906666666',
            maNhom: GROUPID,
            maLoaiNguoiDung: userLogin.maLoaiNguoiDung,
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required("Tài khoản không được bỏ trống").min(6, "Tài khoản từ 6-32 ký tự").max(32, "Tài khoản từ 6-32 ký tự"),
            matKhau: Yup.string().required("Mật Khẩu không được bỏ trống"),
            hoTen: Yup.string().required("Họ Tên không được bỏ trống").matches(nameRegex, "Họ Tên không hợp lệ"),
            email: Yup.string().required("Email không được bỏ trống").email("Email không đúng định dạng"),
            soDt: Yup.string().required("Số điện thoại không được bỏ trống").matches(phoneRegex, "Số điện thoại không hợp lệ").min(10, "Số điện thoại tối thiểu 10 số").max(10, "Số điện thoại tối thiếu 10 số"),
        }),

        onSubmit: (values) => {
            dispatch(updateUserNotAdminAction(values))
        },
    })

    return (
        <section className="c-profile-form" >
            <form onSubmit={formik.handleSubmit}>
                <div className="c-profile-form__wrapper">
                    <div className="c-profile-form__group">
                        <div className="c-profile-form__inner">
                            <label>Tài Khoản</label>
                            <input disabled type="text" name="taiKhoan" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.taiKhoan} />
                        </div>
                        {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
                            <p className="c-profile-form__error">{formik.errors.taiKhoan}</p>
                        ) : null}
                    </div>
                    <div className="c-profile-form__group">
                        <div className="c-profile-form__inner">
                            <label>Họ Tên</label>
                            <input disabled={changeValue ? false : true} className={changeValue ? "input-active" : ""} type="text" name="hoTen" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.hoTen} />
                        </div>
                        {formik.touched.hoTen && formik.errors.hoTen ? (
                            <p className="c-profile-form__error">{formik.errors.hoTen}</p>
                        ) : null}
                    </div>
                </div>
                <div className="c-profile-form__wrapper">
                    <div className="c-profile-form__group">
                        <div className="c-profile-form__inner">
                            <label>Mật Khẩu</label>
                            <input disabled type="password" name="matKhau" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.matKhau} />
                        </div>
                        {formik.touched.matKhau && formik.errors.matKhau ? (
                            <p className="c-profile-form__error">{formik.errors.matKhau}</p>
                        ) : null}
                    </div>
                    <div className="c-profile-form__group">
                        <div className="c-profile-form__inner">
                            <label>Email</label>
                            <input disabled={changeValue ? false : true} className={changeValue ? "input-active" : ""} type="text" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                            <p className="c-profile-form__error">{formik.errors.email}</p>
                        ) : null}
                    </div>
                </div>
                <div className="c-profile-form__wrapper">
                    <div className="c-profile-form__group">
                        <div className="c-profile-form__inner">
                            <label>Người dùng</label>
                            <input disabled type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.maLoaiNguoiDung === "KhachHang" ? "Khách Hàng" : "Quản Trị"} />
                        </div>
                        {formik.touched.matKhau && formik.errors.matKhau ? (
                            <p className="c-profile-form__error">{formik.errors.matKhau}</p>
                        ) : null}
                    </div>
                    <div className="c-profile-form__group">
                        <div className="c-profile-form__inner">
                            <label>Số Điện Thoại</label>
                            <input disabled={changeValue ? false : true}  className={changeValue ? "input-active" : ""} type="text" name="soDt" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.soDt} />
                        </div>
                        {formik.touched.soDt && formik.errors.soDt ? (
                            <p className="c-profile-form__error">{formik.errors.soDt}</p>
                        ) : null}
                    </div>
                </div>
                <div className="c-profile-form__btnsubmit">
                    <button type={ changeValue ? 'button' : 'submit'} className="c-main-btn" onClick={() => {
                        changeValue ? setChangeValue(false) : setChangeValue(true)
                    }}>{changeValue ? "Cập nhật" : "Thay đổi"}</button>
                </div>
            </form>
        </section>
    )
}
