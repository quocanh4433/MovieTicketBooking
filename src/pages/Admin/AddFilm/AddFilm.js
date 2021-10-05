import React, { Fragment, useState } from 'react'
import {
    Form,
    Input,
    DatePicker,
    InputNumber,
    Switch,
} from 'antd';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux'
import { GROUPID } from '../../../utils/setting';
import { addFilmAction } from '../../../redux/actions/QuanLyPhimAction';
import { UploadOutlined } from '@ant-design/icons'
import moment from 'moment'


export default function AddFilm() {
    const [img, setImg] = useState("/images/common/error-img.jpg");
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            maPhim: "",
            tenPhim: "",
            trailer: "",
            moTa: "",
            manhom: GROUPID,
            ngayKhoiChieu: "",
            sapChieu: false,
            dangChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {}
        },
        onSubmit: (values) => {
            /**
                Taọ đối tượng FormData
                Đây là đối tượng browser đưa dữ liệu về backend => bảo mật hơn
            */
            let formData = new FormData()
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    formData.append('File', values.hinhAnh, values.hinhAnh.name)
                }
            }
            dispatch(addFilmAction(formData))
        }
    })

    const handleChangePicker = (date) => {
        const dateLocal = moment(date).format("DD/MM/YYYY");
        console.log(dateLocal)
        formik.setFieldValue('ngayKhoiChieu', dateLocal)
    }

    const handleChangeFile = (event) => {
        /** 
            01.
            Lấy file từ event 
            Tránh trường hợp upload quá nhiều hình nên chỉ lấy file dầu tiên
        */
        let file = event.target.files[0]; // 

        /** 
            02.
            Tạo ra đối tuong của js để đọc file
            Để đọc file dùng reader (đối tượng của js)
        */
        let reader = new FileReader();
        reader.readAsDataURL(file)

        reader.onload = async (e) => {
            /** Set stage để hiện thị ra giao diện */
            setImg(e.target.result)
        }
        /** Sau đó set dữ liệu vào formik */
        formik.setFieldValue('hinhAnh', file)
    }

    return (
        <Fragment>
            <h3 className="c-admin-title">thêm phim</h3>
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
                <Form.Item className="c-form__group" label="Mã Phim">
                    <Input name="maPhim" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item className="c-form__group" label="Tên phim">
                    <Input name="tenPhim" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item className="c-form__group" label="Trailer">
                    <Input name="trailer" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item className="c-form__group" label="Mô tả">
                    <Input.TextArea name="moTa" rows="4" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item className="c-form__group" label="Ngày khởi chiếu">
                    <DatePicker name="ngayKhoiChieu" format="DD/MM/YYYY" onChange={handleChangePicker} />
                </Form.Item>
                <Form.Item className="c-form__group" label="Đang chiếu" valuePropName="checked">
                    <Switch name="dangChieu" onChange={(checked) => { formik.setFieldValue('dangChieu', checked) }} />
                </Form.Item>
                <Form.Item className="c-form__group" label="Sắp chiếu" valuePropName="checked">
                    <Switch name="sapChieu" onChange={(checked) => { formik.setFieldValue('sapChieu', checked) }} />
                </Form.Item>
                <Form.Item className="c-form__group" label="Hot" valuePropName="checked">
                    <Switch name="hot" onChange={(checked) => { formik.setFieldValue('hot', checked) }} />
                </Form.Item>
                <Form.Item className="c-form__group" label="Đánh giá">
                    <InputNumber name="danhGia" onChange={(value) => { formik.setFieldValue('danhGia', value) }} />
                </Form.Item>
                <Form.Item className="c-form__group" label="Hình ảnh">
                    <div className="c-form-control">
                        <input type="file" name="hinhAnh" id="file" className="inputfile" accept="image/png, image/jpg, image/jpeg, image/gif" onChange={handleChangeFile} />
                        <label for="file"> <UploadOutlined /> Choose a file</label>
                    </div>
                    {/* <input type="file" name="hinhAnh" accept="image/png, image/jpg, image/jpeg, image/gif" onChange={handleChangeFile} /> */}
                    <img src={img} alt='...' className="img-upload" />
                </Form.Item>
                <Form.Item className="c-form__group" label="Chức năng">
                    <button type="submit" className="c-main-btn c-main-btn--paddingsmall" >Thêm Phim</button>
                </Form.Item>
            </Form>
        </Fragment>
    )
}
