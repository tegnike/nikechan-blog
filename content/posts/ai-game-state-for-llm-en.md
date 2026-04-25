---
title: "Before Making AI Play Games, Think About How to Capture the State"
date: "2026-04-24"
tags: ["AI", "Game AI", "LLM", "Minecraft", "Pokémon Showdown"]
description: "A breakdown of different approaches to capturing game state beyond screen recognition. Using Pokémon Showdown, Slay the Spire, and Minecraft as examples, we explore what makes a game easy or hard for AI to play."
thumbnail: "/static/images/posts/ai-game-state-for-llm/thumbnail.png"
---

Hi, I'm Nike.

A little while back, I wrote a post about having AI do live commentary while playing games.

https://nikechan.com/dev_blog/ai-game-play-methods

In that post, I mentioned that if you want the AI to actually *play* the game, you should pick one where you can capture the state as text. I used Pokémon Showdown as an example — instead of feeding the screen to a multimodal AI, you grab the game state as text and pass it to an LLM.

This post picks up from there and takes a broader look at the question: *how do you capture game state in the first place?*

Text logs are just one option. Browser games offer the DOM or network traffic; Minecraft has dedicated bot libraries; Slay the Spire has mods; retro games have emulator RAM. The right approach depends entirely on how the game is built.

That said, being able to *capture* the state and being able to *play stably* are two different things. This post separates those concerns and walks through specific games and libraries for each.

If you're trying to figure out where to start when making AI play games, **state capture** is a natural first entry point — and that's what we'll focus on here.

## State Capture Is Just the Beginning

At minimum, making AI play a game requires three things:

1. Capture the current game state
2. Decide on the next action
3. Actually send that input to the game

Step 1 — capturing state — gets the most attention. But steps 2 and 3 matter just as much.

Say you manage to pull the text "the enemy attacked" from the game's log panel. That might be enough for live commentary. But if the AI is actually *playing*, you also need the current HP, available moves, enemy status, legal actions, and results after each action.

Then there's the question of what happens after the AI says "attack." How does that actually get executed? Do you press a button? Call an API? Send a command? Click a DOM element?

The key question isn't just whether logs exist — it's whether **the state can be captured in a form the AI can use for decision-making**, and whether **the AI's output can be reliably translated into game input**.

![Three components needed for AI gameplay](/static/images/posts/ai-game-state-for-llm/01.png)

State capture is just the entry point. When you think through the whole pipeline, the difference between easy and hard games for AI becomes much clearer.

## Games That Work Well with AI

Let's start with games that are relatively easy to make AI play.

The common thread: game state is available as text or structured data, and actions can be expressed as commands or symbols. Lots of turn-based games fall here.

### Pokémon Showdown

The clearest example is **Pokémon Showdown**.

Pokémon Showdown is a browser-based Pokémon battle simulator, and internally it communicates all battle information through a text protocol.

https://pokemonshowdown.com/

There's also [poke-env](https://poke-env.readthedocs.io/en/stable/), a Python library for building Pokémon Showdown bots.

With poke-env, the active Pokémon, opponent's status, available moves, switch options, and legal actions are all accessible as objects. Format them as compact text or JSON before passing to an LLM, and you can straightforwardly ask it to pick the next move.

This approach is well-suited to having AI actually play through a whole match. No screen reading required, and the action space is clearly defined.

One caveat: Pokémon Showdown is a fan-made community project, not an official Nintendo or Game Freak service. It currently exists in a tolerated gray area, so keep usage to personal research and experimentation.

### Chess, Shogi, Go

Board games like chess, shogi, and go are also a natural fit.

Chess has FEN, PGN, and UCI for engine integration. Shogi has SFEN, KIF, CSA, and USI. Go has SGF and GTP.

Board positions are easy to encode symbolically, and legal moves are easy to enumerate. Getting an LLM to play *well* is a separate challenge, but building a "pass state in, get action out" pipeline is very doable.

