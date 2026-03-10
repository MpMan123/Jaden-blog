import { useLocation, Link, useNavigate } from "react-router-dom";
import {
    BellOutlined,
    SettingOutlined,
    UserOutlined,
    CalendarOutlined,
    HomeOutlined
} from "@ant-design/icons";
import { Layout, Breadcrumb, theme, Menu } from "antd";
const { Header } = Layout;

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    // Generate Breadcrumb items based on path
    const getBreadcrumbItems = () => {
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            // Simple mapping for demo purposes
            let title = pathSnippets[index];
            if (title === 'home') title = 'Home';
            if (title === 'archive') title = 'Archive';
            if (title === 'ctf') title = 'CTF';
            if (title === 'writeup') title = 'Write Up';

            return {
                key: url,
                title: <Link to={url}>{title.charAt(0).toUpperCase() + title.slice(1)}</Link>,
            };
        });

        return [
            {
                key: '/',
                title: <Link to="/">Home</Link>,
            },
        ].concat(extraBreadcrumbItems);
    };

    // User Dropdown Menu
    const menuProps = {
        items: [
            {
                key: '/home',
                label: <Link to="/home">Home</Link>,
            },
            {
                key: 'archive',
                label: <Link to="/archive">Archive</Link>,
            },
            {
                key: 'ctf',
                label: <Link to="/ctf">CTF</Link>,
            },
            {
                key: 'writeup',
                label: <Link to="/writeup">Write Up</Link>,
            },
        ],
    };

    return (
        <Header
            style={{
                padding: '0 40px',
                background: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                zIndex: 40,
                borderBottom: '1px solid #141414',
                height: '80px'
            }}
        >
            {/* Breadcrumb - Keeping it but styled minimally by CSS */}
            <div className="custom-breadcrumb">
                <Breadcrumb items={getBreadcrumbItems()} />
            </div>

            {/* Right Side Actions */}

            <Menu
                mode="horizontal"
                selectedKeys={[location.pathname]}
                items={menuProps.items}
                onClick={({ key }) => navigate(key)}
                theme="dark"
                className="custom-navbar-menu"
                style={{
                    flex: 1,
                    minWidth: 0,
                    background: 'transparent',
                    borderBottom: 0,
                    justifyContent: 'flex-end',
                }}
            />

        </Header>
    );

};

export default Navbar;
