import { GalleryModalProvider } from '../context/GalleryModalContext'
import { GalleryModal } from './GalleryModal'

type Props = {
  children: string | JSX.Element | JSX.Element[];
  title?: string;
  currentPath: string;
}

export function Layout({ children, title = 'My Portfolio & Blog', currentPath }: Props) {
  const getLinkClass = (path: string, isBlog = false) => {
    const baseClass = "transition-colors";
    const clean = currentPath.split(/[?#]/)[0].replace(/\/$/, '');
    const isActive = isBlog 
      ? clean === path || clean.startsWith(`${path}/`)
      : clean === path;
    return isActive ? `${baseClass} text-blue-300` : `${baseClass} hover:text-blue-300`;
  };

  return (
    <GalleryModalProvider>
      <header className="border-b border-transparent fixed top-0 left-0 right-0 z-10 bg-gray-900">
        <nav className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-xl font-bold">
              <a href="/" className="transition-colors">
                Nike's Portfolio
              </a>
            </h1>
            <ul className="flex gap-6 text-white">
              <li><a href="/" className={getLinkClass('')}>Gallery</a></li>
              <li><a href="/blog" className={getLinkClass('/blog', true)}>Blog</a></li>
              <li><a href="/about" className={getLinkClass('/about')}>About</a></li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8 pt-24">
        {children}
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-4 text-center text-gray-600">
          © 2025 nikechan
        </div>
      </footer>

      <GalleryModal />

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    </GalleryModalProvider>
  )
}
