import React, { Component } from "react";
import Slider from "react-slick";

export default class ParallelCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null
        };
    }

    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }

    render() {
        const settings = {
            arrows: false,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        arrows: false
                    }
                }
            ]
        }
        return (
            <div>
                <Slider
                    asNavFor={this.state.nav2}
                    ref={slider => (this.slider1 = slider)}
                    className="slider__main"
                >
                    <div>
                        <img src="./images/events/event01.jpg" alt="events" />
                    </div>
                    <div>
                        <img src="./images/events/event02.jpg" alt="events" />
                    </div>
                    <div>
                        <img src="./images/events/event03.jpg" alt="events" />
                    </div>
                    <div>
                        <img src="./images/events/event04.jpg" alt="events" />
                    </div>
                    <div>
                        <img src="./images/events/event05.jpg" alt="events" />
                    </div>
                    <div>
                        <img src="./images/events/event06.jpg" alt="events" />
                    </div>
                </Slider>
                <Slider
                    asNavFor={this.state.nav1}
                    ref={slider => (this.slider2 = slider)}
                    slidesToShow={3}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    className="slider__secondary"
                    {...settings}
                >
                    <div >
                        <img src="./images/events/event01.jpg" alt="events" />
                    </div>
                    <div>
                        <img src="./images/events/event02.jpg" alt="events" />
                    </div>
                    <div>
                        <img src="./images/events/event03.jpg" alt="events" />
                    </div>
                    <div >
                        <img src="./images/events/event04.jpg" alt="events" />
                    </div>
                    <div >
                        <img src="./images/events/event05.jpg" alt="events" />
                    </div>
                    <div >
                        <img src="./images/events/event06.jpg" alt="events" />
                    </div>
                </Slider>
            </div>
        );
    }
}
