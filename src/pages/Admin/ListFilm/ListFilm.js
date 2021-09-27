import React, { Fragment, useEffect } from 'react'
import { Table, Input } from 'antd';
import { PlusCircleOutlined, CalendarOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from 'react-redux'
import { getAllFilmInfoAction } from '../../../redux/actions/QuanLyPhimAction';
import { NavLink } from 'react-router-dom'
import moment from 'moment';
import { history } from '../../../App';


export default function ListFilm() {

    const { arrAllFilmInfo } = useSelector(state => state.QuanLyPhimReducer)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getAllFilmInfoAction())
    }, [])

    console.log(arrAllFilmInfo)

    /** For search bar */
    const { Search } = Input;

    const onSearch = value => console.log(value);

  

    /** For table */
    const data = arrAllFilmInfo

    const columns = [
        {
            title: 'ID',
            dataIndex: 'maPhim',
            sorter: (a, b) => a.name.length - b.name.length,
            width: "7%",
        },
        {
            title: 'Tên Phim',
            dataIndex: 'tenPhim',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
            width: "30%",
        },
        {
            title: 'Ngày Khởi Chiếu',
            dataIndex: 'hinhAnh',
            render: (text, film) => {
                return <p>{moment(film.ngayKhoiChieu).format("DD/MM/YYYY")}</p>
            },
            width: "13%",
        },
        {
            title: 'Hình Ảnh',
            dataIndex: 'hinhAnh',
            render: (text, film) => {
                return <img src={film.hinhAnh} alt={film.tenPhim} style={{objectFit: "cover", height: "70px", width: "50px"}}/>
            },
            width: "10%",
            align: "center",
        },
        {
            title: 'Mô Tả',
            dataIndex: 'hinhAnh',
            render: (text, film) => {
                return (
                    <Fragment>
                        {film.moTa.length > 50 ? film.moTa.substr(0, 100) + ' ...' : film.moTa}
                    </Fragment>
                )
            },
            width: "30%",
        },
        {
            title: 'Hành Động',
            dataIndex: 'hinhAnh',
            render: (text, film) => {
                return <Fragment>
                    <NavLink key={1}  to=""><EditOutlined style={{ color: 'blue' }}/></NavLink>
                    {/* <span style={{ cursor: 'pointer' }} key={2} className="text-2xl"><DeleteOutlined style={{ color: 'red' }} onClick={()=>{
                        //Gọi action xoá
                        if (window.confirm('Bạn có chắc muốn xoá phim ' + film.tenPhim)) {
                            // Gọi action
                            dispatch(xoaPhimAction(film.maPhim));
                        }
                    }}/> </span> */}
                    
                    <NavLink key={2} className=" mr-2 text-2xl" to="" ><CalendarOutlined style={{ color: 'green' }} /> </NavLink>
                    <NavLink key={3} className=" mr-2 text-2xl" to="" ><DeleteOutlined style={{ color: 'red' }} /> </NavLink>

                    {/* localStorage.setItem('filmParams',JSON.stringify(film)); */}
                </Fragment>
            },
            width: "20%",
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }


    return (
        <section className="listFilm">
            <h3 className="c-admin-title">danh sách phim</h3>
            <div className="listFilm__inner">
                <div className="c-btn-add">
                    <button onClick={()=>{
                        history.push("/admin/film/addfilm")
                    }}><PlusCircleOutlined />Thêm phim</button>
                </div>
                <div className="admin-searchbar">
                    <Search placeholder="Thông tin cần tìm ..." onSearch={onSearch} enterButton />
                </div>
            </div>
            <Table columns={columns} dataSource={data} onChange={onChange} />
        </section>
    )
}
