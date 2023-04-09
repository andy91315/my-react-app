import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const Layout = () => {
    return (
        <>
            <h1>Vanessa Furniture Mall</h1>

            <Tabs tabBarStyle={{ background: '#d7f9da', height: '50px'}} tabWidth={100} tabBarGutter={200}>
                <TabPane tab={<Link style={{ color: '#1dc92e' }} to="/">Home</Link>} key="1"></TabPane>
                <TabPane tab={<Link style={{ color: '#1dc92e' }} to="/login">Login</Link>} key="2"></TabPane>
                <TabPane tab={<Link style={{ color: '#1dc92e' }} to="/contact">Company Information</Link>} key="3"></TabPane>
            </Tabs>

            <Outlet />
        </>
    )
};

export default Layout;