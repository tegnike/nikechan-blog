import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <title>{title || 'Nike Portfolio'}</title>
        <link href="/static/styles/globals.css" rel="stylesheet" />
      </head>
      <body class="bg-white dark:bg-gray-900">
        {children}
        <script src="/static/js/main.js"></script>
      </body>
    </html>
  )
})
