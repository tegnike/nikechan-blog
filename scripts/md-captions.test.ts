import { describe, expect, test } from 'bun:test'
import { mdToHtml } from '../src/utils/mdToHtml'

describe('media captions', () => {
  test('image caption is distinct from alt and outside a paragraph', () => {
    expect(mdToHtml('![代替テキスト](/sample.png "画面の説明")')).toBe('<figure class="media-figure"><img src="/sample.png" alt="代替テキスト" loading="lazy" decoding="async" /><figcaption>画面の説明</figcaption></figure>')
  })
  test('optimized image retains responsive sources', () => {
    const html = mdToHtml('![代替](/static/images/posts/example.png "最適化画像")')
    expect(html).toContain('src="/static/images/optimized/posts/example-420.webp"')
    expect(html).toContain('example-840.webp 840w')
    expect(html).toContain('<figcaption>最適化画像</figcaption>')
  })
  test('legacy media without captions keeps its markup', () => {
    expect(mdToHtml('![代替](/sample.png)')).toBe('<p><img src="/sample.png" alt="代替" loading="lazy" decoding="async" /></p>')
    expect(mdToHtml('/sample.mp4')).toBe('<div class="video-embed"><video src="/sample.mp4" controls playsinline preload="metadata"></video></div>')
  })
  for (const extension of ['mp4', 'webm', 'mov']) {
    test(extension + ' caption keeps native playback controls', () => {
      const html = mdToHtml('/sample.' + extension + ' "動画の説明"')
      expect(html).toStartWith('<figure class="media-figure"><div class="video-embed">')
      expect(html).toContain('controls playsinline preload="metadata"')
      expect(html).toEndWith('<figcaption>動画の説明</figcaption></figure>')
    })
  }
  test('empty captions do not create figures', () => {
    expect(mdToHtml('![alt](/sample.png " ")')).toBe(mdToHtml('![alt](/sample.png)'))
    expect(mdToHtml('/sample.mp4 ""')).toBe(mdToHtml('/sample.mp4'))
  })
  test('caption text is escaped once and never interpreted as markup', () => {
    const caption = String.raw`<script> & "quote" ' **bold** [link](url) ` + '`code`'
    const quoted = caption.replace(/"/g, '\\"')
    for (const md of ['![A&B <alt>](/sample.png "' + quoted + '")', '/sample.mp4 "' + quoted + '"']) {
      const html = mdToHtml(md)
      expect(html).toContain('<figcaption>&lt;script&gt; &amp; &quot;quote&quot; &#39; **bold** [link](url) `code`</figcaption>')
      expect(html).not.toContain('<script>')
      expect(html).not.toContain('&amp;lt;')
    }
    expect(mdToHtml('![A&B <alt>](/sample.png "caption")')).toContain('alt="A&amp;B &lt;alt&gt;"')
  })
  test('attribute injection is escaped', () => {
    expect(mdToHtml('![alt](/sample.png?x="onerror="alert "caption")')).toContain('src="/sample.png?x=&quot;onerror=&quot;alert"')
  })
  test('paragraph boundaries, quotes, lists and code fences', () => {
    const image = '![alt](/sample.png "caption")'
    expect(mdToHtml('Before\n' + image + '\nAfter')).toBe('<p>Before</p>\n' + mdToHtml(image) + '\n<p>After</p>')
    expect(mdToHtml('> ' + image)).toBe('<blockquote>' + mdToHtml(image) + '</blockquote>')
    expect(mdToHtml('- item\n  ' + image)).toContain('<li>item<figure')
    expect(mdToHtml('```md\n' + image + '\n```')).not.toContain('<figure')
  })
})
