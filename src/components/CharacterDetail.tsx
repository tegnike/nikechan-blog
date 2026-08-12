import { type CSSProperties, type FC, type ReactNode } from 'react'
import { Locale } from '../i18n/config'
import { ArrowLeft, Download, ExternalLink } from 'lucide-react'

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
  heroSummary?: string
  heroSummaryEn?: string
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
  workSectionLabel?: string
  workSectionTitle?: string
  workNavLabel?: string
  workLayout?: 'split' | 'stacked'
  productsFirst?: boolean
  supportLinks?: SupportLink[]
  supportTitle?: string
  supportDescription?: string
  overviewSections?: ReactNode
  overviewNavLabel?: string
  customSections?: ReactNode
  currentCharacterId: string
  headerTitle?: string
  // Trihedral figure (三面図) for fan art reference
  trihedralFigure?: string
}

interface CharacterSectionHeadingProps {
  label: string
  title: ReactNode
  headingId?: string
}

interface CharacterDisclosureProps {
  label: string
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  id?: string
}

export const CharacterSectionHeading: FC<CharacterSectionHeadingProps> = ({ label, title, headingId }) => (
  <div className="character-section-heading character-section-heading--additional">
    <span>{label}</span>
    <h2 id={headingId}>{title}</h2>
  </div>
)

export const CharacterDisclosure: FC<CharacterDisclosureProps> = ({
  label,
  title,
  description,
  children,
  id,
}) => (
  <section className="character-chapter" id={id}>
    <header className="character-chapter__heading">
      <span>{label}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </header>
    <div className="character-chapter__body">{children}</div>
  </section>
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
  workSectionLabel,
  workSectionTitle,
  workNavLabel,
  workLayout = 'split',
  productsFirst = false,
  supportLinks,
  supportTitle,
  supportDescription,
  overviewSections,
  overviewNavLabel,
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
  const renderHeroLinks = (placementClass: string) => links && links.length > 0 && (
    <div className={`character-detail-hero__links ${placementClass}`} aria-label={locale === 'ja' ? '関連リンク' : 'Related links'}>
      {links.map((link) => (
        <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
          {link.icon}
          {link.label}
        </a>
      ))}
    </div>
  )

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
            <span className="character-detail-hero__eyebrow">{headerTitle}</span>
            <h1 id="character-detail-title">{nameJa}</h1>
            {displayHeroSummary && (
              <p className="character-detail-hero__summary">{displayHeroSummary}</p>
            )}
            <p className="character-detail-hero__lead">
              {displayCatchphraseText}
            </p>
            {renderHeroLinks('character-detail-hero__links--desktop')}
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
          {renderHeroLinks('character-detail-hero__links--mobile')}
        </div>
      </section>

      <main className="character-detail-main">
        <nav className="character-section-nav" aria-label={locale === 'ja' ? 'ページ内メニュー' : 'On this page'}>
          <a
            href={`/characters${langQuery}`}
            className="character-back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{locale === 'ja' ? '一覧に戻る' : 'Back to List'}</span>
          </a>
          <div className="character-section-nav__links">
            <a href="#profile">{locale === 'ja' ? 'プロフィール' : 'Profile'}</a>
            {overviewSections && (
              <a href="#overview">{overviewNavLabel || (locale === 'ja' ? '概要' : 'Overview')}</a>
            )}
            {trihedralFigure && <a href="#reference">{locale === 'ja' ? '三面図' : 'Reference'}</a>}
            {(historyItems || products || customSections) && (
              <a href="#explore">{workNavLabel || (locale === 'ja' ? '活動・作品' : 'Work & Activity')}</a>
            )}
            {customSections && <a href="#connect">{locale === 'ja' ? '連絡・支援' : 'Connect'}</a>}
            <a href="#characters">{locale === 'ja' ? 'キャラクター' : 'Characters'}</a>
          </div>
        </nav>

        <section className="character-profile-layout" id="profile" aria-label={locale === 'ja' ? 'プロフィール' : 'Profile'}>
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

        {overviewSections && (
          <div className="character-overview-sections" id="overview">
            {overviewSections}
          </div>
        )}

      {/* Additional Sections */}
      {(historyItems || products || supportLinks || customSections || trihedralFigure) && (
        <div className="character-additional-sections">
            {/* Trihedral Figure Section (三面図) */}
            {trihedralFigure && (
              <div className="glass-panel character-reference-panel" id="reference">
                <div className="character-reference-panel__copy">
                  <CharacterSectionHeading
                    label="REFERENCE"
                    title={locale === 'ja' ? '三面図（二次創作用）' : 'Reference Sheet (Fan Art)'}
                  />
                  <p>
                    {locale === 'ja'
                      ? '立ち絵や二次創作の資料として使える、正面・側面・背面の設定画です。'
                      : 'Front, side, and back views for illustration and fan-work reference.'}
                  </p>
                  <a
                    href={trihedralFigure}
                    download
                    className="character-reference-download"
                  >
                    <Download className="w-5 h-5" />
                    {locale === 'ja' ? '高解像度でダウンロード' : 'Download high resolution'}
                  </a>
                </div>
                <div className="character-reference-panel__visual">
                  <img
                    src={trihedralFigure}
                    alt={`${nameJa} ${locale === 'ja' ? '三面図' : 'Reference Sheet'}`}
                    width={2048}
                    height={1143}
                    loading="lazy"
                    decoding="async"
                    className="max-w-full h-auto"
                  />
                </div>
              </div>
            )}

            {(historyItems || products) && (
              <section className="character-work-section" id="explore">
                <CharacterSectionHeading
                  label={workSectionLabel || 'EXPLORE'}
                  title={workSectionTitle || (locale === 'ja' ? '活動と制作' : 'Work and activity')}
                />
                <div className={`character-work-grid ${historyItems && products ? `character-work-grid--${workLayout}` : ''} ${productsFirst ? 'character-work-grid--products-first' : ''}`}>
                  {historyItems && historyItems.length > 0 && (
                    <section className="character-work-column character-work-column--history" id="timeline">
                      <header className="character-work-column__heading">
                        <h3>{historyTitle || 'HISTORY'}</h3>
                      </header>
                      <div className="character-history-list">
                        {historyItems.map((item, index) => (
                          <div
                            key={index}
                            className={`character-history-item${item.date ? '' : ' character-history-item--no-date'}`}
                          >
                            {item.date && <div className="character-history-date">{item.date}</div>}
                            <div className="character-history-label">{item.label}</div>
                            <div className="character-history-description">{item.description}</div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {products && products.length > 0 && (
                    <section className="character-work-column character-work-column--products" id="works">
                      <header className="character-work-column__heading">
                        <h3>{productsTitle || 'PRODUCTS'}</h3>
                      </header>
                      <div className="character-product-grid">
                        {products.map((product, index) => (
                          <article key={index} className="character-product-card">
                            <div className="character-product-card__heading">
                              <h3>{product.name}</h3>
                              <span>{product.year}</span>
                            </div>
                            <p>{product.description}</p>
                            {product.links && product.links.length > 0 && (
                              <div className="character-product-card__links">
                                {product.links.map((link) => (
                                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-3 h-3" />
                                    {link.label}
                                  </a>
                                ))}
                              </div>
                            )}
                          </article>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </section>
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
        <nav id="characters" className="character-nav-section" aria-label={locale === 'ja' ? 'キャラクター一覧' : 'Characters'}>
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
