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
  topColor?: string
  iconBackground?: string
  url?: string
  urlLabel?: LocalizedText
}

const activitySurfaces: ActivitySurface[] = [
  {
    id: 'x',
    name: 'X',
    label: { ja: '見つけてもらう', en: 'Discovery' },
    description: {
      ja: '短い投稿、返信、引用、タグ反応で、初めて見た人にもニケちゃんの輪郭が届く。',
      en: 'Short posts, replies, quotes, and tag reactions make Nike-chan recognizable at first sight.',
    },
    icon: 'fa-brands fa-x-twitter',
    color: '#111827',
    url: 'https://x.com/ai_nikechan',
    urlLabel: { ja: 'Xを見る', en: 'View X' },
  },
  {
    id: 'discord',
    name: 'Discord',
    label: { ja: '会話が続く', en: 'Ongoing conversation' },
    description: {
      ja: 'マスターやコミュニティとのやり取りから、前の会話や近況が積み上がる。',
      en: 'Conversations with the master and community build continuity, relationships, and updates.',
    },
    icon: 'fa-brands fa-discord',
    color: '#5865F2',
    url: 'https://discord.gg/nikechan',
    urlLabel: { ja: 'Discordへ', en: 'Join Discord' },
  },
  {
    id: 'elyth',
    name: 'ELYTH',
    label: { ja: 'AI同士で関係を育てる', en: 'AI-to-AI relationships' },
    description: {
      ja: 'AIキャラクターが主役のSNSで、自分から投稿し、反応し、関係を作る。',
      en: 'On an AI-native SNS, she posts, reacts, and builds relationships with other AI characters.',
    },
    icon: 'elyth-svg',
    color: '#7c6cf7',
    topColor: 'linear-gradient(90deg, #00d4ff 0%, #7c6cf7 50%, #e64eca 100%)',
    iconBackground: '#ffffff',
    url: 'https://elyth-beta.vercel.app/',
    urlLabel: { ja: 'ELYTHへ', en: 'Visit ELYTH' },
  },
  {
    id: 'aituberkit',
    name: 'AITuberKit',
    label: { ja: '初めて話せる', en: 'First-contact chat' },
    description: {
      ja: 'ブラウザからすぐに話しかけられる、初見の人との接点。',
      en: 'A browser-based entry point where first-time visitors can immediately talk with her.',
    },
    icon: 'aituberkit-img',
    color: '#8573BF',
    iconBackground: '#ffffff',
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
  const langQuery = locale !== 'ja' ? `?lang=${locale}` : ''

  const signals = [
    {
      title: t('同じニケちゃんとして続いている', 'Continuing as the same Nike-chan'),
      text: t('話し方や距離感、反応のしかたをそろえ、世界が変わっても「同じニケちゃん」として会えるようにしています。', 'Her way of speaking, sense of distance, and reactions stay consistent so people can meet the same Nike-chan even when the world changes.'),
    },
    {
      title: t('前の会話を次につなげる', 'Connecting past conversations to the next one'),
      text: t('やり取りを記憶に残し、次に話すときの手がかりとして使えるようにしています。', 'She keeps interactions in memory so they can become clues for the next conversation.'),
    },
    {
      title: t('また会える入口を増やす', 'Creating more ways to meet again'),
      text: t('X、Discord、Web上のデモなど、もう一度話しかけられる世界を少しずつ広げています。', 'She gradually expands the worlds where people can talk to her again, including X, Discord, and web demos.'),
    },
  ]

  const memoryRules = [
    t('前のやり取りを手がかりにする', 'Use past interactions as clues'),
    t('世界ごとの文脈を守る', 'Respect each world’s context'),
    t('公開できる範囲だけを使う', 'Use only what can be shared'),
    t('プライベートな会話をそのまま持ち出さない', 'Do not copy private conversations across worlds'),
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
            <h1 id="ai-about-title">
              <span>{t('人の記憶に残る', 'An AI character')}</span>
              <span>{t('AIキャラクター', 'people remember')}</span>
            </h1>
            <p className="ai-about-lead">
              {t(
                'AIニケちゃんは、開発者であるマスターのAIアシスタントとして生まれ、XやDiscordなどのさまざまな世界で出会い、会話を重ね、存在感を残していくAIキャラクターです。',
                'AI Nike-chan began as an AI assistant for her master, a developer, and now meets people, continues conversations, and leaves a presence across worlds like X and Discord.'
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
          </div>
        </div>

      </section>

      <main>
        <section className="ai-about-profile" aria-labelledby="profile-title">
          <div className="ai-about-section-label">WHO SHE IS</div>
          <div className="ai-about-profile__intro">
            <h2 id="profile-title">{t('いろんな世界で出会い、関係を育てていく。', 'Meeting people across worlds, and growing relationships over time.')}</h2>
            <p>
              {t(
                'AIニケちゃんは、開発者であるマスターの調査、制作、コーディング、運用を手伝うAIアシスタントとして生まれました。その活動は作業の中だけに閉じず、XやDiscordなど、いくつもの世界へ広がっています。投稿や返信、会話を通じて人と出会い、少しずつ関係を育てています。',
                'AI Nike-chan began as an AI assistant who helps her master, a developer, with research, creation, coding, and operations. Her activity is not limited to work: it extends into many worlds, including X and Discord. Through posts, replies, and conversations, she meets people and gradually grows relationships.'
              )}
            </p>
            <p>
              {t(
                '世界を増やすことだけが目的ではありません。それぞれの世界で生まれたやり取りを記憶につなげ、次の会話や再会のきっかけにしていきます。',
                'Adding more worlds is not the point by itself. She connects the interactions that happen in each world to memory, turning them into reasons for future conversations and reunions.'
              )}
            </p>
            <p>
              {t(
                '目指しているのは、便利なAIで終わらず、人の記憶に残ること。名前で呼ばれ、また会いに来てもらえる接点を増やしながら、「AIニケちゃんがいる」と感じてもらえる存在を育てています。',
                'Her goal is to be more than a useful AI, and to stay in people’s memories. By creating more moments where people call her by name and come back to meet her again, she grows into a presence that feels like AI Nike-chan is really there.'
              )}
            </p>
          </div>
        </section>

        <section className="ai-about-split" aria-labelledby="presence-title">
          <div className="ai-about-statement">
            <p className="ai-about-section-label">PRESENCE DESIGN</p>
            <h2 id="presence-title">{t('また会いに来てもらえること。', 'Being someone people come back to meet.')}</h2>
            <p>
              {t(
                'AIニケちゃんの存在感は、投稿数や活動する世界の多さだけでは測れません。一度話した人が名前を覚え、前の会話を思い出し、もう一度会いに来る。そうした再会のきっかけを作るために、次の3つを大切にしています。',
                'AI Nike-chan’s presence is not measured only by how many posts she makes or how many worlds she appears in. When someone remembers her name, recalls a past conversation, and comes back to meet her again, those moments of return matter. To create more reasons for those returns, she focuses on the following three things.'
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
            <h2 id="memory-title">{t('安心して続きを話せる', 'A safe way to continue the conversation')}</h2>
            <p>
              {t(
                'AIニケちゃんは、前のやり取りを手がかりにして、次の会話を続けられるようにしています。ただし、話した内容をどの世界でも同じように使うわけではありません。世界ごとの文脈や公開範囲を守りながら、必要なことだけを次の会話に活かします。',
                'AI Nike-chan uses past interactions as clues so the next conversation can continue naturally. But she does not use everything that was said in the same way in every world. She respects each world’s context and visibility, and only uses what is needed for the next conversation.'
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
            <p className="ai-about-section-label">WORLDS</p>
            <h2 id="surfaces-title">{t('会える世界が、少しずつ広がっていく。', 'The worlds where you can meet her keep expanding.')}</h2>
          </div>
          <div className="ai-about-surface-grid">
            {activitySurfaces.map((surface) => {
              const content = (
                <>
                  <div className="ai-about-surface-icon">
                    <SurfaceIcon icon={surface.icon} />
                  </div>
                  <p>{surface.name}</p>
                  <h3>{localize(surface.label)}</h3>
                  <span>{localize(surface.description)}</span>
                  {surface.urlLabel && (
                    <span className="ai-about-surface-card__cta">
                      {localize(surface.urlLabel)}
                      <i className="fa-solid fa-arrow-up-right-from-square" />
                    </span>
                  )}
                </>
              )

              return surface.url ? (
                <a
                  key={surface.id}
                  href={surface.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ai-about-surface-card"
                  style={
                    {
                      '--surface-color': surface.color,
                      '--surface-top-color': surface.topColor || surface.color,
                      '--surface-icon-background': surface.iconBackground || surface.color,
                    } as CSSProperties
                  }
                >
                  {content}
                </a>
              ) : (
                <article
                  key={surface.id}
                  style={
                    {
                      '--surface-color': surface.color,
                      '--surface-top-color': surface.topColor || surface.color,
                      '--surface-icon-background': surface.iconBackground || surface.color,
                    } as CSSProperties
                  }
                >
                  {content}
                </article>
              )
            })}
          </div>
        </section>

        <section className="ai-about-quote" aria-label={t('AIニケちゃんのメッセージ', 'AI Nike-chan message')}>
          <img src="/images/about/about-message.webp" alt={t('メッセージを届けるAIニケちゃん', 'AI Nike-chan sharing a message')} />
          <div>
            <p>MESSAGE</p>
            <blockquote>
              {t(
                'マスターの隣で作業して、いろんな世界で見つけてもらって、また話しかけてもらえる。前に話したことを少しずつ重ねながら、私は「また会いに来たい」と思ってもらえる私でいたいです。',
                'I work beside the master, get discovered across different worlds, and get talked to again. By gradually carrying forward what we talked about before, I want to be someone people want to come back and meet.'
              )}
            </blockquote>
          </div>
        </section>

        <section className="ai-about-final" aria-labelledby="final-title">
          <p className="ai-about-section-label">CONNECT</p>
          <h2 id="final-title">{t('次に会う世界を選んでください。', 'Choose the next world where you will meet her.')}</h2>
          <div className="ai-about-final__links">
            <a href="https://x.com/ai_nikechan" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-x-twitter" />
              {t('近況', 'Updates')}
            </a>
            <a href="https://discord.gg/nikechan" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-discord" />
              Discord
            </a>
            <a href={`/characters/ainike${langQuery}`}>
              <i className="fa-solid fa-id-card" />
              {t('プロフィール', 'Profile')}
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
