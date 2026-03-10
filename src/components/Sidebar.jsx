import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, message, Tooltip } from "antd";
import Image from "next/image";
import {
    GithubOutlined,
    LinkedinOutlined,
    MailOutlined,
    PhoneOutlined,
} from '@ant-design/icons';
import Link from "next/link";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [tooltipTitle, setTooltipTitle] = useState("mhp230306@gmail.com");

    const copyEmail = () => {
        navigator.clipboard.writeText("mhp230306@gmail.com")
            .then(() => {
                setTooltipTitle("Copied");
                setTimeout(() => {
                    setTooltipTitle("mhp230306@gmail.com");
                }, 2000);
            })
            .catch(() => {
                message.error("Failed to copy");
            });
    };

    // Define content for different pages
    const sidebarConfigs = {
        '/home': {
            items: [

            ]
        },
        '/archive': {
            items: [
                { key: '#got_plt', label: 'GOT-PLT' },
                { key: '#fmt', label: 'Format String' },
                { key: '#rop', label: 'ROP-Return Oriented Programming' },
            ]
        },
        '/ctf': {
            items: [
                { key: '/ctf', label: 'CTF' },
                { key: '/ctf/writeups', label: 'Writeups' },
            ]
        },
        '/writeup': {
            items: [
                { key: '/writeup', label: 'Writeups' },
                { key: '/writeup/web', label: 'Web Security' },
                { key: '/writeup/pwn', label: 'Pwnable' },
            ]
        },

    };

    // Get config based on current path (default to home)
    const currentConfig = Object.entries(sidebarConfigs).find(([path]) =>
        location.pathname.startsWith(path)
    )?.[1] || sidebarConfigs['/home'];

    return (
        <aside className="bg-black text-white p-2 w-full h-full flex flex-col items-center justify-between">
            <div className="flex flex-col items-center w-full">
                <div className="avatar overflow-hidden mb-8 border-2 border-[#141414]">
                    <Image
                        src="/Logo.jpeg"
                        alt="Logo"
                        width={120}
                        height={120}
                        className="grayscale hover:grayscale-0 transition-all duration-300 object-cover w-full h-full"
                    />
                </div>
                <div className="flex flex-col gap-12 w-full text-left">
                    <h1 className="text-xl font-bold tracking-tight uppercase px-4 text-center">Jaden</h1>
                    <Menu
                        mode="vertical"
                        selectedKeys={[location.pathname]}
                        items={currentConfig.items}
                        onClick={({ key }) => {
                            if (key.startsWith('#')) {
                                navigate(`${location.pathname}${key}`);
                            } else {
                                navigate(key);
                            }
                        }}
                        style={{ borderRight: 0 }}
                        className="custom-sidebar-menu"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-12 pb-4">
                <div className="flex flex-row gap-12 text-lg">
                    <Link href="https://github.com/MpMan123" target="_blank" rel="noopener noreferrer">
                        <GithubOutlined className="hover:text-white transition-colors text-gray-400" />
                    </Link>
                    <Link href="https://www.linkedin.com/in/ph%C6%B0%E1%BB%9Bc-mai-07784232b/" target="_blank" rel="noopener noreferrer">
                        <LinkedinOutlined className="hover:text-white transition-colors text-gray-400" />
                    </Link>
                    <Tooltip title={tooltipTitle}>
                        <MailOutlined onClick={copyEmail} className="cursor-pointer hover:text-white transition-colors text-gray-400" />
                    </Tooltip>
                </div>
            </div>
        </aside>
    );

};



export default Sidebar;