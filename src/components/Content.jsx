
import { Typography } from 'antd';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';
import rehypeRaw from 'rehype-raw';

const { Title, Paragraph } = Typography;


const copyContent = (content) => {
    navigator.clipboard.writeText(content)
        .then(() => {
            setTooltipText('Copied!');
            setTimeout(() => {
                setTooltipText('Copy');
            }, 2000);
        })
        .catch(() => {
            message.error('Failed to copy');
        })
}

const Content = ({ menuItems }) => {
    return (
        menuItems.map((item) => (
            <section key={item.key} id={item.id} className="mb-20 scroll-mt-24">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        h1: ({ children }) => (
                            <Title level={2} style={{ color: '#ffffff', marginBottom: '24px', fontWeight: 'normal', letterSpacing: '-0.02em' }}>
                                <u style={{ height: '0.5px' }}>
                                    {children}
                                </u>
                            </Title>
                        ),
                        h2: ({ children }) => (
                            <Title level={3} style={{ color: '#ffffff', marginBottom: '24px', fontWeight: 600, letterSpacing: '-0.02em' }}>
                                {children}
                            </Title>
                        ),
                        h3: ({ children }) => (
                            <Title level={4} style={{ color: '#ffffff', marginBottom: '24px', fontWeight: 600, letterSpacing: '-0.02em' }}>
                                {children}
                            </Title>
                        ),
                        p: ({ children }) => (
                            <Paragraph style={{ color: '#d1d1d1', fontSize: '16px', lineHeight: '1.8', marginBottom: '16px' }}>
                                {children}
                            </Paragraph>
                        ),
                        li: ({ children }) => (
                            <li style={{ color: '#d1d1d1', fontSize: '16px', lineHeight: '1.8', marginBottom: '8px' }}>
                                {children}
                            </li>
                        ),
                        ul: ({ children }) => (
                            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '16px', color: '#d1d1d1' }}>
                                {children}
                            </ul>
                        ),
                        ol: ({ children }) => (
                            <ol style={{ listStyleType: 'decimal', paddingLeft: '20px', marginBottom: '16px', color: '#d1d1d1' }}>
                                {children}
                            </ol>
                        ),
                        blockquote: ({ children }) => (
                            <blockquote style={{ borderLeft: '4px solid #444', paddingLeft: '20px', fontStyle: 'italic', margin: '24px 0', color: '#f5eeeeff' }}>
                                {children}
                            </blockquote>
                        ),
                        strong: ({ children }) => (
                            <strong style={{ color: '#ffffff', fontWeight: 600 }}>{children}</strong>
                        ),
                        details: ({ children }) => (
                            <details style={{
                                marginBottom: '16px',
                                border: '1px solid #141414',
                                borderRadius: '4px',
                                background: '#080808'
                            }}>
                                {children}
                            </details>
                        ),
                        summary: ({ children }) => (
                            <summary style={{
                                color: '#ffffff',
                                fontWeight: 600,
                                cursor: 'pointer',
                                padding: '12px 16px',
                                outline: 'none'
                            }}>
                                {children}
                            </summary>
                        ),
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                                <div className="my-6 rounded-lg overflow-hidden border border-[#141414]">
                                    <SyntaxHighlighter
                                        style={vscDarkPlus}
                                        language={match[1]}
                                        PreTag="div"
                                        customStyle={{
                                            margin: 0,
                                            padding: '24px',
                                            fontSize: '14px',
                                            background: '#494949ff'
                                        }}
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                </div>
                            ) : (
                                <code className="cursor-pointer bg-[#1a1a1a] text-[#f5eeeeff] px-1.5 py-0.5 rounded font-mono text-sm border border-[#333]" {...props}>
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