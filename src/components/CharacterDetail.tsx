import { FC, ReactNode } from 'react'
import { Locale, getT } from '../i18n/config'
import { ArrowLeft, ExternalLink, Download } from 'lucide-react'
import { PageHeader } from './PageHeader'

interface ProfileItem {
  label: string
  value: string | ReactNode
}

interface HistoryItem {
  date: string
  label: string
  description: string | ReactNode
}

interface ProductItem {
  name: string
  year: string
  description: string
  links?: Array<{ label: string; url: string }>
}

interface SupportLink {
  label: string
  url: string
  icon?: ReactNode
}

interface CharacterDetailProps {
  locale: Locale
  nameEn: string
  nameJa: string
  role: string
  catchphrase: ReactNode
  catchphraseEn?: ReactNode
  catchphraseLines?: string[]
  catchphraseLinesEn?: string[]
  image: string
  icon: string
  accentColor: string
  profileItems: ProfileItem[]
  description: string[]
  youtubeVideoId?: string
  links?: Array<{
    label: string
    url: string
    icon?: ReactNode
  }>
  // Additional sections
  historyItems?: HistoryItem[]
  historyTitle?: string
  products?: ProductItem[]
  productsTitle?: string
  supportLinks?: SupportLink[]
  supportTitle?: string
  supportDescription?: string
  customSections?: ReactNode
  currentCharacterId: string
  headerTitle?: string
  // Trihedral figure (三面図) for fan art reference
  trihedralFigure?: string
}

