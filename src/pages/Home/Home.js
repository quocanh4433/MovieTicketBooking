import React, { Fragment, useEffect, useState } from "react";
import Carousel from "../../components/Carousel/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { getAllFilmInfoAction, getBannerAction } from "../../redux/actions/QuanLyPhimAction";
import Showtime from "../../components/Showtime/Showtime";
import Slider from "react-slick";
import ShowtimeBar from "../../components/ShowtimeBar/ShowtimeBar";
import MultipleRowCarousel from "../../components/MultiplerowCarousel/MultipleRowCarousel";
import ParallelCarousel from "../../components/ParallelCarousel/ParallelCarousel";

export default function Home(props) {
    const { arrAllFilmInfo } = useSelector(state => state.QuanLyPhimReducer)
    const { arrBanner } = useSelector(state => state.QuanLyPhimReducer)
    const [readMore, setReadMore] = useState(0)
    const dispatch = useDispatch()
    const event = true;
    const newsContent = <Fragment>
        <div className="news--main">
            <div className="news-content">
                <img src="./images/news/news01.jpg" alt="news" />
                <div>
                    <h3>Chiến thắng của Walt Disney</h3>
                    <p>
                        Cuối tuần qua, hai tác phẩm “Shang-Chi” và “Free Guy” do Disney phát hành lần lượt chiếm giữ vị trí quán quân
                        và á quân trên bảng xếp hạng phim ăn khách tại phòng vé Bắc Mỹ.
                    </p>
                </div>
            </div>
            <div className="news-content">
                <img src="./images/news/news02.jpg" alt="news" />
                <div>
                    <h3> Nam diễn viên đóng vai Giáo sư cầm đầu nhóm trộm cướp là ai?</h3>
                    <p>
                        Năm 2017, Álvaro Morte vào vai Giáo sư trong TV series “Money Heist”.
                        Vai diễn đưa tên tuổi anh đến với khán giả toàn thế giới.
                    </p>
                </div>
            </div>
        </div>

        <div className="news--secondary">
            <div className="news-content">
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
            </div>
            <div className="news-content">
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
            </div>
            <div className="news-content">
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
            </div>
        </div>
    </Fragment>
    const newsContent2 = <Fragment>
        <div className="news--main">
            <div className="news-content">
                <img src="./images/news/news06.jpg" alt="news" />
                <div>
                    <h3>‘Jungle Cruise’ được sản xuất hậu truyện</h3>
                    <p>
                        Sau một tháng phát hành, tổng doanh thu phòng vé của “Jungle Cruise” đã vượt 186 triệu USD.
                        Walt Disney chính thức thông qua kế hoạch sản xuất hậu truyện bộ phim.
                    </p>
                </div>
            </div>
            <div className="news-content">
                <img src="./images/news/news07.jpg" alt="news" />
                <div>
                    <h3>NSX 'Mission: Impossible 7' đòi bồi thường gói bảo hiểm 100 triệu USD</h3>
                    <p>
                        Công ty sản xuất "Mission: Impossible 7" kiện công ty bảo hiểm
                        vì không chi trả thỏa đáng những thiệt hại do ngừng hoạt động vì Covid-19.
                    </p>
                </div>
            </div>
        </div>

        <div className="news--secondary">
            <div className="news-content">
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
            </div>
            <div className="news-content">
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
            </div>
            <div className="news-content">
                <figure>
                    <img src="./images/news/news10.jpg" alt="news" />
                </figure>
                <div >
                    <h3>Han So Hee lột xác trong phim mới</h3>
                    <p>
                        Trong bộ phim tội phạm, giật gân “My Name”, Han So Hee đóng vai cô con gái dấn thân vào hành trình trả thù cho cha.
                    </p>
                </div>
            </div>
        </div>
    </Fragment>
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    useEffect(() => {
        dispatch(getAllFilmInfoAction());
        dispatch(getBannerAction());
    }, [])

    const renderNewsContent = () => {
        let content = [];
        if (readMore <= 1) {
            for (let i = 0; i <= readMore; i++) {
                i == 0 ? content.push(newsContent) : content.push(newsContent2)
            }
        } else {
            setReadMore(0)
        }
        return content;
    }

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
                <Showtime />
            </section>
            <div className="c-doubleline"></div>

            {/* News  */}
            <section className="l-section">
                <div className="news container2">
                    <div className="c-primary__title c-primary__title--center">
                        <h3 className="title-active">Tin Tức</h3>
                    </div>
                    {renderNewsContent()}
                    <section className="news__btn-readmore">
                        <button className="c-main-btn icon-play" onClick={() => {
                            let newReadMore = readMore + 1
                            setReadMore(newReadMore)
                        }}>{readMore < 1 ? "Xem Thêm" : "Thu Gọn"}</button>
                    </section>
                </div>
            </section>
            <div className="c-doubleline"></div>

            {/* Events  */}
            <section className="l-section">
                <div className="container2">
                    <div className="c-primary__title c-primary__title--center">
                        <h3 className="title-active">KHUYẾN MÃI</h3>
                    </div>
                </div>
                <div className="event container2">
                    <ParallelCarousel />
                </div>
            </section>

            {/* Home App download  */}
            <section className="homeApp" style={{ backgroundImage: `url(./images/app/app01.jpg)` }}>
                <div className="homeApp__wrapper container2">
                    <div className="homeApp__wrapper-left">
                        <h3>Ứng dụng tiện lợi dành cho <br /> người yêu điện ảnh</h3>
                        <p>Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn.</p>
                        <button className="c-main-btn icon-play">Tải về ngay</button>
                        <p className="notice-download">CYBERBOX có hai phiên bản <a href="#">iOS</a> và <a href="#">Android</a></p>
                    </div>
                    <div className="homeApp__wrapper-right">
                        <img src="https://tix.vn/app/assets/img/icons/mobile.png" alt="slider-in-screen-mobile" />
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
                    </div>
                </div>
            </section>
        </section>
    )
}
