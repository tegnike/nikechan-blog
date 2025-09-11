import { GalleryModalProvider } from '../context/GalleryModalContext'
import { GalleryModal } from './GalleryModal'
import { motion } from "motion/react"
// Removed Sparkles icon in favor of a static logo image

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
    return isActive 
      ? `${baseClass} text-purple-600 font-semibold` 
      : `${baseClass} text-gray-700 hover:text-purple-600`;
  };
  return (
    <GalleryModalProvider>
      <header 
        className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 border-b border-purple-200/50"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10"></div>
        <div className="container relative flex h-20 items-center justify-between px-6 lg:px-8 mx-auto">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <a href="/" className="inline-flex items-center" aria-label="Nike Chan - Official Website">
              <img 
                src="/images/logs/logo_with_frame_and_shadow.png" 
                alt="Nike Chan Logo" 
                className="h-14 md:h-16 w-auto rounded-2xl"
                decoding="async"
                loading="eager"
              />
            </a>
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: "Home", path: "/" },
              { name: "Gallery", path: "/gallery" },
              { name: "License", path: "/license" },
              { name: "Developer", path: "/dev" }
            ].map((item, index) => (
              <a 
                key={item.name}
                href={item.path}
                className={`relative px-4 py-2 font-medium transition-colors duration-300 ${getLinkClass(item.path, item.name === "Log" || item.name === "Gallery")}`}
              >
                <span className="relative z-10">{item.name}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg opacity-0"
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
              </a>
            ))}
          </nav>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mr-2 md:mr-0 md:hidden"
          >
            <button className="bg-white/50 border border-purple-200 hover:bg-purple-50 px-4 py-2 rounded-lg text-sm font-medium">
              Menu
            </button>
          </motion.div>
        </div>
      </header>

      {children}

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
