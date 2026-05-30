"use client";

import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";

const Navbar = () => {
    const location = useLocation();

    // Generate Breadcrumb items based on path
    const getBreadcrumbItems = () => {
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((snippet, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            let title = snippet;
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
                title: <Link to="/">Root</Link>,
            },
        ].concat(extraBreadcrumbItems);
    };

    return (
        <header className="sticky top-0 z-40 bg-surface/85 backdrop-blur-md border-b border-outline-variant flex justify-between items-center w-full px-8 h-16 max-w-[calc(1100px+24px)] mx-auto">
            {/* Left Section: Logo & Breadcrumbs */}
            <div className="flex items-center gap-6">
                <span className="font-label-code text-sm font-bold text-primary tracking-tighter">
                    jaden.blog
                </span>
                
                {/* Dynamic Breadcrumbs */}
                <div className="custom-breadcrumb hidden md:block">
                    <Breadcrumb items={getBreadcrumbItems()} />
                </div>
            </div>

            {/* Right Section: Grep Search & Actions */}
            <div className="flex items-center gap-4">
                <div className="relative hidden sm:block">
                    <input 
                        type="text"
                        placeholder="&gt; grep search..." 
                        className="bg-surface-container-low border border-outline-variant rounded-sm py-1 px-3 text-xs font-label-code text-on-surface-variant focus:border-primary focus:outline-none focus:ring-0 w-44 placeholder:text-outline transition-all duration-300"
                    />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
