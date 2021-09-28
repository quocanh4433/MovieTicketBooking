import React, { Fragment, useEffect, useState } from 'react'
import { Statistic, Col, Radio, Modal } from 'antd';
import { CloseOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux'
import { clearSeatOvertimeAction, getShowtimeDetailAction, selectSeatRealtimeAction, selectSeatRestUserAction } from '../../redux/actions/QuanLyDatVeAction';
import _ from "lodash"
import ModalTicket from '../../components/ModalTicket/ModalTicket';
import { getCinemaInfoAction } from '../../redux/actions/QuanLyRapAction';
import { connection } from '../..';
import { history } from '../../App';

// const { TabPane } = Tabs;
// const [visibleModal, setVisibleModal] = useState(false)

export default function Checkout(props) {
    const { showtimeDetail, lstSeatSelecting, lstSeatSelectRealTime } = useSelector(state => state.QuanLyDatVeReducer)
    const { cinemaSystem } = useSelector(state => state.QuanLyRapReducer);
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const dispatch = useDispatch();
    const { Countdown } = Statistic;
    const [valueRadio, setValueRadio] = useState(1);
    let { thongTinPhim, danhSachGhe } = showtimeDetail

    useEffect(() => {
        let { id } = props.match.params;
        dispatch(getShowtimeDetailAction(id))
        dispatch(getCinemaInfoAction())
        dispatch(clearSeatOvertimeAction())

        /** Setup function realtime booking  */

        /** 01. Method recieve notification from Back-end, the users done booking tickets, after that, reload page  */
        connection.on('datVeThanhCong', () => {
            dispatch(getShowtimeDetailAction(props.match.params.id))
        })

        /** 02. Method notice for all of client */
        connection.invoke('loadDanhSachGhe', props.match.params.id)

        /** 03. Method listen notification from Back-end */
        connection.on("loadDanhSachGheDaDat", (lstSeat) => {

            /** Step 01: Remove curent user from list of user is booking */
            lstSeat = lstSeat.filter(item => item.taiKhoan !== userLogin.taiKhoan);

            /** Step 02: Rending all of seat from the rest user */
            let arrSeatRealtime = lstSeat.reduce((result, item, index) => {
                let arrSeat = JSON.parse(item.danhSachGhe);
                return [...result, ...arrSeat]
            }, [])

            /** Step 03: Post arrSeatRealtime to QuanLyDatVeReducer */
            dispatch(selectSeatRestUserAction(arrSeatRealtime))

            /** Step 04: Setup method remove event booking if client reload page */
            window.addEventListener('beforeunload', clearSeatSelecting)

            /** Step 05: Reomve event with lifecycle Unmout */
            return () => {
                clearSeatSelecting();
                window.removeEventListener('beforeunload', clearSeatSelecting)
            }
        })
    }, [])

    const clearSeatSelecting = () => {
        connection.invoke('huyDat', userLogin.taiKhoan, props.match.params.id)
    }

    /* For Countdown */
    const onFinish = () => {
        countDown()

    }

    const onChangeCountDown = (val) => {
        if (4.95 * 1000 < val && val < 5 * 1000) {
            console.log('changed!');
        }
    }

    /* For Radio button */
    const onChangeRadioBtn = e => {
        setValueRadio(e.target.value);
    };

    /* For Modal */
    // const showModal = () => {
    //     setVisibleModal(true);
    // };


    /** For Message overtime */
    const countDown = () => {
        let secondsToGo = 5;
        const modal = Modal.success({
            onOk: () => {
                dispatch(clearSeatOvertimeAction())
                history.push("/home");
            },
            icon: "",
            okText: "Xác Nhận",
            width: 400,
            title: `Đã hết thời gian giữ ghế !!!`,
            content: `Bạn sẽ quay về trang chủ sau ${secondsToGo} giây.`,
        });
        const timer = setInterval(() => {
            secondsToGo -= 1;
            modal.update({
                content: `Bạn sẽ quay về trang chủ sau ${secondsToGo} giây.`,
            });
        }, 1000);
        setTimeout(() => {
            clearInterval(timer);
            modal.destroy();
            history.push("/home");
        }, secondsToGo * 1000);
    }


    const renderSeats = () => {
        return danhSachGhe?.map((singleSeat, index) => {

            let classSeatVip = "";
            let classSeatSelected = "";
            let classSeatSelecting = "";
            let classSeatUserSelected = "";
            let classSeatSelectRealtime = "";
            let indexSeatSelecting = lstSeatSelecting?.findIndex(seat => seat.maGhe === singleSeat.maGhe)
            let indexSeatSelectRealtime = lstSeatSelectRealTime?.findIndex(seat => seat.maGhe === singleSeat.maGhe)
            if (singleSeat.loaiGhe === "Vip") {
                classSeatVip = "seat-vip"
            }
            if (singleSeat.daDat) {
                classSeatSelected = "seat-selected"
            }
            if (indexSeatSelecting !== -1) {
                classSeatSelecting = "seat-selecting"
            }
            if (userLogin.taiKhoan === singleSeat.taiKhoanNguoiDat) {
                classSeatUserSelected = "seat-userselected"
            }
            if (indexSeatSelectRealtime !== -1) {
                classSeatSelectRealtime = "seat-selecteRealtime"
            }

            return (
                <button disabled={singleSeat.daDat} className="seat__wrapper" key={index} onClick={() => {
                    dispatch(selectSeatRealtimeAction(singleSeat, props.match.params.id,))
                }}>
                    <div className={`seat ${classSeatVip} ${classSeatSelected} ${classSeatSelecting} ${classSeatUserSelected} ${classSeatSelectRealtime}`} >
                        <span className="seatNumber">
                            {
                                singleSeat.daDat ? classSeatUserSelected !== "" ? <UserOutlined /> : <CloseOutlined /> : singleSeat.stt
                            }
                        </span>
                    </div>
                </button>
            )
        })
    }

    const renderLogoCinema = () => {
        return cinemaSystem?.map((cinema, index) => {
            return (
                <Fragment key={index}>
                    {
                        cinema.lstCumRap.map((cine, index) => {
                            if (cine.tenCumRap === thongTinPhim?.tenCumRap) {
                                return <img src={cinema.logo} alt={cinema.maHeThongRap} key={index} />
                            }
                        })
                    }
                </Fragment>
            ) 
        })
    }

    return (
        <section className="checkout">

            <div className="checkout__right">

                {/* Cinema info  */}
                <div className="checkout__cinema">
                    <div className="cinema">
                        <figure>
                            {renderLogoCinema()}
                        </figure>
                        <div>
                            <p>{thongTinPhim?.tenCumRap}</p>
                            <p>{thongTinPhim?.tenRap}</p>
                        </div>
                    </div>
                    <div className="countdown">
                        <Col span={12}>
                            <Countdown value={Date.now() + 600 * 1000} format="mm:ss" onChange={onChangeCountDown} onFinish={onFinish} />
                        </Col>
                    </div>
                </div>

                {/* Booking ticket  */}
                <div className="checkout__booking">
                    <div className="screen">
                        <span>SCREEN</span>
                    </div>
                    <div className="lstseats">
                        {renderSeats()}
                    </div>
                </div>

                {/* Note kind of seats */}
                <div className="seatNote">
                    <div>
                        <h6>Ghế Đang Chọn</h6>
                        <span className="seat-selecting"></span>
                    </div>
                    <div>
                        <h6>Ghế VIP</h6>
                        <span className="seatNumber seat-vip"></span>
                    </div>
                    <div>
                        <h6>Ghế Bạn Đã Đặt</h6>
                        <span className="seatNumber seat-userselected"></span>
                    </div>
                    <div>
                        <h6>Ghế Đã Đặt</h6>
                        <span className="seatNumber seat-selected"></span>
                    </div>
                    {/* <div>
                        <h6>Ghế Người Khác Đặt</h6>
                        <span className="seatNumber seat-selecteRealtime"></span>
                    </div> */}
                </div>
            </div>

            <div className="checkout__left">

                <div className="film__info">
                    <figure>
                        <img src={thongTinPhim?.hinhAnh} alt="..." />
                    </figure>
                    <div>
                        <h3>{thongTinPhim?.tenPhim}</h3>
                        <div className="c-review">
                            <span className="c-review__raiting">PG-13</span>
                            <p className="c-review__score">
                                <span>8.0</span>
                                <span>IMDb</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="payment__info">
                    <h3>
                        {
                            lstSeatSelecting?.reduce((total, seat, index) => {
                                return total += seat.giaVe
                            }, 0).toLocaleString()
                        }
                    </h3>
                    <div className="cinemaInfo">
                        <span>CỤM RẠP</span>
                        <span>{thongTinPhim?.tenCumRap}</span>
                    </div>
                    <div className="cinemaInfo">
                        <span>RẠP</span>
                        <span>{thongTinPhim?.tenRap}</span>
                    </div>
                    <div className="cinemaInfo">
                        <span>SUẤT CHIẾU</span>
                        <span>{thongTinPhim?.gioChieu}</span>
                    </div>
                    <div className="seatNumber">
                        <span>SỐ GHẾ</span>
                        <div>
                            {_.sortBy(lstSeatSelecting, ['maGhe']).map((seat, index) => {
                                return <span key={index}>{seat.stt}</span>
                            })}
                        </div>
                    </div>
                    <div className="payments">
                        <h3>HÌNH THỨC THANH TOÁN</h3>
                        <Radio.Group onChange={onChangeRadioBtn} value={valueRadio} className="lstpayment">
                            <Radio value={1}><img src="/images/common/atmcard.png" alt="atmcard" />Thẻ ATM nội địa</Radio>
                            <Radio value={2}><img src="/images/common/momo.jpg" alt="momo" /></Radio>
                            <Radio value={3}><img src="/images/common/zalopay.jpg" alt="zalopay" /></Radio>
                            <Radio value={4}><img className="credit-card" src="/images/common/visa-card.png" alt="credit-card" /></Radio>
                        </Radio.Group>

                        {/* Button Modal Ticket  */}
                        <ModalTicket
                            showtimeID={props.match.params.id}
                            lstSeatSelecting={lstSeatSelecting}
                            payment={valueRadio}
                        />
                    </div>
                </div>
            </div>

        </section>
    )
}
