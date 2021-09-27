import React, { useState } from 'react'
import { Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    LeftCircleOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { history } from '../../App';



export default function AdminTemplate(props) {

    const { Header, Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)

    let { Component, ...restProps } = props


    return (
        <Route  {...restProps} render={(propsRoute) => {
            return (
                <Layout className="admin" style={{ minHeight: '100vh' }}>
                    <Sider width={250} className="admin__sidebar">
                        <figure className="admin__sidebar-logo">
                            <NavLink to="/home"><img src="/images/header/logo.svg" alt="Logo" /></NavLink>
                        </figure>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1" icon={<PieChartOutlined />}>
                                <NavLink to="/admin">Thống kê</NavLink>
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<DesktopOutlined />} title="Phim">
                                <Menu.Item key="3">
                                    <NavLink to="/admin/film/listfilm"> Danh Sách Phim</NavLink>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <NavLink to="/admin/film/addfilm">Thêm Phim</NavLink>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<TeamOutlined />} title="Người dùng">
                                <Menu.Item key="6">
                                    <NavLink to="/admin/listuser">Danh Sách Người Dùng</NavLink>
                                </Menu.Item>
                                <Menu.Item key="8">
                                    <NavLink to="/admin/adduser">Thêm Người Dùng</NavLink>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>

                    <Layout className="admin__layout">
                        <Header className=".admin-header">
                            <figure onClick={() => {
                                history.push("/home")
                            }}>
                                <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M33.3333 27.0833V22.9167H14.5833V16.6667L4.16663 25L14.5833 33.3333V27.0833H33.3333Z" fill="#FF8A00" />
                                    <path d="M41.6667 6.25H22.9167C20.6188 6.25 18.75 8.11875 18.75 10.4167V18.75H22.9167V10.4167H41.6667V39.5833H22.9167V31.25H18.75V39.5833C18.75 41.8812 20.6188 43.75 22.9167 43.75H41.6667C43.9646 43.75 45.8333 41.8812 45.8333 39.5833V10.4167C45.8333 8.11875 43.9646 6.25 41.6667 6.25Z" fill="#FF8A00" />
                                </svg>
                            </figure>
                            <div className="userInfo">
                                <p>{userLogin.taiKhoan}</p>
                                <div>
                                    <img src="/images/header/avatar.fif" alt="UserName" onError={(e) => { e.target.onError = null; e.target.src = `/images/header/avatar-user.jpg` }} />
                                </div>
                            </div>

                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            <section className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                <Component {...propsRoute} />
                            </section>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>COPYRIGHT 2021 CYBERBOX. All RIGHTS RESERVED .</Footer>
                    </Layout>
                </Layout>
            )
        }} />

    )
}
