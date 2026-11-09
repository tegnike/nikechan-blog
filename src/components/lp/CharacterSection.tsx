import type { CSSProperties } from 'react'
import { getT, type Locale } from '../../i18n/config'
import { getCharacterImage } from '../../lib/characterImages'
import { withLang } from '../../utils/langPath'
import { Blob } from './Blob'

type Props = {
  locale?: Locale;
}

type CharacterText = {
  name: string;
  role: string;
  line: string[];
  description: string;
}

// color: 台座と選択中の枠の色 / soft: 濃紺の上で読める淡い色 / scale: 等身の違いを立ち絵の大きさに反映
const characters = [
  { id: 'ainike', latin: 'AI NIKECHAN', sprite: 'ainikechan', icon: 'ainikechan', color: '#7b6bd0', soft: '#c9c1f2', scale: 1 },
  { id: 'nike', latin: 'NIKE', sprite: 'nikechan', icon: 'nikechan', color: '#f9a3ab', soft: '#fbd0d6', scale: 1 },
  { id: 'mikaze', latin: 'MIKAZE', sprite: 'mikaze', icon: 'mikaze', color: '#61a0df', soft: '#bcd7f3', scale: 1 },
  { id: 'punike', latin: 'PUNIKE', sprite: 'punike', icon: 'punike', color: '#f48e84', soft: '#fbcfca', scale: 0.62 },
  { id: 'today_norma', latin: 'TODAY NORMA', sprite: 'today_norma', icon: 'today_norma', color: '#199286', soft: '#a8e0d9', scale: 0.74 },
] as const

/** キャラクターを切り替えて見せる。全員分をサーバーで描画し、表示の切り替えだけを client.tsx が行う */
export function CharacterSection({ locale = 'ja' }: Props) {
  const t = getT(locale)
  const texts = t('home:characters.items', { returnObjects: true }) as Record<string, CharacterText>
  const first = characters[0]

  return (
    <section className="nk-sec nk-chara" id="character">
      <div className="site-shell">
        <h2 className="nk-sec-title">Character</h2>
        <p className="nk-sec-sub">{t('home:characters.heading')}</p>

        <div
          className="nk-chara__stage"
          data-character-stage
          style={{ '--c': first.color, '--c-soft': first.soft } as CSSProperties}
        >
          <Blob className="nk-chara__disc" shape={2} />

          {characters.map((character, index) => {
            const text = texts[character.id]
            const spritePath = `/images/characters/sprites/${character.sprite}.png`
            const sprite = getCharacterImage(spritePath)
            return (
              <div
                key={character.id}
                id={`character-panel-${character.id}`}
                className="nk-chara__panel"
                role="tabpanel"
                aria-labelledby={`character-tab-${character.id}`}
                data-color={character.color}
                data-soft={character.soft}
                hidden={index !== 0}
              >
                <div className="nk-chara__latin" aria-hidden="true">{character.latin}</div>
                <div className="nk-chara__text">
                  <p className="nk-chara__role">{text.role}</p>
                  <h3 className="nk-chara__name">{text.name}</h3>
                  <p className="nk-chara__line">
                    {text.line.map((line) => <span key={line}>{line}</span>)}
                  </p>
                  <p className="nk-chara__desc">{text.description}</p>
                  <a className="nk-btn nk-btn--light" href={withLang(`/characters/${character.id}`, locale)}>
                    {t('home:characters.cta')}
                  </a>
                </div>
                <div className="nk-chara__art">
                  <img
                    src={sprite?.src ?? spritePath}
                    srcSet={sprite?.srcSet}
                    sizes="(max-width: 860px) 80vw, 560px"
                    width={sprite?.width}
                    height={sprite?.height}
                    alt={text.name}
                    loading="lazy"
                    decoding="async"
                    style={{ '--s': character.scale } as CSSProperties}
                  />
                </div>
              </div>
            )
          })}

          <div className="nk-chara__tabs" role="tablist" aria-label={t('home:characters.tabsLabel')}>
            {characters.map((character, index) => (
              <button
                key={character.id}
                id={`character-tab-${character.id}`}
                type="button"
                role="tab"
                aria-selected={index === 0}
                aria-controls={`character-panel-${character.id}`}
                aria-label={texts[character.id].name}
                data-character-tab
              >
                <img
                  src={`/images/characters/list/icons/${character.icon}-160.webp`}
                  alt=""
                  width={160}
                  height={160}
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
