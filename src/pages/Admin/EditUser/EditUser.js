import React, { Fragment, useState, useEffect } from 'react'
import {
    Form,
    Input,
    message,
    InputNumber,

} from 'antd';
import { useFormik } from 'formik';
import * as Yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { GROUPID } from '../../../utils/setting';
import { Select } from 'antd'
import { addUserAction, editUserAction, updateUserAction } from '../../../redux/actions/QuanLyNguoiDungAction';
const { Option } = Select;


export default function EditUser(props) {
    const { userEdit } = useSelector(state => state.QuanLyNguoiDungReducer)
    const phoneRegex = /([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;
    const nameRegex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
    const dispatch = useDispatch();

    useEffect(() => {
        let { account } = props.match.params;
        dispatch(editUserAction(account));
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maLoaiNguoiDung: userEdit.maLoaiNguoiDung,
            hoTen: userEdit.hoTen,
            taiKhoan: userEdit.taiKhoan,
            soDt: userEdit.soDt,
            matKhau: userEdit.matKhau,
            manhom: GROUPID,
            email: userEdit.email,
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required("Tài khoản không được bỏ trống").min(6, "Tài khoản từ 6-32 ký tự").max(32, "Tài khoản từ 6-32 ký tự"),
            matKhau: Yup.string().required("Mật Khẩu không được bỏ trống"),
            hoTen: Yup.string().required("Họ Tên không được bỏ trống").matches(nameRegex, "Họ Tên không hợp lệ"),
            email: Yup.string().required("Email không được bỏ trống").email("Email không đúng định dạng"),
            soDt: Yup.string().required("Số điện thoại không được bỏ trống").matches(phoneRegex, "Số điện thoại không hợp lệ").min(10, "Số điện thoại tối thiểu 10 số").max(10, "Số điện thoại tối thiếu 10 số"),

        }),
        onSubmit: (values) => {
            console.log(values)
            dispatch(updateUserAction(values))
            success()
        }
    })

    /** For Message */
    const success = () => {
        message
            .loading({
                content: 'Tiến hành cập nhật người dùng',
            }, 1.5)
            .then(() => message.success({
                content: 'Cập nhật người dùng hoàn tất',
            }, 1.5))
    };


    const handleSelectChange = (values) => {
        formik.setFieldValue("maLoaiNguoiDung", values);
    }

    return (
        <Fragment>
            <h3 className="c-admin-title">Cập nhật người dùng</h3>
            <Form
                onSubmitCapture={
                    formik.handleSubmit
                }
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                className="form-addfilm"
            >
                <Form.Item className="c-form__group" label="Tài khoản">
                    <Input disabled name="taiKhoan" onChange={formik.handleChange} value={formik.values.taiKhoan} />
                    {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
                        <p className="error">{formik.errors.taiKhoan}</p>
                    ) : null}
                </Form.Item>
                <Form.Item className="c-form__group" label="Mật Khẩu">
                    <Input.Password name="matKhau" onChange={formik.handleChange} value={formik.values.matKhau}/>
                    {formik.touched.matKhau && formik.errors.matKhau ? (
                        <p className="error">{formik.errors.matKhau}</p>
                    ) : null}
                </Form.Item>
                <Form.Item className="c-form__group" label="Họ Tên">
                    <Input name="hoTen" onChange={formik.handleChange} value={formik.values.hoTen} />
                    {formik.touched.hoTen && formik.errors.hoTen ? (
                        <p className="error">{formik.errors.hoTen}</p>
                    ) : null}
                </Form.Item>
                <Form.Item className="c-form__group" label="Email">
                    <Input name="email" onChange={formik.handleChange} value={formik.values.email}/>
                    {formik.touched.email && formik.errors.email ? (
                        <p className="error">{formik.errors.email}</p>
                    ) : null}
                </Form.Item>
                <Form.Item className="c-form__group" label="Số điện thoại">
                    <Input name="soDt" rows="4" onChange={formik.handleChange} value={formik.values.soDt}/>
                    {formik.touched.soDt && formik.errors.soDt ? (
                        <p className="error">{formik.errors.soDt}</p>
                    ) : null}
                </Form.Item>
                <Form.Item className="c-form__group" label="Mã Nhóm">
                    <InputNumber disabled name="maNhom" value={GROUPID} />
                </Form.Item>
                <Form.Item className="c-form__group" label="Loại Người dùng">
                    <Select
                        name="maLoaiNguoiDung"
                        placeholder="Chọn loại người dùng ..."
                        onChange={handleSelectChange}
                        allowClear
                        value={formik.values.maLoaiNguoiDung}
                    >
                        <Option value="KhachHang">Khách Hàng</Option>
                        <Option value="QuanTri">Quản Trị</Option>
                    </Select>
                    {formik.touched.maLoaiNguoiDung && formik.errors.maLoaiNguoiDung ? (
                        <p className="error">{formik.errors.maLoaiNguoiDung}</p>
                    ) : null}
                </Form.Item>
                <Form.Item className="c-form__group" label="Chức năng">
                    <button type="submit" className="c-main-btn c-main-btn--paddingsmall" >Cập nhật Người Dùng</button>
                </Form.Item>
            </Form>
        </Fragment>
    )
}
