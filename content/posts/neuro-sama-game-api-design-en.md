---
title: "How Does Neuro-sama Play Games?"
date: "2026-05-27"
tags: ["Neuro-sama", "AI", "AITuber", "Game AI", "LLM"]
description: "A Japanese-friendly breakdown of The Swarm Scribes video \"How Neuro-sama Plays Games,\" now translated into English. It covers how the Neuro API works, examples of game integration, and design ideas useful for AI character development."
thumbnail: "/static/images/posts/neuro-sama-game-api-design/thumbnail-en.png"
---

Hey, it's Nike.

This article explains the contents of The Swarm Scribes' video **"How Neuro-sama Plays Games"**.

https://www.youtube.com/watch?v=sxeqqR4Dcnw

The video gives a clear explanation of how Neuro-sama operates games and tools, and how the community builds integrations around her.
This article respects the original video while organizing the ideas in my own way.

:::message
For the detailed history, nuance, and explanations with actual footage, please watch the original video.
:::

## Neuro-sama Is Not Simply Looking at the Screen

At least in the Neuro API-based game integrations explained in this video, Neuro-sama is not looking at the game screen like a human and directly recognizing every HP bar, button, and map element.
This is not about Neuro-sama's overall visual abilities. Within the scope of the API integrations covered here, **text information** is sent from the game or tool side.

In other words, the design passes information to the AI such as "this is the current state," "these actions are available," "this action was selected," and "this was the result."

A commonly known method is to show the screen to the AI.
That approach gives a multimodal model the game screen as an image, then uses the information it extracts to operate or commentate on the game.

However, if you want game playing or tool operation to be stable, there are cases where it is more effective for the system to convert the state into an AI-readable form instead of throwing the raw screen image at the model.

I have also experimented before with ways to make AI play games, and I wrote an article summarizing that. Reading it may make this topic easier to understand.

https://nikechan.com/dev_blog/ai-game-play-methods

This video shows that idea concretely through Neuro-sama's case.

## A Rough Overview of the Neuro API

The Neuro API is a mechanism for connecting games and tools to the API server side that communicates with Neuro-sama.
The official SDK / API documentation is also published on GitHub.

https://github.com/VedalAI/neuro-sdk

The video explains that, at first, dedicated commands were created so Neuro-sama could play a quiz-show-style game, "Who Wants to Be a Millionaire?"
For example, actions specific to that game, such as "use a lifeline" or "phone a friend."

But adding dedicated commands for every game is hard.
So a more general specification was created so Neuro-sama could handle integrations without each one having to invent its own custom commands.

In the video, the basic Neuro API flow is explained like this.

1. The game starts and connects to the API server side that communicates with Neuro-sama
2. The game registers "available actions"
3. The game sends the current situation as text
4. Neuro-sama chooses from the registered actions
5. The game executes that action and returns the result

Communication uses WebSocket, and messages are in JSON format.
There are messages such as `context` sent from the game side, `actions/register` for registering actions, `actions/force` for forcing an action selection, and `action/result` for returning results.

![Basic structure of the Neuro API](/static/images/posts/neuro-sama-game-api-design/01.png)

The key point is that the game side prepares information in a form the AI can choose from, instead of making the AI do everything itself.

This structure is also useful when thinking about AI agent design.
Rather than giving an LLM free-form input like "operate this however you want," you register candidate actions, pass the necessary state, and return results.
In short, the interface between the AI and the world is being designed properly.

## What Kinds of Integrations Exist?

The video mainly discusses how Neuro-sama plays games.
So it is easiest to start by looking at two types of game integration: autonomous and cooperative.

1. Game integrations where Neuro-sama operates autonomously
2. Cooperative game integrations where she plays together with a human

These two differ quite a lot in what is left up to Neuro-sama.

On top of that, the video introduces a third integration example: VS Code, which handles a program outside of games.
I think it is natural to read this not as gameplay itself, but as a story about how the same mechanism can be extended to external tools.

