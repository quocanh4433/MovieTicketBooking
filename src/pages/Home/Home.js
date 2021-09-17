import React from "react";
import Carousel from "../../components/carousel/Carousel";
import MultipleRows from "../../components/multiplerow-carousel/MultipleRow-Carousel";
import SelectShowTime from "../../components/selectshowtime/SelectShowTime";

export default function Home(props) {
    return (
        <section className="home">
            <Carousel />
            <SelectShowTime />
            <MultipleRows />
        </section>
    )
}
