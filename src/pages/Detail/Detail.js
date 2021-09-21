import React, { Fragment } from 'react'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import { Tabs } from 'antd';
import Showtime from '../../components/Showtime/Showtime';

const { TabPane } = Tabs;


export default function Detail() {
    return (
        <section className="detail">
            <div className="detail__review" style={{ backgroundImage: "url(http://movieapi.cyberlearn.vn/hinhanh/madmax.jpg)", backgroundRepeat: "no-rereat" }}>
                <CustomCard
                    style={{ minHeight: "200px", borderRadius: 0, paddingTop: "90px", backgroundColor: "rgba(0,0,0, 0.3)" }}
                    effectColor="#000000" // required
                    color="#fff" // default color is white
                    blur={13} // default blur value is 10px
                    borderRadius={0} // default border radius value is 10px
                >
                    <div className="detail__review-wrapper container2 ">
                        <div className="">
                            <figure>
                                <img src="http://movieapi.cyberlearn.vn/hinhanh/madmax.jpg" alt="news" />
                            </figure>
                            <div>
                                <h3>
                                    INERYELLAR
                                </h3>
                                p
                            </div>
                        </div>

                        <div>

                        </div>
                    </div>
                </CustomCard>

                <div style={{ backgroundColor: "#fff" }}>
                    <Showtime />
                </div>

                <div className="detail__info" style={{ backgroundColor: "#fff" }}>
                    <div className="container2">
                        <Tabs defaultActiveKey="1" centered>
                            <TabPane tab="Tab 1" key="1">
                                Content of Tab Pane 1
                            </TabPane>
                            <TabPane tab="Tab 2" key="2">
                                Content of Tab Pane 2
                            </TabPane>
                            <TabPane tab="Tab 3" key="3">
                                Content of Tab Pane 3
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>


        </section>


    )
}
