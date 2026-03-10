import Content from '../components/Content';

const menuItems = [
    {
        key: 'com_architecture',
        id: 'com_architecture',
        label: 'Computer Architecture',
        contents: `
# Computer Architecture

- x86_64 Registers (64-bit): \`rax\`, \`rbx\`, \`rcx\`, \`rdx\`, \`rsi\`, \`rdi\`, \`rbp\`, \`rsp\`, \`rip\`, \`eflags\`
- x86 Registers (32-bit): \`eax\`, \`ebx\`, \`ecx\`, \`edx\`, \`esi\`, \`edi\`, \`ebp\`, \`esp\`, \`eip\`, \`eflags\`

## Memory Operands
- \`QWORD PTR [addr]\`: 8 bytes
- \`DWORD PTR [addr]\`: 4 bytes
- \`WORD PTR [addr]\`: 2 bytes
- \`BYTE PTR [addr]\`: 1 byte
        `
    },
    {
        key: 'os',
        id: 'os',
        label: 'Operating System',
        contents: `
# Operating System

- x86_64 calling conventions: \`rdi\`, \`rsi\`, \`rdx\`, \`r10\`, \`r8\`, \`r9\`

        `
    },
    {
        key: 'got_plt',
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
        key: 'fmt',
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
        key: 'rop',
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
            <Content menuItems={menuItems} />

        </div>
    );
};

export default Archive;
