type Props = {
  children: string | JSX.Element | JSX.Element[];
  title?: string;
}

export function Layout({ children, title = 'My Portfolio & Blog' }: Props) {
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="My portfolio and blog site" />
        <link href="/static/styles/globals.css" rel="stylesheet" />
        <title>{title}</title>
      </head>
      <body class="bg-white dark:bg-gray-900">
        <header class="border-b">
          <nav class="container mx-auto px-4 py-4">
            <ul class="flex gap-4">
              <li><a href="/" class="hover:text-blue-500">Home</a></li>
              <li><a href="/blog" class="hover:text-blue-500">Blog</a></li>
              <li><a href="/works" class="hover:text-blue-500">Works</a></li>
            </ul>
          </nav>
        </header>

        <main class="container mx-auto px-4 py-8">
          {children}
        </main>

        <footer class="border-t">
          <div class="container mx-auto px-4 py-4 text-center text-gray-600">
            © 2024 Your Name
          </div>
        </footer>
      </body>
    </html>
  )
}
