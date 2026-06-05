# Linux commands
- Check opening ports on local and the process owning them
``` bash
netstat -tulnp
# or
ss -tulnp
```

- Check user's id
``` bash
id
```

- Find programs that runs with root's permission
``` bash
find / -perm -4000
```

- Check file format (for example: ELF 32-bit)
``` bash
file <filename>
```

- Check the library that file depends on
``` bash
ldd <filename>
```

- Keep track of system calls
``` bash
strace ./<filename>
```

- Find "/bin/sh"'s address
```bash
strings -a -t x /lib/i386-linux-gnu/libc-2.27.so | grep "/bin/sh"
```
