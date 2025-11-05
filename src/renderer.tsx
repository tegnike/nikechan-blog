import { reactRenderer } from '@hono/react-renderer'
import type { ReactNode } from 'react'
import type { Locale } from './i18n/config'

interface BaseProps {
  children: ReactNode
  title?: string
  description?: string
  ogImage?: string
  ogType?: string
  canonicalUrl?: string
  keywords?: string
  structuredData?: object
  locale?: Locale
}

export const renderer = reactRenderer(({
  children,
  title,
  description,
  ogImage,
  ogType,
  canonicalUrl,
  keywords,
  structuredData,
  locale = 'ja'
}: BaseProps) => {
  const defaultTitle = locale === 'ja' ? 'NIKELOG - Nike Chan Official Portfolio' : 'NIKELOG - Nike Chan Official Portfolio'
  const finalTitle = title || defaultTitle
  const defaultDescription = locale === 'ja'
    ? 'Nike Chan（ニケちゃん）の公式ポートフォリオサイト。イラスト作品、ファンアート、活動記録、開発者向け情報を掲載。創作活動とAIニケちゃんプロジェクトの最新情報をお届けします。'
    : 'Official portfolio site of Nike Chan. Featuring illustrations, fan art, activity logs, and developer information. Latest updates on creative activities and AI Nike Chan projects.'
  const finalDescription = description || defaultDescription
  const siteUrl = 'https://nikechan.com'
  const defaultOgImage = `${siteUrl}/images/ogp/ogp-default.png`
  const finalOgImage = ogImage || defaultOgImage
  const finalCanonicalUrl = canonicalUrl || siteUrl
  const defaultKeywords = 'Nike Chan, ニケちゃん, AIニケちゃん, ポートフォリオ, イラスト, ファンアート, AI Art, Digital Art, Character Design, Blog'
  const finalKeywords = keywords || defaultKeywords
  const ogLocale = locale === 'ja' ? 'ja_JP' : 'en_US'
  const langCode = locale === 'ja' ? 'ja' : 'en'

  return (
    <html lang={langCode}>
      <head>
        <meta charSet="utf-8" />
        <title>{finalTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={finalDescription} />
        <meta name="keywords" content={finalKeywords} />
        <meta name="author" content="Nike Chan (nikechan)" />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* Canonical URL */}
        <link rel="canonical" href={finalCanonicalUrl} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={finalTitle} />
        <meta property="og:description" content={finalDescription} />
        <meta property="og:type" content={ogType || 'website'} />
        <meta property="og:url" content={finalCanonicalUrl} />
        <meta property="og:image" content={finalOgImage} />
        <meta property="og:image:alt" content="Nike Chan Logo" />
        <meta property="og:site_name" content="NIKELOG" />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:locale:alternate" content={locale === 'ja' ? 'en_US' : 'ja_JP'} />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={finalTitle} />
        <meta name="twitter:description" content={finalDescription} />
        <meta name="twitter:image" content={finalOgImage} />
        <meta name="twitter:creator" content="@nikechan_ai" />

        {/* Structured Data (JSON-LD) */}
        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        )}

        {/* Default Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "NIKELOG",
            "alternateName": "Nike Chan Portfolio",
            "url": siteUrl,
            "description": finalDescription,
            "inLanguage": langCode,
            "author": {
              "@type": "Person",
              "name": "Nike Chan",
              "url": siteUrl,
              "sameAs": [
                "https://twitter.com/nikechan_ai",
                "https://github.com/nikechan"
              ]
            }
          })}}
        />

        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />

        <link href="/static/styles/globals.css" rel="stylesheet" />
        <link rel="icon" href="/static/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Alternate languages for SEO */}
        <link rel="alternate" hrefLang="ja" href={finalCanonicalUrl} />
        <link rel="alternate" hrefLang="x-default" href={finalCanonicalUrl} />

        <script
          type="module"
          src={import.meta.env.PROD ? '/static/client.js' : '/src/client.tsx'}
        ></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js" defer></script>
      </head>
      <body className="">
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
})
