import { GalleryModalProvider } from '../context/GalleryModalContext'
import { GalleryModal } from './GalleryModal'
import { Languages } from 'lucide-react'
import { getT, type Locale } from '../i18n/config'
import { getOptimizedImageSources } from '../utils/imageOptimization'
// Removed Sparkles icon in favor of a static logo image

type Props = {
  children: string | JSX.Element | JSX.Element[];
  title?: string;
  currentPath: string;
  locale?: Locale;
}

export function Layout({ children, title = 'My Portfolio & Blog', currentPath, locale = 'ja' }: Props) {
  const t = getT(locale)
  const logoSources = getOptimizedImageSources('/images/logos/logo_with_frame_and_shadow.png')
  const footerLinks = [
    { href: '/privacy', label: locale === 'ja' ? 'プライバシーポリシー' : 'Privacy Policy' },
    { href: '/terms', label: locale === 'ja' ? '利用規約' : 'Terms of Use' },
    { href: '/guidelines', label: locale === 'ja' ? 'ガイドライン' : 'Guidelines' },
  ]

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
  const isOtherActive = ["/updates", "/ai-news", "/dev-blog", "/developer"].some((p) => {
    const clean = currentPath.split(/[?#]/)[0].replace(/\/$/, '');
    return clean === p || clean.startsWith(`${p}/`)
  })

  return (
    <GalleryModalProvider>
      <header className={`site-header ${currentPath.split(/[?#]/)[0].replace(/\/$/, '') === '/about' ? 'site-header--about' : ''}`}>
        <div className="site-header__pattern" aria-hidden="true"></div>
        <div className="site-header__inner">
          <div className="site-header__brand transition-transform duration-200 ease-out hover:scale-105">
            <a href={addLangParam("/")} className="site-header__logo" aria-label="Nike Chan - Official Website">
              <img
                src={logoSources?.src ?? "/images/logos/logo_with_frame_and_shadow.png"}
                srcSet={logoSources?.srcSet}
                sizes="151px"
                alt="Nike Chan Logo"
                decoding="async"
                loading="eager"
              />
            </a>
          </div>

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
              href={addLangParam("/tutorials")}
              className={`site-nav-link ${getLinkClass("/tutorials", true)}`}
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
                <a href={addLangParam("/updates")} role="menuitem" className={getLinkClass('/updates', true)}>{t('navigation:news')}</a>
                <a href={addLangParam("/ai-news")} role="menuitem" className={getLinkClass('/ai-news', true)}>{t('navigation:aiCharacterNews')}</a>
                <a href={addLangParam("/dev-blog")} role="menuitem" className={getLinkClass('/dev-blog', true)}>{t('navigation:devBlog')}</a>
                <a href={addLangParam("/developer")} role="menuitem" className={getLinkClass('/developer', true)}>{t('navigation:developer')}</a>
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

            <div className="transition-transform duration-150 ease-out hover:scale-105 active:scale-95">
              <button id="mobile-menu-button" aria-controls="mobile-menu" aria-expanded="false" className="site-header__mobile-button">
                {t('navigation:menu')}
              </button>
            </div>
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
              <a href={addLangParam("/tutorials")} className={`block px-4 py-3 ${getLinkClass('/tutorials', true)}`}>{t('navigation:tutorial')}</a>
              <a href={addLangParam("/updates")} className={`block px-4 py-3 ${getLinkClass('/updates', true)}`}>{t('navigation:news')}</a>
              <a href={addLangParam("/ai-news")} className={`block px-4 py-3 ${getLinkClass('/ai-news', true)}`}>{t('navigation:aiCharacterNews')}</a>
              <a href={addLangParam("/dev-blog")} className={`block px-4 py-3 ${getLinkClass('/dev-blog', true)}`}>{t('navigation:devBlog')}</a>
              <a href={addLangParam("/developer")} className={`block px-4 py-3 ${getLinkClass('/developer', true)}`}>{t('navigation:developer')}</a>
            </div>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t">
        <div className="container mx-auto px-4 py-5 text-center text-gray-600">
          <nav className="mb-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm" aria-label={locale === 'ja' ? 'フッターリンク' : 'Footer links'}>
            {footerLinks.map((link) => (
              <a key={link.href} href={addLangParam(link.href)} className="hover:text-gray-900 transition-colors">
                {link.label}
              </a>
            ))}
          </nav>
          <p>{t('common:copyright')}</p>
        </div>
      </footer>

      <GalleryModal />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    </GalleryModalProvider>
  )
}
