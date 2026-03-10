"use client";

import { Outlet } from "react-router-dom";
import { Layout as AntLayout } from "antd";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";


const { Content, Sider } = AntLayout;
const SIDEBAR_WIDTH = 250; // Use the user's preferred width

const Layout = () => {
    return (
        <AntLayout style={{ minHeight: "100vh", background: "#000000", borderLeft: '1px solid #000000' }}>
            <Sider
                width={SIDEBAR_WIDTH}
                theme="dark"
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    zIndex: 50,
                    borderRight: '1px solid #4a4646ff'
                }}
            >
                <Sidebar />
            </Sider>

            <AntLayout style={{ marginLeft: SIDEBAR_WIDTH, transition: 'all 0.2s', background: '#000000' }}>
                <Navbar />
                <Content style={{ margin: '24px 24px', overflow: 'initial' }}>
                    <div style={{ padding: '40px', background: '#000000', color: '#fff', minHeight: 'calc(100vh - 128px)', borderLeft: '1px solid #141414' }}>
                        <Outlet />
                    </div>
                </Content>
            </AntLayout>
        </AntLayout>
    );
};


export default Layout;
