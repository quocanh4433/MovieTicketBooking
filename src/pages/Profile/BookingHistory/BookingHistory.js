import React, { useEffect, useState } from 'react';
import { quanLyNguoiDungService } from '../../../services/QuanLyNguoiDungService';
import _ from 'lodash';
import moment from 'moment';

export default function BookingHistory() {
    const [userDetail, setUserDetail] = useState({});

    useEffect(async () => {
        try {
            const result = await quanLyNguoiDungService.getUserDetail();
            setUserDetail(result.data.content)

            console.log(result)

        } catch (error) {
            console.log('Error: ', error)
        }
    }, []);

    const renderBookinghistory = () => {
        return userDetail.thongTinDatVe?.map((item, index) => {
            return (
                <div className="bookinghistory__item" key={index}>
                    <figure className="bookinghistory__img" >
                        <img src={item.hinhAnh} alt='...' />
                    </figure>
                    <div className="bookinghistory__content">
                        <h5>{item.tenPhim}</h5>
                        <p className="theaters"><span>{_.first(item.danhSachGhe).tenHeThongRap}</span> / <span>{_.first(item.danhSachGhe).tenCumRap}</span></p>
                        <p className="showtime"><span>{moment(item.ngaydat).format('DD/MM/YYYY')}</span> - <span>{moment(item.ngaydat).format('HH:mm')}</span></p>
                        <p className="seats">{item.danhSachGhe?.map((seat, index) => (<span key={index}>{seat.tenGhe}</span>))}</p>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="bookinghistory">
            <div className="bookinghistory__wrapper">
                {renderBookinghistory()}
            </div>
        </div>
    )
}
