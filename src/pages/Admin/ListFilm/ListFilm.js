import React, { Fragment, useEffect } from 'react';
import { Table, Input, Button, notification, message } from 'antd';
import { PlusCircleOutlined, CalendarOutlined, EditOutlined, DeleteOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import { deleteFilmAction, getAllFilmInfoAction } from '../../../redux/actions/QuanLyPhimAction';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import moment from 'moment';


export default function ListFilm() {
    const { arrAllFilmInfo } = useSelector(state => state.QuanLyPhimReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllFilmInfoAction())
    }, []);

    /** For search bar */
    const { Search } = Input;
    const onSearch = (value) => dispatch(getAllFilmInfoAction(value))

    /** For table */
    const data = arrAllFilmInfo

    const columns = [
        {
            title: 'ID',
            dataIndex: 'maPhim',
            sorter: (a, b) => a.maPhim - b.maPhim,
            width: "7%",
        },
        {
            title: 'Tên Phim',
            dataIndex: 'tenPhim',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimB = b.tenPhim.toLowerCase().trim();
                if (tenPhimA > tenPhimB) {
                    return 1;
                }
                return -1;
            },
            width: "30%",
        },
        {
            title: 'Ngày Khởi Chiếu',
            dataIndex: 'hinhAnh',
            render: (text, film) => {
                return (
                    <Fragment>
                        {moment(film.ngayKhoiChieu).format("DD/MM/YYYY")}
                    </Fragment>
                )
            },
            width: "13%",
        },
        {
            title: 'Hình Ảnh',
            dataIndex: 'hinhAnh',
            render: (text, film) => {
                return <img src={film.hinhAnh} alt={film.tenPhim} style={{ objectFit: "cover", height: "70px", width: "50px", borderRadius: "5px" }} onError={(e) => { e.target.onError = null; e.target.src = `/images/common/error-img.jpg` }} />
            },
            width: "10%",
        },
        {
            title: 'Mô Tả',
            dataIndex: 'hinhAnh',
            render: (text, film) => {
                return (
                    <Fragment>
                        {film.moTa.length > 50 ? film.moTa.substr(0, 90) + ' ...' : film.moTa}
                    </Fragment>
                )
            },
            width: "30%",
        },
        {
            title: 'Hành Động',
            dataIndex: 'hinhAnh',
            render: (text, film) => {
                return (
                    <Fragment>
                        <NavLink key={1} to={`/admin/editfilm/${film.maPhim}`} className="c-btn c-btn-edit"><EditOutlined /></NavLink>
                        <span className="c-btn c-btn-delete" style={{ cursor: 'pointer' }} key={2}>
                            <DeleteOutlined onClick={() => {
                                openNotification(film.maPhim);
                            }} /> 
                        </span>
                        <NavLink key={3} to={`/admin/createshowtime/${film.maPhim}`} className="c-btn c-btn-calendar" onClick={() => {
                            localStorage.setItem('filmParams', JSON.stringify(film))
                        }}><CalendarOutlined /></NavLink>
                    </Fragment>
                )
            },
            width: "20%",
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        // console.log('params', pagination, filters, sorter, extra);
    }

    /** For Notification Delete film */
    const close = () => {};

    const openNotification = (filmID) => {
        const key = `open${Date.now()}`;
        const btn = (
            <Button onClick={() => {
                notification.close();
                dispatch(deleteFilmAction(filmID));
            }}>XÁC NHẬN</Button>
        );
        notification.open({
            maxCount: 3,
            message: 'Bạn có chắc muốn xóa người dùng này',
            description: "",
            btn,
            key,
            onClose: close,
            icon: <div className="iconWarning"><CloseCircleOutlined /></div>,
        });
    };

    /** For Message */
    const success = () => {
        message
            .loading({
                content: 'Tiến hành xóa phim',
            }, 1.5)
            .then(() => message.success({
                content: 'Xóa phim hoàn tất',
            }, 1.5))
    };

    return (
        <section className="list">
            <h3 className="c-admin-title">danh sách phim</h3>
            <div className="list__inner">
                <div className="c-btn-add">
                    <button onClick={() => {
                        history.push("/admin/addfilm")
                    }}><PlusCircleOutlined />Thêm phim</button>
                </div>
                <div className="admin-searchbar">
                    <Search placeholder="Thông tin cần tìm ..." onSearch={onSearch} />
                </div>
            </div>
            <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"maPhim"} />
        </section>
    )
}
