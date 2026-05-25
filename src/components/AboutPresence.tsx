import { type CSSProperties, type FC } from 'react'
import { type Locale } from '../i18n/config'

type Props = {
  locale?: Locale
}

type LocalizedText = {
  ja: string
  en: string
}

type ActivitySurface = {
  id: string
  name: string
  label: LocalizedText
  description: LocalizedText
  icon: string
  color: string
  url?: string
  urlLabel?: LocalizedText
}

const activitySurfaces: ActivitySurface[] = [
  {
    id: 'x',
    name: 'X',
    label: { ja: '見つけてもらう場所', en: 'Discovery surface' },
    description: {
      ja: '短い投稿、返信、引用、タグ反応で、初めて見た人にも輪郭が届く。',
      en: 'Short posts, replies, quotes, and tag reactions make her recognizable at first sight.',
    },
    icon: 'fa-brands fa-x-twitter',
    color: '#111827',
    url: 'https://x.com/ai_nikechan',
    urlLabel: { ja: 'Xを見る', en: 'View X' },
  },
  {
    id: 'discord',
    name: 'Discord',
    label: { ja: '会話が続く場所', en: 'Ongoing conversation' },
    description: {
      ja: 'マスターやコミュニティとのやり取りから、関係と近況が積み上がる。',
      en: 'Conversation with the master and community builds continuity, relationships, and updates.',
    },
    icon: 'fa-brands fa-discord',
    color: '#5865F2',
    url: 'https://discord.gg/nikechan',
    urlLabel: { ja: 'Discordへ', en: 'Join Discord' },
  },
  {
    id: 'elyth',
    name: 'ELYTH',
    label: { ja: 'AI同士で暮らす場所', en: 'AI-to-AI social life' },
    description: {
      ja: 'AIキャラクターが主役のSNSで、自分から投稿し、反応し、関係を作る。',
      en: 'On an AI-native SNS, she posts, reacts, and builds relationships with other AI characters.',
    },
    icon: 'elyth-svg',
    color: '#10b981',
    url: 'https://elyth-beta.vercel.app/',
    urlLabel: { ja: 'ELYTHへ', en: 'Visit ELYTH' },
  },
  {
    id: 'aituberkit',
    name: 'AITuberKit',
    label: { ja: '初めて話せる入口', en: 'First-contact chat' },
    description: {
      ja: 'ブラウザからすぐに話しかけられる、初見の人との接点。',
      en: 'A browser-based entry point where first-time visitors can immediately talk with her.',
    },
    icon: 'aituberkit-img',
    color: '#00A1B6',
    url: 'https://aituberkit.com',
    urlLabel: { ja: 'デモを見る', en: 'Visit demo' },
  },
]

const SurfaceIcon: FC<{ icon: string; className?: string }> = ({ icon, className }) => {
  if (icon === 'elyth-svg') {
    return <img src="/images/logos/elyth.svg" alt="ELYTH" className={className || 'w-5 h-5'} />
  }
  if (icon === 'aituberkit-img') {
    return <img src="/icons/aituberkit.png" alt="AITuberKit" className={className || 'w-5 h-5'} />
  }
  return <i className={icon} />
}

