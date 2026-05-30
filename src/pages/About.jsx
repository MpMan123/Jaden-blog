"use client";
import Image from 'next/image'
const About = () => {
    // Programming languages with terminal styling details and custom inline SVGs

    // Core tools utilized in systems analysis and security research
    const tools = [
        { 
            category: "Reversing & Debugging", 
            items: ["GDB / Pwndbg", "IDA Pro"] 
        },
        { 
            category: "Virtualization & Kernel", 
            items: ["Docker"] 
        },
        { 
            category: "Environment & Systems", 
            items: ["Ubuntu Linux", "Git / GitHub", "Vim / VS Code", "Tmux"] 
        },
        { 
            category: "Scripting",
            items: ["Pwntools"] 
        }
    ];

    const techs = [
        {
            key: "C++",
            title: "C++", 
            src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg"
        },
        {
            key: 'Docker',
            title: "Docker", 
            src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg"
        },
        {
            key: 'Express',
            title: "Express", 
            src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg",
            class: "invert"
        },
        {
            key: 'Git',
            title: "Git", 
            src: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg"
        },
        {
            key: 'Python',
            title: "Python", 
            src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg"
        },
        {   
            key: 'Javascript',
            title: "Javascript", 
            src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
        },
    ]

    // "What_Me" list - core traits and developer principles
    const whatMe = [
        { trait: "Education", desc: "Computer Science Undergraduate at VNUHCM-HCMUT" },
        { trait: "Core Focus", desc: "Cybersecurity (Binary Exploitation & Web Sec)" },
        { trait: "Side Quests", desc: "Backend Development & DevOps Engineering" }
    ];

    return (
        <div className="max-w-3xl space-y-section-gap font-body-md">
        {/* Page Title */}
            <div className="flex justify-between items-end mb-8 border-b border-outline-variant/30 pb-4 select-none">
                <h2 className="font-headline-md text-2xl text-on-surface font-semibold">About Me</h2>
                <span className="font-label-code text-xs text-on-surface-variant tracking-wider uppercase">PROFILE_OPERATIONAL</span>
            </div>

            {/* what_is_me.cfg Section */}
            <section className="bg-surface-container-low border border-outline-variant p-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 group-hover:bg-primary/50 transition-colors duration-300"></div>
                
                <header className="flex items-center gap-2 mb-6 select-none">
                    <span className="text-primary font-label-code text-sm font-bold">&gt;</span>
                    <h3 className="font-label-code text-sm font-bold text-on-surface">what_is_me.cfg</h3>
                </header>

                <div className="space-y-6">
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        A noob pwner dreaming big.
                    </p>
                    <p className="font-label-code text-xs text-outline leading-relaxed border-l-2 border-outline-variant/50 pl-3">
                        PS: I&apos;m a huge fan of capybaras &lt;3
                    </p>

                    {/* What_Me traits list */}
                    <div className="grid grid-cols-1 gap-4 pt-4 border-t border-outline-variant/20">
                        {whatMe.map((item, index) => (
                            <div key={index} className="flex gap-4 items-start p-3 hover:bg-surface/30 transition-all duration-200 border-l border-outline-variant/40 hover:border-primary">
                                <span className="font-label-code text-xs text-primary font-bold select-none mt-0.5">[{index}]</span>
                                <div>
                                    <h4 className="font-label-code text-xs text-on-surface font-bold uppercase mb-1">{item.trait}</h4>
                                    <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Programming Languages */}
            <section>
                <h3 className="font-headline-md text-xl text-on-surface font-semibold mb-6 border-b border-outline-variant/20 pb-3 select-none flex items-center gap-2">
                    <span className="text-primary font-label-code text-xs font-bold">[LANGS]</span>
                    <span>Programming Languages</span>
                </h3>
                
                
                
                <div className="flex flex-wrap gap-6 items-center p-5 bg-surface-container-low border border-outline-variant rounded-sm select-none">
                    <div className="flex flex-wrap gap-6 items-center">
                        {techs.map((tech) => (
                            <div className="hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer"  key={tech.key}>
                                <Image src={tech.src} alt={tech.title} width={40} height={40} className={tech.class ? tech.class : ''}/> 
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Operating System */}
            <section>
                <h3 className="font-headline-md text-xl text-on-surface font-semibold mb-6 border-b border-outline-variant/20 pb-3 select-none flex items-center gap-2">
                    <span className="text-primary font-label-code text-xs font-bold">[OS]</span>
                    <span>Operating System</span>
                </h3>
                
                
                
                <div className="flex flex-wrap gap-6 items-center p-5 bg-surface-container-low border border-outline-variant rounded-sm select-none">
                    <div className="flex flex-wrap gap-6 items-center">
                        <div className="hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer" title="Linux">
                            <Image src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg" alt="Linux" width={40} height={40}/> 
                        </div>
                    </div>
                </div>
            </section>

            {/* Systems & Security Tools */}
            <section>
                <h3 className="font-headline-md text-xl text-on-surface font-semibold mb-6 border-b border-outline-variant/20 pb-3 select-none flex items-center gap-2">
                    <span className="text-primary font-label-code text-xs font-bold">[TOOLS]</span>
                    <span>Systems &amp; Security Tools</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {tools.map((group, index) => {
                        return (
                            <div key={index} className="border border-outline-variant/50 bg-surface-container-low p-6 rounded-sm relative group hover:border-primary/30 transition-all duration-300">
                                {/* Icon decoration on top right */}
                               

                                <span className="font-label-code text-[10px] text-secondary font-bold uppercase block mb-4 border-b border-outline-variant/30 pb-2 select-none">
                                    {group.category}
                                </span>
                                
                                <ul className="space-y-2">
                                    {group.items.map((tool, tIdx) => (
                                        <li key={tIdx} className="font-label-code text-xs text-on-surface-variant flex items-center gap-2 hover:text-on-surface transition-colors duration-200">
                                            <span className="text-primary select-none">&gt;_</span>
                                            <span>{tool}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    )}
                </div>
            </section>
        </div>
    );
};

export default About;
