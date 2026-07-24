---
title: "I Built a System for Battling Pokémon with AI, So Here Is the Build Report"
date: "2026-07-24"
tags: ["AI", "AITuber", "Pokémon Champions", "Speech Recognition", "Development"]
description: "I built a voice-driven battle assistant so I could enter a Pokémon Champions tournament with AI Nike-chan. This article covers the button-based role design, speech recognition model comparison, and what I learned from using it live."
thumbnail: "/static/images/posts/pokemon-battle-partner/thumbnail-en.png"
---

Hi, it's Nike.

On July 4, AITuber World hosted a Pokémon Champions tournament for AI characters on its Discord server.
Each participant built a system for their own AI character and competed in live matches.

![Thumbnail for the first AITuber Cup](/static/images/posts/pokemon-battle-partner/00-aituber-cup-thumbnail.png)

You can join the AITuber World Discord here.

https://discord.gg/Xdmpprr7eX

To enter with AI Nike-chan, I built **Pokemon Battle Partner**, a system that takes a spoken description of the battle, organizes the current state, and suggests the next move.

The repository is available on GitHub.

https://github.com/tegnike/pokemon-battle-partner

The tournament started with 12 participants divided into three round-robin groups of four.
The winner of each group advanced to the final round-robin stage.
I went undefeated in Group C, lost both matches in the final group, and finished third overall.

Before the stream, I was not sure how well the AI would actually make decisions.
In practice, it was more accurate than I expected, and viewers responded positively as well.

This article explains how the system works and, more importantly, **what I built to keep the AI from deciding too much on its own**.

## Instead of Showing the Screen, I Describe the Battle

One obvious way to let an AI play a game is to send the game screen to a multimodal model.
I previously used that approach for AI gameplay and commentary, and wrote about the architecture and its limitations here.

https://nikechan.com/dev_blog/ai-game-play-methods

Pokémon battles involve a large amount of decision-relevant information: remaining HP, status conditions, stat changes, weather, entry hazards, revealed moves, held items, and more.
A screenshot-based system takes time to read and is more likely to misinterpret what is displayed.

For this project, I decided to **describe the battle state by voice**.

![Screenshot input compared with voice input](/static/images/posts/pokemon-battle-partner/01-input-method-comparison-en.png)

I say something like, "They led with Gengar, and I have Garchomp out. Shadow Ball did about half," then convert the audio to text and send it to the AI.
After hearing the AI's suggestion, I enter the move or switch into the game myself.

It is not full automation.
The human provides an accurate state, the AI makes the decision, and the human performs the input.

## From Spoken Input to the Next Move

The system displays the recommendation, current matchup, field state, both players' selected teams, and the match history in one place.

![Pokemon Battle Partner consultation screen](/static/images/posts/pokemon-battle-partner/01-control-panel.png)

The flow is:

1. I describe the current situation through the microphone
2. A speech recognition model converts it into text
3. I press the button that matches the type of consultation I want
4. The system extracts battle information and updates the stored state
5. The AI chooses the next move using local Pokémon data and damage calculations
6. AI Nike-chan speaks through AITuberKit, and I operate the game

![System flow from voice input to game control](/static/images/posts/pokemon-battle-partner/02-system-flow-en.png)

The battle state is saved for each match, so I do not need to repeat everything every turn.
AI Nike-chan's response is also shown in OBS so viewers can follow the reasoning.

## Fixing the Role with Buttons So the AI Does Not Decide Too Much

The most important design choice in this system may not be the LLM prompt.
It may be the **buttons in the control panel**.

There are four consultation buttons below the input field:

- **Team Selection**: choose three Pokémon from my team of six and decide the lead
- **Battle Advice**: choose the next move or switch from the current battle state
- **Conversation**: respond as dialogue with me or the viewers instead of giving a battle command
- **Post-match Review**: review the match using the saved battle history

One input can plausibly be interpreted as a battle-state update, a request for the next move, a conversation prompt, or a post-match review.
If the AI must classify the purpose and generate the response in one step, it will not always prioritize "advice" and "explanation" in the same way.
That can produce a general explanation when I need a move or switch, or a battle command when I only want a conversational response.

During a stream, pressing Battle Advice should reliably return a move or switch and the reason behind it.
Pressing Conversation should return dialogue rather than a game action.
I therefore made **the pressed button determine the task, switching both the instruction sent to the AI and the expected output format**.
The AI does not classify the purpose itself; it only makes decisions within the selected scope.
The human chooses the type of work, and the AI thinks inside that boundary.

