import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { PlayCircleOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { GET_FILM_COMINGSOON, GET_FILM_NOWSHOWING } from "../../redux/types/QuanLyPhimType";

export default function MultipleRowCarousel(props) {
    let { arrAllFilmInfo } = props
    const { nowShowing, comingSoon } = useSelector(state => state.QuanLyPhimReducer)
    const [modal, setModal] = useState(false);
    const [trailer, setTrailer] = useState("");
    const dispatch = useDispatch()
    const settings = {
        slidesToShow: 4,
        slidesToScroll: 4,
        slidesPerRow: 1,
        speed: 500,
        rows: 2,
        arrows: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    rows: 1,
                    arrows: false,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rows: 1,
                    arrows: false,
                }
            }
        ]
    }

    const renderFilms = () => {
        return arrAllFilmInfo?.map((film, index) => {
            return <div className="multipleRow__wrapper" key={index}>
                <div className="multipleRow__item">
                    <div className="multipleRow__item-bg">
                        <NavLink to={`/detail/${film.maPhim}`} className="booking">ĐẶT VÉ</NavLink>
                        <PlayCircleOutlined className="trailer" onClick={() => {
                            setModal(true)
                            setTrailer(film.trailer)
                        }} />
                    </div>
                    <div className="multipleRow__item-content">
                        <img src={film.hinhAnh} alt="..." />
                        <p><span className="c-review__raiting">PG-13</span> {film.tenPhim}</p>
                        <div className="c-review__score">
                            <span>{film.danhGia.toFixed(1)}</span>
                            <span>IMDb</span>
                        </div>
                    </div>
                </div>
            </div>
        })
    }

    return (
        <section className="container2" >
            <div className="c-primary__title">
                <h3 className={nowShowing ? "title-active" : ""} onClick={() => {
                    dispatch({
                        type: GET_FILM_NOWSHOWING
                    })
                }} >Đang chiếu</h3>
                <h3 className={comingSoon ? "title-active" : ""} onClick={() => {
                    dispatch({
                        type: GET_FILM_COMINGSOON
                    })
                }}>Sắp Chiếu</h3>
            </div>
            <Slider {...settings} className="multipleRow">
                {renderFilms()}
            </Slider>
            <Modal modal={modal} trailer={trailer} setTrailer={setTrailer} setModal={setModal} />
        </section >
    )
}


