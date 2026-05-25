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

  // 言語パラメータを保持したURLを生成するヘルパー関数
  const addLangParam = (path: string) => {
    if (locale === 'ja') return path // デフォルトが日本語の場合はパラメータ不要
    return `${path}?lang=${locale}`
  }

  const getLinkClass = (path: string, isBlog = false) => {
    const clean = currentPath.split(/[?#]/)[0].replace(/\/$/, '');
    const isActive = isBlog
      ? clean === path || clean.startsWith(`${path}/`)
      : clean === path;
    return isActive ? 'site-nav-link--active' : '';
  };
  const isOtherActive = ["/news", "/ai-character-news", "/developer", "/dev_blog"].some((p) => {
    const clean = currentPath.split(/[?#]/)[0].replace(/\/$/, '');
    return clean === p || clean.startsWith(`${p}/`)
  })
  const aiCharacterNewsLabel = locale === 'ja' ? 'AIキャラニュース' : 'AI Character News'

  return (
    <GalleryModalProvider>
      <header className={`site-header ${currentPath.split(/[?#]/)[0].replace(/\/$/, '') === '/about' ? 'site-header--about' : ''}`}>
        <div className="site-header__pattern" aria-hidden="true"></div>
        <div className="site-header__inner">
          <motion.div
            className="site-header__brand"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <a href={addLangParam("/")} className="site-header__logo" aria-label="Nike Chan - Official Website">
              <img
                src="/images/logos/logo_with_frame_and_shadow.png"
                alt="Nike Chan Logo"
                decoding="async"
                loading="eager"
              />
            </a>
          </motion.div>

          <nav className="site-nav">
            {/* About */}
            <a
              href={addLangParam("/about")}
              className={`site-nav-link ${getLinkClass("/about")}`}
            >
              {t('navigation:about')}
            </a>

            {/* Character */}
            <a
              href={addLangParam("/characters")}
              className={`site-nav-link ${getLinkClass("/characters", true)}`}
            >
              {t('navigation:character')}
            </a>

            {/* Tutorial */}
            <a
              href={addLangParam("/tutorial")}
              className={`site-nav-link ${getLinkClass("/tutorial", true)}`}
            >
              {t('navigation:tutorial')}
            </a>

            {/* Gallery (covers /gallery/*) */}
            <a
              href={addLangParam("/gallery")}
              className={`site-nav-link ${getLinkClass("/gallery", true)}`}
            >
              {t('navigation:gallery')}
            </a>

            {/* Guidelines (covers /guidelines/*) */}
            <a
              href={addLangParam("/guidelines")}
              className={`site-nav-link ${getLinkClass("/guidelines", true)}`}
            >
              {t('navigation:guidelines')}
            </a>

            {/* Other dropdown: Developer / Blog (click toggle) */}
            <div className="relative">
              <button
                id="other-menu-trigger"
                aria-haspopup="menu"
                aria-expanded={isOtherActive ? 'true' : 'false'}
                className={`site-nav-link site-nav-link--button ${isOtherActive ? 'site-nav-link--active' : ''}`}
                type="button"
              >
                {t('navigation:other')}
              </button>
              <div
                id="other-menu"
                role="menu"
                aria-labelledby="other-menu-trigger"
                className="site-nav-menu hidden"
              >
                <a href={addLangParam("/news")} role="menuitem" className={getLinkClass('/news', true)}>{t('navigation:news')}</a>
                <a href={addLangParam("/ai-character-news")} role="menuitem" className={getLinkClass('/ai-character-news', true)}>{aiCharacterNewsLabel}</a>
                <a href={addLangParam("/developer")} role="menuitem" className={getLinkClass('/developer', true)}>{t('navigation:developer')}</a>
                <a href={addLangParam("/dev_blog")} role="menuitem" className={getLinkClass('/dev_blog', true)}>{t('navigation:devBlog')}</a>
              </div>
            </div>

            {/* Language Switcher */}
            <button
              id="language-switcher"
              data-current-locale={locale}
              className="site-header__lang"
              aria-label={`Current language: ${locale === 'ja' ? 'Japanese' : 'English'}. Click to switch to ${locale === 'ja' ? 'English' : 'Japanese'}`}
            >
              <Languages className="h-5 w-5" />
              <span className="text-sm">{locale === 'ja' ? 'JA' : 'EN'}</span>
            </button>
          </nav>

          <div className="site-header__mobile-actions">
            {/* Mobile Language Switcher */}
            <button
              id="mobile-language-switcher"
              data-current-locale={locale}
              className="site-header__mobile-button"
              aria-label={`Current language: ${locale === 'ja' ? 'Japanese' : 'English'}. Click to switch to ${locale === 'ja' ? 'English' : 'Japanese'}`}
            >
              <Languages className="h-4 w-4" />
              <span>{locale === 'ja' ? 'JA' : 'EN'}</span>
            </button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button id="mobile-menu-button" aria-controls="mobile-menu" aria-expanded="false" className="site-header__mobile-button">
                {t('navigation:menu')}
              </button>
            </motion.div>
          </div>

          {/* Mobile dropdown menu */}
          <div
            id="mobile-menu"
            className="site-mobile-menu hidden"
          >
            <div className="site-mobile-menu__panel">
              <a href={addLangParam("/")} className={`block px-4 py-3 ${getLinkClass('/')}`}>{t('navigation:home')}</a>
              <a href={addLangParam("/about")} className={`block px-4 py-3 ${getLinkClass('/about')}`}>{t('navigation:about')}</a>
              <a href={addLangParam("/characters")} className={`block px-4 py-3 ${getLinkClass('/characters', true)}`}>{t('navigation:character')}</a>
              <a href={addLangParam("/gallery")} className={`block px-4 py-3 ${getLinkClass('/gallery', true)}`}>{t('navigation:gallery')}</a>
              <a href={addLangParam("/guidelines")} className={`block px-4 py-3 ${getLinkClass('/guidelines', true)}`}>{t('navigation:guidelines')}</a>
              <a href={addLangParam("/tutorial")} className={`block px-4 py-3 ${getLinkClass('/tutorial', true)}`}>{t('navigation:tutorial')}</a>
              <a href={addLangParam("/news")} className={`block px-4 py-3 ${getLinkClass('/news', true)}`}>{t('navigation:news')}</a>
              <a href={addLangParam("/ai-character-news")} className={`block px-4 py-3 ${getLinkClass('/ai-character-news', true)}`}>{aiCharacterNewsLabel}</a>
              <a href={addLangParam("/developer")} className={`block px-4 py-3 ${getLinkClass('/developer', true)}`}>{t('navigation:developer')}</a>
              <a href={addLangParam("/dev_blog")} className={`block px-4 py-3 ${getLinkClass('/dev_blog', true)}`}>{t('navigation:devBlog')}</a>
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
