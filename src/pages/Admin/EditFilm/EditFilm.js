import React, { Fragment, useState, useEffect } from 'react'
import {
    Form,
    Input,
    DatePicker,
    InputNumber,
    Switch,
} from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { GROUPID } from '../../../utils/setting';
import { editFilmAction, updateFilmAction } from '../../../redux/actions/QuanLyPhimAction';
import { UploadOutlined } from '@ant-design/icons'
import moment from 'moment'

export default function EditFilm(props) {
    const { filmInfoEdit } = useSelector(state => state.QuanLyPhimReducer)
    const [img, setImg] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        let { id } = props.match.params;
        dispatch(editFilmAction(id))
    }, [])


    const formik = useFormik({
        /** 
            enableReinitialize default =  false. 
            Chỉ sử dụng trong những trang edit vi nếu dùng sai xin ra vòng lặp vô tận 
        */
        enableReinitialize: true,
        initialValues: {
            maPhim: filmInfoEdit.maPhim,
            tenPhim: filmInfoEdit.tenPhim,
            trailer: filmInfoEdit.trailer,
            moTa: filmInfoEdit.moTa,
            manhom: GROUPID,
            ngayKhoiChieu: filmInfoEdit.ngayKhoiChieu,
            sapChieu: filmInfoEdit.sapChieu,
            dangChieu: filmInfoEdit.dangChieu,
            hot: filmInfoEdit.hot,
            danhGia: filmInfoEdit.danhGia,
            hinhAnh: null
        },
        onSubmit: (values) => {
            let formData = new FormData()
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    /** Kiểm tra hình ảnh có thay đổi mới append ảnh mới nếu không vẫn giữ lấy ảnh */
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name)
                    }
                }
            }
            dispatch(updateFilmAction(formData));
        }
    })

    const handleChangeDatePicker = (value) => {
        const dateLocal = moment(value)
        formik.setFieldValue('ngayKhoiChieu', dateLocal)
    }

    const handleChangeFile = async (event) => {
        let file = event.target.files[0];

        if (file) {
            await formik.setFieldValue('hinhAnh', file)

            let reader = new FileReader();
            reader.readAsDataURL(file)

            setImg(event.target.result)

            reader.onload = async (e) => {
                setImg(e.target.result)
            }
        }
    }

    return (
        <Fragment>
            <h3 className="c-admin-title">Cập Nhật Phim</h3>
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
            >
                <Form.Item className="c-form__group" label="Mã Phim">
                    <Input disabled name="maPhim" onChange={formik.handleChange} value={formik.values.maPhim} />
                </Form.Item>
                <Form.Item className="c-form__group" label="Tên phim">
                    <Input name="tenPhim" onChange={formik.handleChange} value={formik.values.tenPhim} />
                </Form.Item>
                <Form.Item className="c-form__group" label="Trailer">
                    <Input name="trailer" onChange={formik.handleChange} value={formik.values.trailer} />
                </Form.Item>
                <Form.Item className="c-form__group" label="Mô tả">
                    <Input.TextArea name="moTa" rows="4" onChange={formik.handleChange} value={formik.values.moTa} />
                </Form.Item>
                <Form.Item className="c-form__group" label="Ngày khởi chiếu">
                    <DatePicker name="ngayKhoiChieu" onChange={handleChangeDatePicker} value={moment(formik.values.ngayKhoiChieu)} />
                </Form.Item>
                <Form.Item className="c-form__group" label="Đang chiếu" valuePropName="checked">
                    <Switch name="dangChieu" onChange={(checked) => { formik.setFieldValue('dangChieu', checked) }} checked={formik.values.dangChieu} />
                </Form.Item>
                <Form.Item className="c-form__group" label="Sắp chiếu" valuePropName="checked">
                    <Switch name="sapChieu" onChange={(checked) => { formik.setFieldValue('sapChieu', checked) }} checked={formik.values.sapChieu} />
                </Form.Item>
                <Form.Item className="c-form__group" label="Hot" valuePropName="checked">
                    <Switch name="hot" onChange={(checked) => { formik.setFieldValue('hot', checked) }} checked={formik.values.hot} />
                </Form.Item>
                <Form.Item className="c-form__group" label="Đánh giá">
                    <InputNumber name="danhGia" onChange={(value) => { formik.setFieldValue('danhGia', value) }} value={formik.values.danhGia} />
                </Form.Item>
                <Form.Item className="c-form__group" label="Hình ảnh">
                    <div className="c-form-control">
                        <input type="file" name="hinhAnh" id="file" className="inputfile" accept="image/png, image/jpg, image/jpeg, image/gif" onChange={handleChangeFile} />
                        <label for="file"> <UploadOutlined /> Choose a file</label>
                    </div>
                    {/* <input type="file" id="upload-photo" name="hinhAnh" accept="image/png, image/jpg, image/jpeg, image/gif" onChange={handleChangeFile} /> */}
                    <img src={img === "" ? filmInfoEdit.hinhAnh : img} alt={filmInfoEdit.tenPhim} className="img-upload" onError={(e) => { e.target.onError = null; e.target.src = `/images/common/error-img.jpg` }} />
                </Form.Item>
                <Form.Item className="c-form__group" label="Chức năng">
                    <button type="submit" className="c-main-btn c-main-btn--paddingsmall" >Cập nhật</button>
                </Form.Item>
            </Form>
        </Fragment>
    )
}
