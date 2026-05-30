"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';

const Content = ({ menuItems }) => {
    return (
        menuItems.map((item) => (
            <section key={item.key} id={item.id} className="mb-16 scroll-mt-24 bg-surface-container-low border border-outline-variant p-8 relative overflow-hidden group">
                {/* Visual Terminal Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 group-hover:bg-primary/50 transition-colors duration-300"></div>
                
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
                    {item.contents}
                </ReactMarkdown>
            </section>
        ))
    );
};

export default Content;