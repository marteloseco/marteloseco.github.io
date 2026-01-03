---
title: "New Project: Kaitai Struct as a Service"
date: 2026-01-01
draft: false
tags: ["announcement", "kaitai", "saas"]
---

Finally have something I'm genuinely excited about.

## The Problem

If you've ever worked with binary file formats, you know how painful parsing can be. Kaitai Struct is this amazing tool that lets you describe binary formats in YAML and generate parsers for different languages.

But here's the thing - setting up the compiler, managing dependencies, keeping versions in sync across teams... it's all friction. People want to just paste their .ksy file and get a working parser.

## The Solution: KaaS

I'm building Kaitai as a Service (KaaS). Simple idea:

1. Upload your Kaitai Struct definition (.ksy file)
2. Select your target language (Python, JavaScript, C++, whatever)
3. Get back a compiled parser ready to use
4. Share your structures with the community

Think of it like a package registry meets a compilation service. Browse existing format definitions, fork them, compile them on-demand.

## Why This Works

- Zero setup friction for new users
- Centralized repository of format definitions
- Always using the latest compiler version
- Easy collaboration and sharing
- Could even add visualization tools later

## Security First

Here's where I'm learning from past mistakes. Before launching to the public, I'm having a group of security researchers review the whole thing. Planning to run a private bug bounty with some hacker friends to make sure remote code compilation is properly sandboxed. I hope no one is coming with 0days in their pocket.

Not making the "ship fast, fix security later" mistake again. This one needs to be solid from day one.

## Timeline

Aiming for a beta launch in March. If you work with binary formats and want early access, hit me up on GitHub.

Building in public this time. Let's see where this goes.
