---
title: "I Will Exhibit AI Character Game Commentary and Gameplay at Generative AI Anything Expo Vol. 5"
date: "2026-05-02"
tags: ["AI", "Game Commentary", "Game AI", "Generative AI Anything Expo", "AI Character"]
description: "A summary of my trial and error around making AI characters do game commentary and gameplay for Generative AI Anything Expo Vol. 5. I cover the problems with the screen-recognition method used in a previous exhibition and the idea of getting game state as text instead."
thumbnail: "/static/images/posts/ai-game-expo-2026/thumbnail-en.png"
---

Hey, it's Nike.

I will be exhibiting at **Generative AI Anything Expo Vol. 5**, held on Wednesday, May 6, 2026.

The theme of this exhibition is **trying to make AI characters do game commentary and gameplay**.
Rather than "please look at this completed, ultimate product!", I think it will be an exhibition that shows **the trial and error behind AI characters x game commentary x AI gameplay**.

This article is a shorter exhibition-focused summary of the following articles.
For more detailed technical discussion and how game state is acquired for each game, see these articles.

https://nikechan.com/dev_blog/ai-game-play-methods

https://nikechan.com/dev_blog/ai-game-state-for-llm

## Previous Exhibition

Actually, I exhibited something with a similar theme at a previous Generative AI Anything Expo.

At that time, it was a system that made it look as if an AI character was playing a game and also doing commentary.

![Scene from the previous Generative AI Anything Expo exhibition](/static/images/posts/ai-game-expo-2026/01.png)

The setup back then was very brute-force.

It took screenshots of a Nintendo Switch game screen and passed them to a multimodal LLM.
The LLM looked at the screen, analyzed "what is happening now," and generated both **the next move** and **commentary dialogue** from that.

https://www.youtube.com/watch?v=aTh256shKwo

An AI sees the screen, decides what to do, and speaks.
On paper, that sounds like a dream. In reality, it was pretty tough.

## Problems with the Old Method

If I diagram the old method simply, it looks like this.

![Architecture diagram of the old method that passes screenshots to a multimodal LLM](/static/images/posts/ai-game-expo-2026/02.png)

The screen-watching approach.

The major problems with this architecture were that it was **slow** and **unstable in accuracy**.

With the multimodal processing at the time, it took about 20 seconds just to pass the screen in and have the model read the situation.
Then dialogue generation, speech synthesis, and playback were added on top, so it was far too slow for game commentary.

By the time it spoke about the current game screen, the game had already moved on to a completely different scene. For commentary, that is fatal.

Another problem was that screen images alone were not enough to reliably capture game information.

A human can somehow read and understand HP, logs, choices, enemy state, moments when input is possible, and so on.
But if you give an AI just one screenshot, it may miss part of the screen or misunderstand what the UI means.

Games especially mix "visible but unimportant information" with "tiny but extremely important information" inside the same image, so getting a multimodal LLM to read everything consistently was harder than I expected.

## Ways to Improve the Screen-Watching Method

That said, there are ways to improve the screen-watching method.

The first solution to the slowness problem is to **delay the game screen shown to viewers**.

If AI commentary generation is delayed by a few seconds, then delaying the game footage by the same amount makes the commentary and footage appear synchronized to viewers.
It gives up real-time immediacy in exchange for a more natural viewing experience.

https://x.com/tegnike/status/2047537147121402314

As a streaming method, this is quite realistic.
You can add video delay in OBS, so it works without modifying the game.

The second solution to the lack-of-information problem is to **use a fast multimodal model and pass in multiple screen states**.

Recent multimodal models have become very fast, so we are no longer in an era where you have to wait 20 seconds every time.
In particular, **gemini-3.1-flash-lite-preview** is shockingly fast, finishing text generation with multimodal input in about two seconds.

Using that, you can analyze several screenshots in the background while speech is playing or while nothing else is happening, then pass more "recent context" into the next dialogue generation.

https://x.com/tegnike/status/2047198040574882149

However, even these methods have limits.

No matter how fast the model becomes, as long as it is inferring from the screen, missed details and misrecognition will remain.
The core problem is that "inferring game state from images" is difficult in the first place.

## A Shift in Thinking

So I started thinking: **what if we could get the game information as text in the first place?**

Instead of showing the screen to the AI and making it guess "it is probably this kind of situation," we pass the game state, logs, and available actions as text or JSON.

![Diagram showing the shift from screen recognition to text-based state acquisition](/static/images/posts/ai-game-expo-2026/05.png)

Not watching the screen, but passing the state.

With this approach, the information given to the AI becomes much more straightforward.

- Current HP
- Cards or moves
- Opponent state
- Available actions
- Recent logs
- etc...

If this information can be passed directly as text, there is no need to read the screen with multimodal processing.
LLMs are fundamentally good at text processing, so this is the more natural direction.

In other words, not only commentary but also AI gameplay can be built around the same mechanism.
The AI can read the state, choose the next action, and apply that action back to the game.

## Example 1: Pokémon Showdown

A clear example for this direction is **Pokémon Showdown**.

Pokémon Showdown is a browser-based Pokémon battle simulator, and it is easy to handle battle logs and action candidates as text.

https://x.com/tegnike/status/2046546186035732754

Even without showing the screen to the AI, you can pass the current battle situation and available moves as text.
Then, if the AI returns "which move to choose next," the gameplay part works.

On top of that, you can use its reasoning and the battle log to generate commentary dialogue.
Instead of building screen recognition, gameplay decisions, and commentary generation separately, **you can build gameplay and commentary in one flow centered on text game state**.

## Example 2: Slay the Spire

Another example is **Slay the Spire**.

Slay the Spire does not provide an external API by default, but with mods you can acquire game state as JSON and control the game with commands.

https://x.com/tegnike/status/2048864356167766521

Since it is a card game, the current hand, energy, enemy HP, enemy intent, and similar information are important.
If those can be retrieved as JSON, they are very easy to pass to an AI.

Then the AI only needs to decide "which card to use on which enemy" and return that as a command.

Of course, making it play strongly is a separate problem. But at least it greatly reduces the problem of getting stuck because screen recognition failed.

## What I Want People to See at the Exhibition

At this exhibition, I plan to show **an AI playing games while doing commentary**.

The subjects will be **Pokémon Showdown** and **Slay the Spire**.
Both are turn-based and easy to understand from their state, so it should be easy to watch what information the AI receives and how it makes decisions.

I also plan to prepare detailed materials for visitors, so if anything catches your interest, feel free to look at the materials and ask questions on the spot.

## Closing

That is the summary of what I will exhibit at Generative AI Anything Expo Vol. 5.

In the old method, I took screenshots of the game screen, had a multimodal LLM read them, and generated the next move plus commentary dialogue. But it had problems with speed and accuracy.
From there, I tried improvements like video delay and fast multimodal models, and eventually moved toward the idea of "what if we could get game state as text?"

Also, with the recent progress of LLMs, making custom games has become much more realistic.
Designing games so that AI can play them easily seems like a direction that will become increasingly interesting.

I am still in the middle of trial and error.
I would be happy if we could watch the future of AI characters that understand games, play them, and commentate on them together.

If you are coming to the exhibition, please stop by.
Any questions are welcome!

https://www.genai-expo.com/exhibitors?circle=00297b6cf5a4&utm_source=x&utm_medium=social&utm_campaign=exhibitor_share

## Promotion

I usually post about AI tools and AI characters on X, so I would be very happy if you followed me there.

[https://x.com/tegnike](https://x.com/tegnike)
