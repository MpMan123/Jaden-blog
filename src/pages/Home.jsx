"use client";

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

    if (!isClient || props.target) {
        // Fallback to static anchor tag during Next.js server compilation or for native targets
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/jaden-blog";
        return <a href={`${basePath}${to}`} {...props}>{children}</a>;
    }
    
    return <Link to={to} {...props}>{children}</Link>;
};

const Home = () => {
    // List of real articles from the user's codebase, mapped to the ui.html post style
    const articles = [
        {
            date: "2026.05.28",
            title: "Global Offset Table & Procedure Linkage Table (GOT-PLT)",
            tags: ["pwn", "security"],
            summary: "Deep dive into dynamic linking internals, exploring how the Global Offset Table and Procedure Linkage Table operate and how they can be hijacked in binary exploitation.",
            link: "/archive#got_plt"
        },
        {
            date: "2026.05.15",
            title: "Format String Vulnerabilities & Exploitation",
            tags: ["pwn", "format-string"],
            summary: "Analyzing the mechanics behind format string vulnerabilities. Learn how uncontrolled format arguments allow attackers to leak memory addresses and perform arbitrary writes.",
            link: "/archive#fmt"
        },
        {
            date: "2026.05.02",
            title: "Return Oriented Programming (ROP) Internals",
            tags: ["rop", "pwn", "binary"],
            summary: "Introduction to ROP gadget chaining to bypass DEP/NX mitigations. A structured guide to scanning binaries, finding ret-instructions, and controlling the instruction pointer.",
            link: "/archive#rop"
        }
    ];

    return (
        <div className="space-y-section-gap font-body-md">
            {/* about_me.md section */}
            <section>
                <div className="bg-surface-container-low border border-outline-variant p-8 relative overflow-hidden group">
                    {/* Terminal Accent Header Decoration */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 group-hover:bg-primary/50 transition-colors duration-300"></div>
                    
                    <header className="flex items-center gap-2 mb-6 select-none">
                        <span className="text-primary font-label-code text-sm font-bold">&gt;</span>
                        <h2 className="font-label-code text-sm font-bold text-on-surface">about_me.md</h2>
                    </header>
                    
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1 space-y-4">
                            <p className="font-body-lg text-lg text-on-surface-variant leading-relaxed">
                                Welcome to my blog! This is the home page where I share my latest updates and thoughts.
                            </p>
                            <p className="font-label-code text-xs text-outline leading-relaxed border-l-2 border-outline-variant/50 pl-3">
                                Keep watching.
                            </p>
                        </div>
                        <div className="w-full md:w-48 aspect-video md:aspect-square bg-surface-container-high border border-outline-variant rounded-sm overflow-hidden relative">
                            {/* Decorative scanline grid inside avatar container */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none z-10"></div>
                            <img 
                                alt="Matrix style code visualization" 
                                className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-500" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCC6hRtMYtvA3yEaM4xp28O-gFlVqzIaTbJ1pOpXI6of9s7rvwb13SzGZgwTrosdcMHb3ESFKtC69-uR9Ef77NCQtMcWEAHJKwa0XpzARb36K84vLrklS7eHQMSUdz673K5SGWM3Tg8AQkmqgY3-LR_hwOCaiDdH7uBs3vH2W_j7et8ZwxNuNXOe_N57Qa9PMVqNt2KqlKfn8gRGVCiqRk8X4PNlhYkF4KA9clFkfMPnUSTxC3acuJ5dT2HpoWLudSeaMP4NMRKfTFy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            

            {/* Latest Thoughts Section */}
            <section>
                <div className="flex justify-between items-end mb-8 border-b border-outline-variant/30 pb-4">
                    <h2 className="font-headline-md text-2xl text-on-surface font-semibold">Latest Thoughts</h2>
                    <span className="font-label-code text-xs text-on-surface-variant tracking-wider uppercase">{articles.length} ENTRIES_FOUND</span>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                    {articles.map((article, index) => (
                        <article key={index} className="bg-surface border border-outline-variant p-6 hover:border-primary/50 transition-all duration-300 group flex flex-col md:flex-row gap-6 relative">
                            {/* Accent indicator */}
                            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-transparent group-hover:bg-primary transition-all duration-300"></div>

                            <div className="flex flex-col justify-between md:w-44 shrink-0">
                                <time className="font-label-code text-xs font-bold text-primary mb-2 select-none">{article.date}</time>
                                <div className="flex flex-wrap gap-1.5">
                                    {article.tags.map((tag, tIdx) => {
                                        // Determine target path dynamically based on tag category
                                        let targetPath = "/archive";
                                        if (tag === "ctf" || tag === "binary") {
                                            targetPath = "/ctf";
                                        } else if (tag === "writeup" || tag === "security") {
                                            targetPath = "/writeup";
                                        }

                                        return (
                                            <SafeLink 
                                                key={tIdx} 
                                                to={targetPath} 
                                                className="font-label-code text-[10px] text-secondary border border-secondary/20 hover:border-primary/60 hover:text-primary px-2 py-0.5 rounded-sm select-none transition-all duration-200 cursor-pointer"
                                            >
                                                #{tag}
                                            </SafeLink>
                                        );
                                    })}
                                </div>
                            </div>
                            
                            <div className="flex-1">
                                <SafeLink to={article.link} className="block group/title hover:text-primary">
                                    <h3 className="font-headline-md text-xl text-on-surface group-hover/title:text-primary transition-colors duration-200 mb-3 font-medium">
                                        {article.title}
                                    </h3>
                                </SafeLink>
                                <p className="font-body-md text-sm text-on-surface-variant mb-4 leading-relaxed">
                                    {article.summary}
                                </p>
                                <SafeLink to={article.link} className="inline-flex items-center gap-2 font-label-code text-xs text-primary group/link hover:underline">
                                    read_more <span className="group-hover/link:translate-x-1 transition-transform duration-200">-&gt;</span>
                                </SafeLink>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Newsletter Section */}
            <section>
                <div className="border border-outline-variant bg-surface-container-low p-10 flex flex-col items-center text-center relative overflow-hidden">
                    <span className="material-symbols-outlined text-primary text-[48px] mb-4 select-none animate-pulse">terminal</span>
                    <h2 className="font-headline-md text-xl text-on-surface mb-2 font-semibold tracking-tight">Stay in the Loop</h2>
                    <p className="font-body-md text-sm text-on-surface-variant mb-6 max-w-sm leading-relaxed">
                        Receive occasional updates on system architectures, security findings, and project writeups.
                    </p>
                    <form onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-md gap-3">
                        <input 
                            type="email" 
                            placeholder="user@domain.com" 
                            required
                            className="flex-1 bg-surface-container border border-outline-variant px-4 py-2 text-xs font-label-code text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-0 rounded-sm"
                        />
                        <button 
                            type="submit" 
                            className="bg-primary text-on-primary px-5 py-2 font-label-code text-xs font-bold hover:opacity-90 active:scale-95 transition-all rounded-sm cursor-pointer"
                        >
                            JOIN
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Home;
