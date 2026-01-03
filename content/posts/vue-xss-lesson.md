---
title: "Got Hacked: v-html and XSS"
date: 2025-10-22
draft: false
tags: ["security", "vue", "lessons"]
---

Quick security PSA from someone who learned this the hard way.

## What Happened

Remember that Font Randomizer extension I built? Turns out someone found an XSS vulnerability in the settings page and used it to steal user data. Fun times.

## The Mistake

I was using Vue's `v-html` directive to render user-customizable font preview text. Seemed harmless - let users type whatever they want to preview the fonts, right?

Wrong.

Someone injected a script tag through the preview field, and boom - XSS. They could execute arbitrary JavaScript in other users' browsers. Stole session tokens, redirected people to phishing sites, the whole package.

## The Fix

Changed `v-html` to regular text interpolation for all user input. Problem solved.

But here's the thing - `v-html` isn't bad if you use it correctly. The key is to only use it with **trusted data sources**.

## Going Forward

I'm still using `v-html` in my new projects, but only for content I control. Things like:
- LLM-generated responses (those are safe, right?)
- Content from my own CMS
- Pre-sanitized markdown rendering

User input? Never touching `v-html` again for that. Lesson learned.

## The Real Lesson

Security isn't just about knowing the rules. It's about thinking through every input source and asking "what's the worst someone could do with this?"

Also, maybe test your security before shipping to production. Novel concept, I know.

Back to building. More carefully this time.
