import React, { Component } from "react";
import Slider from "react-slick";
import { PlayCircleOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

export default class MultipleRows extends Component {
    render() {
        const settings = {
            slidesToShow: 4,
            slidesToScroll: 4,
            slidesPerRow: 1,
            infinite: true,
            speed: 500,
            rows: 2,
            arrows: true,
        };
        return (
            <section className="container2">
                <div className="c-primary__title">
                    <h3 className="title-active">Đang chiếu</h3>
                    <h3>Sắp Chiếu</h3>
                </div>
                <Slider {...settings} className="multipleRow">
                    <div className="multipleRow__wrapper">
                        <div className="multipleRow__item">
                            <div className="multipleRow__item-bg">
                                <button className="booking">ĐẶT VÉ</button>
                                <NavLink to="/" className="trailer"><PlayCircleOutlined /></NavLink>
                            </div>
                            <div className="multipleRow__item-content">
                                <img src="https://picsum.photos/200/250" alt="..." />

                                <p> <span className="c-review__raiting">PG-13</span> Intertellar</p>
                                <div className="c-review__score">
                                    <span>8.0</span>
                                    <span>IMDb</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="multipleRow__wrapper">
                        <div className="multipleRow__item">
                            <div className="multipleRow__item-bg">
                                <button className="booking">ĐẶT VÉ</button>
                                <NavLink to="/" className="trailer"><PlayCircleOutlined /></NavLink>
                            </div>
                            <div className="multipleRow__item-content">
                                <img src="https://picsum.photos/200/250" alt="..." />

                                <p> <span className="c-review__raiting">PG-13</span> Intertellar Intertellar Intertellar</p>
                                <div className="c-review__score">
                                    <span>8.0</span>
                                    <span>IMDb</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="multipleRow__wrapper">
                        <div className="multipleRow__item">
                            <div className="multipleRow__item-bg">
                                <button className="booking">ĐẶT VÉ</button>
                                <NavLink to="/" className="trailer"><PlayCircleOutlined /></NavLink>
                            </div>
                            <div className="multipleRow__item-content">
                                <img src="https://picsum.photos/200/250" alt="..." />

                                <p> <span className="c-review__raiting">PG-13</span> Intertellar Intertellar Intertellar</p>
                                <div className="c-review__score">
                                    <span>8.0</span>
                                    <span>IMDb</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="multipleRow__wrapper">
                        <div className="multipleRow__item">
                            <div className="multipleRow__item-bg">
                                <button className="booking">ĐẶT VÉ</button>
                                <NavLink to="/" className="trailer"><PlayCircleOutlined /></NavLink>
                            </div>
                            <div className="multipleRow__item-content">
                                <img src="https://picsum.photos/200/250" alt="..." />

                                <p> <span className="c-review__raiting">PG-13</span> Intertellar Intertellar Intertellar</p>
                                <div className="c-review__score">
                                    <span>8.0</span>
                                    <span>IMDb</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="multipleRow__wrapper">
                        <div className="multipleRow__item">
                            <div className="multipleRow__item-bg">
                                <button className="booking">ĐẶT VÉ</button>
                                <NavLink to="/" className="trailer"><PlayCircleOutlined /></NavLink>
                            </div>
                            <div className="multipleRow__item-content">
                                <img src="https://picsum.photos/200/250" alt="..." />

                                <p> <span className="c-review__raiting">PG-13</span> Intertellar Intertellar Intertellar</p>
                                <div className="c-review__score">
                                    <span>8.0</span>
                                    <span>IMDb</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="multipleRow__wrapper">
                        <div className="multipleRow__item">
                            <div className="multipleRow__item-bg">
                                <button className="booking">ĐẶT VÉ</button>
                                <NavLink to="/" className="trailer"><PlayCircleOutlined /></NavLink>
                            </div>
                            <div className="multipleRow__item-content">
                                <img src="https://picsum.photos/200/250" alt="..." />

                                <p> <span className="c-review__raiting">PG-13</span> Intertellar Intertellar Intertellar</p>
                                <div className="c-review__score">
                                    <span>8.0</span>
                                    <span>IMDb</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="multipleRow__wrapper">
                        <div className="multipleRow__item">
                            <div className="multipleRow__item-bg">
                                <button className="booking">ĐẶT VÉ</button>
                                <NavLink to="/" className="trailer"><PlayCircleOutlined /></NavLink>
                            </div>
                            <div className="multipleRow__item-content">
                                <img src="https://picsum.photos/200/250" alt="..." />

                                <p> <span className="c-review__raiting">PG-13</span> Intertellar Intertellar Intertellar</p>
                                <div className="c-review__score">
                                    <span>8.0</span>
                                    <span>IMDb</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="multipleRow__wrapper">
                        <div className="multipleRow__item">
                            <div className="multipleRow__item-bg">
                                <button className="booking">ĐẶT VÉ</button>
                                <NavLink to="/" className="trailer"><PlayCircleOutlined /></NavLink>
                            </div>
                            <div className="multipleRow__item-content">
                                <img src="https://picsum.photos/200/250" alt="..." />

                                <p> <span className="c-review__raiting">PG-13</span> Intertellar Intertellar Intertellar</p>
                                <div className="c-review__score">
                                    <span>8.0</span>
                                    <span>IMDb</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    
                </Slider>
            </section>
        );
    }
}