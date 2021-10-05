import React from 'react';
import { Column, Line } from '@ant-design/charts';
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
import { FlagOutlined, RiseOutlined, FallOutlined, UsergroupDeleteOutlined, UserSwitchOutlined } from '@ant-design/icons'

const { TabPane } = Tabs;


export default function Statistics() {
    const { showtimeDetail } = useSelector(state => state.QuanLyDatVeReducer)
    let { danhSachGhe } = showtimeDetail

    /** For Column Chart */
    const ColumnChart: React.FC = () => {

        let dataCoumnChart = [
            {
                type: 'CGV',
                sales: 286,
            },
            {
                type: 'BHD',
                sales: 232,
            },
            {
                type: 'LOTTE',
                sales: 145,
            },
            {
                type: 'MEGA GS',
                sales: 61,
            },
            {
                type: 'CINE START',
                sales: 89,
            },
            {
                type: 'GALAXY',
                sales: 133,
            },
        ];

        let configColumnChart = {
            data: dataCoumnChart,
            xField: 'type',
            yField: 'sales',
            label: {
                position: 'middle',
                style: {
                    fill: '#fff',
                    backgroundColor: "blue",
                    opacity: 0.6,
                    stroke: 'sales'
                },
            },
            seriesField: 'type',
            xAxis: {
                label: {
                    autoHide: true,
                    autoRotate: false,

                },
                layout: [
                    { type: 'interval-adjust-position' },
                    { type: 'interval-hide-overlap' },
                    { type: 'adjust-color' },
                ],
            },
            yAxis: {
                label: {
                    formatter: function formatter(sales) {
                        return ''.concat((sales), ' Tỷ');
                    },
                },
            },
            meta: {
                type: { alias: 'Trục tung' },
                sales: { alias: 'Doanh Thu' },
            },
        };

        return <Column {...configColumnChart} />;
    };

    /** For Line Chart */
    const LineChart: React.FC = () => {

        let dataLineChart = [
            {
                "name": "CGV",
                "year": "2016",
                "customer": 30435
            },
            {
                "name": "CGV",
                "year": "2017",
                "customer": 35286
            },
            {
                "name": "CGV",
                "year": "2018",
                "customer": 32435
            },
            {
                "name": "CGV",
                "year": "2019",
                "customer": 37343
            },
            {
                "name": "CGV",
                "year": "2020",
                "customer": 40546
            },
            {
                "name": "BHD",
                "year": "2016",
                "customer": 28234
            },
            {
                "name": "BHD",
                "year": "2017",
                "customer": 29435
            },
            {
                "name": "BHD",
                "year": "2018",
                "customer": 30854
            },
            {
                "name": "BHD",
                "year": "2019",
                "customer": 26375
            },
            {
                "name": "BHD",
                "year": "2020",
                "customer": 32453
            },

            {
                "name": "LOTTE",
                "year": "2016",
                "customer": 26435
            },
            {
                "name": "LOTTE",
                "year": "2017",
                "customer": 23856
            },
            {
                "name": "LOTTE",
                "year": "2018",
                "customer": 28453
            },
            {
                "name": "LOTTE",
                "year": "2019",
                "customer": 24067
            },
            {
                "name": "LOTTE",
                "year": "2020",
                "customer": 28736
            },
            {
                "name": "MEGAGS",
                "year": "2016",
                "customer": 1200
            },
            {
                "name": "MEGAGS",
                "year": "2017",
                "customer": 5756
            },

            {
                "name": "MEGAGS",
                "year": "2018",
                "customer": 7649
            },
            {
                "name": "MEGAGS",
                "year": "2019",
                "customer": 10453
            },
            {
                "name": "MEGAGS",
                "year": "2020",
                "customer": 12646
            },
            {
                "name": "CINESTART",
                "year": "2016",
                "customer": 5327
            },
            {
                "name": "CINESTART",
                "year": "2017",
                "customer": 7547
            },
            {
                "name": "CINESTART",
                "year": "2018",
                "customer": 9759
            },
            {
                "name": "CINESTART",
                "year": "2019",
                "customer": 12305
            },
            {
                "name": "CINESTART",
                "year": "2020",
                "customer": 15636
            },
            {
                "name": "GALAXY",
                "year": "2016",
                "customer": 20667
            },
            {
                "name": "GALAXY",
                "year": "2017",
                "customer": 20987
            },
            {
                "name": "GALAXY",
                "year": "2018",
                "customer": 23968
            },
            {
                "name": "GALAXY",
                "year": "2019",
                "customer": 26757
            },
            {
                "name": "GALAXY",
                "year": "2020",
                "customer": 27386
            },
        ];

        let configLineChart = {
            data: dataLineChart,
            xField: 'year',
            yField: 'customer',
            seriesField: 'name',
            yAxis: {
                label: {
                    formatter: function formatter(customer) {
                        return ''.concat(customer, ' Người');
                    },
                },
            },
            legend: { position: 'top' },
            smooth: true,
        };
        return <Line {...configLineChart} />;
    };

    /** For Tabs */
    const callback = () => {}

    return (
        <Tabs defaultActiveKey="1" onChange={callback} className="statistics">
            <TabPane tab={<h4>01. THỐNG KÊ DOANH THU</h4>} key="1">
                <div className="chartInfo">
                    <div className="chartInfo__item" >
                        <div className="chartInfo__item-content">
                            <h5>Tổng doanh thu</h5>
                            <span className="total">956  <span className="unit">tỷ</span></span>
                        </div>
                        <div className="chartInfo__item-icon">
                            <FlagOutlined className="icon-total" />
                        </div>
                    </div>
                    <div className="chartInfo__item" >
                        <div className="chartInfo__item-content">
                            <h5>Doanh thu cao nhất</h5>
                            <span className="highest">238 <span className="unit">tỷ</span></span>
                        </div>
                        <div className="chartInfo__item-icon">
                            <RiseOutlined className="icon-highest" />
                        </div>
                    </div>
                    <div className="chartInfo__item">
                        <div className="chartInfo__item-content">
                            <h5>Doanh thu thấp nhất</h5>
                            <span className="lowest">61 <span className="unit">tỷ</span></span>
                        </div>
                        <div className="chartInfo__item-icon">
                            <FallOutlined className="icon-lowest" />
                        </div>
                    </div>
                </div>
                <ColumnChart />
            </TabPane>
            <TabPane tab={<h4>02. THỐNG KÊ SỐ LƯỢNG KHÁCH HÀNG</h4>} key="2">
                <div className="chartInfo">
                    <div className="chartInfo__item" >
                        <div className="chartInfo__item-content">
                            <h5>Tổng lượng khách hàng</h5>
                            <span className="total">66.2986 <span className="unit">người</span></span>
                        </div>
                        <div className="chartInfo__item-icon">
                            <FlagOutlined className="icon-total" />
                        </div>
                    </div>
                    <div className="chartInfo__item" >
                        <div className="chartInfo__item-content">
                            <h5>số lượng KH cao nhất 2020</h5>
                            <span className="highest">40.546 <span className="unit">người</span></span>
                        </div>
                        <div className="chartInfo__item-icon">
                            <UserSwitchOutlined className="icon-highest" />
                        </div>
                    </div>
                    <div className="chartInfo__item">
                        <div className="chartInfo__item-content">
                            <h5>số lượng KH thấp nhất 2020</h5>
                            <span className="lowest">12.646 <span className="unit">người</span></span>
                        </div>
                        <div className="chartInfo__item-icon">
                            <UsergroupDeleteOutlined className="icon-lowest" />
                        </div>
                    </div>
                </div>
                <LineChart />
            </TabPane>
        </Tabs>
    )
}


