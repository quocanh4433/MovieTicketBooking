import React from 'react'
import { Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import { history } from '../../App';
import MiniAvartar from '../../components/MiniAvartar/MiniAvartar';
import { USER_LOGIN } from '../../utils/setting';

export default function AdminTemplate(props) {
    const { Header, Content, Footer, Sider } = Layout;
    let { Component, ...restProps } = props

    /** Check user logged  */
    let userLogin = null;
    if (localStorage.getItem(USER_LOGIN)) {
        userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
        // if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
        //     history.push('/home')
        // }
    } else if(userLogin === null) {
        history.push('/home')
    }

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
                                <NavLink to="/admin/statistic">Thống kê</NavLink>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<DesktopOutlined />}>
                                <NavLink to="/admin/listfilm">Quản lý phim</NavLink>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<TeamOutlined />}>
                                <NavLink to="/admin/listuser">Quản lý Người dùng</NavLink>
                            </Menu.Item>
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
                            <MiniAvartar />
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
