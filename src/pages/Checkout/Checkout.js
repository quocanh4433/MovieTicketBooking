import React, { useEffect, useState } from 'react'
import { Tabs, Statistic, Col, Radio } from 'antd';
import { CloseOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux'
import { getShowtimeDetailAction } from '../../redux/actions/QuanLyDatVeAction';
import { SELECT_SEAT } from '../../redux/types/QuanLyDatVeType';
import _ from "lodash"
import ModalTicket from '../../components/ModalTicket/ModalTicket';
import { getCinemaInfoAction } from '../../redux/actions/QuanLyRapAction';
const { TabPane } = Tabs;

export default function Checkout(props) {
    const { showtimeDetail, lstSeatSelecting } = useSelector(state => state.QuanLyDatVeReducer)
    const { cinemaSystem } = useSelector(state => state.QuanLyRapReducer);
    const [visibleModal, setVisibleModal] = useState(false)
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const dispatch = useDispatch();
    const { Countdown } = Statistic;
    const [valueRadio, setValueRadio] = useState(1);
    let { thongTinPhim, danhSachGhe } = showtimeDetail

    useEffect(() => {
        let { id } = props.match.params;
        dispatch(getShowtimeDetailAction(id))
        dispatch(getCinemaInfoAction())
    }, [])

    /* For Countdown */
    const onFinish = () => {
        // alert('finished!');
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
    const showModal = () => {
        console.log(visibleModal)
        setVisibleModal(true);
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
                            singleSeat.daDat ? classSeatUserSelected != "" ? <UserOutlined /> : <CloseOutlined /> : singleSeat.stt
                        }
                    </div>
                </button>
            )
        })
    }

    const renderLogoCinema = () => {
        return cinemaSystem?.map((cinema, index) => {
            return cinema.lstCumRap.map((cine, index) => {
                if(cine.tenCumRap === thongTinPhim?.tenCumRap) {
                    return <img src={cinema.logo} alt={cinema.maHeThongRap} key={index}/>
                }
            })
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
                            <Countdown value={Date.now() + 600 * 1000} onChange={onChangeCountDown} onFinish={onFinish} />
                        </Col>
                    </div>
                </div>

                {/* Booking ticket  */}
                <div className="checkout__booking">
                    <div className="screen">
                        <span>SCREEN</span>
                    </div>
                    <div className="lstseats">   {renderSeats()}   </div>
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
                        <span>CỤM RẠP / RẠP</span>
                        <span>{thongTinPhim?.tenCumRap} / {thongTinPhim?.tenRap}</span>
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
