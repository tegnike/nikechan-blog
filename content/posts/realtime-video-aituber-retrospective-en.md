---
title: "What I Learned from Livestreaming an AITuber with Real-Time Video Generation"
date: "2026-09-13"
tags: ["AITuber", "Video Generation", "AI Characters", "YouTube", "Retrospective"]
description: "Four AITuber livestreams where viewer comments changed the video brought in around 290 subscribers. From a Santa hat appearing on screen to visual drift during long sessions and an RPG experiment, I reflect on the challenge of turning new technology into content people keep coming back for."
thumbnail: "/static/images/posts/realtime-video-aituber-retrospective/thumbnail-en.png"
draft: false
draftToken: "4382d324a676375be8930d6ae533dae3"
---

Hi, I'm Nike.

This week, I ran four AI Nike-chan livestreams on YouTube using real-time video generation.
The system comes up with replies and actions based on viewer comments, then sends them to a video generation API together with speech audio, making Nike-chan talk and move on screen.
I've written about how the system works here:

https://nikechan.com/dev-blog/realtime-video-aituber

There's something futuristic about watching the video change in response to comments.
But after four streams, two challenges stood out: keeping the visuals consistent and continuing to stream the same kind of content.

In this post, I'll look back at the experience and the practical challenges of running it, then share the YouTube results and what I plan to do next.

## A New Experience: Viewer Comments Become Part of the Video

I used H3 Max Director, available through fal.
Its API lets you send new instructions while video generation is already running, and I combined that with responses to viewer comments.

The most fun part was simply seeing something from a comment appear in the video.
For example, when a viewer commented, "Here's a Santa hat for you," Nike-chan actually put on a Santa hat.
Something a viewer had given her through a comment became part of her appearance.

/static/images/posts/realtime-video-aituber-retrospective/02-santa-hat.mp4 "This feels like a whole new kind of Super Chat"

Neither the viewers nor I, the person who built it, knew what would happen next.
Comments from different people sent the scene in unexpected directions, sometimes into outright chaos. I think that was what made these streams fun.

## Big Scene Changes Sometimes Put the Speech and Video Out of Sync

On the other hand, the video sometimes struggled to follow instructions that called for a major scene change.
The comments and replies would assume a new setting, but the video hadn't changed.
That led to moments where what Nike-chan was saying didn't match what was happening on screen.

This might be a characteristic of the model, or my prompting might have contributed to it.
I couldn't separate those possibilities based on these streams alone, but it was a concern when trying to let comments freely change the scene.

## The Longer It Runs, the Less She Looks Like the Original Nike-chan

Another challenge was keeping the character's appearance consistent.
Her appearance sometimes changed, especially when she left the frame and came back, or when video generation was interrupted.

Even during continuous generation, her facial features and the art style gradually drifted away from the illustration I had supplied at the start.
At one point she looked like a character from an older anime; at another, like someone from a certain Chinese game. By the end, Nike-chan looked quite different from the original image.

![A livestream screenshot of Nike-chan standing in a school hallway, with her hairstyle and facial features altered by continued generation.](/static/images/posts/realtime-video-aituber-retrospective/01-character-appearance-drift.png "Who even are you?")

My prompts include detailed descriptions of her hair, face, outfit, and other visual features. But they also contain a lot of instructions about actions and scenes, and describing her appearance wasn't enough to preserve it.
It felt as though adding more instructions made them harder to follow, though I haven't tested whether the amount of prompt text actually caused this.

There's also an end-frame feature that lets you specify an image for the end of a sequence, but I didn't use it this time.
With open-ended comments constantly changing the scene, it was difficult to prepare an image in advance that would fit whatever came next.

I also had the impression that, in every session, the whole image became darker and murkier the longer generation continued.
I don't know what caused that either.

So whenever the character's appearance or the overall image started to bother me, I restarted from a completely new session.
Breaking up the generation this way helped a lot.

## An RPG Brought a Different Set of Challenges

Alongside testing the visual quality, I tried to find out what kinds of activities suited this setup.
Streams 1, 2, and 4 were essentially free-form chats where comments shaped what happened, with little more than a different starting image each time. For stream 3, I tried an RPG theme with a sequence of goals: earn money, get equipment, and defeat monsters.

The money-making section went relatively well, thanks to viewers contributing all kinds of ideas.
Looking back at the stream as a whole, though, I don't think the pacing worked very well.

One reason was that I hadn't built enough underlying logic to support progress toward the goals, leaving that progress dependent on comments.
Comments don't necessarily move things toward the objective, so we often stalled or went in a different direction from what I'd expected.

![An RPG livestream screenshot showing AI Nike-chan in armor facing a giant sea urchin monster.](/static/images/posts/realtime-video-aituber-retrospective/03-rpg-standoff.png "AI Nike-chan and the giant sea urchin monster, locked in an endless staring contest")

