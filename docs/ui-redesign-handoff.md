# UI Redesign Handoff

Last updated: 2026-05-26

This document summarizes the ongoing nikechan-blog UI redesign work so future work can continue inside this repository without depending on notes from the nikechan repository.

## Goal

The site is being redesigned around the newer AI Nike-chan visual direction:

- Bright character palette: yellow, pink, cyan, purple, dark ink.
- Strong black outlines.
- Clear separation between clickable buttons and non-clickable surfaces.
- Character-first layouts with larger artwork and fewer generic glass/gradient patterns.

The current design direction intentionally moves away from the older soft glassmorphism, purple text accents, rounded pills, gradient checks, and generic shadow-heavy cards.

## Core UI Rules

- Use black drop shadows only for buttons and clickable elements.
- Non-clickable content surfaces should use tab/surface style instead of button-like shadows.
- Do not nest many shadowed elements inside shadowed containers.
- Links that behave like buttons should look like buttons: black border, white background, black shadow, pressed hover.
- Text links inside prose should stay inline links, not button components.
- Page content width should align with the header shell width via `site-shell` / `--site-shell`.
- On mobile, top-page content sections use `px-2 sm:px-6` so shadowed elements do not visually drift right.

## Main Files

- `src/styles/globals.css`
  Main design system and page-specific overrides.
- `src/components/Layout.tsx`
  Header and navigation.
- `src/components/AboutPresence.tsx`
  `/about` page.
- `src/components/CharacterDetail.tsx`
  Shared character detail page layout.
- `src/components/CharacterList.tsx`
  Character index page.
- `src/components/lp/*`
  Top page sections.
- `src/components/AiCharacterNews.tsx`
  AI character news page.
- `src/components/News.tsx`
  News page.
- `src/components/DevBlog.tsx`, `src/components/TechBlog.tsx`, `src/components/PostDetail.tsx`
  Blog/devblog/article pages.
- `src/components/Tutorial.tsx`, `src/components/License.tsx`, `src/components/Gallery.tsx`, `src/components/FanGallery.tsx`
  Tutorial, guideline, gallery pages.

## Top Page Current State

Top page sections are in `src/components/lp/`.

Recent decisions:

- Hero no longer shows the text `AIニケちゃん`; it is image-only.
- The greeting is shown as plain text with Japanese corner quotes:
  `『こんにちは、私の名前はニケです。あなたの名前は?』`
- The greeting no longer uses a speech-bubble/boxed style.
- On mobile, the About section illustration is placed directly under the greeting.
- All main top-page sections now use `px-2 sm:px-6`:
  - `AboutSection`
  - `NewsSection`
  - `LicenseSection`
  - `GallerySection`
  - `SocialLinksSection`
  - `SupportSection`
  - `ContactSupportSection`

### SNS And Contact Links

SNS cards and final contact links are links, so they should not use tab-style surfaces.

Current intended style:

- White button card.
- Black border.
- Black shadow.
- Pressed hover.
- No colored left tab stripe.

Mobile shadow alignment is handled with:

```css
.home-social-card,
.home-contact-link-card {
  width: calc(100% - 5px);
  justify-self: start;
}
```

This compensates for the 5px right/bottom button shadow so the visual left/right margins look equal.

### Generative AI Section

`src/components/lp/LicenseSection.tsx` was redesigned from the old LP style.

Current intended style:

- Section title uses `home-section-title`.
- Content uses `glass-panel home-license-panel`.
- Old purple heading, rounded pill buttons, gradient check icons, and image shadows were removed.
- CTA uses `design-action-button`.
- Example heading text:
  - Japanese: `リファレンス画像から生成する`
  - English: `Generate from a reference image`
- The i2i example images use a vertical frame and `object-fit: contain`:

```css
.home-license-example img {
  aspect-ratio: 4 / 5;
  object-fit: contain;
}
```

This avoids cutting off the character's head or feet.

## About Page Direction

The `/about` page is the design reference for the overall redesign.

Key direction:

