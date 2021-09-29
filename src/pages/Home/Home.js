import React, { Fragment, useEffect, useState } from "react";
import Carousel from "../../components/Carousel/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { getAllFilmInfoAction, getBannerAction } from "../../redux/actions/QuanLyPhimAction";
import Slider from "react-slick";
import ShowtimeBar from "../../components/ShowtimeBar/ShowtimeBar";
import MultipleRowCarousel from "../../components/MultiplerowCarousel/MultipleRowCarousel";
import ParallelCarousel from "../../components/ParallelCarousel/ParallelCarousel";
import { NavLink } from "react-router-dom";
import { getCinemaInfoAction } from "../../redux/actions/QuanLyRapAction";
import moment from 'moment';
import { Tabs, BackTop } from 'antd';
import { VerticalAlignTopOutlined } from "@ant-design/icons"


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
        window.scrollTo(0,0)
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
        return cinemaSystem?.map((singleSystem, indexTab) => {
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
                                                <h3>{cinema.tenCumRap.length  > 20 ? cinema.tenCumRap.substr(0, 23) + ' ...' : cinema.tenCumRap}</h3>
                                                <h4>{cinema.diaChi.length > 20 ? cinema.diaChi.substr(0, 23) + ' ...' : cinema.diaChi}</h4>
                                                {/* <NavLink to="/" >[Chi tết]</NavLink> */}
                                            </div>
                                        </div>
                                    }
                                    key={indexTabPane}
                                    defaultActiveKey="1"
                                >
                                    {/* List of detail info film */}
                                    {cinema.danhSachPhim?.map((film, indexC) => {
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

    return (
        <div className="c-multipletabs container2" >
            <div className="c-primary__title c-primary__title--center">
                <h3 className="title-active" >chọn suất chiếu</h3>
            </div>
            <Tabs defaultActiveKey="1" tabPosition={tabPosition} className="c-multipletabs__wrapper" >

                {renderCinemaSystem()}

            </Tabs>
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
                <img src="https://tix.vn/app/assets/img/icons/slide/slide2.jpg" alt="slider-in-screen-mobile" />
            </div>
            <div>
                <img src="https://tix.vn/app/assets/img/icons/slide/slide3.jpg" alt="slider-in-screen-mobile" />
            </div>
            <div>
                <img src="https://tix.vn/app/assets/img/icons/slide/slide4.jpg" alt="slider-in-screen-mobile" />
            </div>
            <div>
                <img src="https://tix.vn/app/assets/img/icons/slide/slide5.jpg" alt="slider-in-screen-mobile" />
            </div>
            <div>
                <img src="https://tix.vn/app/assets/img/icons/slide/slide6.jpg" alt="slider-in-screen-mobile" />
            </div>
            <div>
                <img src="https://tix.vn/app/assets/img/icons/slide/slide8.jpg" alt="slider-in-screen-mobile" />
            </div>
            <div>
                <img src="https://tix.vn/app/assets/img/icons/slide/slide9.jpg" alt="slider-in-screen-mobile" />
            </div>
            <div>
                <img src="https://tix.vn/app/assets/img/icons/slide/slide10.jpg" alt="slider-in-screen-mobile" />
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
                    <h3>Chiến thắng của Walt Disney</h3>
                    <p>
                        Cuối tuần qua, hai tác phẩm “Shang-Chi” và “Free Guy” do Disney phát hành lần lượt chiếm giữ vị trí quán quân
                        và á quân trên bảng xếp hạng phim ăn khách tại phòng vé Bắc Mỹ.
                    </p>
                </div>
            </NavLink>
            <NavLink to="/" className="news-content">
                <img src="./images/news/news02.jpg" alt="news" />
                <div>
                    <h3> Nam diễn viên đóng vai Giáo sư cầm đầu nhóm trộm cướp là ai?</h3>
                    <p>
                        Năm 2017, Álvaro Morte vào vai Giáo sư trong TV series “Money Heist”.
                        Vai diễn đưa tên tuổi anh đến với khán giả toàn thế giới.
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
                    <h3>Christopher Nolan chia tay Warner Bros. sau 20 năm</h3>
                    <p>
                        Vị đạo diễn tài danh lựa chọn Universal Pictures là nơi gửi gắm tác phẩm mới.
                        Ông hiện chuẩn bị cho dự án phim về cha đẻ của bom nguyên tử.
                    </p>
                </div>
            </NavLink>
            <NavLink to="/" className="news-content">
                <figure>
                    <img src="./images/news/news04.jpg" alt="news" />
                </figure>
                <div >
                    <h3>‘Don’t Breathe 2’ - hành trình hoàn lương của sát nhân mù</h3>
                    <p>
                        Vốn là vai ác nhân trong phần một, nhân vật Norman nay bị đặt lên vai thử thách phải trở thành người cha tốt,
                        sau khi con gái nuôi của ông bị bắt cóc.
                    </p>
                </div>
            </NavLink>
            <NavLink to="/" className="news-content">
                <figure>
                    <img src="./images/news/news05.jpg" alt="news" />
                </figure>
                <div >
                    <h3>‘No Time to Die’ là phần phim dài nhất về 007</h3>
                    <p>
                        Độ dài của bản phim “No Time to Die” chiếu rạp mới được nhà phát hành công bố.
                        Bộ phim là tác phẩm có thời lượng dài nhất về chàng điệp viên hào hoa 007.
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
                    <h3>‘Jungle Cruise’ được sản xuất hậu truyện</h3>
                    <p>
                        Sau một tháng phát hành, tổng doanh thu phòng vé của “Jungle Cruise” đã vượt 186 triệu USD.
                        Walt Disney chính thức thông qua kế hoạch sản xuất hậu truyện bộ phim.
                    </p>
                </div>
            </NavLink>
            <NavLink to="/" className="news-content">
                <img src="./images/news/news07.jpg" alt="news" />
                <div>
                    <h3>NSX 'Mission: Impossible 7' đòi bồi thường gói bảo hiểm 100 triệu USD</h3>
                    <p>
                        Công ty sản xuất "Mission: Impossible 7" kiện công ty bảo hiểm
                        vì không chi trả thỏa đáng những thiệt hại do ngừng hoạt động vì Covid-19.
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
                    <h3>‘Free Guy’ thu 75 triệu USD ở Trung Quốc sau ba tuần</h3>
                    <p>
                        Phát hành tại thị trường Trung Quốc từ ngày 27/8, bộ phim hành động,
                        giả tưởng “Free Guy” liên tiếp dẫn đầu bảng xếp hạng phim ăn khách tuần.
                    </p>
                </div>
            </NavLink>
            <NavLink to="/" className="news-content">
                <figure>
                    <img src="./images/news/news09.jpg" alt="news" />
                </figure>
                <div >
                    <h3>Thực tại mới trong 'Ma trận 4'</h3>
                    <p>
                        Trong “The Matrix Resurrection”, nhân vật Neo do Keanu Reeves thủ vai đang lạc lối giữa thực tế ảo mới.
                        Anh một lần nữa bị đặt trước những thử thách lớn lao.
                    </p>
                </div>
            </NavLink>
            <NavLink to="/" className="news-content">
                <figure>
                    <img src="./images/news/news10.jpg" alt="news" />
                </figure>
                <div >
                    <h3>Han So Hee lột xác trong phim mới</h3>
                    <p>
                        Trong bộ phim tội phạm, giật gân “My Name”, Han So Hee đóng vai cô con gái dấn thân vào hành trình trả thù cho cha.
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
                }}>{readMore < 1 ? "Xem Thêm" : "Thu Gọn"}</button>
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

            {/* Main carousel */}
            <section>
                <Carousel arrBanner={arrBanner} />
            </section>

            {/* Select showtime bar */}
            <section>
                <ShowtimeBar />
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
                        <h3 className="title-active" id="news">Tin Tức</h3>
                    </div>
                    <News />
                </div>
            </section>
            <div className="c-doubleline"></div>

            {/* Events  */}
            <section className="l-section">
                <div className="container2">
                    <div className="c-primary__title c-primary__title--center">
                        <h3 className="title-active" id="event">KHUYẾN MÃI</h3>
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
                        <h3>Ứng dụng tiện lợi dành cho <br /> người yêu điện ảnh</h3>
                        <p>Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn.</p>
                        <button className="c-main-btn icon-play">Tải về ngay</button>
                        <p className="notice-download">CYBERBOX có hai phiên bản <a href="#">iOS</a> và <a href="#">Android</a></p>
                    </div>
                    <div className="homeApp__wrapper-right">
                        <img src="https://tix.vn/app/assets/img/icons/mobile.png" alt="slider-in-screen-mobile" />
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
