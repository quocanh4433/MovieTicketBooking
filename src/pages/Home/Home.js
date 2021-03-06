import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFilmInfoAction, getBannerAction } from "../../redux/actions/QuanLyPhimAction";
import { NavLink } from "react-router-dom";
import { getCinemaInfoAction } from "../../redux/actions/QuanLyRapAction";
import { Tabs, BackTop } from 'antd';
import { VerticalAlignTopOutlined } from "@ant-design/icons"
import Carousel from "../../components/Carousel/Carousel";
import moment from 'moment';
import Slider from "react-slick";
import MultipleRowCarousel from "../../components/MultiplerowCarousel/MultipleRowCarousel";
import ParallelCarousel from "../../components/ParallelCarousel/ParallelCarousel";
import BookingTicketBar from "../../components/BookingTicketBar/BookingTicketBar";

const { TabPane } = Tabs;

// =======================================
// Showtime Component
// =======================================
/* Showtime for home page */
function ShowtimeHome(props) {
    const { cinemaSystem } = useSelector(state => state.QuanLyRapReducer);
    const [state, setState] = useState({
        tabPosition: 'left',
    });
    const { tabPosition } = state;

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    window.onload = () => {
        let widthScreen = window.innerWidth
        if (widthScreen <= 992) {
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
        if (widthScreen <= 992) {
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
        return (
            <Tabs defaultActiveKey="1" tabPosition={tabPosition} className="c-multipletabs__wrapper" >
                {
                    cinemaSystem?.map((singleSystem, indexTab) => {
                        return (
                            <TabPane
                                defaultActiveKey="1"
                                tab={<img className="cinema-brand" src={singleSystem.logo} alt={singleSystem.tenHeThongRap} />}
                                key={indexTab}
                            >
                                <Tabs tabPosition={tabPosition}>
                                    {singleSystem.lstCumRap?.slice(0, 7).map((cinema, indexTabPane) => {
                                        return (
                                            <TabPane
                                                tab={
                                                    <div className="cinema-location">
                                                        <img src={cinema.hinhAnh} alt="brandlogo" />
                                                        <div>
                                                            <h3>{cinema.tenCumRap.length > 20 ? cinema.tenCumRap.substr(0, 23) + ' ...' : cinema.tenCumRap}</h3>
                                                            <h4>{cinema.diaChi.length > 20 ? cinema.diaChi.substr(0, 23) + ' ...' : cinema.diaChi}</h4>
                                                            {/* <NavLink to="/" >[Chi t???t]</NavLink> */}
                                                        </div>
                                                    </div>
                                                }
                                                key={indexTabPane}
                                                defaultActiveKey="1"
                                            >
                                                {/* List of detail info film */}
                                                {cinema.danhSachPhim?.slice(0,15).map((film, indexC) => {
                                                    return <div className="cinema-showtime" key={indexC}>
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
                                                            {film.lstLichChieuTheoPhim?.slice(0, 10).map((time, indexS) => {
                                                                return (
                                                                    <div>
                                                                        <NavLink to={`/checkout/${time.maLichChieu}`} key={indexS}>
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
            </Tabs>
        )
    }

    return (
        <div className="c-multipletabs container2" >
            <div className="c-primary__title c-primary__title--center">
                <h3 className="title-active" >ch???n su???t chi???u</h3>
            </div>
            {renderCinemaSystem()}
        </div>
    )
}

// =======================================
// Carousel in mobile screen Component
// =======================================
function SliderMobileScreen() {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };
    return (
        <Slider {...settings} className="homeApp-slider">
            <div>
                <img src="./images/slide-appmobile/slide1.jpg" alt="slider-in-screen-mobile" />
            </div>
            <div>
                <img src="./images/slide-appmobile/slide2.jpg" alt="slider-in-screen-mobile" />
            </div>
            <div>
                <img src="./images/slide-appmobile/slide3.jpg" alt="slider-in-screen-mobile" />
            </div>
            <div>
                <img src="./images/slide-appmobile/slide4.jpg" alt="slider-in-screen-mobile" />
            </div>
            <div>
                <img src="./images/slide-appmobile/slide5.jpg" alt="slider-in-screen-mobile" />
            </div>
            <div>
                <img src="./images/slide-appmobile/slide6.jpg" alt="slider-in-screen-mobile" />
            </div>
            <div>
                <img src="./images/slide-appmobile/slide7.jpg" alt="slider-in-screen-mobile" />
            </div>
            <div>
                <img src="./images/slide-appmobile/slide8.jpg" alt="slider-in-screen-mobile" />
            </div>
        </Slider>
    )
}

// =======================================
// News Component
// =======================================
function News() {
    const newsContent = <Fragment>
        <div className="news--main">
            <NavLink to="/" className="news-content">
                <img src="./images/news/news01.jpg" alt="news" />
                <div>
                    <h3>Chi???n th???ng c???a Walt Disney</h3>
                    <p>
                        Cu???i tu???n qua, hai t??c ph???m ???Shang-Chi??? v?? ???Free Guy??? do Disney ph??t h??nh l???n l?????t chi???m gi??? v??? tr?? qu??n qu??n
                        v?? ?? qu??n tr??n b???ng x???p h???ng phim ??n kh??ch t???i ph??ng v?? B???c M???.
                    </p>
                </div>
            </NavLink>
            <NavLink to="/" className="news-content">
                <img src="./images/news/news02.jpg" alt="news" />
                <div>
                    <h3> Nam di???n vi??n ????ng vai Gi??o s?? c???m ?????u nh??m tr???m c?????p l?? ai?</h3>
                    <p>
                        N??m 2017, ??lvaro Morte v??o vai Gi??o s?? trong TV series ???Money Heist???.
                        Vai di???n ????a t??n tu???i anh ?????n v???i kh??n gi??? to??n th??? gi???i.
                    </p>
                </div>
            </NavLink>
        </div>

        <div className="news--secondary">
            <NavLink to="/" className="news-content">
                <figure>
                    <img src="./images/news/news03.jpg" alt="news" />
                </figure>
                <div >
                    <h3>Christopher Nolan chia tay Warner Bros. sau 20 n??m</h3>
                    <p>
                        V??? ?????o di???n t??i danh l???a ch???n Universal Pictures l?? n??i g???i g???m t??c ph???m m???i.
                        ??ng hi???n chu???n b??? cho d??? ??n phim v??? cha ????? c???a bom nguy??n t???.
                    </p>
                </div>
            </NavLink>
            <NavLink to="/" className="news-content">
                <figure>
                    <img src="./images/news/news04.jpg" alt="news" />
                </figure>
                <div >
                    <h3>???Don???t Breathe 2??? - h??nh tr??nh ho??n l????ng c???a s??t nh??n m??</h3>
                    <p>
                        V???n l?? vai ??c nh??n trong ph???n m???t, nh??n v???t Norman nay b??? ?????t l??n vai th??? th??ch ph???i tr??? th??nh ng?????i cha t???t,
                        sau khi con g??i nu??i c???a ??ng b??? b???t c??c.
                    </p>
                </div>
            </NavLink>
            <NavLink to="/" className="news-content">
                <figure>
                    <img src="./images/news/news05.jpg" alt="news" />
                </figure>
                <div >
                    <h3>???No Time to Die??? l?? ph???n phim d??i nh???t v??? 007</h3>
                    <p>
                        ????? d??i c???a b???n phim ???No Time to Die??? chi???u r???p m???i ???????c nh?? ph??t h??nh c??ng b???.
                        B??? phim l?? t??c ph???m c?? th???i l?????ng d??i nh???t v??? ch??ng ??i???p vi??n h??o hoa 007.
                    </p>
                </div>
            </NavLink>
        </div>
    </Fragment>
    const newsContent2 = <Fragment>
        <div className="news--main">
            <NavLink to="/" className="news-content">
                <img src="./images/news/news06.jpg" alt="news" />
                <div>
                    <h3>???Jungle Cruise??? ???????c s???n xu???t h???u truy???n</h3>
                    <p>
                        Sau m???t th??ng ph??t h??nh, t???ng doanh thu ph??ng v?? c???a ???Jungle Cruise??? ???? v?????t 186 tri???u USD.
                        Walt Disney ch??nh th???c th??ng qua k??? ho???ch s???n xu???t h???u truy???n b??? phim.
                    </p>
                </div>
            </NavLink>
            <NavLink to="/" className="news-content">
                <img src="./images/news/news07.jpg" alt="news" />
                <div>
                    <h3>NSX 'Mission: Impossible 7' ????i b???i th?????ng g??i b???o hi???m 100 tri???u USD</h3>
                    <p>
                        C??ng ty s???n xu???t "Mission: Impossible 7" ki???n c??ng ty b???o hi???m
                        v?? kh??ng chi tr??? th???a ????ng nh???ng thi???t h???i do ng???ng ho???t ?????ng v?? Covid-19.
                    </p>
                </div>
            </NavLink>
        </div>

        <div className="news--secondary">
            <NavLink to="/" className="news-content">
                <figure>
                    <img src="./images/news/news08.jpg" alt="news" />
                </figure>
                <div >
                    <h3>???Free Guy??? thu 75 tri???u USD ??? Trung Qu???c sau ba tu???n</h3>
                    <p>
                        Ph??t h??nh t???i th??? tr?????ng Trung Qu???c t??? ng??y 27/8, b??? phim h??nh ?????ng,
                        gi??? t?????ng ???Free Guy??? li??n ti???p d???n ?????u b???ng x???p h???ng phim ??n kh??ch tu???n.
                    </p>
                </div>
            </NavLink>
            <NavLink to="/" className="news-content">
                <figure>
                    <img src="./images/news/news09.jpg" alt="news" />
                </figure>
                <div >
                    <h3>Th???c t???i m???i trong 'Ma tr???n 4'</h3>
                    <p>
                        Trong ???The Matrix Resurrection???, nh??n v???t Neo do Keanu Reeves th??? vai ??ang l???c l???i gi???a th???c t??? ???o m???i.
                        Anh m???t l???n n???a b??? ?????t tr?????c nh???ng th??? th??ch l???n lao.
                    </p>
                </div>
            </NavLink>
            <NavLink to="/" className="news-content">
                <figure>
                    <img src="./images/news/news10.jpg" alt="news" />
                </figure>
                <div >
                    <h3>Han So Hee l???t x??c trong phim m???i</h3>
                    <p>
                        Trong b??? phim t???i ph???m, gi???t g??n ???My Name???, Han So Hee ????ng vai c?? con g??i d???n th??n v??o h??nh tr??nh tr??? th?? cho cha.
                    </p>
                </div>
            </NavLink>
        </div>
    </Fragment>
    const [readMore, setReadMore] = useState(0)
    const renderNewsContent = () => {
        let content = [];
        if (readMore <= 1) {
            for (let i = 0; i <= readMore; i++) {
                i === 0 ? content.push(newsContent) : content.push(newsContent2)
            }
        } else {
            setReadMore(0)
        }
        return content;
    }

    return (
        <Fragment>
            {/* ============================ */}
            {renderNewsContent()}
            {/* ============================ */}
            <section className="news__btn-readmore">
                <button className="c-main-btn icon-play" onClick={() => {
                    let newReadMore = readMore + 1
                    setReadMore(newReadMore)
                }}>{readMore < 1 ? "Xem Th??m" : "Thu G???n"}</button>
            </section>
        </Fragment>
    )
}

// =======================================
// Main Component Home 
// =======================================
export default function (props) {
    const { arrAllFilmInfo } = useSelector(state => state.QuanLyPhimReducer)
    const { arrBanner } = useSelector(state => state.QuanLyPhimReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBannerAction());
        dispatch(getAllFilmInfoAction());
        dispatch(getCinemaInfoAction())
    }, [])

    return (
        <section className="home">

            {/* Main carousel Banner */}
            <section>
                <Carousel arrBanner={arrBanner} />
            </section>

            {/* Select showtime bar */}
            <section>
                <BookingTicketBar />
            </section>

            {/* Multiplerow-carousel */}
            <section className="l-section">
                <MultipleRowCarousel arrAllFilmInfo={arrAllFilmInfo} />
            </section>
            <div className="c-doubleline"></div>

            {/* Showtime  */}
            <section className="l-section">
                <ShowtimeHome />
            </section>
            <div className="c-doubleline"></div>

            {/* News  */}
            <section className="l-section">
                <div className="news container2">
                    <div className="c-primary__title c-primary__title--center">
                        <h3 className="title-active" id="news">Tin T???c</h3>
                    </div>
                    <News />
                </div>
            </section>
            <div className="c-doubleline"></div>

            {/* Events  */}
            <section className="l-section">
                <div className="container2">
                    <div className="c-primary__title c-primary__title--center">
                        <h3 className="title-active" id="event">KHUY???N M??I</h3>
                    </div>
                </div>
                <div className="event container2">
                    <ParallelCarousel />
                </div>
            </section>

            {/* Home App download  */}
            <section className="homeApp" style={{ backgroundImage: `url(./images/app/app01.jpg)` }} id="homeapp">
                <div className="homeApp__wrapper container2">
                    <div className="homeApp__wrapper-left">
                        <h3>???ng d???ng ti???n l???i d??nh cho <br /> ng?????i y??u ??i???n ???nh</h3>
                        <p>Kh??ng ch??? ?????t v??, b???n c??n c?? th??? b??nh lu???n phim, ch???m ??i???m r???p v?? ?????i qu?? h???p d???n.</p>
                        <button className="c-main-btn icon-play">T???i v??? ngay</button>
                        <p className="notice-download">CYBERBOX c?? hai phi??n b???n <a href="#">iOS</a> v?? <a href="#">Android</a></p>
                    </div>
                    <div className="homeApp__wrapper-right">
                        <img src="./images/slide-appmobile/mobile.png" alt="slider-in-screen-mobile" />
                        <SliderMobileScreen />
                    </div>
                </div>
            </section>

            {/* Btn bottom to top  */}
            <div className="c-btn-backtotop">
                <BackTop duration={200}>
                    <div className="iconBack"><VerticalAlignTopOutlined /></div>
                </BackTop>
            </div>

        </section>
    )
}
