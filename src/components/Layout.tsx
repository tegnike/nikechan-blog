type Props = {
  children: string | JSX.Element | JSX.Element[];
  title?: string;
}

export function Layout({ children, title = 'My Portfolio & Blog' }: Props) {
  return (
    <>
      <header className="border-b border-transparent absolute top-0 left-0 right-0 z-10">
        <nav className="container mx-auto px-4 py-6">
          <ul className="flex gap-6 text-white">
            <li><a href="/" className="hover:text-blue-300 transition-colors">Gallery</a></li>
            <li><a href="/blog" className="hover:text-blue-300 transition-colors">Blog</a></li>
            <li><a href="/works" className="hover:text-blue-300 transition-colors">Works</a></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-4 text-center text-gray-600">
          © 2024 nike
        </div>
      </footer>

      <script src="/static/js/main.js"></script>
    </>
  )
}
