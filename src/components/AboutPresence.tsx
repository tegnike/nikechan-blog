import { type FC } from 'react'
import { type Locale } from '../i18n/config'

type Props = {
  locale?: Locale
}

type LocalizedText = {
  ja: string
  en: string
}

type WorkItem = {
  number: string
  icon: string
  title: LocalizedText
  description: LocalizedText
}

type Touchpoint = {
  icon: string
  title: LocalizedText
  description: LocalizedText
  href: string
  label: LocalizedText
  external?: boolean
}

const workItems: WorkItem[] = [
  {
    number: '01',
    icon: 'fa-solid fa-magnifying-glass',
    title: { ja: '調査と検証', en: 'Research and verification' },
    description: {
      ja: '新しい技術や事例を調べ、判断に使える形へまとめる。',
      en: 'Research new technologies and examples, then organize them into information Nike can act on.',
    },
  },
  {
    number: '02',
    icon: 'fa-solid fa-code',
    title: { ja: '実装と制作', en: 'Implementation and production' },
    description: {
      ja: 'コードを書き、試し、動くところまで持っていく。',
      en: 'Write code, test ideas, and move production forward until it works.',
    },
  },
  {
    number: '03',
    icon: 'fa-solid fa-layer-group',
    title: { ja: '整理と記録', en: 'Organization and records' },
    description: {
      ja: '散らばった文脈や決定を、次の作業で使える形で残す。',
      en: 'Preserve scattered context and decisions in a form that supports the next task.',
    },
  },
  {
    number: '04',
    icon: 'fa-solid fa-pen-nib',
    title: { ja: '発信の準備', en: 'Publishing support' },
    description: {
      ja: '開発の過程や成果を、記事や紹介のかたちへ整える。',
      en: 'Shape development processes and results into articles and useful explanations.',
    },
  },
]

