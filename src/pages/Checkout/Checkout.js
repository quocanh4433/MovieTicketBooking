import React, { Fragment, useEffect, useState } from 'react'
import { Statistic, Col, Radio, Modal, Button, notification } from 'antd';
import { CloseOutlined, UserOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux'
import { clearSeatOvertimeAction, getShowtimeDetailAction, selectSeatRealtimeAction, selectSeatRestUserAction } from '../../redux/actions/QuanLyDatVeAction';
import { getCinemaInfoAction } from '../../redux/actions/QuanLyRapAction';
import { connection } from '../..';
import { history } from '../../App';
import { BookingTicketInfo } from '../../_core/models/BookingTicketInfo';
import { bookingTicketAction } from '../../redux/actions/QuanLyDatVeAction';
import _ from "lodash"

//=====================================
// MODAL TICKET
//=====================================
function ModalTicket(props) {

    const { showtimeDetail } = useSelector(state => state.QuanLyDatVeReducer)
    const dispatch = useDispatch()
    const [state, setState] = useState({
        loading: false,
        visible: false,
    })
    let { thongTinPhim } = showtimeDetail
    let { showtimeID, lstSeatSelecting, payment } = props
    let { loading, visible } = state
    let showtimeIDNumber = Number(showtimeID)

    const showModal = () => {
        setState({ visible: true, });
    };

    /* For Modal */
    const handleOk = () => {
        setState({ loading: false, visible: false });
        /* Post ticket info after booking successful */
        const bookingTicketInfo = new BookingTicketInfo()
        bookingTicketInfo.maLichChieu = showtimeIDNumber
        bookingTicketInfo.danhSachVe = lstSeatSelecting
        dispatch(bookingTicketAction(bookingTicketInfo))
    };


    /** For Message notice when user booking but not select seat */
    const close = () => { };

    const openNotification = () => {
        const key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" onClick={() => notification.close(key)}>XÁC NHẬN</Button>
        );
        notification.open({
            maxCount: 3,
            message: 'Bạn vui lòng chọ ghế trước khi đặt vé',
            description: "",
            btn,
            key,
            onClose: close,
        });
    };

    const renderPayment = (payment) => {
        if (payment === 1) {
            return (
                <Fragment>
                    Thẻ ATM Nội Địa
                    <img src="/images/common/atmcard.png" alt="atmcard" />
                </Fragment>
            )
        } else if (payment === 2) {
            return <img src="/images/common/momo.jpg" alt="momo" />
        } else if (payment === 3) {
            return <img src="/images/common/zalopay.jpg" alt="zalopay" />
        } else {
            return <img className="credit-card" src="/images/common/visa-card.png" alt="credit-card" />
        }
    }

    return (
        <Fragment>
            {/* Button Booking ticket  */}
            <button className="c-main-btn c-btn-bookingticket" onClick={() => {
                lstSeatSelecting.length !== 0 ? showModal() : openNotification()
            }}>Đặt vé</button>

            {/* Modal confirm Booking ticket  */}
            <Modal
                centered
                visible={visible}
                onOk={handleOk}
                onCancel={() => { setState({ visible: false }); }}
                className="modal__ticket"
                closeIcon={<CloseCircleOutlined />}
                title="XÁC NHẬN THÔNG TIN ĐẶT VÉ"
                footer={[
                    <Button key="back" onClick={() => { history.push("/home") }}>
                        TRANG CHỦ
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        XÁC NHẬN
                    </Button>,
                ]}
            >
                <div className="modal__ticket-confirm">

                    <div className="ticket__img">
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

                    <div className="ticket__info">
                        <div className="info__group">
                            <p>Tên cụm rạp</p>
                            <p>{thongTinPhim?.tenCumRap}</p>
                        </div>

                        <div className="info__group">
                            <p>Số rạp</p>
                            <p>{thongTinPhim?.tenRap}</p>
                        </div>

                        <div className="info__group">
                            <p>Suất chiếu</p>
                            <p>{thongTinPhim?.gioChieu}</p>
                        </div>

                        <div className="info__group">
                            <p>SỐ GHẾ</p>
                            <div className="listSeatConfirm">
                                {_.sortBy(lstSeatSelecting, ['maGhe'])?.map((seat, index) => {
                                    return <span key={index}>{seat.stt}</span>
                                })}
                            </div>
                        </div>

                        <div className="info__group">
                            <p>hình thứ thanh toán </p>
                            <p>{renderPayment(payment)}</p>
                        </div>

                        <div className="info__group">
                            <p>Tổng cộng</p>
                            <p className="total">{
                                lstSeatSelecting?.reduce((total, seat, index) => {
                                    return total += seat.giaVe
                                }, 0).toLocaleString()
                            }</p>
                        </div>
                    
                    </div>
                </div>
            </Modal>
        </Fragment>
    )
}


//=====================================
// MAIN COMPONENT
//=====================================

export default function Checkout(props) {
    const { showtimeDetail, lstSeatSelecting, lstSeatSelectRealTime } = useSelector(state => state.QuanLyDatVeReducer)
    const { cinemaSystem } = useSelector(state => state.QuanLyRapReducer);
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const { Countdown } = Statistic;
    const [valueRadio, setValueRadio] = useState(1);
    const dispatch = useDispatch();
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
                    dispatch(selectSeatRealtimeAction(singleSeat, props.match.params.id))
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
