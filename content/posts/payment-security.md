---
title: "Building Secure Payment Webhooks (The Right Way)"
date: 2025-03-14
draft: false
tags: ["security", "payments", "backend"]
---

Finally implementing proper payment processing for one of my projects. Learned a lot about webhook security.

## The Challenge

When you integrate a payment gateway like Stripe or PayPal, they send webhook notifications to your server when payments complete. The problem? Anyone can POST to your webhook endpoint and fake a payment notification.

Bad actors could literally just curl your endpoint and give themselves premium features for free.

## The Problem with Secrets

Most payment providers give you a webhook secret that you hardcode in your environment variables. Then you validate the HMAC signature they send with each request.

But here's the issue - you're storing a secret in plaintext in your environment. Anyone with access to your .env file or environment variables has full access to forge webhook requests. Not ideal.

## The Better Way: JWT with JKU

Instead of hardcoding secrets, I switched to JWT validation using the `jku` (JWK Set URL) parameter. Here's why this is genius:

The JWT header includes a `jku` field that points to a URL where the public keys are hosted. My webhook handler fetches the keys from that URL and uses them to verify the signature. **No hardcoded secrets needed!**

Benefits:
- No secrets to store or leak
- Dynamic key fetching (keys can rotate without code changes)
- Public key cryptography (way more secure than shared secrets)
- Standard used by OAuth providers and enterprise systems

The payment provider just includes the `jku` URL in the JWT header pointing to their public key endpoint, and my code fetches and validates it automatically. Completely stateless, completely secure.

## Why This Matters

This eliminates the entire attack vector of leaked secrets. Even if someone gets access to my server, there's no secret to steal. The validation happens using public keys fetched from the provider's infrastructure.

Could someone bypass this? Honestly can't see how. Unless...

## Moving Forward

This is the level of security I should've been implementing from day one. No more cutting corners.

If you're handling payments, don't just do the minimum. Go the extra mile. Your users (and your bank account) will thank you.

Shipping this to production tomorrow. Feeling pretty good about it.
