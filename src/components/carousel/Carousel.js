import React, { Fragment, useState } from 'react';
import { PlayCircleOutlined } from '@ant-design/icons'
import Slider from "react-slick";
import ModalTrailer from '../ModalTrailer/ModalTrailer';

export default function Carousel(props) {
  let { arrBanner } = props
  const [modal, setModal] = useState(false);
  const [trailer, setTrailer] = useState("");

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

  const showModal = (filmID) => {
    if (modal) {
      setTrailer("")
      setModal(false);
    } else {
      let url = "";
      let convertUrl = "";
      if (filmID === 1282) {
        url = "https://www.youtube.com/watch?v=uqJ9u7GSaYM";
        convertUrl = url.replace("watch?v=", "embed/");
      } else if (filmID === 1283) {
        url = "https://www.youtube.com/watch?v=kBY2k3G6LsM";
        convertUrl = url.replace("watch?v=", "embed/");
      } else if (filmID === 1284) {
        url = "https://www.youtube.com/watch?v=Eu9G8nO5-Ug";
        convertUrl = url.replace("watch?v=", "embed/");
      }
      setModal(true);
      setTrailer(convertUrl);
    }
  }

  const renderBannerCarousel = () => {
    return arrBanner.map((banner, index) => {
      return (
        <div className="mainvisual__wrapper" key={index}>
          <div style={{ backgroundImage: `url(${banner.hinhAnh})` }} className="mainvisual__inner">
            <div className="mainvisual__content container">
              <h2 className="heading">Lorem ipsum</h2>
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
                showModal(filmID)
              }}><PlayCircleOutlined />Trailer</button>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <Fragment>
      <Slider {...settings} className="mainvisual">
        {renderBannerCarousel()}
      </Slider>
      <ModalTrailer modal={modal} trailer={trailer} setTrailer={setTrailer} setModal={setModal} />
    </Fragment>
  )
}