- Hero is strong and character-focused.
- Avoid extra small labels in the hero that do not add meaning.
- The English vertical text on the right should sit away from the page edge.
- Non-clickable surfaces should avoid black button shadows.
- Link groups like `WHERE SHE APPEARS` should use button/link treatment when the whole item is clickable.

Recent removed items:

- `また会えるAIキャラクター。` final punctuation was removed.
- Hero mini-tags like `CONVERSATION`, `MEMORY` were removed.
- `ai-about-kicker` and `ai-about-nameplate` were removed.

## Character Pages

Character pages should follow the `/about` hero feeling:

- Main name where `/about` has its main phrase.
- Large vertical English name near the right side, not too close to the viewport edge.
- Catchphrase/line where `/about` has its descriptive sentence.
- Character artwork should be large but not clipped by the header.
- Vertical English alignment should be consistent across characters.

Character detail pages had several hero layout adjustments. If adjusting again, verify:

- Character top is not hidden behind header.
- There is not too much empty space above character art.
- Full body is visible where the asset allows it.
- Text does not overlap character art.

Profile/history/reference/support sections should use `CharacterSectionHeading` style rather than ad hoc headings.

## AI Character News Page

The AI character news card title should be plain black bold text.

A previous issue happened because this generic rule affected the title:

```css
.character-page .glass-panel > h3
```

The page now overrides `.character-page.ai-news-redesign .ai-news-card h3` to remove the inherited tag-like h3 styling:

- `display: block`
- `border: 0`
- `background: transparent`
- `padding: 0`
- black bold title sizing

Keep this override if the generic character page panel heading rule remains.

Other AI news decisions:

- News title is not a link.
- Title has no button.
- Comment bubble has no shadow.
- Comment triangle should be white, not purple.
- Individual news cards should not lift/move on hover unless the card itself is clickable.
- `記事を読む` remains the link button.

## News, Blog, Gallery, Tutorial, Guideline

General direction applied across these pages:

- Clickable gallery/devblog/blog cards use pressed button-like hover, not float-up hover.
- Gallery image hover should not zoom the artwork.
- Current page nav/toggle buttons should look pressed/active and should not animate on hover.
- Tutorial inserted images should not have drop shadows.
- Guideline prose links should not become buttons.
- Guideline list markers must remain visible.
- Purple inline accents should be avoided where cyan/teal reads better with the new design.

## Header

Header was updated to match the new bright style:

- Yellow background.
- Logo is not rotated.
- Logo shadow is restrained.
- Active nav `::after` indicators are removed.
- Mobile hamburger selected items should not use the old after underline.

## Common Gotchas

### Dev Server i18n Cache

After editing JSON locale files under `src/i18n/locales`, the dev server sometimes keeps old translations in memory even after browser reload.

If text does not update in browser but source is correct, restart `npm run dev`.

### Build Warnings

`npm run build` currently succeeds but emits repeated warnings from `framer-motion` / `motion`:

```text
Module level directives cause errors when bundled, "use client" ... was ignored.
```

These warnings are existing build noise, not introduced by the current redesign work.

### Screenshots

Temporary verification screenshots have been saved under `tmp/`. They are intentionally not part of source and should not be committed unless explicitly needed.

Useful recent screenshot names:

- `tmp/home-license-reference-contain-desktop.png`
- `tmp/ai-news-title-size.png`
- `tmp/home-about-px2-mobile.png`
- `tmp/home-mobile-social-spacing-v2.png`
- `tmp/home-mobile-contact-spacing.png`

## Verification Checklist

Before handing off or committing UI changes:

1. Run `npm run build`.
2. Open the affected route in `npm run dev`.
3. Check desktop and mobile widths.
4. Confirm button shadows do not make mobile layouts look right-shifted.
5. Confirm non-clickable panels do not look like buttons.
6. Confirm artwork is not clipped unless intentionally cropped.
7. Confirm headings are not inheriting generic tag/pill styles unexpectedly.

## Current Dev URL

During the current work, the dev server was run at:

```text
http://localhost:5173/
```

