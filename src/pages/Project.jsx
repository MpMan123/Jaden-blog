import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// A dynamic router link wrapper that prevents Next.js SSR build crashes
const SafeLink = ({ to, children, ...props }) => {
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsClient(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    // const targetProps = {
    //     target: "_blank",
    //     rel: "noopener noreferrer"
    // };

    if (!isClient || props.target) {
        // Fallback to static anchor tag during Next.js server compilation or for native targets
        if (to.includes("https")) {
            return <a href={to} {...props}>{children}</a>
        }
        return <a href={`/jaden-blog${to}`} {...props}>{children}</a>;
    }
    
    return <Link to={to} {...props}>{children}</Link>;
};

const articles = [
    {
        date: "2026.01.28",
        title: "Hospital Records and Staff Management Web Application",
        tags: ["management", "web"],
        summary: "A comprehensive web-based solution designed to facilitate administration. The platform securely manages employees' schedules and patients' records",
        link: "https://github.com/tphi12/Hospital_Management_Web"
    },
    {
        date: "2026.03.29",
        title: "Full-Stack Personal Finance & Wealth Management Platform with AI Copilot & Gamification",
        tags: ["project", "full-stack"],
        summary: "ntelligent, gamified personal finance and wealth management platform designed to help users seamlessly track transactions, optimize debts, achieve saving goals, and build healthy financial habits",
        link: "https://github.com/MpMan123/pockii_ChichChoeLoiNuoc_WebDev2026"
    },
    {
        date: "2026.05.02",
        title: "Food Delivery Web Application (GrabFood Simulation)",
        tags: ["full-stack", "websocket"],
        summary: "The system enables users to browse restaurant menus, search for items, manage shopping carts, and experience a real-time order lifecycle—from checkout to live order status tracking (Preparing -> Delivering -> Completed",
        link: "https://github.com/MpMan123/BTL_Database_L02"
    }
];


const Project = () => {
    return (
        <section>
                <div className="flex justify-between items-end mb-8 border-b border-outline-variant/30 pb-4">
                    <h2 className="font-headline-md text-2xl text-on-surface font-semibold">Latest Thoughts</h2>
                    <span className="font-label-code text-xs text-on-surface-variant tracking-wider uppercase">{articles.length} ENTRIES_FOUND</span>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                    {articles.map((article, index) => (
                        <article key={index} className="bg-surface border border-outline-variant p-6 hover:border-primary/50 transition-all duration-300 group flex flex-col md:flex-row gap-6 relative hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                            {/* Accent indicator */}
                            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-transparent group-hover:bg-primary transition-all duration-300"></div>

                            <div className="flex flex-col justify-between md:w-44 shrink-0">
                                <time className="font-label-code text-xs font-bold text-primary mb-2 select-none">{article.date}</time>
                                <div className="flex flex-wrap gap-1.5">
                                    {article.tags.map((tag, tIdx) => {
                                        // Determine target path dynamically based on tag category
                                        let targetPath = "/archive";
                                        if (tag === "project") {
                                            targetPath = "/project";
                                        } else if (tag === "writeup" || tag === "security") {
                                            targetPath = "/writeup";
                                        }

                                        return (
                                            <SafeLink 
                                                key={tIdx} 
                                                to={targetPath} 
                                                className="font-label-code text-[10px] text-secondary border border-secondary/20 hover:border-primary/60 hover:text-primary px-2 py-0.5 rounded-sm select-none transition-all duration-200 cursor-pointer"
                                                target="_blank"
                                            >
                                                #{tag}
                                            </SafeLink>
                                        );
                                    })}
                                </div>
                            </div>
                            
                            <div className="flex-1">
                                <SafeLink to={article.link} target="_blank" className="block group/title hover:text-primary">
                                    <h3 className="font-headline-md text-xl text-on-surface group-hover/title:text-primary transition-colors duration-200 mb-3 font-medium">
                                        {article.title}
                                    </h3>
                                </SafeLink>
                                <p className="font-body-md text-sm text-on-surface-variant mb-4 leading-relaxed">
                                    {article.summary}
                                </p>
                                <SafeLink to={article.link} target="_blank" className="inline-flex items-center gap-2 font-label-code text-xs text-primary group/link hover:underline">
                                    read_more <span className="group-hover/link:translate-x-1 transition-transform duration-200">-&gt;</span>
                                </SafeLink>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
    );
};

export default Project;