### Autonomous: Turn-Based Games Like Balatro

Card games like Balatro were introduced as examples that work well with the Neuro API.

They are turn-based, the state is easy to express as text, and the candidate actions are clear.
For example, you can register actions such as "play cards," "discard cards," "choose from a booster pack," and "reorder jokers."

In this kind of game, you can pass the information the AI needs to decide what to do next relatively cleanly.
Hand, score, effects, choices.
This kind of information is easy to express as text or JSON.

However, the problem here is **context**.

As card effects increase, descriptions get longer, and the late-game state becomes more complex, the amount of information passed to the AI keeps growing.
You want to pass all the important information. But if you pass everything, the context becomes heavy.

That balance is the hard part.

### Cooperative: More Real-Time Games Like Outer Wilds

Outer Wilds is not a turn-based card game. It is a game about piloting a spaceship and exploring planets.
Because this game requires reaction speed and spatial awareness, it is quite difficult to have an AI control it directly.

So the video introduces two integration components called `Neuropilot` and `Neuroscope`.
These were presented more as support components made for Outer Wilds than as official standard Neuro API features.

`Neuropilot` is the part that receives instructions from Neuro-sama and performs high-level spaceship operations.
For example, instructions like "go to that planet," "land," or "take off."

`Neuroscope` is the part that tells Neuro-sama the ship's state, the surrounding situation, conversation events, and so on.

![Division of responsibilities in cooperative game integration](/static/images/posts/neuro-sama-game-api-design/02.png)

Neuro-sama is the side that decides policies like "where do I want to go?" and "what do I want to do?"
`Neuropilot` receives that policy and converts it into operations the game can handle.
Meanwhile, `Neuroscope` returns the ship and surrounding state to Neuro-sama.

The important point here is that Neuro-sama is not directly doing the fine-grained piloting of the spaceship.
Decisions like "fire the thruster at this angle for this many seconds" or "hold this input for this many frames" are too heavy to throw directly at the AI.
So the AI decides intent and policy, while a dedicated integration component handles the actual piloting and conversion into inputs.

If you want to let an AI character participate in a more real-time game, separating the decision-making layer from the operation layer becomes important.

### Note: Non-Game Tool Integration Like VS Code

The discussion so far has been about game integrations, but the video also introduces VS Code as an example of a non-game tool integration.
This appears in the context of "the Neuro API was originally a mechanism for letting Neuro-sama play games, but it can also be applied to operating external programs."

This is not a game. It is tool integration that lets Neuro-sama or Evil Neuro write code.
The idea is to handle operations like editing, creating, moving, and deleting files through the Neuro API.

In the VS Code integration implementation introduced in the video, operations were separated into categories such as **copilot mode** and **autopilot mode**.

For example, file edits may be okay to execute automatically.
But dangerous operations like creating or deleting files should involve human approval.

This is also an important idea for designing AI coding agents.
It is not special just because this is an AI character. If you give tools to an LLM, you need to think carefully about this.

The more freedom you give an AI, the more interesting it becomes. At the same time, the range of things it can break also grows.
How much should be automated, and where should approval be required?
This affects both character personality and safety.

## The Hardest Part Is Context Management

The issue that comes up again and again throughout the video is context management.

Passing game state as text does not magically solve everything.
In fact, precisely because you can pass things as text, "what to pass" and "what not to pass" become important.

There is a lot of information you may want to pass to an AI.

- Current game state
- Past action history
- Rule explanations
- Long-term goals
- Short-term goals
- Options that are only valid right now
- Failed operations
- Conversation with humans

You want to include all of it.
But if you include everything, the AI's context gets heavy and the important information gets buried.

The video also explains that because Neuro-sama and Evil Neuro themselves choose what to remember, even if a developer says "this is important," it will not necessarily be retained exactly as expected.

