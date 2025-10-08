const fs = require('fs');
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
function applyInlineTransforms(str) {
  str = str.replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, (_m, alt, src) => {
    return `<img src="${src}" alt="${alt}" />`
  })
  str = str.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, (_m, text, href) => {
    const isExternal = /^(https?:)?\/\//.test(href)
    const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
    return `<a href="${href}"${attrs}>${text}</a>`
  })
  str = str.replace(/`([^`]+)`/g, (_m, code) => `<code>${code}</code>`)
  str = str.replace(/(\*\*|__)(.+?)\1/g, '<strong>$2</strong>')
  str = str.replace(/(\*|_)([^*_].*?)\1/g, '<em>$2</em>')
  return str
}
function mdToHtml(md) {
  const lines = md.replace(/\r\n?/g, '\n').split('\n')
  const out = []
  function parseList(startIndex, ordered) {
    const markerRegex = ordered ? /^(\s*)(\d+)\.\s+(.*)$/ : /^(\s*)[-*+]\s+(.*)$/
    const baseMatch = lines[startIndex] && lines[startIndex].match(markerRegex)
    if (!baseMatch) {
      return { html: '', nextIndex: startIndex }
    }
    const baseIndent = baseMatch[1].length
    const tag = ordered ? 'ol' : 'ul'
    let index = startIndex
    const items = []
    while (index < lines.length) {
      const currentLine = lines[index]
      const currentMatch = currentLine.match(markerRegex)
      if (!currentMatch) break
      const indent = currentMatch[1].length
      if (indent < baseIndent) break
      const bodyLines = [currentMatch[3] ?? '']
      let cursor = index + 1
      while (cursor < lines.length) {
        const nextLine = lines[cursor]
        if (/^\s*$/.test(nextLine)) {
          bodyLines.push('')
          cursor++
          continue
        }
        const indentMatch = nextLine.match(/^(\s*)/)
        const nextIndent = indentMatch ? indentMatch[1].length : 0
        const unorderedMatch = nextLine.match(/^(\s*)[-*+]\s+/)
        const orderedMatch = nextLine.match(/^(\s*)\d+\.\s+/)
        const sameLevelUnordered = unorderedMatch && nextIndent === baseIndent
        const sameLevelOrdered = orderedMatch && nextIndent === baseIndent
        const startsNewItem =
          nextIndent < baseIndent ||
          (ordered && sameLevelOrdered) ||
          (!ordered && sameLevelUnordered) ||
          (!ordered && sameLevelOrdered) ||
          (ordered && sameLevelUnordered)
        if (startsNewItem) break
        const trimAmount = nextIndent > baseIndent ? Math.min(nextIndent, baseIndent + 2) : baseIndent
        bodyLines.push(nextLine.slice(trimAmount))
        cursor++
      }
      const innerMarkdown = bodyLines.join('\n')
      let innerHtml = ''
      if (innerMarkdown.trim().length > 0) {
        innerHtml = mdToHtml(innerMarkdown)
      }
      const trimmed = innerHtml.trim()
      let rendered = trimmed
      if (trimmed.startsWith('<p>') && trimmed.endsWith('</p>') && trimmed.indexOf('<p>', 3) === -1) {
        rendered = trimmed.slice(3, -4)
      }
      items.push(`<li>${rendered}</li>`)
      index = cursor
    }
    return { html: items.length ? `<${tag}>${items.join('')}</${tag}>` : '', nextIndex: index }
  }
  let i = 0
  while (i < lines.length) {
    let line = lines[i]
    const codeStart = line.match(/^```(\w+)?\s*$/)
    if (codeStart) {
      const lang = codeStart[1] || ''
      i++
      const code = []
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        code.push(lines[i])
        i++
      }
      if (i < lines.length) i++
      out.push(`<pre><code${lang ? ` class="language-${lang}"` : ''}>${escapeHtml(code.join('\n'))}</code></pre>`)
      continue
    }
    if (/^(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      out.push('<hr />')
      i++
      continue
    }
    if (/^>\s?/.test(line)) {
      const buf = []
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ''))
        i++
      }
      const inner = mdToHtml(buf.join('\n'))
      out.push(`<blockquote>${inner}</blockquote>`)
      continue
    }
    if (/^\s*[-*+]\s+/.test(line)) {
      const { html, nextIndex } = parseList(i, false)
      if (html) {
        out.push(html)
        i = nextIndex
        continue
      }
    }
    if (/^\s*\d+\.\s+/.test(line)) {
      const { html, nextIndex } = parseList(i, true)
      if (html) {
        out.push(html)
        i = nextIndex
        continue
      }
    }
    const headingMatch = line.match(/^(#{1,6})\s+(.+)\s*$/)
    if (headingMatch) {
      const level = headingMatch[1].length
      let headingContent = headingMatch[2].trim()
      let headingId = ''
      const idMatch = headingContent.match(/\s*{#([A-Za-z0-9\-_]+)}\s*$/)
      if (idMatch) {
        headingId = idMatch[1]
        headingContent = headingContent.replace(/\s*{#[A-Za-z0-9\-_]+}\s*$/, '').trim()
      }
      const text = applyInlineTransforms(escapeHtml(headingContent))
      const idAttr = headingId ? ` id="${headingId}"` : ''
      out.push(`<h${level}${idAttr}>${text}</h${level}>`)
      i++
      continue
    }
    if (/^\s*$/.test(line)) {
      i++
      continue
    }
    const buf = [line]
    i++
    while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^```/.test(lines[i]) && !/^\s*[-*+]\s+/.test(lines[i]) && !/^\s*\d+\.\s+/.test(lines[i]) && !/^>\s?/.test(lines[i])) {
      buf.push(lines[i])
      i++
    }
    const text = applyInlineTransforms(escapeHtml(buf.join('\n')))
    out.push(`<p>${text}</p>`)
  }
  return out.join('\n')
}
const md = fs.readFileSync('src/utils/guidelines/ai_generation_guideline.md', 'utf8')
console.log(mdToHtml(md))
