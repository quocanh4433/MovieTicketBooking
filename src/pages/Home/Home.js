import React from "react";
import Slider from "react-slick";

export default function Home() {
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    return (
        <section className="home">
            <section className="carousel">
                <Slider {...settings}>
                    <div className="carousel__item" style={{backgroundImage: "url('./images/carousel/interstellar-wallpaper02.jpg')"}}>
                        <img src="./images/carousel/interstellar-wallpaper02.jpg" alt="..." />
                    </div>
                    <div className="carousel__item" style={{backgroundImage: "url('./images/carousel/interstellar-wallpaper02.jpg')"}}>
                        <img src="./images/carousel/interstellar.jpg" alt="..." />
                    </div>
                    <div className="carousel__item" style={{backgroundImage: "url('./images/carousel/interstellar-wallpaper02.jpg')"}}>
                        <img src="./images/carousel/interstellar-wallpaper02.jpg" alt="..." />
                    </div>
                </Slider>
            </section>

        </section>

    )
}
