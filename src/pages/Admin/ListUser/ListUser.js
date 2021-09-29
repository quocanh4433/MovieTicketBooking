import React, { Fragment, useEffect } from 'react'
import { Table, Input } from 'antd';
import { PlusCircleOutlined, CalendarOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from 'react-redux'
import { deleteFilmAction, getAllFilmInfoAction } from '../../../redux/actions/QuanLyPhimAction';
import { NavLink } from 'react-router-dom'
import moment from 'moment';
import { history } from '../../../App';
import { getAllUserAction } from '../../../redux/actions/QuanLyNguoiDungAction';


export default function ListUser() {
    const { arrAllUser } = useSelector(state => state.QuanLyNguoiDungReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUserAction())
    }, [])

    /** For search bar */
    const { Search } = Input;
    const onSearch = value => console.log(value);


    /** For table */
    const data = arrAllUser

    const columns = [
        {
            title: 'Họ Tên',
            dataIndex: 'hoTen',
            defaultSortOrder: 'descend',
            sorter: (a, b) => {
                let nameA = a.hoTen.toLowerCase().trim();
                let nameB = b.hoTen.toLowerCase().trim();
                if (nameA > nameB) {
                    return 1;
                }
                return -1;
            },
        },
        {
            title: 'Tài Khoản',
            dataIndex: 'taiKhoan',
            defaultSortOrder: 'descend',
            sorter: (a, b) => {
                let accountA = a.taiKhoan.toLowerCase().trim();
                let accountB = b.taiKhoan.toLowerCase().trim();
                if (accountA > accountB) {
                    return 1;
                }
                return -1;
            },
        },
        {
            title: 'Mật Khẩu',
            dataIndex: 'matKhau',
            defaultSortOrder: 'descend',
            sorter: (a, b) => {
                let passwordA = a.matKhau.toLowerCase().trim();
                let passwordB = b.matKhau.toLowerCase().trim();
                if (passwordA > passwordB) {
                    return 1;
                }
                return -1;
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            defaultSortOrder: 'descend',
            sorter: (a, b) => {
                let emailA = a.email.toLowerCase().trim();
                let emailB = b.email.toLowerCase().trim();
                if (emailA > emailB) {
                    return 1;
                }
                return -1;
            },
        },
        {
            title: 'Số ĐT',
            dataIndex: 'soDt',
            defaultSortOrder: 'descend',
            sorter: (a, b) => {
                let phoneA = Number(a.soDt)
                let phoneB = Number(b.soDt);
                if (phoneA > phoneB) {
                    return 1;
                }
                return -1;
            },
        },
        {
            title: 'Loại',
            dataIndex: 'maLoaiNguoiDung',
            filters: [
                {
                    text: 'Khách Hàng',
                    value: 'KhachHang',
                },
                {
                    text: 'Quản Trị',
                    value: 'QuanTri',
                },
            ],
            onFilter: (value, record) => record.maLoaiNguoiDung.indexOf(value) === 0,

        },
        {
            title: 'Hành Động',
            dataIndex: 'hinhAnh',
            render: (text, film) => {
                return (
                    <Fragment>
                        <NavLink key={1} to={`/admin/editfilm/${film.maPhim}`} className="c-btn c-btn-edit"><EditOutlined /></NavLink>
                        <span className="c-btn c-btn-delete" style={{ cursor: 'pointer' }} key={2}><DeleteOutlined onClick={() => {
                            if (window.confirm('Bạn có chắc muốn xoá phim ' + film.tenPhim)) {
                                dispatch(deleteFilmAction(film.maPhim));
                            }
                        }} /> </span>
                        <NavLink key={3} to="" className="c-btn c-btn-calendar"><CalendarOutlined /> </NavLink>
                    </Fragment>
                )
            },
            // width: "20%",
        },
    ];


    return (
        <section className="list">
            <h3 className="c-admin-title">danh sách người dùng</h3>
            <div className="list__inner">
                <div className="c-btn-add">
                    <button onClick={() => {
                        history.push("/admin/addUser")
                    }}><PlusCircleOutlined />Thêm người dùng</button>
                </div>
                <div className="admin-searchbar">
                    <Search placeholder="Thông tin cần tìm ..." onSearch={onSearch} enterButton />
                </div>
            </div>
            <Table columns={columns} dataSource={data} />
        </section>
    )
}
