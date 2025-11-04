import { GalleryModalProvider } from '../context/GalleryModalContext'
import { GalleryModal } from './GalleryModal'
import { motion } from "motion/react"
import { getT, type Locale } from '../i18n/config'
import { Languages } from 'lucide-react'
// Removed Sparkles icon in favor of a static logo image

type Props = {
  children: string | JSX.Element | JSX.Element[];
  title?: string;
  currentPath: string;
  locale?: Locale;
}

export function Layout({ children, title = 'My Portfolio & Blog', currentPath, locale = 'ja' }: Props) {
  const t = getT(locale)

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
  const isOtherActive = ["/developer", "/dev_blog"].some((p) => {
    const clean = currentPath.split(/[?#]/)[0].replace(/\/$/, '');
    return clean === p || clean.startsWith(`${p}/`)
  })

  // Language switcher function
  const toggleLanguage = () => {
    const url = new URL(window.location.href)
    const newLocale = locale === 'ja' ? 'en' : 'ja'
    url.searchParams.set('lang', newLocale)
    window.location.href = url.toString()
  }

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
                src="/images/logos/logo_with_frame_and_shadow.png"
                alt="Nike Chan Logo"
                className="h-14 md:h-16 w-auto rounded-2xl"
                decoding="async"
                loading="eager"
              />
            </a>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-4">
            {/* About */}
            <a
              href="/about"
              className={`relative px-4 py-2 font-medium transition-colors duration-300 ${getLinkClass("/about")}`}
            >
              <span className="relative z-10">{t('navigation:about')}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg opacity-0"
                whileHover={{ opacity: 1, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </a>

            {/* Tutorial */}
            <a
              href="/tutorial"
              className={`relative px-4 py-2 font-medium transition-colors duration-300 ${getLinkClass("/tutorial", true)}`}
            >
              <span className="relative z-10">{t('navigation:tutorial')}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg opacity-0"
                whileHover={{ opacity: 1, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </a>

            {/* Gallery (covers /gallery/*) */}
            <a
              href="/gallery"
              className={`relative px-4 py-2 font-medium transition-colors duration-300 ${getLinkClass("/gallery", true)}`}
            >
              <span className="relative z-10">{t('navigation:gallery')}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg opacity-0"
                whileHover={{ opacity: 1, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </a>

            {/* Guidelines (covers /guidelines/*) */}
            <a
              href="/guidelines"
              className={`relative px-4 py-2 font-medium transition-colors duration-300 ${getLinkClass("/guidelines", true)}`}
            >
              <span className="relative z-10">{t('navigation:guidelines')}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg opacity-0"
                whileHover={{ opacity: 1, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </a>

            {/* Other dropdown: Developer / Blog (click toggle) */}
            <div className="relative">
              <button
                id="other-menu-trigger"
                aria-haspopup="menu"
                aria-expanded={isOtherActive ? 'true' : 'false'}
                className={`relative px-4 py-2 font-medium select-none transition-colors duration-300 ${isOtherActive ? 'text-purple-600 font-semibold' : 'text-gray-700 hover:text-purple-600'}`}
                type="button"
              >
                <span className="relative z-10">{t('navigation:other')}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg opacity-0"
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
              </button>
              <div
                id="other-menu"
                role="menu"
                aria-labelledby="other-menu-trigger"
                className="absolute left-0 mt-2 w-44 rounded-lg border bg-white shadow-lg hidden"
              >
                <a href="/developer" role="menuitem" className={`block px-4 py-2 text-sm ${getLinkClass('/developer', true)}`}>{t('navigation:developer')}</a>
                <a href="/dev_blog" role="menuitem" className={`block px-4 py-2 text-sm ${getLinkClass('/dev_blog', true)}`}>{t('navigation:devBlog')}</a>
              </div>
            </div>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="relative px-3 py-2 font-medium transition-colors duration-300 text-gray-700 hover:text-purple-600 inline-flex items-center gap-2"
              aria-label={`Switch to ${locale === 'ja' ? 'English' : 'Japanese'}`}
            >
              <Languages className="h-5 w-5" />
              <span className="text-sm">{locale === 'ja' ? 'EN' : 'JA'}</span>
            </button>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-2 text-sm font-medium border border-purple-200 hover:bg-purple-50 rounded-lg inline-flex items-center gap-1.5"
              aria-label={`Switch to ${locale === 'ja' ? 'English' : 'Japanese'}`}
            >
              <Languages className="h-4 w-4" />
              <span>{locale === 'ja' ? 'EN' : 'JA'}</span>
            </button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button id="mobile-menu-button" aria-controls="mobile-menu" aria-expanded="false" className="bg-white/50 border border-purple-200 hover:bg-purple-50 px-4 py-2 rounded-lg text-sm font-medium">
                {t('navigation:menu')}
              </button>
            </motion.div>
          </div>

          {/* Mobile dropdown menu */}
          <div
            id="mobile-menu"
            className="md:hidden absolute left-0 right-0 top-full mt-2 px-4 hidden"
          >
            <div className="rounded-xl border bg-white shadow-lg divide-y">
              <a href="/" className={`block px-4 py-3 ${getLinkClass('/')}`}>{t('navigation:home')}</a>
              <a href="/about" className={`block px-4 py-3 ${getLinkClass('/about')}`}>{t('navigation:about')}</a>
              <a href="/gallery" className={`block px-4 py-3 ${getLinkClass('/gallery', true)}`}>{t('navigation:gallery')}</a>
              <a href="/guidelines" className={`block px-4 py-3 ${getLinkClass('/guidelines', true)}`}>{t('navigation:guidelines')}</a>
              <a href="/tutorial" className={`block px-4 py-3 ${getLinkClass('/tutorial', true)}`}>{t('navigation:tutorial')}</a>
              <a href="/developer" className={`block px-4 py-3 ${getLinkClass('/developer', true)}`}>{t('navigation:developer')}</a>
              <a href="/dev_blog" className={`block px-4 py-3 ${getLinkClass('/dev_blog', true)}`}>{t('navigation:devBlog')}</a>
            </div>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t">
        <div className="container mx-auto px-4 py-4 text-center text-gray-600">
          {t('common:copyright')}
        </div>
      </footer>

      <GalleryModal />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    </GalleryModalProvider>
  )
}
