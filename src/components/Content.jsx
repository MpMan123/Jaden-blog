"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';

const Content = ({ menuItems }) => {
    return (
        menuItems.map((item) => {
            // Parse YAML frontmatter block to render a custom impressive block
            let cleanContent = item.contents;
            let meta = null;
            const match = item.contents.match(/^---\r?\n([\s\S]*?)\r?\n---/);
            
            if (match) {
                cleanContent = item.contents.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim();
                meta = [];
                match[1].split('\n').forEach(line => {
                    const parts = line.split(':');
                    if (parts.length >= 2) {
                        const key = parts[0].trim();
                        const value = parts.slice(1).join(':').trim().replace(/^["']|["']$/g, '');
                        meta.push({ key, value });
                    }
                });
            }
            
            return (
            <section key={item.key} id={item.id} className="mb-16 scroll-mt-24 bg-surface-container-low border border-outline-variant p-8 relative overflow-hidden group">
                {/* Visual Terminal Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 group-hover:bg-primary/50 transition-colors duration-300"></div>
                
                {meta && meta.length > 0 && (
                    <div className="mb-12 rounded-lg bg-[#121212] border border-outline-variant/40 shadow-2xl relative overflow-hidden font-label-code transition-all hover:border-primary/50 hover:shadow-primary/10">
                        {/* Terminal Header */}
                        <div className="w-full h-8 bg-[#1e1e1e] border-b border-outline-variant/30 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                            <span className="ml-3 text-[11px] text-on-surface-variant/60 uppercase tracking-[0.2em] font-semibold select-none">Meta Data</span>
                        </div>
                        
                        {/* Terminal Body */}
                        <div className="p-5 flex flex-col gap-1.5 overflow-x-auto">
                            <div className="text-on-surface-variant/40 select-none">---</div>
                            {meta.map((m, idx) => (
                                <div key={idx} className="flex flex-wrap items-baseline gap-2 text-[15px] hover:bg-white/5 px-2 py-0.5 -mx-2 rounded transition-colors">
                                    <span className="text-[#c678dd] font-semibold">{m.key}</span>
                                    <span className="text-on-surface-variant/60">:</span>
                                    <span className="text-[#98c379]">&quot;{m.value}&quot;</span>
                                </div>
                            ))}
                            <div className="text-on-surface-variant/40 select-none">---</div>
                        </div>
                    </div>
                )}

                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        h1: ({ children }) => (
                            <h2 className="font-label-code text-lg font-bold text-on-surface mb-6 border-b border-outline-variant/40 pb-3 flex items-center gap-2 select-none">
                                <span className="text-primary">&gt;</span>
                                <span>{children}</span>
                            </h2>
                        ),
                        h2: ({ children }) => (
                            <h3 className="font-label-code text-[20px] text-primary mb-4 mt-8 font-semibold">
                                {children}
                            </h3>
                        ),
                        h3: ({ children }) => (
                            <h4 className="font-label-code text-[16px] text-on-surface mb-3 mt-6 font-semibold">
                                {children}
                            </h4>
                        ),
                        p: ({ children }) => (
                            <p className="font-body-md text-body-md text-on-surface-variant mb-4 leading-relaxed">
                                {children}
                            </p>
                        ),
                        li: ({ children }) => (
                            <li className="font-body-md text-body-md text-on-surface-variant mb-2 list-disc ml-4">
                                {children}
                            </li>
                        ),
                        ul: ({ children }) => (
                            <ul className="mb-4 space-y-1">
                                {children}
                            </ul>
                        ),
                        ol: ({ children }) => (
                            <ol className="mb-4 space-y-1 list-decimal ml-4">
                                {children}
                            </ol>
                        ),
                        blockquote: ({ children }) => (
                            <blockquote className="code-block-accent bg-surface border-l-2 border-primary pl-4 py-2 pr-2 my-6 italic text-on-surface-variant font-body-md">
                                {children}
                            </blockquote>
                        ),
                        strong: ({ children }) => (
                            <strong className="font-bold text-primary">{children}</strong>
                        ),
                        details: ({ children }) => (
                            <details className="border border-outline-variant bg-surface-container-low mb-6 rounded-sm">
                                {children}
                            </details>
                        ),
                        summary: ({ children }) => (
                            <summary className="font-label-code text-xs text-on-surface hover:text-primary cursor-pointer p-4 outline-none select-none font-bold uppercase tracking-wider border-b border-outline-variant/30 hover:bg-surface-container-high/20 transition-all">
                                {children}
                            </summary>
                        ),
                        table: ({ children }) => (
                            <div className="overflow-x-auto mb-6 border border-outline-variant rounded-sm">
                                <table className="w-full text-left border-collapse text-body-md text-on-surface">
                                    {children}
                                </table>
                            </div>
                        ),
                        thead: ({ children }) => (
                            <thead className="bg-surface-container-high border-b border-outline-variant text-on-surface">
                                {children}
                            </thead>
                        ),
                        tbody: ({ children }) => (
                            <tbody className="divide-y divide-outline-variant/30 bg-surface">
                                {children}
                            </tbody>
                        ),
                        tr: ({ children }) => (
                            <tr className="hover:bg-surface-container-low/50 transition-colors">
                                {children}
                            </tr>
                        ),
                        th: ({ children }) => (
                            <th className="px-4 py-3 font-semibold text-primary">
                                {children}
                            </th>
                        ),
                        td: ({ children }) => (
                            <td className="px-4 py-3 text-on-surface-variant">
                                {children}
                            </td>
                        ),
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                                <div className="my-6 rounded-sm overflow-hidden border border-outline-variant">
                                    <SyntaxHighlighter
                                        style={vscDarkPlus}
                                        language={match[1]}
                                        PreTag="div"
                                        customStyle={{
                                            margin: 0,
                                            padding: '20px',
                                            fontSize: '13px',
                                            fontFamily: 'var(--font-label-code)',
                                            background: '#1c1b1b',
                                            lineHeight: '1.6'
                                        }}
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                </div>
                            ) : (
                                <code className="font-label-code text-xs bg-surface-container-high border border-outline-variant px-1.5 py-0.5 rounded text-primary-fixed-dim" {...props}>
                                    {children}
                                </code>
                            );
                        }
                    }}
                >
                    {cleanContent}
                </ReactMarkdown>
            </section>
        )})
    );
};

export default Content;