export const CharacterDetail: FC<CharacterDetailProps> = ({
  locale,
  nameEn,
  nameJa,
  role,
  catchphrase,
  catchphraseEn,
  catchphraseLines,
  catchphraseLinesEn,
  image,
  accentColor,
  profileItems,
  description,
  youtubeVideoId,
  links,
  historyItems,
  historyTitle,
  products,
  productsTitle,
  supportLinks,
  supportTitle,
  supportDescription,
  customSections,
  currentCharacterId,
  headerTitle = 'CHARACTER',
  trihedralFigure,
}) => {
  const t = getT(locale)
  const langQuery = locale !== 'ja' ? `?lang=${locale}` : ''
  const displayCatchphrase = locale === 'ja' ? catchphrase : (catchphraseEn || catchphrase)
  const displayCatchphraseLines = locale === 'ja' ? catchphraseLines : (catchphraseLinesEn || catchphraseLines)

  // 全キャラクターリスト（固定順序: AIニケ, ニケ, ミカゼ, ぷにけ, 今日は何の日bot）
  const allCharacters = [
    {
      id: 'ainike',
      nameJa: 'AIニケちゃん',
      icon: '/images/characters/icons/ainikechan.png',
      color: '#5A4C97',
    },
    {
      id: 'nike',
      nameJa: 'ニケ',
      icon: '/images/characters/icons/nikechan.png',
      color: '#F9B1BC',
    },
    {
      id: 'mikaze',
      nameJa: 'ミカゼ',
      icon: '/images/characters/icons/mikaze.png',
      color: '#61A0DF',
    },
    {
      id: 'punike',
      nameJa: 'ぷにけ',
      icon: '/images/characters/icons/punike.png',
      color: '#F48E84',
    },
    {
      id: 'today_norma',
      nameJa: '今日は何の日bot',
      icon: '/images/characters/icons/today_norma.png',
      color: '#199286',
    },
  ]

  const characters = allCharacters.map((char) => ({
    ...char,
    current: char.id === currentCharacterId,
  }))

  return (
    <div className="character-page min-h-screen">
      <PageHeader title={headerTitle} />

      {/* Back Button */}
      <div className="character-back-section relative z-20 -mt-4">
        <div className="max-w-7xl mx-auto px-4">
          <a
            href={`/characters${langQuery}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg hover:bg-white transition-all duration-300 text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">
              {locale === 'ja' ? '一覧に戻る' : 'Back to List'}
            </span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="character-detail-main relative">
        <div className="character-showcase-bg absolute inset-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
            {/* Left: Character Image + Catchphrase */}
            <div className="character-image-section relative flex flex-col lg:flex-row items-center justify-center w-full lg:w-auto">
              {/* Vertical Catchphrase (Desktop) */}
              <div
                className="character-catchphrase hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 z-20 h-[420px]"
                style={{ writingMode: 'vertical-rl' }}
              >
                {displayCatchphraseLines ? (
                  displayCatchphraseLines.map((line, index) => (
                    <p
                      key={index}
                      className={`${displayCatchphraseLines.length === 1 ? 'text-3xl' : 'text-2xl'} font-bold tracking-widest`}
                      style={{
                        color: accentColor,
                        WebkitTextStroke: '3px white',
                        paintOrder: 'stroke fill',
                        textShadow: `0 0 10px white, 0 0 20px white, 0 0 40px rgba(255,255,255,0.8)`,
                      }}
                    >
                      {line}
                    </p>
                  ))
                ) : (
                  <p
                    className="text-3xl font-bold tracking-widest"
                    style={{
                      color: accentColor,
                      WebkitTextStroke: '3px white',
                      paintOrder: 'stroke fill',
                      textShadow: `0 0 10px white, 0 0 20px white, 0 0 40px rgba(255,255,255,0.8)`,
                    }}
                  >
                    {displayCatchphrase}
                  </p>
                )}
              </div>

              {/* Mobile Catchphrase */}
              <div className="lg:hidden text-center mb-2 w-full px-4">
                <p
                  className="text-lg sm:text-xl font-bold"
                  style={{ color: accentColor }}
                >
                  「{displayCatchphrase}」
                </p>
              </div>

              {/* Character Image */}
              <div className="character-detail-image relative flex justify-center">
                <div
                  className="character-image-glow absolute inset-0 opacity-30 blur-3xl"
                  style={{ background: `radial-gradient(circle, ${accentColor}40, transparent)` }}
                />
                <img
                  src={image}
                  alt={nameJa}
                  width={1792}
                  height={2400}
                  className="relative z-10 w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain"
                  style={{ filter: `drop-shadow(-15px 10px 8px ${accentColor})` }}
                />
              </div>
            </div>

            {/* Right: Profile Panel */}
            <div className="character-profile-section w-full lg:w-auto lg:max-w-md xl:max-w-lg px-2 sm:px-0">
              <div className="glass-panel-strong p-4 sm:p-6 md:p-8">
                {/* Name Header */}
                <div className="mb-6">
                  <span className="text-sm tracking-[0.3em] text-gray-500 uppercase">
                    {nameEn}
                  </span>
                  <h2
                    className="text-4xl md:text-5xl font-black mt-1"
                    style={{ color: accentColor }}
                  >
                    {nameJa}
                  </h2>
                  <p className="text-gray-600 mt-2">{role}</p>
                </div>

                {/* Profile Section */}
                <div className="character-profile-data">
                  <h3
                    className="text-lg font-bold tracking-widest mb-4 pb-2 border-b-2"
                    style={{ borderColor: accentColor, color: accentColor }}
                  >
                    PROFILE
                  </h3>
                  <dl className="space-y-3">
                    {profileItems.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <dt className="w-28 flex-shrink-0 text-sm text-gray-500 font-medium">
                          {item.label}
                        </dt>
                        <dd className="text-gray-800 flex-1">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Description */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  {description.map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed mb-3 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Links */}
                {links && links.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex flex-wrap gap-3">
                      {links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                          style={{ backgroundColor: accentColor }}
                        >
                          {link.icon}
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* YouTube Video */}
                {youtubeVideoId && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                      <iframe
                        src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                        title="YouTube video"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      {(historyItems || products || supportLinks || customSections || trihedralFigure) && (
        <div className="character-additional-sections relative pb-12">
          <div className="max-w-5xl mx-auto px-4 space-y-6 md:space-y-8">
            {/* Trihedral Figure Section (三面図) */}
            {trihedralFigure && (
              <div className="glass-panel p-6 md:p-8">
                <h3
                  className="text-xl font-bold tracking-widest mb-6 pb-2 border-b-2"
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  {locale === 'ja' ? '三面図（二次創作用）' : 'Reference Sheet (Fan Art)'}
                </h3>
                {/* Image with Download Button Overlay */}
                <div className="relative flex justify-center">
                  <img
                    src={trihedralFigure}
                    alt={`${nameJa} ${locale === 'ja' ? '三面図' : 'Reference Sheet'}`}
                    width={5504}
                    height={3072}
                    className="max-w-full h-auto rounded-xl shadow-lg border border-gray-100"
                  />
                  {/* Download Button - Top Right Overlay */}
                  <a
                    href={trihedralFigure}
                    download
                    className="absolute top-3 right-3 p-3 rounded-full text-white transition-all duration-300 hover:scale-110 hover:shadow-lg shadow-md"
                    style={{ backgroundColor: accentColor }}
                    title={locale === 'ja' ? 'ダウンロード' : 'Download'}
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </div>
              </div>
            )}

            {/* History / Career Section */}
            {historyItems && historyItems.length > 0 && (
              <div className="glass-panel p-6 md:p-8">
                <h3
                  className="text-xl font-bold tracking-widest mb-6 pb-2 border-b-2"
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  {historyTitle || 'HISTORY'}
                </h3>
                <div className="relative pl-6 border-l-2 border-gray-200 space-y-6">
                  {historyItems.map((item, index) => (
                    <div key={index} className="relative">
                      <div
                        className="absolute -left-[calc(1.5rem+1px)] -translate-x-1/2 w-4 h-4 rounded-full border-2 bg-white"
                        style={{ borderColor: accentColor }}
                      />
                      <div className="text-sm text-gray-500 font-medium mb-1">
                        {item.date}
                      </div>
                      <div className="font-bold text-gray-800 mb-1">
                        {item.label}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Products Section */}
            {products && products.length > 0 && (
              <div className="glass-panel p-6 md:p-8">
                <h3
                  className="text-xl font-bold tracking-widest mb-6 pb-2 border-b-2"
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  {productsTitle || 'PRODUCTS'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {products.map((product, index) => (
                    <div
                      key={index}
                      className="p-5 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <h4 className="font-bold text-gray-800">
                          {product.name}
                        </h4>
                        <span
                          className="text-xs px-2 py-1 rounded-full text-white"
                          style={{ backgroundColor: accentColor }}
                        >
                          {product.year}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {product.description}
                      </p>
                      {product.links && product.links.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {product.links.map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                              <ExternalLink className="w-3 h-3" />
                              {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Sections (e.g., LINE Stamp) */}
            {customSections}

            {/* Support Section */}
            {supportLinks && supportLinks.length > 0 && (
              <div className="glass-panel p-6 md:p-8">
                <h3
                  className="text-xl font-bold tracking-widest mb-4 pb-2 border-b-2"
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  {supportTitle || 'SUPPORT'}
                </h3>
                {supportDescription && (
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {supportDescription}
                  </p>
                )}
                <div className="flex flex-wrap gap-4">
                  {supportLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      style={{ backgroundColor: accentColor }}
                    >
                      {link.icon}
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Character Navigation */}
      <div className="character-nav-section relative py-8 md:py-12">
        <div className="character-nav-bg absolute inset-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Mobile: Centered */}
          <div className="flex md:hidden flex-wrap justify-center gap-3 pb-4">
            {characters.map((char) => (
              <a
                key={char.id}
                href={`/characters/${char.id}${langQuery}`}
                className={`character-nav-item group flex flex-col items-center flex-shrink-0 ${
                  char.current ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <div className="character-nav-icon relative">
                  <div
                    className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      char.current
                        ? 'ring-3 ring-offset-2'
                        : 'ring-0'
                    }`}
                    style={{
                      ['--tw-ring-color' as string]: char.color
                    }}
                  />
                  <img
                    src={char.icon}
                    alt={char.nameJa}
                    width={500}
                    height={500}
                    className="w-14 h-14 rounded-full object-cover shadow-md"
                  />
                </div>
                <span className="mt-2 text-xs font-medium text-gray-700 whitespace-nowrap">
                  {char.nameJa}
                </span>
              </a>
            ))}
          </div>
          {/* Desktop: Centered flex */}
          <div className="hidden md:flex justify-center gap-6 lg:gap-8">
            {characters.map((char) => (
              <a
                key={char.id}
                href={`/characters/${char.id}${langQuery}`}
                className={`character-nav-item group flex flex-col items-center ${
                  char.current ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <div className="character-nav-icon relative">
                  <div
                    className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      char.current
                        ? 'ring-4 ring-offset-2'
                        : 'ring-0 group-hover:ring-4 group-hover:ring-offset-2'
                    }`}
                    style={{
                      ['--tw-ring-color' as string]: char.color
                    }}
                  />
                  <img
                    src={char.icon}
                    alt={char.nameJa}
                    width={500}
                    height={500}
                    className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover shadow-lg"
                  />
                </div>
                <span className="mt-3 text-sm font-medium text-gray-700">
                  {char.nameJa}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Footer Gradient */}
      <div className="character-footer h-16 relative overflow-hidden">
        <div className="character-footer-gradient absolute inset-0" />
      </div>
    </div>
  )
}
