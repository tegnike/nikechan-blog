import { reactRenderer } from '@hono/react-renderer'
import type { ReactNode } from 'react'

interface BaseProps {
  children: ReactNode
  title?: string
}

export const renderer = reactRenderer<BaseProps>(({ children, title }: BaseProps) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <title>{title || 'Nike Portfolio'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="My portfolio and blog site" />
        <link href="/static/styles/globals.css" rel="stylesheet" />
        <link rel="icon" href="/static/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
      </head>
      <body className="bg-gray-900">
        {children}
        <script src="/static/js/main.js"></script>
      </body>
    </html>
  )
})
