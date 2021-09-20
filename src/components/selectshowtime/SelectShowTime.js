import React from 'react'
import { Select } from 'antd';

const { Option } = Select;



export default function SelectShowTime() {

    return (
        <div className="selectShowtime container2">
            <Select placeholder="Phim" className="selectShowtime__dropdown" clearIcon bordered={false}>
                <Option value="jack">Intertellar</Option>
                <Option value="lucy">Inception</Option>
                <Option value="Yiminghe">Shutter Island</Option>
            </Select>
            <Select placeholder="Rạp" className="selectShowtime__dropdown" bordered={false}>
                <Option value="lucy">CGV</Option>
                <Option value="lucy">BHD</Option>
                <Option value="lucy">Lotte</Option>
                <Option value="lucy">CinaStart</Option>
            </Select>
            <Select placeholder="Ngày" className="selectShowtime__dropdown" bordered={false}>
                <Option value="lucy">22/08/2021</Option>
                <Option value="lucy">23/08/2021</Option>
                <Option value="lucy">24/08/2021</Option>
                <Option value="lucy">25/08/2021</Option>
            </Select>
            <Select placeholder="Suất" className="selectShowtime__dropdown" bordered={false}>
                <Option value="lucy">10:00</Option>
                <Option value="lucy">12:00</Option>
                <Option value="lucy">14:00</Option>
                <Option value="lucy">16:00</Option>
            </Select>
            <button className="c-main-btn icon-play">Đặt vé</button>
        </div>
    )
}
