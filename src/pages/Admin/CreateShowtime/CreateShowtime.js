import React, { Fragment, useEffect, useState } from 'react'
import { DatePicker, InputNumber, Form, Select, message } from 'antd';
import { useFormik } from 'formik';
import { quanLyRapService } from '../../../services/QuanLyRapService';
import { quanLyDatVeService } from '../../../services/QuanLyDatVeSevice';
import moment from 'moment';

export default function CreateShowtime(props) {
    const [state, setState] = useState({
        theaterSystem: [],
        theaterCluster: []
    })
    let film = {};
    if (localStorage.getItem('filmParams')) {
        film = JSON.parse(localStorage.getItem('filmParams'));
    }

    useEffect(async () => {
        try {
            let result = await quanLyRapService.getTheaterSystem();
            setState({
                ...state,
                theaterSystem: result.data.content
            })
        } catch (error) {
            console.log("Error: ", error.response?.content)
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            maPhim: props.match.params.id,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: ''
        },
        onSubmit: async (values) => {
            try {
                const result = await quanLyDatVeService.createShowtime(values);
                success('Tiến hành tạo lịch chiếu', 'Tạo lịch chiếu hoàn tất')
            } catch (error) {
                console.log('Error: ', error.response?.data)
            }
        }
    })

    /** For Message */
    const success = (content, contentDone) => {
        message
            .loading({
                content: content,
            }, 2.5)
            .then(() => message.success({
                content: contentDone,
            }, 2.5))
    }

    const convertSelectTheaterSystem = () => {
        return state.theaterSystem?.map((theater, index) => ({ label: theater.tenHeThongRap, value: theater.maHeThongRap }))
    }

    const convertSelectTheaterCluster = () => {
        return state.theaterCluster?.map((theater, index) => ({ label: theater.tenCumRap, value: theater.maCumRap }))
    }

    const handleChangeTheaterSystem = async (value) => {
        try {
            let result = await quanLyRapService.getTheaterCluster(value);
            setState({
                ...state,
                theaterCluster: result.data.content
            })
        } catch (error) {
            console.log('Error: ', error.response?.data);
        }
    }

    const handleChangeTheaterCluster = (value) => {
        formik.setFieldValue('maRap', value)
    }

    const onOkDate = (values) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'))

    }

    const onChangeDate = (values) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'))
    }

    const onchangeInputPrice = (value) => {
        formik.setFieldValue('giaVe', value)
    }

    return (
        <Fragment >
            <h3 className="c-admin-title">Tạo Lịch Chiếu</h3>
            <div className="createshowtime">
                <div className="createshowtime__img">
                    <img src={film.hinhAnh} alt='...' width={200} height={100} />
                    <h4>{film.tenPhim}</h4>
                </div>
                <Form
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 16 }}
                    onSubmitCapture={formik.handleSubmit}
                    className="createshowtime__form"
                >
                    <Form.Item className="c-form__group" label="Hệ thống rạp">
                        <Select options={convertSelectTheaterSystem()} onChange={handleChangeTheaterSystem} placeholder="Chọn hệ thống rạp..." />
                    </Form.Item>
                    <Form.Item className="c-form__group" label="Cụm rạp">
                        <Select options={convertSelectTheaterCluster()} onChange={handleChangeTheaterCluster} placeholder="Chọn cụm rạp..." />
                    </Form.Item>
                    <Form.Item className="c-form__group" label="Ngày chiếu giờ chiếu">
                        <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={onChangeDate} onOk={onOkDate} />
                    </Form.Item>
                    <Form.Item className="c-form__group" label="Giá vé">
                        <InputNumber onChange={onchangeInputPrice} />
                    </Form.Item>
                    <Form.Item className="c-form__group" label="Chức năng">
                        <button type="submit" className="c-main-btn c-main-btn--paddingsmall" >Tạo Lịch</button>
                    </Form.Item>
                </Form>
            </div>
        </Fragment>
    )
}
