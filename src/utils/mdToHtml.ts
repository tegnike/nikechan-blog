function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function applyInlineTransforms(str: string): string {
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
  // italics *text* or _text_
  str = str.replace(/(\*|_)([^*_].*?)\1/g, '<em>$2</em>')
  return str
}

export function mdToHtml(md: string): string {
  const lines = md.replace(/\r\n?/g, '\n').split('\n')
  const out: string[] = []
  let i = 0
  while (i < lines.length) {
    let line = lines[i]

    // code block ```lang
    const codeStart = line.match(/^```(\w+)?\s*$/)
    if (codeStart) {
      const lang = codeStart[1] || ''
      i++
      const code: string[] = []
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        code.push(lines[i])
        i++
      }
      // skip closing ```
      if (i < lines.length) i++
      out.push(`<pre><code${lang ? ` class="language-${lang}"` : ''}>${escapeHtml(code.join('\n'))}</code></pre>`) 
      continue
    }

    // horizontal rule
    if (/^(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      out.push('<hr />')
      i++
      continue
    }

    // blockquote
    if (/^>\s?/.test(line)) {
      const buf: string[] = []
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ''))
        i++
      }
      const inner = mdToHtml(buf.join('\n'))
      out.push(`<blockquote>${inner}</blockquote>`)
      continue
    }

    // unordered list
    if (/^\s*[-*+]\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        const item = lines[i].replace(/^\s*[-*+]\s+/, '')
        const html = applyInlineTransforms(escapeHtml(item))
        items.push(`<li>${html}</li>`) 
        i++
      }
      out.push(`<ul>${items.join('')}</ul>`) 
      continue
    }

    // ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        const item = lines[i].replace(/^\s*\d+\.\s+/, '')
        const html = applyInlineTransforms(escapeHtml(item))
        items.push(`<li>${html}</li>`) 
        i++
      }
      out.push(`<ol>${items.join('')}</ol>`) 
      continue
    }

    // headings
    const m = line.match(/^(#{1,6})\s+(.+)\s*$/)
    if (m) {
      const level = m[1].length
      const text = applyInlineTransforms(escapeHtml(m[2]))
      out.push(`<h${level}>${text}</h${level}>`)
      i++
      continue
    }

    // blank line -> paragraph separator
    if (/^\s*$/.test(line)) {
      i++
      continue
    }

    // paragraph: collect until blank line or special block start
    const buf: string[] = [line]
    i++
    while (i < lines.length && !/^\s*$/.test(lines[i]) &&
           !/^```/.test(lines[i]) &&
           !/^\s*[-*+]/.test(lines[i]) &&
           !/^\s*\d+\./.test(lines[i]) &&
           !/^>\s?/.test(lines[i])) {
      buf.push(lines[i])
      i++
    }
    const text = applyInlineTransforms(escapeHtml(buf.join('\n')))
    out.push(`<p>${text}</p>`)
  }

  return out.join('\n')
}

