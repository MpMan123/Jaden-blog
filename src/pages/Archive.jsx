import { Typography } from 'antd';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const { Title, Paragraph } = Typography;

const menuItems = [
    {
        key: '#got_plt',
        id: 'got_plt',
        label: 'GOT-PLT',
        contents: `
# Global Offset Table & Procedure Linkage Table (GOT-PLT)

## Pwntools
\`\`\`python
exe = ELF('./binary')

# Get offset of a symbol (function)
offset_main = exe.symbols['main']

# Get offset of a GOT entry
offset_got = exe.got['puts']

# Get offset of a PLT entry
offset_plt = exe.plt['puts']
\`\`\`

## Get offset of libc symbols
\`\`\`bash
readelf -s /lib/x86_64-linux-gnu/libc.so.6 | grep puts
\`\`\`
        `
    },
    {
        key: '#fmt',
        id: 'fmt',
        label: 'Format String',
        contents: `
# Format String Vulnerabilities

Trong môi trường đó, việc tự học trở thành một kỹ năng quan trọng. Một lập trình viên không thể chỉ dựa vào những gì được dạy trong trường đại học.

1. **Chủ động**: Đọc tài liệu, thử nghiệm dự án cá nhân.
2. **Tham gia**: Các cộng đồng lập trình.
3. **Cập nhật**: Xu hướng của ngành liên tục.
        `
    },
    {
        key: '#rop',
        id: 'rop',
        label: 'ROP - Return Oriented Programming',
        contents: `
# Return Oriented Programming (ROP)

Bên cạnh yếu tố kỹ thuật, một lập trình viên giỏi cũng cần có khả năng tư duy hệ thống và làm việc nhóm.

> "Dù công nghệ có phát triển nhanh đến đâu, yếu tố quan trọng nhất vẫn là sự kiên trì và tinh thần học hỏi."

Mỗi dòng code viết ra đều là kết quả của quá trình thử nghiệm, sai lầm và sửa chữa nhiều lần.
        `
    },
];

const Archive = () => {
    return (
        <div className="max-w-2xl markdown-content">
            {menuItems.map((item) => (
                <section key={item.key} id={item.id} className="mb-20 scroll-mt-24">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ children }) => (
                                <Title level={2} style={{ color: '#ffffff', marginBottom: '24px', fontWeight: 600, letterSpacing: '-0.02em' }}>
                                    {children}
                                </Title>
                            ),
                            h2: ({ children }) => (
                                <Title level={3} style={{ color: '#ffffff', marginBottom: '24px', fontWeight: 600, letterSpacing: '-0.02em' }}>
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
                                    <code className="bg-[#1a1a1a] text-[#f5eeeeff] px-1.5 py-0.5 rounded font-mono text-sm border border-[#333]" {...props}>
                                        {children}
                                    </code>
                                );
                            }
                        }}
                    >
                        {item.contents}
                    </ReactMarkdown>
                </section>
            ))}
        </div>
    );
};

export default Archive;
