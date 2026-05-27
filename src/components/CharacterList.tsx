import { type CSSProperties, type FC } from 'react'
import { Locale, getT } from '../i18n/config'

interface CharacterListProps {
  locale: Locale
}

// 立ち絵の配置順序（左から: ミカゼ, ぷにけ, AIニケちゃん, 今日は何の日bot, ニケ）
const characters = [
  {
    id: 'mikaze',
    nameEn: 'MIKAZE',
    nameJa: 'ミカゼ',
    image: '/images/characters/sprites/mikaze.png',
    icon: '/images/characters/icons/mikaze.png',
    color: '#61A0DF',
    scale: 1,
    offsetY: 0,
    // クリック領域を人型シルエットに制限
    clipPath: 'polygon(25% 0%, 75% 0%, 80% 10%, 85% 25%, 75% 45%, 70% 60%, 75% 75%, 65% 100%, 35% 100%, 25% 75%, 30% 60%, 25% 45%, 15% 25%, 20% 10%)',
  },
  {
    id: 'punike',
    nameEn: 'PUNIKE',
    nameJa: 'ぷにけ',
    image: '/images/characters/sprites/punike.png',
    icon: '/images/characters/icons/punike.png',
    color: '#F48E84',
    scale: 0.5,
    offsetY: 0,
    // ぷにけは丸い形状なのでより広い領域
    clipPath: 'polygon(15% 0%, 85% 0%, 95% 20%, 100% 50%, 95% 80%, 85% 100%, 15% 100%, 5% 80%, 0% 50%, 5% 20%)',
  },
  {
    id: 'ainike',
    nameEn: 'AI NIKECHAN',
    nameJa: 'AIニケちゃん',
    image: '/images/characters/sprites/ainikechan.png',
    icon: '/images/characters/icons/ainikechan.png',
    color: '#5A4C97',
    scale: 1,
    offsetY: 0,
    clipPath: 'polygon(20% 0%, 80% 0%, 85% 10%, 90% 25%, 80% 45%, 75% 60%, 80% 75%, 70% 100%, 30% 100%, 20% 75%, 25% 60%, 20% 45%, 10% 25%, 15% 10%)',
  },
  {
    id: 'today_norma',
    nameEn: 'TODAY NORMA',
    nameJa: '今日は何の日bot',
    image: '/images/characters/sprites/today_norma.png',
    icon: '/images/characters/icons/today_norma.png',
    color: '#199286',
    scale: 0.67,
    offsetY: 0,
    clipPath: 'polygon(20% 0%, 80% 0%, 85% 15%, 90% 35%, 80% 55%, 75% 70%, 80% 85%, 70% 100%, 30% 100%, 20% 85%, 25% 70%, 20% 55%, 10% 35%, 15% 15%)',
  },
  {
    id: 'nike',
    nameEn: 'NIKE',
    nameJa: 'ニケ',
    image: '/images/characters/sprites/nikechan.png',
    icon: '/images/characters/icons/nikechan.png',
    color: '#F9B1BC',
    scale: 1,
    offsetY: 0,
    clipPath: 'polygon(20% 0%, 80% 0%, 85% 10%, 90% 25%, 80% 45%, 75% 60%, 80% 75%, 70% 100%, 30% 100%, 20% 75%, 25% 60%, 20% 45%, 10% 25%, 15% 10%)',
  },
]

// ナビゲーション用の順序（AIニケ, ニケ, ミカゼ, ぷにけ, 今日は何の日bot）
const navOrder = ['ainike', 'nike', 'mikaze', 'punike', 'today_norma']
const navCharacters = navOrder.map((id) => characters.find((c) => c.id === id)!)

export const CharacterList: FC<CharacterListProps> = ({ locale }) => {
  const t = getT(locale)
  const langQuery = locale !== 'ja' ? `?lang=${locale}` : ''

  return (
    <div className="character-page character-page--index min-h-screen">
      <section className="character-index-hero" aria-labelledby="character-index-title">
        <div className="character-index-hero__grid" aria-hidden="true" />
        <div className="character-index-hero__inner">
          <div className="character-index-hero__copy">
            <h1 id="character-index-title">CHARACTER</h1>
            <h2>{locale === 'ja' ? 'AIニケちゃんファミリー' : 'AI Nikechan Family'}</h2>
            <p>
              {locale === 'ja'
                ? 'AIキャラクター「AIニケちゃん」と、その仲間たちのプロフィールページです。全てのキャラクターがAIを活用した二次創作で利用できます。各キャラクターの詳細なプロフィールをぜひご覧ください。'
                : 'This is the profile page for AI character "AI Nikechan" and her companions. All characters are available for AI-powered fan creations. Please explore each character\'s detailed profile.'}
            </p>
          </div>

          <div className="character-index-hero__cast" aria-label={t('navigation:character')}>
            {characters.map((char, index) => (
              <a
                key={char.id}
                href={`/characters/${char.id}${langQuery}`}
                className="character-index-hero__sprite-link"
                style={{
                  '--char-color': char.color,
                  '--char-scale': char.scale,
                  '--char-order': index,
                } as CSSProperties}
                aria-label={locale === 'ja' ? `${char.nameJa}の詳細を見る` : `View ${char.nameEn} profile`}
              >
                <img
                  src={char.image}
                  alt={char.nameJa}
                  width={1792}
                  height={2400}
                  className="character-index-hero__sprite"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      <main className="character-index-main">
        <section className="character-index-grid" aria-label={t('navigation:character')}>
          {navCharacters.map((char, index) => (
            <a
              key={char.id}
              href={`/characters/${char.id}${langQuery}`}
              className="character-index-card"
              style={{
                '--char-color': char.color,
                '--card-index': index,
              } as CSSProperties}
            >
              <span className="character-index-card__number">{String(index + 1).padStart(2, '0')}</span>
              <div className="character-index-card__image">
                <img
                  src={char.icon}
                  alt={char.nameJa}
                  width={500}
                  height={500}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <p>{char.nameEn}</p>
                <h3>{char.nameJa}</h3>
              </div>
              <span className="character-index-card__cta">
                {locale === 'ja' ? '詳細を見る' : 'View profile'}
                <i className="fa-solid fa-arrow-right" />
              </span>
            </a>
          ))}
        </section>
      </main>
    </div>
  )
}
