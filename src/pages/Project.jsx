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

    if (!isClient) {
        // Fallback to static anchor tag during Next.js server compilation
        return <a href={`/jaden-blog${to}`} {...props}>{children}</a>;
    }
    
    return <Link to={to} {...props}>{children}</Link>;
};
const Project = () => {
    return (
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
    );
};

export default Project;
