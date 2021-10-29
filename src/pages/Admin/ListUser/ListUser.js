import React, { Fragment, useEffect } from 'react'
import { Table, Input, Button, notification } from 'antd';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined, CloseCircleOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { history } from '../../../App';
import { deleteUserAction, getAllUserAction } from '../../../redux/actions/QuanLyNguoiDungAction';


export default function ListUser() {
    const { arrAllUser } = useSelector(state => state.QuanLyNguoiDungReducer)
    const dispatch = useDispatch()
    const { Search } = Input;

    useEffect(() => {
        dispatch(getAllUserAction())
    }, [])


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
            width: "15%"
        },
        {
            title: 'Tài Khoản',
            dataIndex: 'taiKhoan',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => {
                let accountA = a.taiKhoan.toLowerCase().trim();
                let accountB = b.taiKhoan.toLowerCase().trim();
                if (accountA > accountB) {
                    return 1;
                }
                return -1;
            },
            width: "20%"
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
            width: "17%"
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
            width: "20%"
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
            width: "10%"
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
            width: "8%"
        },
        {
            title: 'Hành Động',
            dataIndex: 'hinhAnh',
            render: (text, user) => {
                return (
                    <Fragment>
                        <NavLink key={1} to={`/admin/edituser/${user.taiKhoan}`} className="c-btn c-btn-edit"><EditOutlined /></NavLink>
                        <span className="c-btn c-btn-delete" style={{ cursor: 'pointer' }} key={2}><DeleteOutlined onClick={() => {
                            openNotification(user.taiKhoan);
                        }} /> </span>
                    </Fragment>
                )
            },
            width: "10%",
            align: "center"
        },
    ];

    /** For Notification Delete user */
    const close = () => { };

    const openNotification = (account) => {
        const key = `open${Date.now()}`;
        const btn = (
            <Button onClick={() => {
                notification.close();
                dispatch(deleteUserAction(account));
            }}>XÁC NHẬN</Button>
        );
        notification.open({
            duration: 4,
            maxCount: 3,
            message: 'Bạn có chắc muốn xóa người dùng này',
            description: "",
            btn,
            key,
            onClose: close,
            icon: <div className="iconWarning"><CloseCircleOutlined /></div>,
        });
    };
    
    return (
        <section className="list">
            <h3 className="c-admin-title">danh sách người dùng</h3>
            <div className="list__inner">
                <div className="c-btn-add">
                    <button onClick={() => {
                        history.push("/admin/adduser")
                    }}><PlusCircleOutlined />Thêm người dùng</button>
                </div>
                <div className="admin-searchbar">
                    <Search placeholder="Thông tin cần tìm ..." onSearch={(value) => { dispatch(getAllUserAction(value)) }} enterButton />
                </div>
            </div>
            <Table columns={columns} dataSource={data} />
        </section>
    )
}
