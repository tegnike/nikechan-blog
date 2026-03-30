---
name: translate-post
description: >
  Translate Japanese blog posts (content/posts/*.md) into natural English, creating -en suffixed files.
  Use this skill whenever the user asks to translate articles, says "記事を翻訳して", "英語にして",
  "translate article", "translate to English", "翻訳して", "英訳して", "English version作って",
  or mentions wanting English versions of blog posts. Also trigger when the user discusses
  i18n/localization of blog content or asks about making posts available in English.
---

# Translate Blog Post (JA → EN)

Translate Japanese Markdown blog posts into natural, engaging English. The output is a new `-en` suffixed file that the blog system automatically serves to English-locale users.

## How It Works

This project (nikechan-blog) filters blog posts by slug suffix:
- `content/posts/foo.md` → Japanese (shown when locale is `ja`)
- `content/posts/foo-en.md` → English (shown when locale is `en`)

No frontmatter `locale` field is needed — the `-en` suffix in the filename is the only signal.

## Workflow

1. **Identify target posts.** If the user specifies a file, use that. Otherwise, list `content/posts/*.md` excluding any that already end in `-en.md`, and ask which to translate. If no untranslated posts remain, tell the user.

2. **Read the source post** in full.

3. **Translate** following the rules below.

4. **Write the translated file** as `content/posts/<slug>-en.md`.

5. **Remind the user** to verify at `/dev_blog?lang=en` (with the dev server running).

If multiple posts need translating, use parallel subagents — one per post — to translate them concurrently.

## Translation Rules

### Preserve Exactly (Do NOT Translate)
- All image paths (`/static/images/...`)
- All URLs and links (both href and display text when it's a URL)
- @mentions (`@ai_nikechan`, `@cumulo_autumn`, etc.)
- Proper nouns: character names, tool/product names, tech terms
  - "AIニケちゃん" → "AI Nike-chan", "ニケ" → "Nike" (the author)
  - OpenClaw, AITuberKit, llama.cpp, Claude Code, etc.
- Code blocks and inline code
- Markdown formatting (headings, bold, lists, image alt text structure)
- The `date` field in frontmatter
- The `thumbnail` path (shared with the Japanese version)

### Translate
- **Frontmatter**: `title`, `tags`, `description` — into natural English
- **Body text**: all prose, headings, image alt text descriptions
- **Tone**: match the original — if it's casual and humorous, keep it casual and humorous in English. If persuasive and encouraging, maintain that energy.

### Cultural Adaptation
Japanese internet culture and slang often has no direct English equivalent. Adapt these so English readers understand the humor without losing the spirit:

| Japanese | English Approach |
|----------|-----------------|
| RTA (リアルタイムアタック) | "speedrun" |
| NTR (寝取られ) | Explain the concept directly (e.g., "being cuckolded by my own AI") |
| ザル / ザルシステム | "sieve" / "full of holes" |
| ガバガバ | "incredibly permissive" / "wide open" |
| 〜先生 (honorific) | Keep as "-sensei" when the community would recognize it (e.g., VTuber/anime space) |
| 草 / w | Convey humor through English phrasing rather than translating the laugh marker |

General principles:
- If a joke relies on Japanese wordplay that can't transfer, replace it with an English joke that lands the same emotional beat.
- When both yen and dollar amounts are present, keep only the dollar amount for English readers (e.g., drop "約120億円" when "$75 million" is already there).
- Don't over-explain cultural references — a light touch is better. If one parenthetical is enough, use that.

### Quality Checklist
Before saving the file, verify:
- [ ] Frontmatter is valid YAML with translated title/tags/description
- [ ] All image paths and URLs are unchanged from the source
- [ ] No Japanese text remains (except in proper nouns or intentional romanization)
- [ ] The file line count is roughly similar to the original (translation shouldn't drastically expand or shrink the content)
- [ ] The slug ends with `-en` (e.g., `my-post-en.md`)
