import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { Tabs } from 'antd';
import { getCinemaInfoAction } from '../../redux/actions/QuanLyRapAction';
const { TabPane } = Tabs;

export default function Showtime() {
    const { cinemaSystem } = useSelector(state => state.QuanLyRapReducer);
    const dispatch = useDispatch()
    const [state, setState] = useState({
        tabPosition: 'left',
    });
    const { tabPosition } = state;


    useEffect(() => {
        dispatch(getCinemaInfoAction())
    }, [])

    window.onload = () => {
        let widthScreen = window.innerWidth
        if(widthScreen <= 992) {
            setState({
                tabPosition: 'top'
            })
        } else {
            setState({
                tabPosition: 'left'
            })
        }
    }

    window.onresize = () => {
        let widthScreen = window.innerWidth
        if(widthScreen <= 992) {
            setState({
                tabPosition: 'top'
            })
        } else {
            setState({
                tabPosition: 'left'
            })
        }
    }


    const renderCinemaSystem = () => {
        return cinemaSystem?.map((singleSystem, index) => {
            return (
                <TabPane
                    tab={
                        <img className="cinema-brand" src={singleSystem.logo} alt={singleSystem.tenHeThongRap}
                        />}
                    key={index}
                >
                    <Tabs tabPosition={tabPosition}>
                        {singleSystem.lstCumRap?.map((cinema, index) => {
                            return (
                                <TabPane
                                    tab={
                                        <div className="cinema-location">
                                            <img src={cinema.hinhAnh} alt="brandlogo" />
                                            <div>
                                                <h3>{cinema.tenCumRap}</h3>
                                                <h4>{cinema.diaChi}</h4>
                                                <NavLink to="/" >[Chi tết]</NavLink>
                                            </div>
                                        </div>
                                    }
                                    key={index}
                                >
                                    {/* List of detail info film */}
                                    {cinema.danhSachPhim?.map((film, index) => {
                                        return <div className="cinema-showtime" key={index}>
                                            <div className="cinema-showtime-info">
                                                <img src={film.hinhAnh} alt={film.tenPhim} />
                                                <div>
                                                    <h3>{film.tenPhim}</h3>
                                                    <div className="c-review">
                                                        <span className="c-review__raiting">PG-13</span>
                                                        <p className="c-review__score">
                                                            <span>8.0</span>
                                                            <span>IMDb</span>
                                                        </p>
                                                    </div>
                                                    <figure>
                                                        <img src="/images/common/4DX.jpg" alt="4DX" />
                                                    </figure>
                                                </div>
                                            </div>
                                            <div className="cinema-showtime-time">
                                                {film.lstLichChieuTheoPhim?.slice(0, 10).map((time, index) => {
                                                    return (
                                                        <div>
                                                            <NavLink to={`/checkout/${time.maLichChieu}`} key={index}>
                                                                {moment(time.ngayChieuGioChieu).format('hh:mm A')}
                                                            </NavLink>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    })}
                                </TabPane>
                            )
                        })}
                    </Tabs>
                </TabPane>
            )
        })
    }

    return (
        <div className="showtime container2" >
            <div className="c-primary__title c-primary__title--center">
                <h3 className="title-active" >chọn suất chiếu</h3>
            </div>
            <Tabs defaultActiveKey="1" tabPosition={tabPosition} className="showtime__wrapper" >
                {renderCinemaSystem()}
            </Tabs>
        </div>
    )
}