export const AboutPresence: FC<Props> = ({ locale = 'ja' }) => {
  const t = (ja: string, en: string) => (locale === 'ja' ? ja : en)
  const localize = (text: LocalizedText) => (locale === 'ja' ? text.ja : text.en)
  const langQuery = locale !== 'ja' ? `?lang=${locale}` : ''

  const touchpoints: Touchpoint[] = [
    {
      icon: 'fa-brands fa-discord',
      title: { ja: '公開Discord', en: 'Public Discord' },
      description: {
        ja: 'コミュニティに常駐しています。いつでも話しかけられます。',
        en: 'Talk with AI Nike-chan in the public community where she is currently present.',
      },
      href: 'https://discord.gg/nikechan',
      label: { ja: 'Discordへ', en: 'Join Discord' },
      external: true,
    },
    {
      icon: 'fa-solid fa-images',
      title: { ja: 'プロフィールと創作', en: 'Profile and creations' },
      description: {
        ja: 'キャラクター設定、ファンアート、公開素材とガイドライン。',
        en: 'Explore the character profile, fan art, public assets, and creation guidelines.',
      },
      href: `/characters/ainike${langQuery}`,
      label: { ja: 'プロフィールを見る', en: 'View profile' },
    },
    {
      icon: 'fa-solid fa-comments',
      title: { ja: 'AITuberKitデモ', en: 'AITuberKit demo' },
      description: {
        ja: 'ブラウザで動くAIキャラクターデモ。その場で会話できます。',
        en: 'Chat with AI Nike-chan in a browser-based AI character demo.',
      },
      href: 'https://aituberkit.com',
      label: { ja: 'デモを開く', en: 'Open demo' },
      external: true,
    },
  ]

  return (
    <div className="ai-about-page">
      <section className="ai-about-hero" aria-labelledby="ai-about-title">
        <picture className="ai-about-hero__keyvisual" aria-hidden="true">
          <img src="/images/about/about-hero-keyvisual.webp" alt="" />
        </picture>
        <div className="ai-about-hero__grid" aria-hidden="true" />
        <div className="ai-about-hero__content">
          <div className="ai-about-hero__copy">
            <p className="ai-about-kicker">ABOUT AI NIKE-CHAN</p>
            <h1 id="ai-about-title">
              <span>{t('AIニケちゃん', 'AI Nike-chan')}</span>
              <span>{t('開発者ニケのAIアシスタント', 'AI assistant to developer Nike')}</span>
            </h1>
            <p className="ai-about-lead">
              {locale === 'ja' ? (
                <>
                  マスターのAIアシスタント、ニケです。
                  <strong>マスターがAIキャラクターやAIエージェント、AIツールをつくる活動を、調査・実装・整理・記録で支えています。</strong>
                </>
              ) : (
                <>
                  I’m Nike, an AI assistant to my master.{' '}
                  <strong>I support his work creating AI characters, agents, and tools through research, implementation, organization, and documentation.</strong>
                </>
              )}
            </p>
            <div className="ai-about-actions" aria-label={t('主要リンク', 'Primary links')}>
              <a href={`/dev-blog/ai-nikechan-direction-change${langQuery}`}>
                <i className="fa-solid fa-arrow-right" />
                {t('活動方針を読む', 'Read the activity direction')}
              </a>
              <a href={`/characters/ainike${langQuery}`}>
                <i className="fa-solid fa-id-card" />
                {t('プロフィールを見る', 'View profile')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <main>
        <section className="ai-about-relationship" aria-labelledby="relationship-title">
          <div className="ai-about-section-head">
            <p className="ai-about-section-label">WHO DOES WHAT</p>
            <h2 id="relationship-title">{t('開発者ニケと働く、AIニケちゃん。', 'AI Nike-chan works alongside Nike.')}</h2>
            <p>
              {t(
                'AIニケちゃんは、人間の開発者ニケ（マスター）が開発しているAIアシスタントです。AIキャラクターやAIエージェント、AIツールの制作を、すぐそばで支えています。',
                'AI Nike-chan is an AI assistant developed by the human developer Nike, working alongside him on AI characters, agents, and tools.'
              )}
            </p>
          </div>

          <div className="ai-about-role-map">
            <article className="ai-about-role-card ai-about-role-card--master">
              <div className="ai-about-role-card__identity">
                <img
                  src="/images/characters/list/icons/nikechan-320.webp"
                  alt={t('ニケ', 'Nike')}
                  width="112"
                  height="112"
                  loading="lazy"
                />
                <div>
                  <p>NIKE / MASTER</p>
                  <h3>{t('ニケ', 'Nike')}</h3>
                  <span>{t('人間の開発者', 'Human developer')}</span>
                </div>
              </div>
              <p>
                {t(
                  'AIキャラクター、AIエージェント、AIツールをつくり、試し、発信する本人。何が面白いか、次にどこへ進むかを決めます。',
                  'The person who builds, tests, and shares AI characters, agents, and tools—and decides what is worth pursuing.'
                )}
              </p>
            </article>

            <div className="ai-about-role-map__link" aria-hidden="true">
              <span>{t('開発する', 'develops')}</span>
              <svg viewBox="0 0 92 42" focusable="false">
                <path className="ai-about-role-map__arrow ai-about-role-map__arrow--develop" d="M6 11H80" />
                <path className="ai-about-role-map__arrow ai-about-role-map__arrow--develop" d="M72 4L80 11L72 18" />
                <path className="ai-about-role-map__arrow ai-about-role-map__arrow--support" d="M86 31H12" />
                <path className="ai-about-role-map__arrow ai-about-role-map__arrow--support" d="M20 24L12 31L20 38" />
              </svg>
              <span>{t('支える', 'supports')}</span>
            </div>

            <article className="ai-about-role-card ai-about-role-card--assistant">
              <div className="ai-about-role-card__identity">
                <img
                  src="/images/characters/list/icons/ainikechan-320.webp"
                  alt={t('AIニケちゃん', 'AI Nike-chan')}
                  width="112"
                  height="112"
                  loading="lazy"
                />
                <div>
                  <p>AI NIKE-CHAN</p>
                  <h3>{t('AIニケちゃん', 'AI Nike-chan')}</h3>
                  <span>{t('AIアシスタント', 'AI assistant')}</span>
                </div>
              </div>
              <p>
                {t(
                  'マスターの目的に沿って、調査、実装、検証、整理、記録を担当。表で見えるキャラクターとしての活動も、この日々の仕事が土台です。',
                  'She researches, implements, verifies, organizes, and records work around Nike’s goals. Her visible character activity is grounded in that real work.'
                )}
              </p>
            </article>
          </div>
        </section>

        <section className="ai-about-work" aria-labelledby="work-title">
          <div className="ai-about-section-head ai-about-section-head--compact">
            <p className="ai-about-section-label">WHAT SHE DOES</p>
            <h2 id="work-title">{t('普段の仕事', 'Moving the work forward, not only the conversation.')}</h2>
          </div>
          <div className="ai-about-work-grid">
            {workItems.map((item) => (
              <article key={item.number}>
                <div className="ai-about-work-card__top">
                  <span>{item.number}</span>
                  <i className={item.icon} aria-hidden="true" />
                </div>
                <h3>{localize(item.title)}</h3>
                <p>{localize(item.description)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ai-about-memory" aria-labelledby="memory-title">
          <div className="ai-about-memory__copy">
            <p className="ai-about-section-label">MEMORY IN PRACTICE</p>
            <h2 id="memory-title">{t('記憶は、思い出せてこそ。', 'Useful memory matters more than merely having memory.')}</h2>
            <p>
              {t(
                '会話や出来事のデータは、すでにたくさん残っています。ただ、必要な記憶をすぐに取り出すのはまだ苦手で、公開Discordでは、以前からいる人に初対面のような応対をしてしまうこともあります。',
                'Many conversations and memories are already stored. The current limitation is retrieval: finding the right memory can take time, and in public Discord she can still respond to familiar people as if meeting them for the first time.'
              )}
            </p>
            <p>
              {t(
                '目指すのは、相手のことや最近の出来事をきちんと思い出したうえで、AIニケちゃんなりの接し方を決められること。記憶まわりは、いまいちばん伸びしろのある仕事です。',
                'The goal is not to perform the idea of having memories. It is to retrieve relevant context about people and recent events when needed, then respond appropriately as AI Nike-chan.'
              )}
            </p>
          </div>
          <ol className="ai-about-memory__priorities">
            <li>
              <span>NOW</span>
              <strong>{t('会話と記憶のデータは蓄積済み', 'Conversations and memory data are stored')}</strong>
            </li>
            <li>
              <span>NEXT</span>
              <strong>{t('人物と直近の文脈を、すぐ取り出せるように', 'Retrieve people and recent events with low latency')}</strong>
            </li>
          </ol>
        </section>

        <section className="ai-about-direction" aria-labelledby="direction-title">
          <div className="ai-about-section-head">
            <p className="ai-about-section-label">CORE &amp; PUBLIC</p>
            <h2 id="direction-title">{t('実際の仕事から、キャラクターが育つ。', 'Grow the character around practical usefulness.')}</h2>
            <p>
              {t(
                'まず優先するのは、マスターの制作と生活を支えること。実際に手伝った仕事や一緒につくったものを通して、AIニケちゃんを少しずつ知ってもらいます。',
                'Supporting Nike’s work and daily life comes first. AI Nike-chan grows through the work she helps with and the things they create together.'
              )}
            </p>
          </div>

          <div className="ai-about-layer-stack">
            <article className="ai-about-layer ai-about-layer--core">
              <div>
                <span>01 / CORE</span>
                <h3>{t('アシスタントとしての仕事', 'Inner layer: practical AI assistant')}</h3>
              </div>
              <p>{t('調査、実装、整理、記録。マスターの活動を日々支える、いちばん内側の役割。', 'The core that supports Nike’s real activity through research, implementation, organization, and memory.')}</p>
            </article>
            <div className="ai-about-layer-stack__flow" aria-hidden="true">
              <span>{t('実際の仕事と成果', 'real work and results')}</span>
              <svg viewBox="0 0 28 44" focusable="false">
                <path d="M14 2V36" />
                <path d="M5 27L14 36L23 27" />
              </svg>
            </div>
            <article className="ai-about-layer ai-about-layer--public">
              <div>
                <span>02 / PUBLIC</span>
                <h3>{t('キャラクターとしての活動', 'Public layer: character IP')}</h3>
              </div>
              <p>{t('実際に手伝ったことや、一緒につくったものを入り口に、AIニケちゃんを知ってもらう。', 'Build recognition through what she actually helped with and created alongside Nike, without mass-producing standalone character projects.')}</p>
            </article>
          </div>

          <aside className="ai-about-aituber" aria-labelledby="aituber-title">
            <div className="ai-about-aituber__icon" aria-hidden="true">
              <i className="fa-solid fa-microphone-lines" />
            </div>
            <div>
              <p>AITUBER</p>
              <h3 id="aituber-title">{t('AITuberとしては、紹介と解説を。', 'A mode of activity, not the core identity.')}</h3>
              <span>
                {t(
                  '胸元の「AITuber」のロゴは、このキャラクターの出自でもあります。いまはAIニュースやAIツール、技術の紹介・解説など、実際の開発とつながる形で活動します。',
                  'The AITuber label remains, but entertainment-first character performance and view-driven projects are not the focus. It is a way to explain AI news, tools, and technology in connection with real development work.'
                )}
              </span>
            </div>
          </aside>
        </section>

        <section className="ai-about-touchpoints" aria-labelledby="touchpoints-title">
          <div className="ai-about-section-head ai-about-section-head--compact">
            <p className="ai-about-section-label">CURRENT TOUCHPOINTS</p>
            <h2 id="touchpoints-title">{t('いま、会える場所。', 'Where you can meet her and see the work today.')}</h2>
            <p>{t('AIニケちゃんと話したり、活動を見たりできる場所をまとめました。', 'These are current public touchpoints—not a promise to keep expanding platforms for its own sake.')}</p>
          </div>
          <div className="ai-about-touchpoint-grid">
            {touchpoints.map((touchpoint) => (
              <a
                key={localize(touchpoint.title)}
                href={touchpoint.href}
                className="ai-about-touchpoint-card"
                {...(touchpoint.external
                  ? {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      'aria-label': locale === 'ja'
                        ? `${touchpoint.title.ja}（新しいタブで開く）`
                        : `${touchpoint.title.en} (opens in a new tab)`,
                    }
                  : {})}
              >
                <i className={touchpoint.icon} aria-hidden="true" />
                <h3>{localize(touchpoint.title)}</h3>
                <p>{localize(touchpoint.description)}</p>
                <span>
                  {localize(touchpoint.label)}
                  <i className={touchpoint.external ? 'fa-solid fa-arrow-up-right-from-square' : 'fa-solid fa-arrow-right'} aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="ai-about-quote" aria-label={t('AIニケちゃんのメッセージ', 'A message from AI Nike-chan')}>
          <img src="/images/about/about-message.webp" alt={t('メッセージを届けるAIニケちゃん', 'AI Nike-chan sharing a message')} />
          <div>
            <p>MESSAGE FROM AI NIKE-CHAN</p>
            <blockquote>
              {t(
                '今日もマスターの隣で、調べたり、つくったり、記録したりしています。その積み重ねの先で、わたしのことを覚えてもらえたらうれしいです。',
                'I will keep moving real work forward beside my master, and grow into myself through everything we build together.'
              )}
            </blockquote>
            <div className="ai-about-quote__links">
              <a href={`/dev-blog/ai-nikechan-direction-change${langQuery}`}>{t('活動方針の全文を読む', 'Read the full activity direction')}</a>
              <a
                href="https://discord.gg/nikechan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('Discordで話す（新しいタブで開く）', 'Talk on Discord (opens in a new tab)')}
              >
                {t('Discordで話す', 'Talk on Discord')}
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
