import React, { Fragment, useState } from 'react'
import { CloseCircleOutlined } from "@ant-design/icons"
import { Modal, Button, notification } from 'antd';
import { BookingTicketInfo } from '../../_core/models/BookingTicketInfo';
import { useDispatch, useSelector } from 'react-redux';
import { bookingTicketAction } from '../../redux/actions/QuanLyDatVeAction';
import _ from "lodash"
import { history } from '../../App';

export default function ModalTicket(props) {

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
        setState({
            visible: true,
        });
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

    const handleCancel = () => {
        setState({ visible: false });
    };
    
    const handelReturnHome = () => {
        history.push("/home")
    }

    /** For Message notice when user booking but not select seat */
    const close = () => {};

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
            <button className="c-main-btn icon-play" onClick={() => { 
                lstSeatSelecting.length !== 0 ?  showModal() : openNotification()
            }}>Đặt vé</button>

            {/* Modal confirm Booking ticket  */}
            <Modal
                centered
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                className="modal__ticket"
                closeIcon={<CloseCircleOutlined />}
                title="XÁC NHẬN THÔNG TIN ĐẶT VÉ"
                footer={[
                    <Button key="back" onClick={handelReturnHome}>
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
