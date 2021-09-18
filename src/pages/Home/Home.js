import React, { useEffect } from "react";
import Carousel from "../../components/carousel/Carousel";
import MultipleRows from "../../components/multiplerow-carousel/MultipleRow-Carousel";
import SelectShowTime from "../../components/selectshowtime/SelectShowTime";
import { useDispatch, useSelector } from "react-redux";
import { getAllFilmInfoAction } from "../../redux/actions/QuanLyPhimAction";

export default function Home(props) {
    const { arrAllFilmInfo } = useSelector(state => state.QuanLyPhimReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllFilmInfoAction())
    }, [])

    return (
        <section className="home">
            <Carousel />
            <SelectShowTime />
            <MultipleRows arrAllFilmInfo={arrAllFilmInfo} />
        </section>
    )
}
