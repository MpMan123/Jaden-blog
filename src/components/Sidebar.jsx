"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Tooltip, message } from "antd";
import { 
    GithubOutlined,
    LinkedinOutlined,
    MailOutlined
} from "@ant-design/icons";
import Image from "next/image";
import logo from "../../public/Logo.jpeg";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [tooltipTitle, setTooltipTitle] = useState("mhp230306@gmail.com");
    const [terminalText, setTerminalText] = useState("jaden@root:~_");

    // Dynamic sidebar tabs array for auto rendering
    const sidebarTab = [
        { label: 'Journal', path: '/home', icon: 'terminal' },
        { label: 'Projects', path: '/project', icon: 'code' },
        { label: 'Archive', path: '/archive', icon: 'menu_book' },
        { label: 'Write Up', path: '/writeup', icon: 'rate_review' },
        { label: 'About', path: '/about', icon: 'person_pin' },
    ];

    // Blinking terminal cursor effect
    useEffect(() => {
        const text = "jaden@root:~";
        let visible = true;
        const interval = setInterval(() => {
            setTerminalText(visible ? text + "_" : text + " ");
            visible = !visible;
        }, 600);
        return () => clearInterval(interval);
    }, []);

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
            items: []
        },
        '/archive': {
            items: [
                { key: '#com_architecture', label: 'Computer Architecture' },
                { key: '#os', label: 'Operating System' },
                { key: '#got_plt', label: 'GOT-PLT' },
                { key: '#fmt', label: 'Format String' },
                { key: '#rop', label: 'ROP-Return Oriented Programming' },
            ]
        },
        '/project': {
            
        },
        '/writeup': {
            items: [
                { key: '/writeup/web', label: 'Web Security' },
                { key: '/writeup/pwn', label: 'Pwnable' },
            ]
        },
    };

    // Get config based on current path
    const currentConfig = Object.entries(sidebarConfigs).find(([path]) =>
        location.pathname.startsWith(path)
    )?.[1] || sidebarConfigs['/home'];

    const isActive = (path) => {
        if (path === '/home' && location.pathname === '/') return true;
        return location.pathname.startsWith(path);
    };

    const handleSubItemClick = (key) => {
        if (key.startsWith('#')) {
            navigate(`${location.pathname}${key}`);
            const el = document.getElementById(key.slice(1));
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate(key);
        }
    };

    return (
        <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant flex flex-col py-8 px-4 z-50">
            {/* Brand / Profile */}
            <div className="mb-12 px-4">
                <div className="w-14 h-14 mb-4 overflow-hidden rounded bg-surface-container-high border border-outline-variant">
                    <Image
                        src={logo}
                        alt="Jaden's terminal-style profile avatar"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    />
                </div>
                <h1 className="font-label-code text-sm font-bold text-primary mb-1">{terminalText}</h1>
                <p className="font-label-code text-[10px] text-on-surface-variant uppercase tracking-wider">IT Systems &amp; Architecture</p>
            </div>

            {/* Navigation Tabs - Dynamically Rendered with sidebarTab */}
            <nav className="flex-1 space-y-2">
                {sidebarTab.map((tab) => (
                    <Link
                        key={tab.path}
                        to={tab.path}
                        className={`flex items-center gap-3 py-2 px-4 transition-all duration-200 font-label-code text-sm ${
                            isActive(tab.path)
                                ? 'text-primary font-bold border-l-2 border-primary bg-surface-container-high/40'
                                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/20'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
                        {tab.label}
                    </Link>
                ))}

                {/* Submenu Index Indicator */}
                {currentConfig.items && currentConfig.items.length > 0 && (
                    <div className="pt-4 mt-4 border-t border-outline-variant/30 pl-4 space-y-1.5 animate-fade-in">
                        <p className="font-label-caps text-[10px] text-outline uppercase tracking-wider mb-2">Section Index</p>
                        {currentConfig.items.map(item => (
                            <button
                                key={item.key}
                                onClick={() => handleSubItemClick(item.key)}
                                className="w-full text-left font-label-code text-xs text-on-surface-variant hover:text-primary transition-colors py-1 flex items-center gap-1.5 cursor-pointer"
                            >
                                <span className="text-[10px] text-outline">&gt;</span>
                                <span className="truncate">{item.label}</span>
                            </button>
                        ))}
                    </div>
                )}
            </nav>

            {/* CTA & Footer Tabs */}
            <div className="mt-auto space-y-6">
                <div className="flex justify-around pt-6 border-t border-outline-variant">
                    <a className="text-on-surface-variant hover:text-primary transition-colors" href="https://github.com/MpMan123" target="_blank" rel="noopener noreferrer" title="GitHub">
                        <span className="material-symbols-outlined"><GithubOutlined/></span>
                    </a>
                    <a className="text-on-surface-variant hover:text-primary transition-colors" href="https://www.linkedin.com/in/ph%C6%B0%E1%BB%9Bc-mai-07784232b/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                        <span className="material-symbols-outlined"><LinkedinOutlined /></span>
                    </a>
                    <Tooltip title={tooltipTitle}>
                        <span onClick={copyEmail} className="cursor-pointer text-on-surface-variant hover:text-primary transition-colors material-symbols-outlined">
                            <MailOutlined />
                        </span>
                    </Tooltip>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;