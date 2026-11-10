import { type CSSProperties, type FC } from 'react'
import { Locale, getT } from '../i18n/config'
import { getCharacterImage } from '../lib/characterImages'
import { withLang } from '../utils/langPath'
import { Blob, BlobDefs } from './lp/Blob'

interface CharacterListProps {
  locale: Locale
}

// 立ち絵の配置順序（左から: ミカゼ, ぷにけ, AIニケちゃん, 今日は何の日bot, ニケ）
const characters = [
  {
    id: 'mikaze',
    nameEn: 'MIKAZE',
    nameJa: 'ミカゼ',
    sprite: getCharacterImage('/images/characters/sprites/mikaze.png')!,
    listIcon: '/images/characters/list/icons/mikaze-160.webp',
    listIconSrcSet: '/images/characters/list/icons/mikaze-160.webp 160w, /images/characters/list/icons/mikaze-320.webp 320w, /images/characters/list/icons/mikaze-500.webp 500w',
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
    sprite: getCharacterImage('/images/characters/sprites/punike.png')!,
    listIcon: '/images/characters/list/icons/punike-160.webp',
    listIconSrcSet: '/images/characters/list/icons/punike-160.webp 160w, /images/characters/list/icons/punike-320.webp 320w, /images/characters/list/icons/punike-500.webp 500w',
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
    sprite: getCharacterImage('/images/characters/sprites/ainikechan.png')!,
    listIcon: '/images/characters/list/icons/ainikechan-160.webp',
    listIconSrcSet: '/images/characters/list/icons/ainikechan-160.webp 160w, /images/characters/list/icons/ainikechan-320.webp 320w, /images/characters/list/icons/ainikechan-500.webp 500w',
    color: '#5A4C97',
    scale: 1,
    offsetY: 0,
    clipPath: 'polygon(20% 0%, 80% 0%, 85% 10%, 90% 25%, 80% 45%, 75% 60%, 80% 75%, 70% 100%, 30% 100%, 20% 75%, 25% 60%, 20% 45%, 10% 25%, 15% 10%)',
  },
  {
    id: 'today_norma',
    nameEn: 'TODAY NORMA',
    nameJa: '今日は何の日bot',
    sprite: getCharacterImage('/images/characters/sprites/today_norma.png')!,
    listIcon: '/images/characters/list/icons/today_norma-160.webp',
    listIconSrcSet: '/images/characters/list/icons/today_norma-160.webp 160w, /images/characters/list/icons/today_norma-320.webp 320w, /images/characters/list/icons/today_norma-500.webp 500w',
    color: '#199286',
    scale: 0.67,
    offsetY: 0,
    clipPath: 'polygon(20% 0%, 80% 0%, 85% 15%, 90% 35%, 80% 55%, 75% 70%, 80% 85%, 70% 100%, 30% 100%, 20% 85%, 25% 70%, 20% 55%, 10% 35%, 15% 15%)',
  },
  {
    id: 'nike',
    nameEn: 'NIKE',
    nameJa: 'ニケ',
    sprite: getCharacterImage('/images/characters/sprites/nikechan.png')!,
    listIcon: '/images/characters/list/icons/nikechan-160.webp',
    listIconSrcSet: '/images/characters/list/icons/nikechan-160.webp 160w, /images/characters/list/icons/nikechan-320.webp 320w, /images/characters/list/icons/nikechan-500.webp 500w',
    color: '#F9B1BC',
    scale: 1,
    offsetY: 0,
    clipPath: 'polygon(20% 0%, 80% 0%, 85% 10%, 90% 25%, 80% 45%, 75% 60%, 80% 75%, 70% 100%, 30% 100%, 20% 75%, 25% 60%, 20% 45%, 10% 25%, 15% 10%)',
  },
]

// ナビゲーション用の順序（AIニケ, ニケ, ミカゼ, ぷにけ, 今日は何の日bot）
const navOrder = ['ainike', 'nike', 'mikaze', 'punike', 'today_norma']
const navCharacters = navOrder.map((id) => characters.find((c) => c.id === id)!)

type CharacterText = {
  name: string
  role: string
  line: string[]
}

export const CharacterList: FC<CharacterListProps> = ({ locale }) => {
  const t = getT(locale)
  const texts = t('home:characters.items', { returnObjects: true }) as Record<string, CharacterText>

  return (
    <div className="nk-home">
      <BlobDefs />
      <section className="nk-cast" aria-labelledby="character-index-title">
        <Blob className="nk-blob nk-blob--a" />
        <Blob className="nk-blob nk-blob--b" shape={2} />
        <Blob className="nk-blob nk-blob--d" shape={2} />
        <div className="nk-hero__marquee" aria-hidden="true">
          <span>family</span><span>family</span><span>family</span><span>family</span>
        </div>

        <div className="site-shell nk-cast__copy">
          <h1 id="character-index-title" className="nk-sec-title">Character</h1>
          <p className="nk-sec-sub">{t('home:characters.heading')}</p>
          <p className="nk-cast__desc">
            {locale === 'ja'
              ? 'AIキャラクター「AIニケちゃん」と、その仲間たちのプロフィールページです。全てのキャラクターがAIを活用した二次創作で利用できます。'
              : 'Profiles of the AI character "AI Nike-chan" and her companions. All characters are available for AI-powered fan creations.'}
          </p>
        </div>

        {/* 全員の立ち絵。それぞれが詳細ページへのリンクを兼ねる */}
        <div className="nk-cast__row" aria-label={t('navigation:character')}>
          {characters.map((char, index) => (
            <a
              key={char.id}
              href={withLang(`/characters/${char.id}`, locale)}
              style={{ '--s': char.scale, '--i': index, '--c': char.color } as CSSProperties}
              data-name={texts[char.id].name}
              aria-label={locale === 'ja' ? `${texts[char.id].name}の詳細を見る` : `View ${texts[char.id].name}'s profile`}
            >
              <img
                src={char.sprite.src}
                srcSet={char.sprite.srcSet}
                sizes="(max-width: 860px) 24vw, 340px"
                alt=""
                width={char.sprite.width}
                height={char.sprite.height}
                decoding="async"
              />
            </a>
          ))}
        </div>
      </section>

      <main className="nk-sec">
        <ul className="site-shell nk-roster">
          {navCharacters.map((char) => {
            const text = texts[char.id]
            return (
              <li key={char.id}>
                <a href={withLang(`/characters/${char.id}`, locale)} style={{ '--c': char.color } as CSSProperties}>
                  <img
                    className="nk-roster__icon"
                    src={char.listIcon}
                    srcSet={char.listIconSrcSet}
                    sizes="96px"
                    alt=""
                    width={160}
                    height={160}
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <p className="nk-roster__role">{text.role}</p>
                    <h2 className="nk-roster__name">{text.name}</h2>
                  </div>
                  <p className="nk-roster__line">{text.line.join(' ')}</p>
                </a>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}