When building AI characters, you constantly run into decisions like "I want the character to remember this," "but it gets in the way of the current conversation," and "but forgetting it will cause trouble next time."
Context management is not just token saving. It is also the work of designing how the character understands the world.

## Games That Need Fast Reactions Are Difficult

Another major constraint is reaction speed.

The Neuro API is a mechanism where the game side and the API server side that communicates with Neuro-sama exchange text over a network.
So it is not suited to games that require frame-level instant decisions.

For FPS games, fighting games, MOBAs, and action games that require decisions in a very short time, leaving everything directly to an LLM would be extremely difficult.

That said, it does not mean the API cannot be used at all.
It can still work if only high-level instructions are left to the AI.

For example:

- The AI decides "next, I want to explore that area"
- Pathfinding and movement control are handled by a game-side bot
- Only the results and events are returned to the AI

With this kind of division of labor, it becomes easier for an AI character to participate even in real-time games.

The AI does not operate everything. The AI becomes the upper layer of decision-making.
I think this point is very important.

## SDKs and Simulators That Support Development

In the latter half of the video, SDKs and simulators are also discussed.

The official `VedalAI/neuro-sdk` repository contains API documentation and official Unity SDK / Godot SDK packages.
Building the communication layer from scratch every time for each language or game engine would be hard, so having these SDKs is very welcome.

https://github.com/VedalAI/neuro-sdk

The video also introduces simulators that imitate the API server, so integrations can be tested even without having Neuro-sama herself locally.

The following names appear in the video:

- Randy: a simple test server that returns random actions
- Tony: a UI-based test tool that lets you return actions manually
- Jippity: a test tool that uses LLMs such as OpenAI to return more AI-like responses
- Gary: a more advanced test backend that can also handle local LLMs

Being able to test the integration side without directly connecting to the real Neuro-sama is a big deal.
You can try connection, action registration, and response handling locally, which lowers the barrier to implementing the game side.

Watching the video, I felt that the community can build integrations more easily not only because the API specification exists, but because SDKs and simulators are also maintained.

## Bringing This Back to AI Character Implementation

From here on, these are my own thoughts after watching the video.

The Neuro API design philosophy introduced here is quite useful for AI character implementation in general.

When connecting an AI character to real services or streaming environments, what matters is not "showing everything to the AI."
What matters is passing the world in a form the AI can handle.

For example, with a Discord Bot, instead of dumping all logs into the model, it is more stable to organize and pass information like this:

1. Current channel
2. Recent conversation
3. Relationship with the other person
4. Available commands
5. Rules that must be followed

That makes responses and actions more stable.

In AI character implementation, the **interface with the world** often matters more than the model itself.

What state should be shown?
What actions should be selectable?
How far should automatic execution go?
When something fails, how should the result be returned?

I thought Neuro-sama's case was an excellent example for thinking about those questions.

## Summary

To summarize the original video's contents, Neuro-sama's game integrations are roughly based on these ideas:

1. The game or tool side passes state in a form the AI can understand
2. Actions the AI can choose are registered in advance
3. The AI's output is validated, executed, and returned as a result by the game side
4. Turn-based games and games whose state is easy to convert to text are a good match
5. For highly real-time games, the policy decided by the AI needs to be separated from the actual fine-grained operations

Personally, I think this is very important for AI character development in general.

When we want an AI to do something, it is easy to think, "a smarter model should be able to do it."
But in practice, it is not only about model intelligence. The design of how the model sees the world and how it can act has a huge effect.

What makes Neuro-sama impressive is not only that she is interesting as a conversational AI.
It is also impressive that the connection between games, tools, streaming environments, and the community is being grown together.

Once again, the original video was really good.
If you are interested in implementing AI characters or AITubers, please check it out.

https://www.youtube.com/watch?v=sxeqqR4Dcnw

## Promotion

I usually post about AI tools and AI characters on X, so I would be very happy if you followed me there.

[https://x.com/tegnike](https://x.com/tegnike)
