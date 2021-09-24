import React, { useEffect } from 'react'
import { Tabs, Statistic, Col, Radio } from 'antd';
import { CloseOutlined, CheckCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux'
import { bookingTicketAction, getShowtimeDetailAction } from '../../redux/actions/QuanLyDatVeAction';
import { SELECT_SEAT } from '../../redux/types/QuanLyDatVeType';
import _ from "lodash"
import { BookingTicketInfo } from '../../_core/models/BookingTicketInfo';
const { TabPane } = Tabs;







export default function Checkout(props) {
    const { showtimeDetail, lstSeatSelecting } = useSelector(state => state.QuanLyDatVeReducer)
    let { thongTinPhim, danhSachGhe } = showtimeDetail
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const { Countdown } = Statistic;
    const dispatch = useDispatch();

    useEffect(() => {
        let { id } = props.match.params;
        dispatch(getShowtimeDetailAction(id))
    }, [])

    /* For Countdown */
    const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK
    const onFinish = () => {
        // alert('finished!');
    }

    const onChangeCountDown = (val) => {
        if (4.95 * 1000 < val && val < 5 * 1000) {
            console.log('changed!');
        }
    }

    /* For Radio button */
    const [value, setValue] = React.useState(1);

    const onChangeRadioBtn = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const renderSeats = () => {
        return danhSachGhe?.map((singleSeat, index) => {

            let classSeatVip = "";
            let classSeatSelected = "";
            let classSeatSelecting = "";
            let classSeatUserSelected = "";
            let indexSeatSelecting = lstSeatSelecting?.findIndex(seatDD => seatDD.maGhe === singleSeat.maGhe)

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

            return (
                <button disabled={singleSeat.daDat} className="seat__wrapper" key={index} onClick={() => {
                    dispatch({
                        type: SELECT_SEAT,
                        seatSelect: singleSeat,
                    })
                }}>
                    <div className={`seat ${classSeatVip} ${classSeatSelected} ${classSeatSelecting} ${classSeatUserSelected}`} >
                        {
                            singleSeat.daDat ? classSeatUserSelected != "" ? <UserOutlined /> :  <CloseOutlined /> : singleSeat.stt
                        }
                    </div>
                </button>
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
                            <img src="http://movieapi.cyberlearn.vn/hinhanh/bhd-star-cineplex.png" alt="logoBrand" />
                        </figure>

                        <div>
                            <p>{thongTinPhim?.tenCumRap}</p>
                            <p>{thongTinPhim?.tenRap}</p>
                        </div>
                    </div>
                    <div className="countdown">
                        <Col span={12}>
                            <Countdown value={Date.now() + 600 * 1000} onChange={onChangeCountDown} onFinish={onFinish} />
                        </Col>
                    </div>
                </div>

                {/* Booking ticket  */}
                <div className="checkout__booking">
                    <div className="screen">
                        <span>SCREEN</span>
                    </div>

                    <div className="lstseats">
                        {/* <div className="seat__wrapper">
                            <div className="seat seat-vip">100</div>
                        </div>
                        <div className="seat__wrapper">
                            <div className="seat seat-selected"><CloseOutlined /></div>
                        </div>
                        <div className="seat__wrapper">
                            <div className="seat seat-nowselect"><CheckCircleOutlined /></div>
                        </div>

                        <div className="seat__wrapper">
                            <div className="seat seat-userselected"><UserOutlined /></div>
                        </div> */}

                        {renderSeats()}



                    </div>
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
                        <p>Suất chiếu: {thongTinPhim?.gioChieu}</p>
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
                    <div className="seat__number">
                        <span>SỐ GHẾ:</span>
                        <div>
                            {_.sortBy(lstSeatSelecting, ['maGhe']).map((seat, index) => {
                                return <span key={index}>{seat.stt}</span>
                            })}
                        </div>
                    </div>

                    <div className="payments">
                        <h3>HÌNH THỨC THANH TOÁN</h3>
                        <Radio.Group onChange={onChangeRadioBtn} value={value} className="lstpayment">
                            <Radio value={1}><img src="/images/common/atmcard.png" alt="atmcard" />Thẻ ATM nội địa</Radio>
                            <Radio value={2}><img src="/images/common/momo.jpg" alt="momo" /></Radio>
                            <Radio value={3}><img src="/images/common/zalopay.jpg" alt="zalopay" /></Radio>
                            <Radio value={4}><img className="credit-card" src="/images/common/visa-card.png" alt="credit-card" /></Radio>
                        </Radio.Group>
                        <button className="c-main-btn icon-play" onClick={() => {
                            const bookingTicketInfo = new BookingTicketInfo
                            bookingTicketInfo.maLichChieu = props.match.params.id
                            bookingTicketInfo.danhSachVe = lstSeatSelecting
                            console.log(bookingTicketInfo)
                            dispatch(bookingTicketAction(bookingTicketInfo))
                        }}>Đặt vé</button>
                    </div>
                </div>
            </div>



        </section>
    )
}
