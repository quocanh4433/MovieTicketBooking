import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik'
import { useDispatch } from "react-redux"
import { updateUserNotAdminAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { GROUPID } from '../../../utils/setting';
import { quanLyNguoiDungService } from '../../../services/QuanLyNguoiDungService';
import { Input } from 'antd';

export default function ChangePassword(props) {
    const [userLogin, setUserLogin] = useState({});
    /** Check match old pass */
    const [pass, setPass] = useState('');
    const [message, setMesssage] = useState('');
    /** New pass */
    const [newpass, setNewpass] = useState('');
    const [messageNew, setMessageNew] = useState('');
    /** Confrim pass */
    const [confrimpass, setConfirmpass] = useState('');
    const [messageConfrim, setMessageConfirm] = useState('');
    /** OK can submit */
    const [isSbumit, setIsSbumit] = useState(false);
    const dispatch = useDispatch();
    let oldPass = userLogin.matKhau;

    useEffect(async () => {
        try {
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
        onSubmit: (values) => {
            dispatch(updateUserNotAdminAction(values))
        },
    })

    /** 01. Nhập mật khẩu cũ  */
    const handleChangePass = (event) => {
        let { value } = event.target;
        setPass(value)
    }

    /** 02. Kiểm tra mật khẩu cũ  */
    const handleBlurPass = () => {
        if( oldPass !== pass && pass !== '' ) {
            setMesssage('Mật khẩu không đúng');
        } else if (pass === ''  ) {
            setMesssage('Mật khẩu không được bỏ trống');
        } else {
            setMesssage('');
        }
    }

    /** 03. Nhập mật khẩu mới  */
    const handleChangeNewPass = (event) => {
        let { value } = event.target;
        setNewpass(value);

        if(value === '' && value !== confrimpass) {
            setMessageNew('Mật khẩu mới không được bỏ trống')
        } else {
            setMessageNew('')
        }
    }

    /** 03. Xác nhận mật khẩu mới và kiểm tra  */
    const handleChangeConfirmpass = (event) => {
        let { value } = event.target;
        setConfirmpass(value);

        /** Nếu mk mới = xác nhận mk mới và đã nhập mật khẩu cũ => được submit  */
        if( newpass === value && newpass !== '' && value !== '' && message === '' ) {
            setMessageConfirm('');
            formik.setFieldValue('matKhau', confrimpass);
            setIsSbumit(true);
        } else {
            setMessageConfirm('Mật khẩu không khớp')
        }
    }

    return (
        <section className="c-changepass-form" >
            <form onSubmit={formik.handleSubmit}>
                <div className="c-changepass-form__group">
                    <label>Nhập mật khẩu cũ</label>
                    <Input.Password className="c-changepass-form-input" type="password" name="matKhau" onChange={handleChangePass} onBlur={handleBlurPass} />
                    <p className="c-changepass-form-error">{message}</p>
                </div>
                <div className="c-changepass-form__group">
                    <label>Nhập mật khẩu mới</label>
                    <Input.Password className="c-changepass-form-input" name="newpass" onChange={handleChangeNewPass}/>
                    <p className="c-changepass-form-error">{messageNew}</p>
                </div>
                <div className="c-changepass-form__group">
                    <label>Xác nhận mật khẩu mới</label>
                    <Input.Password className="c-changepass-form-input" name="confirmpass" onChange={handleChangeConfirmpass}/>
                    <p className="c-changepass-form-error">{messageConfrim}</p>
                </div>
                <div className="c-changepass-form__btnsubmit">
                    <button type={ isSbumit ? 'submit' : 'button' } className={ isSbumit ? "c-main-btn" : "c-main-btn c-main-btn--bgdark" }>Cập Nhật</button>
                </div>
            </form>
            <div className="c-changepass-form__notice">
                <p>
                    <strong>Lưu Ý: </strong>
                    <span>Nên cập nhật mật khẩu thường xuyên để bảo vệ tài khoản</span>
                </p>
                <p>
                    <strong>Gợi Ý: </strong>
                    <span>Nên đặt mật khẩu bảo gồm chữ hoa và ký tự đặc biệt</span>
                </p>
            </div>
        </section>
    )
}
