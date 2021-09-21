import React, { useEffect } from 'react'
import { AppleOutlined, AndroidOutlined, FacebookOutlined, TwitterOutlined } from "@ant-design/icons"
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllFilmInfoAction } from '../../../../redux/actions/QuanLyPhimAction';

export default function Footer() {
    const { cinemaSystem } = useSelector(state => state.QuanLyRapReducer);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllFilmInfoAction())
    }, [])

    const renderPartner = () => {
        return cinemaSystem?.map((item, index) => {
            return (
                <NavLink to="#" key={index}> 
                    <img src={item.logo} alt={item.tenHeThongRap} />
                </NavLink>
            )
        })
    }

    return (
        <footer className="footer">
            <div className="footer__wrapper container2">
                <div className="footer__main">
                    <div className="footer__item">
                        <h4>Cyberbox</h4>
                        <ul>
                            <li><a href="#">About</a></li>
                            <li><a href="#">News</a></li>
                            <li><a href="#">Career</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer__item">
                        <h4>Partner</h4>
                        <div>
                            {renderPartner()}
                            {renderPartner()}
                        </div>
                    </div>
                    <div className="footer__item">
                        <h4>App</h4>
                        <div>
                            <a href="#"><AppleOutlined /></a>
                            <a href="#"><AndroidOutlined /></a>
                        </div>
                    </div>
                    <div className="footer__item">
                        <h4>Social</h4>
                        <div>
                            <a href="#"><FacebookOutlined /></a>
                            <a href="#"><TwitterOutlined /></a>
                        </div>
                    </div>
                </div>
                <div className="footer__sub">
                    <NavLink to="/home"><img src="/images/header/logo.svg" alt="Logo" /></NavLink>
                    <p>CÔNG TY TNHH CJ CGV VIETNAM <br />Giấy CNĐKDN: 0303675393, đăng ký lần đầu ngày 31/7/2008, đăng ký thay đổi lần thứ 5 ngày 14/10/2015, cấp bởi Sở KHĐT thành phố Hồ Chí Minh. <br /> Địa Chỉ: Tầng 2, Rivera Park Saigon - Số 7/28 Thành Thái, P.14, Q.10,<br /> TPHCM.Hotline: 1900 6017COPYRIGHT 2017 CJ CGV. All RIGHTS RESERVED .</p>
                </div>
            </div>
        </footer>
    )
}
