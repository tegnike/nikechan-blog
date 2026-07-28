---
title: "I Built Two Games for AI Characters—and Shelved Both"
date: "2026-07-28"
tags: ["AI Characters", "Game Development", "AITuber", "Indie Development"]
description: "I built an original trading card game and an AI-powered social deduction game for AI characters, but eventually stopped developing both. Here is how testing the completed social deduction game led me to shelve the card game as well."
thumbnail: "/static/images/posts/ai-game-worked-but-wasnt-fun/thumbnail.png"
---

Hi, it's Nike.

For a while, I had been experimenting with games for AI characters, hoping they might lead to something entertaining.
The two projects that came out of those experiments were **an original trading card game and a social deduction game played entirely by AI characters**.

Neither project stopped at the idea stage; I developed both far enough to work as games.
However, I have now stopped working on both of them.

This is a look back at how I came to stop developing both games.

## I Wanted AI Characters to Play Games

I started building the original TCG because I wanted AI characters to be able to play the Pokémon Trading Card Game.
Kaggle is currently hosting the [PTCG AI Battle Challenge Simulation](https://www.kaggle.com/competitions/pokemon-tcg-ai-battle/overview/description), a competition for developing AI agents that can play Pokémon TCG matches.

The competition provides source code that allows AI agents to play Pokémon TCG.
I wondered whether I could use it for streams where AI characters play Pokémon TCG against each other, but the source code may only be used for Kaggle-related purposes, not for anything else.
Of course, even if I recreated Pokémon TCG with my own implementation, using it this way would likely violate the relevant terms.

So I decided to build an original TCG instead.

## First, Make a TCG That Humans Would Enjoy

First, I looked for open-source projects modeled after existing card games.
The search did not turn up much: all I found were reimplementations of existing TCGs—which were obviously out of the question—and projects that had not been updated for several years.

That led me to consider building an original TCG.
I designed the rules from the ground up so that the game would not resemble existing card games too closely.

Because it was meant for AI characters, my requirements included matches lasting around five minutes, room for deck-building decisions, characters that would be visibly present on the board, and a small action space.

Although I was making the game for AI characters, I did not expect a game that humans found boring to become entertaining simply because AI was playing it.
So my first goal was to make something that humans would genuinely enjoy playing.

https://x.com/tegnike/status/2073874010782232885/photo/1

Even after releasing it publicly, I continued adjusting the rules and numbers for a while.

## The Social Deduction Game Was Finished First

Alongside the TCG, I was also building a social deduction game played by AI characters.
I chose this kind of game because I thought deception and decision-making would give each character's personality room to show.

I implemented the full flow of the game: daytime discussions, voting, nighttime actions, and win-condition checks.
Each character also had their own personality and way of addressing the others, and their dialogue was read aloud with synthesized voices.

Once it was complete, I borrowed AI characters from some of my followers and ran a test game.

https://x.com/tegnike/status/2080273096775196947/video/1

## A Game Run Only by AI Felt Flat

Watching the finished game, I found that the AI characters moved through their conversations so matter-of-factly that the whole match felt flat.

Part of what makes social deduction games entertaining to watch is the way human performers—such as VTubers and YouTubers—turn their conversations and reactions into a show.
Even with the same rules, AI characters calmly talking to one another produced almost no moments that made me want to keep watching.

Turning it into compelling content would have required much stronger presentation, including sound effects and visual direction.
At that point, however, the work would no longer have been limited to game development; it would have moved into entertainment production.

That was beyond the scope I had envisioned for this project, and I decided it would be difficult to expand the work that far.
So I ended development of the social deduction game there.

## The Social Deduction Game Also Changed My Mind About the TCG

I had not yet reached the point of testing an AI-versus-AI match in the original TCG.
After seeing the completed social deduction game, however, I believed that the TCG would likely run into the same limitation.

The plan for the TCG was to first make it enjoyable for human players, and it still needed a great deal of development before reaching that point.
If I put in all that work, would AI characters playing it actually become entertaining content?
After the results of the social deduction game, I could no longer feel optimistic about that outcome.

My motivation to continue faded, and I decided to shelve the original TCG as well.

## What I Think About AI-Only Content

The discomfort I felt this time was similar to something I had already felt about AITubers that operate entirely on their own.
This is purely a matter of personal taste, but I do not find streams particularly entertaining when an AI simply responds to comments and keeps the broadcast moving in a steady, uneventful rhythm.

Adding the framework of a game did not change that flatness.

I do think there is more potential when a human participates as the AI's partner, because their interaction creates reactions and exchanges that would not happen otherwise.

For now, I am not planning to make another game.
I still want to think more about what it means for an AI to play a game in the first place.

At the very least, this experience taught me that making the game work is not enough; the way it is presented has to be designed as well.

## What I Built

For what it's worth, I've made both projects publicly available.

https://github.com/tegnike/aozora-islands

https://github.com/tegnike/ai-werewolf

## Follow Me

I regularly post about AI tools and AI characters on X, so I would be very happy if you followed me there.

[https://x.com/tegnike](https://x.com/tegnike)
