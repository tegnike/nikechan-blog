function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function applyInlineTransforms(str: string): string {
  // images ![alt](src)
  str = str.replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, (_m, alt, src) => {
    return `<img src="${src}" alt="${alt}" />`
  })
  // links [text](url)
  str = str.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, (_m, text, href) => {
    const isExternal = /^(https?:)?\/\//.test(href)
    const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
    return `<a href="${href}"${attrs}>${text}</a>`
  })
  // inline code `code`
  str = str.replace(/`([^`]+)`/g, (_m, code) => `<code>${code}</code>`)
  // bold **text** or __text__
  str = str.replace(/(\*\*|__)(.+?)\1/g, '<strong>$2</strong>')
  // italics *text* (only asterisk, not underscore — underscore conflicts with HTML attributes like target="_blank")
  str = str.replace(/(?<!\*)\*(?!\*)([^*]+?)\*(?!\*)/g, '<em>$1</em>')
  return str
}

export type TocItem = {
  level: number
  text: string
  id: string
}

function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u3000-\u9fff\uff00-\uffef]+/g, '-')
    .replace(/^-|-$/g, '')
}

import type { OgpData } from './posts'

export function mdToHtml(md: string, ogpCache?: Record<string, OgpData>): string {
  const lines = md.replace(/\r\n?/g, '\n').split('\n')

  type Node =
    | { type: 'paragraph'; text: string }
    | { type: 'heading'; level: number; text: string; id?: string }
    | { type: 'hr' }
    | { type: 'code'; language: string; content: string }
    | { type: 'blockquote'; children: Node[] }
    | { type: 'list'; ordered: boolean; items: Array<{ text: string; children: Node[] }> }
    | { type: 'ogp-card'; url: string; data: OgpData }

  function parseBlocks(startIndex: number, indent: number): { nodes: Node[]; nextIndex: number } {
    const nodes: Node[] = []
    let i = startIndex

    const peek = (offset = 0) => lines[i + offset]

    const isBlank = (line: string | undefined) => !line || /^\s*$/.test(line)

    while (i < lines.length) {
      const line = lines[i]
      const leading = line.match(/^\s*/)?.[0].length ?? 0
      if (!isBlank(line) && leading < indent) break
      const content = line.slice(Math.min(indent, leading))

      if (isBlank(content)) {
        i++
        continue
      }

      const headingMatch = indent === 0 ? content.match(/^(#{1,6})\s+(.+)\s*$/) : null
      if (headingMatch) {
        const level = headingMatch[1].length
        let headingText = headingMatch[2].trim()
        let headingId: string | undefined
        const idMatch = headingText.match(/\s*\{#([A-Za-z0-9\-_]+)\}\s*$/)
        if (idMatch) {
          headingId = idMatch[1]
          headingText = headingText.replace(/\s*\{#[A-Za-z0-9\-_]+\}\s*$/, '').trim()
        }
        nodes.push({ type: 'heading', level, text: headingText, id: headingId })
        i++
        continue
      }

      const hrMatch = content.match(/^(?:-{3,}|\*{3,}|_{3,})\s*$/)
      if (hrMatch) {
        nodes.push({ type: 'hr' })
        i++
        continue
      }

      const codeMatch = content.match(/^```(\w+)?\s*$/)
      if (codeMatch) {
        const language = codeMatch[1] || ''
        i++
        const codeLines: string[] = []
        while (i < lines.length) {
          const codeLine = peek()
          if (codeLine === undefined) break
          const codeLeading = codeLine.match(/^\s*/)?.[0].length ?? 0
          const codeContent = codeLine.slice(Math.min(indent, codeLeading))
          if (/^```\s*$/.test(codeContent)) break
          codeLines.push(codeContent)
          i++
        }
        if (i < lines.length) i++
        nodes.push({ type: 'code', language, content: codeLines.join('\n') })
        continue
      }

      if (/^>\s?/.test(content)) {
        const quoteLines: string[] = []
        while (i < lines.length) {
          const quoteLine = peek()
          if (quoteLine === undefined) break
          const quoteLeading = quoteLine.match(/^\s*/)?.[0].length ?? 0
          const quoteContent = quoteLine.slice(Math.min(indent, quoteLeading))
          if (!/^>\s?/.test(quoteContent)) break
          quoteLines.push(quoteContent.replace(/^>\s?/, ''))
          i++
        }
        const { nodes: quoteNodes } = parseBlocksFromString(quoteLines.join('\n'))
        nodes.push({ type: 'blockquote', children: quoteNodes })
        continue
      }

      const unorderedMatch = content.match(/^[-*+]\s+/)
      const orderedMatch = content.match(/^\d+\.\s+/)
      if (unorderedMatch || orderedMatch) {
        const ordered = Boolean(orderedMatch)
        const items: Array<{ text: string; children: Node[] }> = []
        const itemRegex = ordered ? /^\d+\.\s+(.*)$/ : /^[-*+]\s+(.*)$/

        while (i < lines.length) {
          const raw = peek()
          if (raw === undefined) break
          if (!isBlank(raw)) {
            const rawLeading = raw.match(/^\s*/)?.[0].length ?? 0
            if (rawLeading < indent) break
          }

          const itemLine = raw?.slice(Math.min(indent, raw.match(/^\s*/)?.[0].length ?? 0)) ?? ''
          const match = itemLine.match(itemRegex)
          if (!match) break
          const itemText = match[1] ?? ''
          i++

          const { nodes: childNodes, nextIndex } = parseBlocks(i, indent + 2)
          i = nextIndex
          items.push({ text: itemText, children: childNodes })
        }

        nodes.push({ type: 'list', ordered, items })
        continue
      }

      // OGP card: [url](url) where text === href, or bare URL line
      if (ogpCache) {
        const linkMatch = content.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        const bareUrlMatch = content.match(/^(https?:\/\/\S+)$/)
        const ogpUrl = linkMatch && linkMatch[1] === linkMatch[2] ? linkMatch[1]
          : bareUrlMatch ? bareUrlMatch[1]
          : null
        if (ogpUrl && ogpCache[ogpUrl]) {
          nodes.push({ type: 'ogp-card', url: ogpUrl, data: ogpCache[ogpUrl] })
          i++
          continue
        }
      }

      // Paragraph
      const paragraphLines: string[] = [content]
      i++
      while (i < lines.length) {
        const nextLine = peek()
        if (nextLine === undefined) break
        const nextLeading = nextLine.match(/^\s*/)?.[0].length ?? 0
        const nextContent = nextLine.slice(Math.min(indent, nextLeading))
        if (
          nextLeading < indent ||
          /^\s*$/.test(nextContent) ||
          /^```/.test(nextContent) ||
          /^[-*+]\s+/.test(nextContent) ||
          /^\d+\.\s+/.test(nextContent) ||
          /^>\s?/.test(nextContent) ||
          (indent === 0 && /^#{1,6}\s+/.test(nextContent)) ||
          /^(?:-{3,}|\*{3,}|_{3,})\s*$/.test(nextContent)
        ) {
          break
        }
        paragraphLines.push(nextContent)
        i++
      }

      nodes.push({ type: 'paragraph', text: paragraphLines.join('\n') })
    }

    return { nodes, nextIndex: i }
  }

  function parseBlocksFromString(text: string): { nodes: Node[]; nextIndex: number } {
    const nestedLines = text.replace(/\r\n?/g, '\n').split('\n')
    const originalLines = [...lines]
    const originalText = lines.join('\n')

    lines.length = 0
    lines.push(...nestedLines)
    const result = parseBlocks(0, 0)
    lines.length = 0
    originalText.replace(/\r\n?/g, '\n').split('\n').forEach((l, idx) => (lines[idx] = l))
    return result
  }

  function renderNodes(nodes: Node[]): string {
    return nodes
      .map((node) => {
        switch (node.type) {
          case 'paragraph': {
            const text = applyInlineTransforms(escapeHtml(node.text))
              .replace(/\n/g, '<br />')
            return `<p>${text}</p>`
          }
          case 'heading': {
            const text = applyInlineTransforms(escapeHtml(node.text))
            const id = node.id || generateId(node.text)
            return `<h${node.level} id="${id}">${text}</h${node.level}>`
          }
          case 'hr':
            return '<hr />'
          case 'code': {
            const langLabel = node.language ? `<div class="code-lang">${node.language}</div>` : ''
            return `<div class="code-block">${langLabel}<button class="code-copy-btn" type="button">Copy</button><pre><code${node.language ? ` class="language-${node.language}"` : ''}>${escapeHtml(node.content)}</code></pre></div>`
          }
          case 'blockquote':
            return `<blockquote>${renderNodes(node.children)}</blockquote>`
          case 'list': {
            const tag = node.ordered ? 'ol' : 'ul'
            const items = node.items
              .map((item) => {
                const inline = item.text.trim().length
                  ? applyInlineTransforms(escapeHtml(item.text))
                  : ''
                const children = renderNodes(item.children)
                return `<li>${inline}${children}</li>`
              })
              .join('')
            return `<${tag}>${items}</${tag}>`
          }
          case 'ogp-card': {
            const { data } = node
            if (data.type === 'twitter-embed' && data.embedHtml) {
              return `<div class="twitter-embed">${data.embedHtml}</div>`
            }
            const domain = (() => {
              try { return new URL(data.url).hostname } catch { return data.url }
            })()
            const imageHtml = data.image
              ? `<div class="ogp-card-image"><img src="${escapeHtml(data.image)}" alt="" loading="lazy" /></div>`
              : ''
            return `<a href="${escapeHtml(data.url)}" target="_blank" rel="noopener noreferrer" class="ogp-card">${imageHtml}<div class="ogp-card-content"><div class="ogp-card-title">${escapeHtml(data.title)}</div>${data.description ? `<div class="ogp-card-description">${escapeHtml(data.description)}</div>` : ''}<div class="ogp-card-meta">${data.favicon ? `<img src="${escapeHtml(data.favicon)}" alt="" class="ogp-card-favicon" width="14" height="14" />` : ''}<span>${escapeHtml(domain)}</span></div></div></a>`
          }
        }
      })
      .join('\n')
  }

  const { nodes } = parseBlocks(0, 0)
  return renderNodes(nodes)
}

export function extractToc(md: string): TocItem[] {
  const toc: TocItem[] = []
  const lines = md.replace(/\r\n?/g, '\n').split('\n')
  let inCodeBlock = false

  for (const line of lines) {
    if (/^```/.test(line)) {
      inCodeBlock = !inCodeBlock
      continue
    }
    if (inCodeBlock) continue

    const match = line.match(/^(#{2,3})\s+(.+)\s*$/)
    if (match) {
      let text = match[2].trim()
      let id: string
      const idMatch = text.match(/\s*\{#([A-Za-z0-9\-_]+)\}\s*$/)
      if (idMatch) {
        id = idMatch[1]
        text = text.replace(/\s*\{#[A-Za-z0-9\-_]+\}\s*$/, '').trim()
      } else {
        id = generateId(text)
      }
      toc.push({ level: match[1].length, text, id })
    }
  }

  return toc
}
