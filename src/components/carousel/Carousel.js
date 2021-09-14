import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { useDispatch, useSelector, } from 'react-redux'
import { PlayCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { getAllFilmInfoAction, getBannerAction, getFilmBannerAction } from '../../redux/actions/QuanLyPhimAction';
import Modal from '../modal/Modal';


export default function Carousel() {
  const { arrBanner } = useSelector(state => state.QuanLyPhimReducer)
  const [modal, setModal] = useState(false);
  const [trailer, setTrailer] = useState(false);
  const dispatch = useDispatch()
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    autoplay: true,
  };

  const openModal = (filmID) => {
    if (modal) {
      setTrailer("")
      setModal(false);
    } else {
      let url = "";
      let convertUrl = "";
      if (filmID == 1282) {
        url = "https://www.youtube.com/watch?v=uqJ9u7GSaYM"
        convertUrl = url.replace("watch?v=", "embed/")
      } else if (filmID == 1283) {
        url = "https://www.youtube.com/watch?v=kBY2k3G6LsM"
        convertUrl = url.replace("watch?v=", "embed/")
      } else if (filmID == 1284) {
        url = "https://www.youtube.com/watch?v=Eu9G8nO5-Ug"
        convertUrl = url.replace("watch?v=", "embed/")
      }
      setModal(true)
      setTrailer(convertUrl)
    }
  }

  useEffect(() => {
    dispatch(getBannerAction())
  }, [])

  /* Close modal when press ESC */
  window.addEventListener("keydown", (e) => {
    e = e || window.event;
    if (e.keyCode == 27) {
      setTrailer("");
      setModal(false);
    }
  })
  /* Close modal when click another place */
  window.addEventListener('mouseup', (e) => {
    setTrailer("");
    setModal(false);

  });

  const renderBannerCarousel = () => {
    return arrBanner.map((banner, index) => {
      return <div className="slider" key={index}>
        <div style={{ backgroundImage: `url(${banner.hinhAnh})` }} className="slider__wrapper">
          <div className="slider__inner container">
            <h2 className="heading">intertellar</h2>
            <div className="c-review">
              <span className="c-review__raiting">PG-13</span>
              <p className="c-review__score">
                <span>8.0</span>
                <span>IMDb</span>
              </p>
            </div>
            <p className="desc">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat quia totam a unde quo corporis magni doloremque ducimus cum eius.
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat quia totam a unde quo corporis magni doloremque ducimus cum eius.</p>
            <button className="c-main-btn icon-play" onClick={() => {
              let filmID = banner.maPhim
              openModal(filmID) 
            }}><PlayCircleOutlined />Trailer</button>
          </div>
        </div>
      </div>
    })
  }

  return (
    <div className="slider">
      <Slider {...settings}>
        {renderBannerCarousel()}
      </Slider>
      <div className="modal modal-active" className={modal ? "modal modal-active" : "modal"}>
          <CloseCircleOutlined className="modal__btnClose" onClick={openModal} />
          <iframe className="modal__video" src={trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  )
}
