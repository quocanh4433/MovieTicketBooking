import React, { Fragment, useState, useEffect } from 'react'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import { Tabs } from 'antd';
import { Progress, Rate } from 'antd';
import { PlayCircleOutlined, LikeOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux';
import { COUNT_LIKE } from '../../redux/types/QuanLyNguoiDungType';
import ModalComment from '../../components/ModalComment/ModalComment';
import _ from "lodash"
import moment from 'moment'
import { NavLink } from 'react-router-dom';
import Showtime from '../../components/Showtime/Showtime';
import { getCinemaInfoAction, getCinemaShowtimeAction } from '../../redux/actions/QuanLyRapAction';

const { TabPane } = Tabs;

// ======================================================
// Tabs Component
// ======================================================
function TabComment() {
    const { lstUserComment } = useSelector(state => state.QuanLyNguoiDungReducer);
    const [showComment, setShowComment] = useState(4)
    const dispatch = useDispatch()

    const renderLstComment = () => {
        return _.orderBy(lstUserComment, ['id'], ['desc']).slice(0, showComment).map((userComment, index) => {
            return (
                <div className="tab__comment-list" key={index}>
                    <div className="comment-group">
                        <div className="comment-user">
                            <div className="user-avatar">
                                <figure>
                                    <img type="text" src={userComment.avatar} alt="UserName" onError={(e) => { e.target.onError = null; e.target.src = `/images/header/avatar-user.jpg` }} />
                                </figure>
                                <p>
                                    <span>{userComment.name}</span>
                                    <span>{moment(userComment.day).format("DD/MM/YYYY")}</span>
                                </p>
                            </div>
                            <div className="user-score">
                                <span className="score">{userComment.score.toFixed(1)}</span>
                                <Rate disabled allowHalf defaultValue={userComment.score / 2} />
                            </div>
                        </div>
                        <div className="comment-content">
                            <p>{userComment.comment}</p>
                        </div>
                        <div className="comment-like">
                            <LikeOutlined className="icon-like" onClick={() => {
                                dispatch({
                                    type: COUNT_LIKE,
                                    id: userComment.id
                                })
                            }} />
                            <span>{userComment.like} Thích</span>
                        </div>
                    </div>
                </div>
            )
        })
    }

    const handleShowLstComment = () => {
        if (showComment < lstUserComment.length) {
            let newShowComment = showComment + 2
            if (newShowComment < lstUserComment.length) {
                setShowComment(newShowComment)
            } else {
                setShowComment(lstUserComment.length)
            }
        } else {
            setShowComment(4)
        }
    }

    return (
        <Fragment>
            <Tabs defaultActiveKey="1" centered className="detail__info-tabs">
                <TabPane tab={<h4>Thông Tin</h4>} key="1">
                    <div className="tab__info">
                        <div className="tab__info--left">
                            <div className="info-group">
                                <p>Ngày công chiếu: </p>
                                <p>26/12/2021</p>
                            </div>
                            <div className="info-group">
                                <p>Đạo diễn: </p>
                                <p>Christopher Nolan</p>
                            </div>
                            <div className="info-group">
                                <p>Diễn viên: </p>
                                <p>Hugh Jackman, Christian Bale, Chris Evan, Leonardo DiCaprio, Margot Robbie, Anne Hathaway</p>
                            </div>
                            <div className="info-group">
                                <p>Thể loại: </p>
                                <p>Tâm lý, Kinh dị, Viễn tưởng</p>
                            </div>
                            <div className="info-group">
                                <p>Định dang: </p>
                                <p>2D/3D/4DX</p>
                            </div>
                            <div className="info-group">
                                <p>Quốc gia: </p>
                                <p>Mỹ</p>
                            </div>
                        </div>
                        <div className="tab__info--right">
                            <div className="info-group">
                                <p>Nội dung: </p>
                                <p>
                                    Đảo kinh hoàng là bộ phim tâm lý bí ẩn giật gân Mỹ sản xuất năm 2010 của đạo diễn Martin Scorsese,
                                    với Leonardo DiCaprio thủ vai chính, dựa trên cuốn tiểu thuyết của Dennis Lehane
                                </p>
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab={<h4>Đánh Giá</h4>} key="2">
                    <div className="tab__comment">

                        <ModalComment />
                        {renderLstComment()}

                        <div className="tab__comment-btnReadmore">
                            <button className="c-main-btn icon-play" onClick={handleShowLstComment}>
                                {showComment >= lstUserComment.length ? "thu gọn" : "xem thêm"}
                            </button>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </Fragment>
    )
}

// ======================================================
// ShowtimeII Component
// ======================================================
/* Showtime for detail page */
function ShowtimeDetail(props) {
    const { filmDetail } = useSelector(state => state.QuanLyPhimReducer);
    const dispatch = useDispatch()
    const [state, setState] = useState({
        tabPosition: 'left',
    });
    const { tabPosition } = state;

    console.log(filmDetail.tenPhim)

    useEffect(() => {
        let { filmID } = props;
        dispatch(getCinemaShowtimeAction(filmID))
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
        return filmDetail.heThongRapChieu?.map((cinemaSystem, index) => {
            return (
                <TabPane
                    tab={<img className="cinema-brand" src={cinemaSystem.logo} alt={cinemaSystem.tenHeThongRap} />}
                    key={index}
                >
                    <Tabs tabPosition={tabPosition}>
                        {cinemaSystem.cumRapChieu?.map((cinema, index) => {
                            return (
                                <TabPane
                                    tab={
                                        <div className="cinema-location">
                                            <img src={cinema.hinhAnh} alt={cinema.tenCumRap} />
                                            <div>
                                                <h3>{cinema.tenCumRap}</h3>
                                                <h4>{cinema.diaChi}</h4>
                                                <NavLink to="/" >[Chi tết]</NavLink>
                                            </div>
                                        </div>
                                    }
                                    key={index}
                                >
                                    {/* List of detail info film */}
                                    {cinemaSystem.cumRapChieu.map((showtime, index) => {
                                        return (
                                            <div className="cinema-showtime" key={index}>
                                                <div className="cinema-showtime-info">
                                                    <img src={filmDetail.hinhAnh} alt={filmDetail.tenPhim} />
                                                    <div>
                                                        <h3>{filmDetail.tenPhim}</h3>
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
                                                    {showtime.lichChieuPhim.slice(0,10).map((time, index) => {
                                                        return (
                                                            <div>
                                                                <NavLink to={`/checkout/${time.maLichChieu}`} key={index}>
                                                                    {moment(time.ngayChieuGioChieu).format('hh:mm A')}
                                                                </NavLink>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )
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

// ======================================================
// Main Component 
// ======================================================
export default function (props) {
    const { filmDetail } = useSelector(state => state.QuanLyPhimReducer)
    const dispatch = useDispatch()
    const { id } = props.match.params
    useEffect(() => {
        let { id } = props.match.params;
        dispatch(getCinemaShowtimeAction(id))
    }, [])

    console.log(filmDetail)

    return (
        <section className="detail">

            {/* Detail background film */}
            <div className="detail__review" style={{ backgroundImage: "url(http://movieapi.cyberlearn.vn/hinhanh/madmax.jpg)", backgroundRepeat: "no-rereat" }}>
                <CustomCard
                    className="detail__review-styleBlur"
                    effectColor="#000000" // required
                    color="#fff" // default color is white
                    blur={10} // default blur value is 10px
                    borderRadius={0} // default border radius value is 10px
                >
                    <div className="detail__review-wrapper container2 ">
                        <div className="detail__review-img">
                            <figure>
                                <img src="http://movieapi.cyberlearn.vn/hinhanh/madmax.jpg" alt="news" />
                            </figure>
                            <div>
                                <h3>INTERTELLAR</h3>
                                <div className="c-review">
                                    <span className="c-review__raiting">PG-13</span>
                                    <p className="c-review__score">
                                        <span>8.0</span>
                                        <span>IMDb</span>
                                    </p>
                                </div>
                                <p>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                    Quaerat quia totam a unde quo corporis magni doloremque ducimus cum eius.
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat quia totam a unde quo corporis magni doloremque ducimus cum eius.
                                </p>
                                <button className="c-main-btn icon-play" onClick={() => {
                                    // let filmID = banner.maPhim
                                    // showModal(filmID)
                                }}><PlayCircleOutlined />Trailer</button>
                            </div>
                        </div>
                        <div className="detail__review-circlerate">
                            <Progress
                                type="circle"
                                strokeColor={{
                                    '0%': '#ff6b00',
                                    '50%': '#e98035',
                                    '100%': '#fbc358',
                                }}
                                percent={90}
                            />
                            <Rate disabled allowHalf defaultValue={2.5} />
                        </div>
                    </div>
                </CustomCard>
            </div>

            {/* Detail showtime */}
            <div className="detail__showtime l-section">
                <ShowtimeDetail filmID={id} />
            </div>

            {/* Detail tabs info and comment */}
            <div className="detail__info l-section">
                <div className="container2">
                    <TabComment />
                </div>
            </div>
        </section>
    )
}