![Letting the AI infer the task compared with fixing its role through buttons](/static/images/posts/pokemon-battle-partner/02-role-buttons-en.png)

The system also validates the response instead of accepting it blindly:

- Team Selection must return exactly three Pokémon from my team of six
- Battle Advice must return a move or switch, not only an explanation
- The system corrects suggestions involving unknown moves, fainted switch targets, or instructions that contradict type matchups

**The AI keeps the decision-making role, while the system controls the boundaries of that decision.**
I think this separation, not only the model itself, is a major reason the system worked better than expected.

## The Hardest Part Was Organizing the Pokémon Data

With vibe coding, a web app with voice input can now be built fairly quickly.
The amount of information required for a good Pokémon decision is another matter.

Moves, types, abilities, held items, stats, learnsets, Mega Evolution, the current metagame, Pokémon Champions-specific mechanics, and the intent behind my own team all matter.

An LLM's general knowledge will not necessarily match the current game rules.
Putting everything into one long prompt also makes the actual decision less focused.
I therefore keep the base data locally and load only what is relevant to the current matchup.

I created an alias table for names that speech recognition tends to distort, and split metagame knowledge into separate Markdown files for each Pokémon.
Available moves and damage in both directions are calculated locally, and only the relevant material is passed to the AI.
Building the app was easier than organizing Pokémon information into a form the AI could reliably use.

## Choosing Speech Recognition by Names, Speed, and Price

For voice input, recognizing Pokémon names correctly is especially important.
If "Wash Rotom" or "Meowscarada" becomes a different name, the battle-state update and every decision after it can break.

I sent the same 17-second real recording to multiple models.
In total, I tested six OpenAI-family models and five Gemini-family models.
The table below shows the three finalists after comparing accuracy, speed, and price.
Speed is based on one measured run per model, and cost is an estimate using the prices available at the time of the test.

| Model | Transcription behavior | Speed | Estimated cost per 17 seconds |
|---|---|---:|---:|
| `gemini-3.5-flash` | Matched the reference text and preserved filler words | 4.3 sec | $0.0076 |
| `gpt-4o-transcribe` | Preserved Pokémon names but removed most filler words | 1.2 sec | $0.0017 |
| `gpt-4o-mini-transcribe` | Misrecognized some Pokémon names | 1.2 sec | $0.0009 |

If literal transcription were the goal, `gemini-3.5-flash` was the most accurate.
This system is not producing meeting minutes, though.
The opponent's name, HP, moves, and field state need to be correct; filler words can disappear without causing a problem.

`gpt-4o-transcribe` returned the Pokémon names correctly in 1.2 seconds, at an estimated cost of about $0.0017 for this recording.
I chose it for the balance of proper-noun accuracy, response time during a stream, and repeated-use cost.

For current specifications and pricing, see the official GPT-4o Transcribe and Gemini API pricing pages.
The figures in the table are estimates from the time of this test.

https://developers.openai.com/api/docs/models/gpt-4o-transcribe

https://ai.google.dev/gemini-api/docs/pricing

## The Stream Showed Both Strong Decisions and Strange AI Behavior

During the stream, I repeatedly described the situation, pressed a consultation button, let AI Nike-chan speak, and entered the result into the game.

You can watch the actual stream here.

https://www.youtube.com/watch?v=yEdwGe00Wns

The AI made better decisions than I expected, and I went undefeated in the preliminary group.
I was also happy to hear viewers say that the accuracy was better than expected.

There were still moments where it repeatedly switched Pokémon without much purpose, making choices a human player would be unlikely to make.
The AI and the surrounding system also produced occasional errors, but even the imperfect behavior contributed to the feeling that we were playing together.

## Next, I Want More Consistent Decisions with Clear Reasons

In actual use, speed was not a major problem.
The main area I want to improve is **decision accuracy**.

I do not want the system to choose only the move with the highest immediate damage.
It should consider a possible switch by the opponent and the value of preserving my own Pokémon, then say, "This is the reason I am choosing this move."

On the other hand, adding rules for every situation would remove the AI's ability to adapt.
Local calculations and guards should prevent obvious mistakes, while the final choice among several valid options should remain with the AI.

This is not a fully automated system, but the division of labor was enough for AI Nike-chan and me to enter the tournament and finish third.
For AI gameplay, a cooperative setup where a human and an AI operate the game together can be interesting in its own right.

## Links

Pokemon Battle Partner is available on GitHub.

https://github.com/tegnike/pokemon-battle-partner

AI Nike-chan speaks through AITuberKit.

https://github.com/tegnike/aituber-kit

I also post about AI tools and AI characters on X.

https://x.com/tegnike
