import React, { useEffect, useState } from 'react'
import { Select, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { getAllFilmInfoAction } from '../../redux/actions/QuanLyPhimAction';
import { quanLyRapService } from '../../services/QuanLyRapService';
import { history } from '../../App';
import _ from 'lodash';
import moment from 'moment';

const { Option } = Select;

export default function BookingTicketBar(props) {

    const { arrAllFilmInfo } = useSelector(state => state.QuanLyPhimReducer);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        filmID: '', // 01. Mã Phimm
        cinemaSystem: [], // 02. Hệ Thống Rạp 
        cinema: [], // 03. Cụm Rạp
        time: [], // 05. Tất cả Ngày/Giờ + Mã Lịch Chiếu 
        date: [], // 04. Chỉ có ngày được sắp xếp + loại bỏ những ngày trùng nhau
        hour: [], // 06. Chỉ có giờ chiếu + mã lịch chiếu trong MỘT ngày cụ thể
        showtimeID: 0, // 07. Lưu maxl ịch chiếu
    })

    useEffect(() => {
        dispatch(getAllFilmInfoAction())
    }, [])

    /** 01. Chọn Phim */
    const convertSelectFilm = () => {
        return _.orderBy(arrAllFilmInfo, ['tenPhim'], ['asc'])?.map((film, index) => ({ label: film.tenPhim, value: film.maPhim }))
    }

    /** 02. Lấy ra mã phim vừa chọn và lọc ra hệ thống rạp đang chiếu phim này */
    const handleChangeFilm = async (value) => {
        try {
            let result = await quanLyRapService.getCinemaShowtime(value);
            setState({
                ...state,
                filmID: value,
                cinemaSystem: result.data.content.heThongRapChieu
            })
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    /** 03. Hiển thị hệ thống rạp theo phim */
    const convertSelectCinemaSystem = () => {
        return state.cinemaSystem?.map((item, index) => ({ label: item.tenHeThongRap, value: item.maHeThongRap }))
    }

    /** 04. Lấy ra mã hệ thống rạp - Lọc ra những rạp thuộc hệ thống */
    const handleChangeCinemaSystem = async (value) => {
        let cinemaName = state.cinemaSystem.filter(item => item.maHeThongRap === value)
        setState({
            ...state,
            cinema: cinemaName[0].cumRapChieu
        })
    }

    /** 05. Hiển thị những rạp thuộc hệ thống */
    const convertSelectCinema = () => {
        return state.cinema?.map((item, index) => ({ label: item.tenCumRap, value: item.maCumRap }))
    }

    /** 06.Lấy ra mã cụm rạp - Lọc thời gian chiếu phim theo rap này */
    const handleChangeSelectCinema = (value) => {
        /** 01. Bóc tách vào từng phần tử trong mảng */
        let theatercluster = state.cinema.filter(item => item.maCumRap === value);
        let theatershowtime = theatercluster[0].lichChieuPhim;
        let theaterTime = []

        /** 02. Tạp một mảng mới chỉ chứa ngayChieugioChieu, maLichChieu */
        for (let key of theatershowtime) {
            let timeShow = {};
            timeShow.ngayChieuGioChieu = key.ngayChieuGioChieu;
            timeShow.maLichChieu = key.maLichChieu;
            timeShow.ngayChieu = moment(key.ngayChieuGioChieu).format('DD/MM/YYYY')
            theaterTime.push(timeShow)
        }

        /** 03. Lọc ra các ngày trugnf nhau và sắp xếp theo thứ tự tăng dần */
        let theaterTimeSort = _.uniqBy(theaterTime, 'ngayChieu')
        theaterTimeSort = theaterTimeSort.sort(function compare(a, b) {
            var dateA = new Date(a.ngayChieuGioChieu);
            var dateB = new Date(b.ngayChieuGioChieu);
            return dateA - dateB;
        });

        setState({
            ...state,
            date: theaterTimeSort,
            time: theaterTime
        })
    }

    /** 07. Hiển thị ngày chiếu phim của cụm rạp được chọn */
    const convertSelectDate = () => {
        return state.date?.map((item, index) => ({ label: moment(item.ngayChieuGioChieu).format('DD/MM/YYYY'), value: item.ngayChieu }))
    }

    /** 08. Lấy ta ngày chiếu - Sắp xếp + Lọc ra giờ chiếu */
    const handleChangeSelectDate = (value) => {
        let timeSort = state.time.filter(item => item.ngayChieu === value)
        timeSort = timeSort.sort(function compare(a, b) {
            let timeA = new Date(a.ngayChieuGioChieu).getTime();
            let timeB = new Date(b.ngayChieuGioChieu).getTime();
            return timeA - timeB;
        })
        setState({
            ...state,
            hour: timeSort
        })
    }

    /** 09. Hiển thị giờ chiếu */
    const convertSelectTime = () => {
        return state.hour?.map((item, index) => ({ label: moment(item.ngayChieuGioChieu).format('HH:mm'), value: item.maLichChieu }))
    }

    /** 10. Từ giờ chiếu lấy ra mã lịch chiếu */
    const changeSelecttime = (value) => {
        setState({
            ...state,
            showtimeID: value
        })
    }

    return (
        <div className="container2">
            <div className="selectShowtime ">
                <Select
                    placeholder="Chọn Phim"
                    className="selectShowtime__dropdown w-20"
                    clearIcon bordered={false}
                    options={convertSelectFilm()}
                    onChange={handleChangeFilm}
                >
                </Select>
                <Select
                    placeholder="Hệ Thống Rạp"
                    className="selectShowtime__dropdown"
                    bordered={false}
                    options={convertSelectCinemaSystem()}
                    onChange={handleChangeCinemaSystem}
                >
                </Select>
                <Select
                    placeholder="Rạp"
                    className="selectShowtime__dropdown"
                    bordered={false}
                    options={convertSelectCinema()}
                    onChange={handleChangeSelectCinema}
                >
                </Select>
                <Select
                    placeholder="Ngày"
                    className="selectShowtime__dropdown w-12"
                    bordered={false}
                    options={convertSelectDate()}
                    onChange={handleChangeSelectDate}
                >
                </Select>
                <Select
                    placeholder="Suất"
                    className="selectShowtime__dropdown w-12"
                    bordered={false}
                    options={convertSelectTime()}
                    onChange={changeSelecttime}
                >
                </Select>
                <Tooltip placement="top" title={state.showtimeID === 0 ? "Vui lòng chọn phim" : ""} arrowPointAtCenter>
                    <button
                        disabled={state.showtimeID === 0 ? true : false}
                        className={state.showtimeID === 0 ? "c-main-btn c-main-btn--bgdark " : "c-main-btn"}
                        onClick={() => { history.push(`/checkout/${state.showtimeID}`) }}
                    >Đặt vé</button> 
                </Tooltip>
            </div>
        </div>
    )
}
