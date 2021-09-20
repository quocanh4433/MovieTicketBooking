import React, { useEffect } from "react";
import Carousel from "../../components/carousel/Carousel";
import MultipleRows from "../../components/multiplerow-carousel/MultipleRow-Carousel";
import SelectShowTime from "../../components/selectshowtime/SelectShowTime";
import { useDispatch, useSelector } from "react-redux";
import { getAllFilmInfoAction, getBannerAction } from "../../redux/actions/QuanLyPhimAction";
import Showtime from "../../components/Showtime/Showtime";

export default function Home(props) {
    const { arrAllFilmInfo } = useSelector(state => state.QuanLyPhimReducer)
    const { arrBanner } = useSelector(state => state.QuanLyPhimReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllFilmInfoAction());
        dispatch(getBannerAction());
    }, [])

    return (
        <section className="home">
            <section>
                <Carousel  arrBanner={arrBanner} />
            </section>
            <section>
                <SelectShowTime />
            </section>
            <section className="l-section">
                <MultipleRows  arrAllFilmInfo={arrAllFilmInfo} />
            </section>
            <div className="c-doubleline"></div>
            <section className="l-section">
                <Showtime /> 
            </section>
            <div className="c-doubleline"></div>
        </section>
    )
}
