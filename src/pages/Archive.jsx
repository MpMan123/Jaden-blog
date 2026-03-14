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

## How it works
When the program \`call exit@plt\`, \`rip\` register jumps to code segments in PLT 

PLT Belike:
\`\`\`bash
0x401130 <setbuf@plt>
0x401140 <printf@plt>
0x401160 <memset@plt>
\`\`\`

At the first time calling a exit, there's no information of this symbol in GOT table, it needs Linker to find the actual address of \`exit\` in RAM and overwrite it in GOT Table.

Imagining GOT table...:
<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-zv4m{border-color:#ffffff;text-align:left;vertical-align:top}
.tg .tg-8jgo{border-color:#ffffff;text-align:center;vertical-align:top}
.tg .tg-aw21{border-color:#ffffff;font-weight:bold;text-align:center;vertical-align:top}
</style>
<table class="tg"><thead>
  <tr>
    <th class="tg-aw21">Index</th>
    <th class="tg-aw21">Address</th>
    <th class="tg-aw21">Function</th>
  </tr></thead>
<tbody>
  <tr>
    <td class="tg-8jgo">0x404078</td>
    <td class="tg-8jgo">0x4010c0</td>
    <td class="tg-zv4m">exit@GLIBC</td>
  </tr>
  <tr>
    <td class="tg-8jgo">0x404090</td>
    <td class="tg-8jgo">0x401030</td>
    <td class="tg-zv4m">setvbuf@GLIBC</td>
  </tr>
</tbody>
</table>           

After jump into PLT code, it may run bnd \`jmp qword ptr [rip + 0x2ead] #rip + 0x2ead = 0x0x404078\`
that means \`jmp table[0x404078] = jmp 0x404090 # actual address of exit code\`

## Pwntools
\`\`\`python
exe = ELF('./binary')

# Get offset of a symbol (function)
offset_main = exe.symbols['main']

# Get offset of a GOT entry
# get the index in got table
offset_got = exe.got['puts']

# Get offset of a PLT entry
# address of code: bnd jmp ...
offset_plt = exe.plt['puts']
\`\`\`

## Get offset of libc symbols
\`\`\`bash
# Get offset of symbols (actual address where it runs)
readelf -s /lib/x86_64-linux-gnu/libc.so.6 | grep puts
\`\`\`

## Get offset of plt symbols (get index of required symbol)
\`\`\`bash
objdump -d ./binary | grep <symbol>
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
