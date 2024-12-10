import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <title>{title || 'Nike Portfolio'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="My portfolio and blog site" />
        <link href="/static/styles/globals.css" rel="stylesheet" />
      </head>
      <body class="bg-white dark:bg-gray-900">
        {children}
        <script src="/static/js/main.js"></script>
      </body>
    </html>
  )
})
