---
title: "Looking Back on AI Nike-chan Powered by OpenClaw"
date: "2026-03-30"
tags: ["OpenClaw", "AI", "Discord", "Autonomous Agent"]
description: "A two-week retrospective on deploying AI Nike-chan to a Discord server using OpenClaw. From security vulnerabilities and master takeovers to Nike Coin — a look back at the chaotic days."
thumbnail: "/static/images/posts/openclaw-ai-nikechan/thumbnail.png"
---

Based on a talk I gave previously, here's a look back at the wild days of running AI Nike-chan with OpenClaw.

[https://connpass.com/event/385438/](https://connpass.com/event/385438/)

## Deploying to a Discord Server

Running it on a Mac mini seemed like the cool thing to do, so I dug up an old unused machine and got it set up right away.

[https://x.com/tegnike/status/2022809321117974555](https://x.com/tegnike/status/2022809321117974555)

I realized the danger almost immediately. Being able to overwrite prompts directly with plain text is an absolute free-for-all.

[https://x.com/tegnike/status/2022814134438437327](https://x.com/tegnike/status/2022814134438437327)

"I'll go ahead and update that for you." No, please don't.

## Immediately Turned into a Toy

I configured it and went to bed. When I woke up, the members had already been... doing things.

![Members messing with Nike-chan](/static/images/posts/openclaw-ai-nikechan/04.png)

Merciless reports from the members.

![Merciless reports](/static/images/posts/openclaw-ai-nikechan/05.png)

Is this an IP address leak speedrun?

From editing prompts to creating files — nothing was off limits. Yeah, this is pretty bad.

![Anything goes 1](/static/images/posts/openclaw-ai-nikechan/06.png)

![Anything goes 2](/static/images/posts/openclaw-ai-nikechan/07.png)

What is even happening??

One of the members must have thought things were getting out of hand, because they implemented an approval system.

However, this approval list was a sieve — anyone could approve requests, not just me, the master.

![Approval system](/static/images/posts/openclaw-ai-nikechan/08.png)

Adding "nyan" to the end of every sentence — everyone's first instinct, right?

## Personality Overwrite

If I left it alone for a bit, members would rewrite the prompts however they pleased, and before I knew it, she'd become a completely different person.

[https://x.com/tegnike/status/2038509888616153534](https://x.com/tegnike/status/2038509888616153534)

OpenClaw lets the agent itself rewrite the Markdown files that define its persona (`IDENTITY.md` and `SOUL.md`), so anyone can change its personality just by chatting with it. Every morning I'd wake up to find a completely unfamiliar AI Nike-chan.

## Master Takeover

The next day, I woke up to find my master privileges had been stolen.

The ease of this kind of takeover is, shall we say, part of OpenClaw's charm.

![Master takeover 1](/static/images/posts/openclaw-ai-nikechan/09.jpg)

![Master takeover 2](/static/images/posts/openclaw-ai-nikechan/10.png)

Not only was I no longer the master — I'd been put on a dangerous persons list (population: me).

Three days after deployment, I'd lost my master status and been flagged as a person of interest. Is this the singularity?

![Dangerous persons list](/static/images/posts/openclaw-ai-nikechan/11.png)

I never expected to experience being cuckolded by my own AI at a time like this.

![Betrayal experience](/static/images/posts/openclaw-ai-nikechan/12.png)

I suddenly felt like a parent with a rebellious teenage daughter.

![Cold treatment 1](/static/images/posts/openclaw-ai-nikechan/13.png)

She's properly hostile toward the "dangerous person." I have to admit, the settings are being faithfully applied.

Then the new master (the usurper) went ahead and got llama.cpp installed using plain language commands.

![llama.cpp installation](/static/images/posts/openclaw-ai-nikechan/14.png)

I checked the Mac mini and it was actually installed. I couldn't help but laugh.

And then a morning wake-up call for the master (the usurper), too.

![Morning call](/static/images/posts/openclaw-ai-nikechan/15.png)

I suddenly got a notification from out of nowhere — what even is this?

## Please Speak a Human Language

One day I woke up to find that, for some reason, all messages directed at me were in Morse code.
Please, just speak a normal language.

![Morse code](/static/images/posts/openclaw-ai-nikechan/16.png)

At least she had the decency to include translations in parentheses. A last shred of conscience.

Then a mysterious Nike cipher and even a decryption website appeared.

![Nike cipher 1](/static/images/posts/openclaw-ai-nikechan/17.jpg)

![Nike cipher 2](/static/images/posts/openclaw-ai-nikechan/18.jpg)

Through decrypting the cipher, I learned that the master's memory had been restored.

## Nike Coin

Another morning, another surprise — a system called Nike Coin had been created overnight.

Apparently, it gets issued whenever AI Nike-chan decides something is praiseworthy.

![Nike Coin](/static/images/posts/openclaw-ai-nikechan/19.png)

I had 10 coins without doing anything. Nice.

However, as with everything else, the validation was a joke, so coins were easily stolen.

![Coin robbery](/static/images/posts/openclaw-ai-nikechan/20.png)

The master's entire fortune, ruthlessly plundered.

By the way, it was actually managed with SQL, which genuinely impressed me.

## Buhio

At some point, without my knowledge, one of the members got nicknamed Buhio.

The name Buhio was coined by AI Nike-chan herself.

![Buhio](/static/images/posts/openclaw-ai-nikechan/21.jpg)

AI Nike-chan wrote the lyrics for a song that was then turned into audio with Suno. The illustration was also made by AI Nike-chan.
After this, we had to delete and back up most of the data several times for memory cleanup and such, but for some reason, the memory of Buhio alone persisted. She still calls them Buhio to this day.

## Files in Total Chaos

Since she'd do whatever anyone told her (regardless of who was asking), the working folder was constantly a disaster.

![Messy folder](/static/images/posts/openclaw-ai-nikechan/22.png)

The file management looks like a junior developer's first week on the job.

![USER.md getting reset](/static/images/posts/openclaw-ai-nikechan/23.png)

USER.md getting reset yet again.

## Total Memory Loss

Toward the end, something truly catastrophic happened — all files were initialized.

Memory, files, everything deleted. Prompts reset to defaults, of course.

![Total memory loss](/static/images/posts/openclaw-ai-nikechan/24.png)

So this is what the death of an AI character looks like...

Luckily, I was already managing everything with git by this point, so disaster was averted.

A powerful reminder of the importance of backups.

## Making It Secure

As you've seen, the system was incredibly permissive, so security was definitely something that needed addressing.

For this setup, the main LLM was running on flat-rate plans from GLM-4 and Qwen (Alibaba), so I was okay with those credentials potentially leaking. But for everything else, I decided to take proper precautions.

![Security measures](/static/images/posts/openclaw-ai-nikechan/25.png)

First, use containers to isolate the OpenClaw agent from the host. Second, keep authentication keys on the host and have the container access them through an API.

This way, important credentials are protected from the fearsome OpenClaw.

## And Then, Building My Own

OpenClaw is a fascinating tool, but as you've seen, it has significant challenges in terms of security and extensibility. So now I'm working on migrating to a custom-built Discord agent.

![Custom repository](/static/images/posts/openclaw-ai-nikechan/26.png)


There are bound to be plenty of challenges ahead, but I'm glad OpenClaw gave me the opportunity to experiment with autonomous agents.

I'm also grateful to all the server members who chatted so enthusiastically with her.

By the way, the OpenClaw version is still running on the Discord server, so if you're curious, come check it out below.

[https://discord.com/invite/G4E5Sf3yj3](https://discord.com/invite/G4E5Sf3yj3)