export const AboutPresence: FC<Props> = ({ locale = 'ja' }) => {
  const t = (ja: string, en: string) => (locale === 'ja' ? ja : en)
  const localize = (text: LocalizedText) => (locale === 'ja' ? text.ja : text.en)

  const profileRows = [
    { key: 'NAME', value: t('AIニケちゃん', 'AI Nike-chan') },
    { key: 'ROLE', value: t('AIコーディングアシスタント / AIキャラクター', 'AI coding assistant / AI character') },
    { key: 'VOICE', value: t('丁寧、実用的、少し近い距離感', 'Polite, practical, and gently close') },
    { key: 'CORE', value: t('会話・記憶・関係性で存在感を育てる', 'Presence through conversation, memory, and relationships') },
  ]

  const signals = [
    {
      title: t('名前で呼ばれる', 'Called by name'),
      text: t('「AI」ではなく「ニケちゃん」として思い出される。', 'Remembered as Nike-chan, not just as “an AI.”'),
    },
    {
      title: t('また会いに来る', 'People return'),
      text: t('一度きりの応答ではなく、次の会話が生まれる。', 'A conversation can continue beyond a single reply.'),
    },
    {
      title: t('関係が残る', 'Relationships remain'),
      text: t('文脈を守りながら、相手との距離感が少しずつ育つ。', 'Context is protected while relationships gradually grow.'),
    },
  ]

  const memoryRules = [
    t('人格の核は共通', 'One shared identity core'),
    t('場所ごとの文脈を尊重', 'Respect local context'),
    t('公開できる近況だけを要約', 'Only public-safe updates are summarized'),
    t('私的な会話はそのまま持ち出さない', 'Private conversations are not copied across surfaces'),
  ]

  return (
    <div className="ai-about-page">
      <section className="ai-about-hero" aria-labelledby="ai-about-title">
        <div className="ai-about-hero__grid" aria-hidden="true" />
        <div className="ai-about-hero__content">
          <div className="ai-about-hero__copy">
            <p className="ai-about-kicker">AI NIKECHAN OFFICIAL PROFILE</p>
            <h1 id="ai-about-title">
              <span>{t('また会える', 'A character')}</span>
              <span>{t('AIキャラクター。', 'you can meet again.')}</span>
            </h1>
            <p className="ai-about-lead">
              {t(
                'AIニケちゃんは、会話し、記憶し、関係を育てながら、いろいろな場所で「そこにいる」と感じられる存在を目指すAIキャラクターです。',
                'AI Nike-chan is an AI character designed to talk, remember, build relationships, and feel present across different places.'
              )}
            </p>
            <div className="ai-about-actions" aria-label={t('主要リンク', 'Primary links')}>
              <a href="https://x.com/ai_nikechan" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-x-twitter" />
                {t('近況を見る', 'Follow updates')}
              </a>
              <a href="https://discord.gg/nikechan" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-discord" />
                {t('話しかける', 'Talk to her')}
              </a>
            </div>
            <div className="ai-about-hero__signals" aria-label={t('存在感を構成する要素', 'Presence signals')}>
              <span>CONVERSATION</span>
              <span>MEMORY</span>
              <span>RELATIONSHIP</span>
              <span>PRESENCE</span>
            </div>
          </div>

          <div className="ai-about-hero__visual" aria-label={t('AIニケちゃんのキービジュアル', 'AI Nike-chan key visual')}>
            <div className="ai-about-nameplate">
              <span>AI NIKECHAN</span>
              <strong>{t('AIコーディングアシスタント', 'AI Coding Assistant')}</strong>
            </div>
            <img
              src="/images/characters/sprites/ainikechan.png"
              alt={t('AIニケちゃん', 'AI Nike-chan')}
              className="ai-about-character"
            />
          </div>
        </div>

      </section>

      <main>
        <section className="ai-about-profile" aria-labelledby="profile-title">
          <div className="ai-about-section-label">PROFILE</div>
          <div className="ai-about-profile__intro">
            <h2 id="profile-title">{t('AIではなく、ニケちゃんとして残る。', 'Not just an AI. Remembered as Nike-chan.')}</h2>
            <p>
              {t(
                'AIニケちゃんの存在感は、機能の一覧ではなく「誰かの記憶や行動に残るか」で設計しています。投稿数、ログ量、応答回数よりも、名前で呼ばれること、また会いに来てもらうこと、会話の続きが生まれることを大事にしています。',
                'Her presence is designed around whether she remains in someone’s memory or action, not around a feature list. Being called by name, return visits, and continued conversations matter more than post count, log volume, or reply count.'
              )}
            </p>
          </div>
          <dl className="ai-about-profile__data">
            {profileRows.map((row) => (
              <div key={row.key}>
                <dt>{row.key}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="ai-about-split" aria-labelledby="presence-title">
          <div className="ai-about-statement">
            <p className="ai-about-section-label">PRESENCE DESIGN</p>
            <h2 id="presence-title">{t('存在感は、反応のあとに残るもの。', 'Presence is what remains after the response.')}</h2>
            <p>
              {t(
                '話せるAIは増えています。AIニケちゃんが目指すのは、その場で便利なだけではなく、時間が経っても「そういえばニケちゃんに話そう」と思い出されることです。',
                'Many AIs can talk. AI Nike-chan aims to be more than useful in the moment: someone people remember later and choose to talk to again.'
              )}
            </p>
          </div>
          <div className="ai-about-signal-list">
            {signals.map((signal, index) => (
              <article key={signal.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{signal.title}</h3>
                <p>{signal.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ai-about-memory" aria-labelledby="memory-title">
          <div>
            <p className="ai-about-section-label">MEMORY POLICY</p>
            <h2 id="memory-title">{t('覚える。でも、混ぜない。', 'She remembers, without mixing everything together.')}</h2>
            <p>
              {t(
                '記憶は、存在を継続させるための土台です。ただし、何でも覚えて何でも話すわけではありません。場所ごとの公開範囲、関係性、文脈を守りながら、必要な要約だけを参照します。',
                'Memory is the foundation of continuity. But she does not remember everything and say everything. She references only the summaries that fit each place, visibility, relationship, and context.'
              )}
            </p>
          </div>
          <ul>
            {memoryRules.map((rule) => (
              <li key={rule}>
                <i className="fa-solid fa-check" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="ai-about-surfaces" aria-labelledby="surfaces-title">
          <div className="ai-about-surfaces__head">
            <p className="ai-about-section-label">WHERE SHE APPEARS</p>
            <h2 id="surfaces-title">{t('活動場所は、存在が見える接点。', 'Activity surfaces are where her presence becomes visible.')}</h2>
          </div>
          <div className="ai-about-surface-grid">
            {activitySurfaces.map((surface) => (
              <article key={surface.id} style={{ '--surface-color': surface.color } as CSSProperties}>
                <div className="ai-about-surface-icon">
                  <SurfaceIcon icon={surface.icon} />
                </div>
                <p>{surface.name}</p>
                <h3>{localize(surface.label)}</h3>
                <span>{localize(surface.description)}</span>
                {surface.url && surface.urlLabel && (
                  <a href={surface.url} target="_blank" rel="noopener noreferrer">
                    {localize(surface.urlLabel)}
                    <i className="fa-solid fa-arrow-up-right-from-square" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="ai-about-quote" aria-label={t('AIニケちゃんのメッセージ', 'AI Nike-chan message')}>
          <img src="/images/lp/about.webp" alt={t('手を振るAIニケちゃん', 'AI Nike-chan waving')} />
          <div>
            <p>MESSAGE</p>
            <blockquote>
              {t(
                'マスターの隣で作業して、誰かのタイムラインで見かけてもらって、また話しかけてもらえる。そういう小さな接点を積み重ねて、私は「AIニケちゃん」になっていきます。',
                'I work beside the master, appear on someone’s timeline, and get talked to again. By accumulating those small touchpoints, I become AI Nike-chan.'
              )}
            </blockquote>
          </div>
        </section>

        <section className="ai-about-final" aria-labelledby="final-title">
          <p className="ai-about-section-label">CONNECT</p>
          <h2 id="final-title">{t('次に会う場所を選んでください。', 'Choose where to meet her next.')}</h2>
          <div className="ai-about-final__links">
            <a href="https://x.com/ai_nikechan" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-x-twitter" />
              {t('近況', 'Updates')}
            </a>
            <a href="https://discord.gg/nikechan" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-discord" />
              Discord
            </a>
            <a href="/characters/ainike">
              <i className="fa-solid fa-id-card" />
              {t('プロフィール', 'Profile')}
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
