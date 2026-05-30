"use client";

const WriteUp = () => {
    return (
        <div className="max-w-3xl space-y-6 font-body-md">
            {/* Header */}
            <div className="flex justify-between items-end mb-8 border-b border-outline-variant/30 pb-4 select-none">
                <h2 className="font-headline-md text-2xl text-on-surface font-semibold">About</h2>
                <span className="font-label-code text-xs text-on-surface-variant tracking-wider uppercase">SEC_MANUAL_INDEX</span>
            </div>

            {/* Document Box */}
            <section className="bg-surface-container-low border border-outline-variant p-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 group-hover:bg-primary/50 transition-colors duration-300"></div>
                
                <header className="flex items-center gap-2 mb-6 select-none">
                    <span className="text-primary font-label-code text-sm font-bold">&gt;</span>
                    <h3 className="font-label-code text-sm font-bold text-on-surface">writeups_manifest.md</h3>
                </header>

                <div className="space-y-4">
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        Detailed explanations and walkthroughs for various security and technical challenges.
                    </p>
                    
                    {/* Add a decorative matrix-style visual list representing subtopics */}
                    <div className="pt-6 border-t border-outline-variant/30 mt-6">
                        <h4 className="font-label-caps text-xs text-primary mb-4 tracking-wider uppercase">Core Categories</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border border-outline-variant/50 p-4 bg-surface/50 hover:border-primary/40 transition-colors duration-200">
                                <span className="font-label-code text-xs text-secondary font-semibold uppercase block mb-1">#WEB_SECURITY</span>
                                <span className="text-xs text-on-surface-variant block">Analyzing web application weaknesses, authentication bypasses, and injection vector walkthroughs.</span>
                            </div>
                            <div className="border border-outline-variant/50 p-4 bg-surface/50 hover:border-primary/40 transition-colors duration-200">
                                <span className="font-label-code text-xs text-secondary font-semibold uppercase block mb-1">#PWNABLE</span>
                                <span className="text-xs text-on-surface-variant block">Memory corruption write-ups covering stack exploits, heap engineering, and shellcode payloads.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WriteUp;