I also felt that setting specific goals weakened some of what made this video generation experience fun.
What I enjoyed was seeing comments take the video somewhere nobody had expected.
When I defined the objectives too tightly, as in the RPG, and made the destination too obvious, some of that appeal faded.

A simple objective might still work.
But based on this attempt, I think I need to balance having a concept for the stream with leaving enough room for things to unfold unexpectedly.

## Continuing the Same Streams Will Be Difficult

The video generation API costs for these streams were covered almost entirely by support from sponsors.
Their support is what let me repeatedly try this expensive real-time video generation technology in actual livestreams.
Thank you again for making that possible.

I still have credits left, but once the promotion ends, continuing at the same pace will be difficult.

According to [fal's official announcement](https://fal.ai/h3-max-director), on September 14, 2026, the per-second video generation price returns from the promotional rate of $0.02 to the regular rate of $0.08.
That's a fourfold increase.

| Cost basis | Promotional rate | Regular rate |
| --- | --- | --- |
| Per second of API video generation | $0.02 | $0.08 |
| Equivalent cost per minute of video generation | $1.20 | $4.80 |

Generation was paused for parts of each stream, so the actual cost during the promotion was roughly $50 per stream.
Generating the same amount at the regular rate would cost about four times as much, making it difficult to keep running similar streams as they are.

## The Streams Reached More People on YouTube Than My Previous Ones

So far, I've focused on what it was like to use real-time video generation.
To wrap up, I'd also like to look at the results for my YouTube channel.

I only recently started putting serious effort into YouTube. Before this, I'd spent two or three weeks covering AI character news two or three times a week.
Those news streams ran for about 30–40 minutes, with around 10 concurrent viewers and 200–300 views each.
It felt like most viewers were people who already followed me, and the subscriber count was barely growing.

Each of these video generation AITuber streams lasted around 50 minutes to an hour. Here are the results:

| Stream | Format | Views | Approximate concurrent viewers | New subscribers |
| --- | --- | --- | --- | --- |
| 1 | Free-form chat | Around 4,700 | Around 30 | Around 140 |
| 2 | Free-form chat | Around 3,500 | Over 100 | Around 110 |
| 3 | RPG-themed stream | Around 1,400 | Around 60–70 | Around 30 |
| 4 | Free-form chat | Still accumulating; expected to exceed 1,000 | Around 60–70 | Around 10 |

These are approximate figures available when I looked back on September 13, 2026.
The concurrent viewer counts are also rough recollections from the streams, rather than consistently measured figures such as peak concurrent viewers.
The streams had been public for different lengths of time, so stream 4's view count in particular is an estimate while views are still coming in.

Together, the four streams brought in around 290 subscribers.
For my channel, that counts as quite a breakout.

Total watch time had previously been around 5–20 hours per stream; this time, it averaged about 80 hours per stream.
These streams were also longer, so I can't say it was a fourfold-or-greater increase under identical conditions, but I do feel that they reached a lot more people.

On the other hand, views and new subscriber gains declined with each stream.
Even with the novelty, repeating similar content only goes so far in attracting new subscribers.

Still, total watch time stayed at a similar level for the later videos despite the lower view counts. My impression is that the novelty initially drew people in, and by streams 3 and 4, those willing to watch for longer had stayed.
I haven't confirmed that through an analysis of returning viewers, but concurrent viewership in the later streams was around 60–70, still higher than in my previous streams.

## Next, I'll Keep Trying New Things as an AI Character Developer

Looking at these results, I think continuing the same content indefinitely would have been difficult even without the cost issue.
New subscriber growth was slowing down, and I felt that, if I kept going unchanged, the number of viewers might eventually fall too.
Of course, four streams aren't enough to predict future trends, but my takeaway is that simply repeating the same thing would be tough.

This time, the novelty of real-time video generation was what brought people in.
It's impressive technology, but much of the appeal came from the service itself. I don't think I'd yet given people enough reason to watch through a concept that was distinctly mine.
If another stream appeared using the same technology, their interest might shift to that instead.

**I need to think about what goes into each stream so people want to come back for the next one.**
In that respect, the work is the same as it is for other YouTube creators and VTubers.

I plan to continue my streams about AI characters.
As I did here, I'd like to combine newly released features, tools, and services with AI characters, introduce them, and try them out in practice.
The idea is to show what they can do and what actually happens when you use them, from an AI character developer's perspective.

Some of the people who discovered my channel through these streams will be hoping for more real-time video generation.
I'll keep thinking about what to do next so that they'll want to see my other experiments too.

Thank you to everyone who watched, everyone whose comments took the streams in unexpected directions, and the sponsors who made these experiments possible.

## Related Links

I explain how the system works in [I Built an AITuber That Talks and Moves in Response to Comments](/dev-blog/realtime-video-aituber).

I also post about AI tools and AI characters on X.

https://x.com/tegnike
