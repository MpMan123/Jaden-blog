# Check-list

## Description
This challenge is about reverse the string in order to pass all byte-check

## Analysis
For this challenge, we get a file named `check-list` in the `/challenge` directory. To understand what this file is about, we need to dump it into x86 instructions by
```bash
objdump -d check-list -M intel
```

Not so surprising, we have thousands lines of instruction of obfuscating the input string.
```bash
  487766:       80 85 c9 fc ff ff 3d    add    BYTE PTR [rbp-0x337],0x3d
  48776d:       80 85 32 fe ff ff 3a    add    BYTE PTR [rbp-0x1ce],0x3a
  487774:       80 6d 93 cd             sub    BYTE PTR [rbp-0x6d],0xcd
  487778:       80 ad 37 fd ff ff a8    sub    BYTE PTR [rbp-0x2c9],0xa8
  48777f:       80 ad e7 fd ff ff 32    sub    BYTE PTR [rbp-0x219],0x32
  487786:       80 ad 21 fe ff ff d6    sub    BYTE PTR [rbp-0x1df],0xd6
  48778d:       80 85 81 fd ff ff e7    add    BYTE PTR [rbp-0x27f],0xe7
  487794:       80 85 bf fd ff ff af    add    BYTE PTR [rbp-0x241],0xaf
  48779b:       80 85 cd fe ff ff d3    add    BYTE PTR [rbp-0x133],0xd3
```

Firstly, the program needs a input up to 1024 bytes into a buffer. It iterates several times over each byte of that buffer and applies series of add and substraction operations.

At last, the binary compare 1024 bytes with the hard-coded value. If one byte doesn't match the compared value, we jump to `0xaa1b59` for a exit syscall.

## Brainstorming
Because the program applies a series of only add and substraction operations, the input after being obfuscated is added or substracted by a constant `m`.

```
buffer[i] = buffer[j] + m
```

then it compares by substract from the compared value
```bash
compared_values - A = offset
A = a + m
a: input byte
A: obfuscated byte
```
The check passes when `offset` equals zero, so that we need to add `offset` to `a` (input byte)

## Exploitation
I first input a 1024 bytes of 'A' while debugging in gdb
```bash
jaden@root:~ gdb check-list
pwndbg> b *0xaa1b59
Breakpoint 1 at 0xaa1b59
pwndbg> run < <(python -m 'print('A' * 0x400)')
──────────────────────────────────────────────────────────────────────────────────────[ LAST SIGNAL ]───────────────────────────────────────────────────────────────────────────────────────
Breakpoint hit at 0xaa1b59
───────────────────────────────────────────────────────────────────[ REGISTERS / show-flags off / show-compact-regs off ]───────────────────────────────────────────────────────────────────
 RAX  0
 RBX  0
 RCX  0x401022 ◂— sub byte ptr [rbp - 0xf4], 0xa2
 RDX  0x400
 RDI  0
 RSI  0x7fffffffdc70 ◂— 0xb57770ed8409a8af
 R8   0
 R9   0
 R10  0
 R11  0x202
 R12  0
 R13  0
 R14  0
 R15  0
 RBP  0x7fffffffe070 ◂— 1
 RSP  0x7fffffffdb70 ◂— 0
 RIP  0xaa1b59 ◂— cmp byte ptr [rbp - 0x400], 0x86
────────────────────────────────────────────────────────────────────────────[ DISASM / x86-64 / set emulate on ]────────────────────────────────────────────────────────────────────────────
b► 0xaa1b59    cmp    byte ptr [rbp - 0x400], 0x86     0xaf - 0x86     EFLAGS => 0x202 [ cf pf af zf sf IF df of iopl:00 ac ]
   0xaa1b60  ✔ jne    0xaa4e6f                    <0xaa4e6f>
    ↓
   0xaa4e6f    mov    rax, 1                 RAX => 1
   0xaa4e76    mov    rdi, 1                 RDI => 1
   0xaa4e7d    lea    rsi, [rip + 0x1b4]     RSI => 0xaa5038 ◂— 0x6f725720ab9a9ff0
   0xaa4e84    mov    rdx, 0x35              RDX => 0x35
   0xaa4e8b    syscall <SYS_write>
   0xaa4e8d    mov    eax, 0x3c              EAX => 0x3c
   0xaa4e92    mov    edi, 1                 EDI => 1
   0xaa4e97    syscall <SYS_exit>
   0xaa4e99    add    byte ptr [rax], al
─────────────────────────────────────────────────────────────────────────────────────────[ STACK ]──────────────────────────────────────────────────────────────────────────────────────────
00:0000│ rsp 0x7fffffffdb70 ◂— 0
... ↓        7 skipped
───────────────────────────────────────────────────────────────────────────────────────[ BACKTRACE ]────────────────────────────────────────────────────────────────────────────────────────
 ► 0         0xaa1b59 None
   1              0x0 None
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
```

We set a breakpoint at `0xaa1b59` which is the first `cmp` instruction to ensure that all bytes have been changed. Then we dump all the bytes in buffer
```bash
pwndbg> dump binary memory after_changed.bin $rbp-0x400 $rbp
```

We store an array of compared values from the code by dumping the binary
```bash
objdump -d check-list -M intel | grep cmp | grep BYTE | awk -F , '{print $2}' | tr '\n', ','
```
then copy output into `solve.py`
```python
# solve.py
cmp_values = [0x86,0x46,0x2a,0x26,0x5f,0xa5,0xd0,0x95,0xae,0xf3,0x44,0x11, ...]
```

Calculate correct input and write to `correct_input.bin`
```python
changed_data_from_As = open('after_changed.bin', 'rb').read() 
offset = [(cmp_vals[i] - changed_data_from_As[i]) for i in range (0x400)]

correct_input = [(ord("A") + o) & 0xff for o in offset]
open("correct_input.bin", "wb").write(bytes(correct_input))
```

Run the script and pipe the valid bytes to the binary
```bash
cat correct_input.bin | /challenge/check-list
```

<details>
<summary>Full Exploit Script</summary>

```python
cmp_vals = [0x86,0x46,0x2a,0x26,0x5f,0xa5,0xd0,0x95, ...]

changed_data_from_As = open('after_changed.bin', 'rb').read() 
offset = [(cmp_vals[i] - changed_data_from_As[i]) for i in range (0x400)]

correct_input = [(ord("A") + o) & 0xff for o in offset]
open("correct_input.bin", "wb").write(bytes(correct_input))
```
</details>

