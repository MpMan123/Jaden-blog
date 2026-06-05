# Ret2Libc

## 2 main phases:
1. Leak libc address: Use GOT tables to leak runtime address of libc functions
2. Call system('/bin/sh')

## Attack flow
```python
Buffer overflow
   ↓
control RIP
   ↓
call puts(puts@got)
   ↓
leak libc address
   ↓
compute libc base
   ↓
call system("/bin/sh")
   ↓
shell
```

## Skills involved
1. Store libc's base address to automatically calculate other functions' address in libc
```python
libc.address = 0xdeadbeef
```
2. Search for /bin/sh
```python
next(libc.search(b'/bin/sh'))
```
3. Padding 0x0 bytes to ensure 8-byte length
```python
a = u64(a.ljust(8, b'\x00'))
```