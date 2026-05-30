"use client";

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
    return (
        <div className="min-h-screen flex bg-background text-on-surface">
            {/* Sidebar Navigation */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="ml-64 flex-1 min-h-screen flex flex-col pl-0">
                {/* Sticky Top Bar */}
                <Navbar />

                {/* Main Content Canvas */}
                <div className="flex-1 max-w-[1100px] mx-auto w-full px-8 py-12">
                    <Outlet />
                </div>

                {/* Footer */}
                <footer className="mt-auto border-t border-outline-variant bg-surface">
                    <div className="flex flex-col md:flex-row justify-between items-center py-6 px-8 max-w-[1100px] mx-auto w-full">
                        <div className="mb-4 md:mb-0">
                            <p className="font-label-code text-xs text-on-surface-variant uppercase tracking-wider">
                                © 2026 JADEN_CMD. ALL_RIGHTS_RESERVED.
                            </p>
                        </div>
                        <div className="flex gap-8">
                            <a className="font-label-code text-xs text-on-surface-variant hover:text-primary hover:underline decoration-primary transition-all duration-200" href="#">Privacy</a>
                            <a className="font-label-code text-xs text-on-surface-variant hover:text-primary hover:underline decoration-primary transition-all duration-200" href="#">License</a>
                            <a className="font-label-code text-xs text-on-surface-variant hover:text-primary hover:underline decoration-primary transition-all duration-200" href="#">Changelog</a>
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                            <span className="font-label-code text-xs text-on-surface-variant uppercase tracking-wider">SYSTEM_STABLE</span>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default Layout;
