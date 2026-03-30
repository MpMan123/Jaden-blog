# Return Oriented Programming (ROP)

An exploitation technique that allows attackers to gain control of the call stacks to hijack program control flow and execute the chosen machine instruction

Gadget typically ends in a `return` instruction, this technique

```python
from pwn import *

exe = ELF('./binary')

# ROP builder
rop = ROP(exe)

# Find gadget
rop.find_gadget(['ins 1', 'ins 2']) # return Gadget(0x401883, ['pop rdi', 'ret'], ['rdi'], 0x8)
rop_address = rop.find_gadget(['ins 1', 'ins 2'])[0]
# or
rop_address = rop.find_gadget(['ins 1', 'ins 2']).address

# Add a raw integer or string to chain
rop.raw('aaaa')
rop.raw(2)

# Migrate stack pointer rsp to other base
rop.migrate(base)

# Pretty presenting rop chain
rop.dump()

# Find string in binary
binsh = next(exe)
```