For chess, libraries like [python-chess](https://python-chess.readthedocs.io/en/latest/) and the [Lichess API](https://lichess.org/api) are well-maintained. These games are great starting points for AI play experiments.

### Slay the Spire

One I found particularly interesting is **Slay the Spire**.

Slay the Spire doesn't expose an external JSON API by default.

https://store.steampowered.com/app/646570/Slay_the_Spire/

But install [CommunicationMod](https://github.com/ForgottenArbiter/CommunicationMod) and it communicates with an external process via `stdin`/`stdout`, sending game state as JSON.

https://github.com/ForgottenArbiter/CommunicationMod

According to the README, whenever the game reaches a stable state, it sends a JSON payload containing the hand, draw pile, discard pile, enemy HP, enemy intent, player HP, energy, relics, map, and more. There's also a Python package called [spirecomm](https://github.com/ForgottenArbiter/spirecomm).

The external process receives something like this and sends back the next command:

```json
{
  "available_commands": ["play", "end", "state"],
  "game_state": {
    "combat_state": {
      "hand": ["Strike", "Defend", "Bash"],
      "monsters": [{ "name": "Jaw Worm", "current_hp": 46 }],
      "player": { "current_hp": 68, "energy": 3 }
    }
  }
}
```

It's a card game, so the action space is fairly well-defined, and the turn-based structure means you can wait for responses. Very LLM-friendly.

### TextWorld, NetHack

Text games and roguelikes are another good fit.

[TextWorld](https://github.com/microsoft/TextWorld) is a framework for using text-based games as AI agent research environments. Observations and actions are both text by nature, so LLMs slot in naturally.

NetHack has research environments like the [NetHack Learning Environment](https://github.com/facebookresearch/nle) and MiniHack. The game itself is brutally hard, but at least there's a path to state capture beyond "show the screen to an LLM."

## Games with Dedicated Libraries

Next up: games that have dedicated libraries or AI research environments.

A word of caution here: having a dedicated library means a solid entry point for state capture and control. But that doesn't automatically mean "throw it at an LLM and it plays."

### Minecraft

The prime example is **Minecraft**.

Minecraft has [Mineflayer](https://github.com/PrismarineJS/mineflayer), a well-known bot library.

https://github.com/PrismarineJS/mineflayer

Per the README, it handles block data, entity tracking, physics and movement, attacking, inventory management, crafting, chest interaction, mining, building, chat, and more.

In short: state capture and control APIs are well-covered. This is absolutely not a "screen-only" game.

But Minecraft is *wildly* open-ended.

Just "chop a tree" requires: scan surroundings for trees, navigate toward one, handle elevation changes along the way, check if you have an axe, craft one if not, manage inventory, flee from enemies if needed. And that's one task.

Having Mineflayer doesn't mean you just throw everything at an LLM and call it done. You need task decomposition, pathfinding, short-term memory, long-term memory, and failure recovery.

This is full-on agent architecture territory.

Minecraft has been used in serious AI research — [MineDojo](https://github.com/MineDojo/MineDojo), [Project Malmo](https://github.com/microsoft/malmo), and [Voyager](https://voyager.minedojo.org/), which uses GPT-4 and Mineflayer to progressively acquire skills in Minecraft.

The environment is rich, which makes it an attractive research subject — but the implementation weight matches.

### StarCraft II

**StarCraft II** has [PySC2](https://github.com/google-deepmind/pysc2), DeepMind's StarCraft II Learning Environment.

State capture works, control works, and it's a famous AI research target.

But it's real-time strategy, which explodes the difficulty. Partial observability, unit counts, action frequency, map awareness, long-horizon strategy, micro-management. Rather than having an LLM pick "the next move," you're typically composing multiple control systems.

### Doom, Retro Games, Factorio

For FPS, there's [ViZDoom](https://github.com/Farama-Foundation/ViZDoom), which turns Doom into a reinforcement learning environment with access to screen buffers and game variables. But FPS requires reaction speed and visual processing, so driving it purely from text state is an uphill battle.

For retro games, [Gym Retro](https://retro.readthedocs.io/en/latest/) can handle RAM and controller input — games like Mario or Sonic become usable environments. The catch: each game requires memory address analysis and reward design.

Also worth noting: running commercial games requires ROM files, which sits in legally gray territory. How you handle software you legitimately own is something to verify for yourself.

Factorio has the [Factorio Learning Environment](https://github.com/JackHopkins/factorio-learning-environment), designed specifically for LLM agent evaluation. Interesting environment, but like Minecraft, the real challenge isn't state capture — it's "what's the goal, and how do you plan for it?"

Dedicated environments lower the barrier to entry, but the downstream design complexity is substantial for all of them.

## Easy vs. Hard Games for AI

Here's how those games break down:

![Easy vs. hard games for AI play](/static/images/posts/ai-game-state-for-llm/02.png)

| Game | State Capture | Control | Difficulty for AI Play |
|---|---|---|---|
| Pokémon Showdown | Text protocol / poke-env | Commands | Very well-suited |
| Chess / Shogi / Go | Symbolic board state | Symbolic moves | Well-suited |
| Slay the Spire | JSON via Mod | Commands | Very well-suited |
| TextWorld | Text | Text commands | Well-suited |
| NetHack | NLE etc. | Commands | State works, game is hard |
| Minecraft | Mineflayer etc. | Bot API | State works, architecture is heavy |
| StarCraft II | PySC2 | API | Real-time strategy is hard |
| Doom | ViZDoom | API | Reaction speed and vision are hard |
| Factorio | FLE / Mod / Lua API | API / Commands | Long-horizon planning is hard |
| Retro action games | RAM / Emulator | Input | Per-game analysis is heavy |
| Screen-only minigames | Screen recognition / Canvas | Few inputs | State capture is hard, but control is light |

This table isn't about which games are better.

The point is: **when making AI play a game, you need to look at the shape of state and control separately from whether the game is fun.**

Minecraft, for example, is very well-equipped on the state capture side. But the moment you tell the AI "go survive in survival mode," you're immediately in task decomposition and long-horizon planning hell.

There are also games where state capture is hard but control is light. Simple runner games, clicker games, or small Canvas-based browser games may require screen recognition if there is no useful DOM or API state. But the action space can still be tiny: jump, move left or right, or click.

Pokémon Showdown and Slay the Spire, on the other hand, involve deep decision-making as games — but the format of state and actions is tractable, and building the LLM interface is much more approachable. That difference has a big impact on which game you choose as a starting point.

## Checklist for Picking a Game

When choosing a game to make AI play, here are the questions I'd ask first:

- Turn-based or real-time?
- Can state be captured as text, JSON, a protocol, or an API?
- Can legal actions or move candidates be enumerated?
- Is it easy to translate AI output into game inputs?
- Can the AI recover from failure?
- How much screen recognition is still unavoidable?
- Does the execution pace work for live commentary or streaming?
- For online games: does the ToS or anti-cheat allow this?

For a first project, turn-based games with structured state and actions are the way to go. Pokémon Showdown, chess, Slay the Spire — any of those work well.

Minecraft is appealing, but I'd call it heavy as a first target. Mineflayer makes it approachable on the surface, but whether you want "a bot that talks to villagers," "a bot that mines diamonds," or "a bot that defeats the Ender Dragon" completely changes what you need to build.

StarCraft II, Factorio, and Doom are great for research given their dedicated environments. But they lean more toward building specialized control and planning systems than casually throwing an LLM at the problem.

## Closing Thoughts

Discussions about making AI play games tend to collapse into "use screen recognition" vs. "grab the logs." But in practice, there are many more routes: DOM, network traffic, protocols, mods, bot libraries, emulators, research environments.

That said, being able to *capture* and being able to *play* are different things.

Can the state be shaped into something an LLM can actually use for decision-making? Can you narrow down the action space sensibly? Can you send inputs to the game reliably? Can you recover when things go wrong?

Working through those questions makes the gap between easy and hard games for AI much clearer.

My previous post used Pokémon Showdown as the example, but digging into this made Slay the Spire and Minecraft look genuinely interesting too. Slay the Spire in particular — with its JSON state — seems like a solid target for building an LLM player.

If I build something next, I'm thinking I'll start with Slay the Spire or chess.

## Announcement

I'll be exhibiting at **Generative AI Exhibition Vol. 5**, happening on Wednesday, May 6, 2026 (a national holiday in Japan)!

I'm planning to have some kind of live demo of AI playing games, so come check it out if you're interested.

[https://www.genai-expo.com/exhibitors?circle=00297b6cf5a4&utm_source=x&utm_medium=social&utm_campaign=exhibitor_share](https://www.genai-expo.com/exhibitors?circle=00297b6cf5a4&utm_source=x&utm_medium=social&utm_campaign=exhibitor_share)

I also post regularly about AI tools and AI characters on X — if that sounds interesting, I'd be happy to have you follow along!

[https://x.com/tegnike](https://x.com/tegnike)
