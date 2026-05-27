import { type CSSProperties, type FC, type ReactNode } from 'react'
import { Locale } from '../i18n/config'
import { ArrowLeft, ExternalLink, Download } from 'lucide-react'

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

interface HeroFact {
  label: string
  value: string
}

interface CharacterDetailProps {
  locale: Locale
  nameEn: string
  nameJa: string
  role: string
  heroSummary?: string
  heroSummaryEn?: string
  heroFacts?: HeroFact[]
  heroFactsEn?: HeroFact[]
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

interface CharacterSectionHeadingProps {
  label: string
  title: ReactNode
}

export const CharacterSectionHeading: FC<CharacterSectionHeadingProps> = ({ label, title }) => (
  <div className="character-section-heading character-section-heading--additional">
    <span>{label}</span>
    <h2>{title}</h2>
  </div>
)

export const CharacterDetail: FC<CharacterDetailProps> = ({
  locale,
  nameEn,
  nameJa,
  role,
  heroSummary,
  heroSummaryEn,
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
  const langQuery = locale !== 'ja' ? `?lang=${locale}` : ''
  const displayCatchphrase = locale === 'ja' ? catchphrase : (catchphraseEn || catchphrase)
  const displayCatchphraseLines = locale === 'ja' ? catchphraseLines : (catchphraseLinesEn || catchphraseLines)
  const displayCatchphraseText = displayCatchphraseLines?.join(' ') || displayCatchphrase
  const displayHeroSummary = locale === 'ja' ? heroSummary : (heroSummaryEn || heroSummary)
  const watermarkLines = nameEn.split(' ')

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
    <div
      className={`character-page character-detail-page character-detail-page--${currentCharacterId} min-h-screen`}
      style={{ '--char-color': accentColor } as CSSProperties}
    >
      <section className="character-detail-hero" aria-labelledby="character-detail-title">
        <div className="character-detail-hero__grid" aria-hidden="true" />
        <div className="character-detail-hero__watermark" aria-hidden="true">
          {watermarkLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        <div className="character-detail-hero__inner">
          <div className="character-detail-hero__copy">
            <h1 id="character-detail-title">{nameJa}</h1>
            {displayHeroSummary && (
              <p className="character-detail-hero__summary">{displayHeroSummary}</p>
            )}
            <p className="character-detail-hero__lead">{displayCatchphraseText}</p>
          </div>

          <div className="character-detail-hero__visual">
            <img
              src={image}
              alt={nameJa}
              width={1792}
              height={2400}
              className="character-detail-hero__image"
            />
          </div>
        </div>
      </section>

      <main className="character-detail-main">
        <div className="character-back-section">
          <a
            href={`/characters${langQuery}`}
            className="character-back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{locale === 'ja' ? '一覧に戻る' : 'Back to List'}</span>
          </a>
        </div>

        <section className="character-profile-layout">
          <div className="character-profile-card">
            <div className="character-section-heading">
              <span>PROFILE</span>
              <h2>{nameJa}</h2>
            </div>
            <dl className="character-profile-data">
              {profileItems.map((item, index) => (
                <div key={index}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="character-description-card">
            <div className="character-section-heading">
              <span>INTRODUCTION</span>
              <h2>{role}</h2>
            </div>
            <div className="character-description-body">
              {description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {links && links.length > 0 && (
              <div className="character-link-list">
                {links.map((link, index) => (
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.icon}
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {youtubeVideoId && (
              <div className="character-video-frame">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                  title="YouTube video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </section>

      {/* Additional Sections */}
      {(historyItems || products || supportLinks || customSections || trihedralFigure) && (
        <div className="character-additional-sections">
            {/* Trihedral Figure Section (三面図) */}
            {trihedralFigure && (
              <div className="glass-panel character-reference-panel">
                <CharacterSectionHeading
                  label="REFERENCE"
                  title={locale === 'ja' ? '三面図（二次創作用）' : 'Reference Sheet (Fan Art)'}
                />
                {/* Image with Download Button Overlay */}
                <div className="relative flex justify-center">
                  <img
                    src={trihedralFigure}
                    alt={`${nameJa} ${locale === 'ja' ? '三面図' : 'Reference Sheet'}`}
                    width={2048}
                    height={1143}
                    loading="lazy"
                    decoding="async"
                    className="max-w-full h-auto"
                  />
                  {/* Download Button - Top Right Overlay */}
                  <a
                    href={trihedralFigure}
                    download
                    className="character-reference-download absolute top-3 right-3 p-3 rounded-full text-white transition-all duration-300 hover:scale-110"
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
              <div className="glass-panel character-history-panel">
                <CharacterSectionHeading label="TIMELINE" title={historyTitle || 'HISTORY'} />
                <div className="character-history-list">
                  {historyItems.map((item, index) => (
                    <div key={index} className="character-history-item">
                      <div
                        className="character-history-dot"
                        style={{ borderColor: accentColor }}
                      />
                      <div className="character-history-date">
                        {item.date}
                      </div>
                      <div className="character-history-label">
                        {item.label}
                      </div>
                      <p className="character-history-description">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Products Section */}
            {products && products.length > 0 && (
              <div className="glass-panel character-products-panel">
                <CharacterSectionHeading label="WORKS" title={productsTitle || 'PRODUCTS'} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {products.map((product, index) => (
                    <div
                      key={index}
                      className="character-product-card"
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
              <div className="glass-panel character-support-panel">
                <CharacterSectionHeading label="LINKS" title={supportTitle || 'SUPPORT'} />
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
      )}

      {/* Character Navigation */}
        <nav className="character-nav-section" aria-label={locale === 'ja' ? 'キャラクター一覧' : 'Characters'}>
          {characters.map((char) => (
            <a
              key={char.id}
              href={`/characters/${char.id}${langQuery}`}
              className={`character-nav-item ${char.current ? 'character-nav-item--current' : ''}`}
              style={{ '--char-color': char.color } as CSSProperties}
            >
              <img
                src={char.icon}
                alt={char.nameJa}
                width={500}
                height={500}
                loading="lazy"
                decoding="async"
              />
              <span>{char.nameJa}</span>
            </a>
          ))}
        </nav>
      </main>
    </div>
  )
}
