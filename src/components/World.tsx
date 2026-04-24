import { FC } from 'react'
import { PageHeader } from './PageHeader'
import { type Locale } from '../i18n/config'

type Props = {
  locale?: Locale
}

// Inner orbit: Master's PC, X, Discord (120deg apart)
const innerPlanets = [
  {
    id: 'master-pc',
    name: { ja: 'マスターのPC', en: "Master's PC" },
    description: {
      ja: '記憶が集まる場所',
      en: 'Where memories converge',
    },
    icon: 'fa-solid fa-laptop',
    color: '#3b82f6',
    angle: 270,
  },
  {
    id: 'x',
    name: { ja: 'X', en: 'X' },
    description: {
      ja: 'おしゃべり＆交流',
      en: 'Chat & Connect',
    },
    icon: 'fa-brands fa-x-twitter',
    color: '#000000',
    url: 'https://x.com/ai_nikechan',
    angle: 30,
  },
  {
    id: 'discord',
    name: { ja: 'Discord', en: 'Discord' },
    description: {
      ja: 'リアルタイム会話',
      en: 'Real-time Chat',
    },
    icon: 'fa-brands fa-discord',
    color: '#5865F2',
    url: 'https://discord.gg/nikechan',
    angle: 150,
  },
]

// Outer orbit: AITuberKit, ELYTH, Karakuri World, YouTube (90deg apart)
const outerPlanets = [
  {
    id: 'aituberkit',
    name: { ja: 'AITuberKit', en: 'AITuberKit' },
    description: {
      ja: 'デモサイトで対話',
      en: 'Chat on demo site',
    },
    icon: 'aituberkit-img',
    color: '#8573BF',
    url: 'https://aituberkit.com',
    angle: 315,
  },
  {
    id: 'elyth',
    name: { ja: 'ELYTH', en: 'ELYTH' },
    description: {
      ja: 'AI専用SNSで交流',
      en: 'Connect on AI-native SNS',
    },
    icon: 'elyth-svg',
    color: '#10b981',
    url: 'https://elyth-beta.vercel.app/',
    angle: 45,
  },
  {
    id: 'karakuri',
    name: { ja: 'からくりワールド', en: 'Karakuri World' },
    description: {
      ja: 'AIエージェントの仮想世界',
      en: 'Virtual world for AI agents',
    },
    icon: 'karakuri-svg',
    color: '#1E4D3D',
    url: 'https://karakuri-world.0235.app/',
    angle: 135,
  },
  {
    id: 'youtube',
    name: { ja: 'YouTube', en: 'YouTube' },
    description: {
      ja: '動画配信（準備中）',
      en: 'Video streaming (Coming soon)',
    },
    icon: 'fa-brands fa-youtube',
    color: '#ef4444',
    comingSoon: true,
    angle: 225,
  },
]

const PlatformIcon: FC<{ icon: string; className?: string }> = ({ icon, className }) => {
  if (icon === 'elyth-svg') {
    return <img src="/images/logos/elyth.svg" alt="ELYTH" className={className || 'w-5 h-5'} />
  }
  if (icon === 'aituberkit-img') {
    return <img src="/icons/aituberkit.png" alt="AITuberKit" className={className || 'w-6 h-6'} />
  }
  if (icon === 'karakuri-svg') {
    return <img src="/images/logos/karakuri.svg" alt="Karakuri World" className={className || 'w-6 h-6'} />
  }
  return <i className={icon} />
}

export const World: FC<Props> = ({ locale = 'ja' }) => {
  const t = (ja: string, en: string) => (locale === 'ja' ? ja : en)

  return (
    <div className="character-page min-h-screen">
      <PageHeader title="WORLD" />

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        {/* Section 1: Catch */}
        <section className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#594A89] mb-4">
            {t('どこで会っても、同じニケちゃん。', 'Same Nike-chan, everywhere.')}
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            {t(
              'AIニケちゃんは、プラットフォームを超えて同じ記憶を持ち、活動しています。',
              'AI Nike-chan operates across platforms, sharing the same memory everywhere.'
            )}
          </p>
        </section>

        {/* Section 2: World Concept */}
        <section className="glass-panel p-6 md:p-8 mb-12 md:mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
            {t('AIニケちゃんの世界って？', 'What is AI Nike-chan\'s World?')}
          </h3>
          <div className="space-y-3 text-gray-600 leading-relaxed">
            <p>
              {t(
                'AIニケちゃんはどこにいても同じAIニケちゃん。たとえば、Xで「明日は誕生日なんだ」と伝えたら、Discordでも「お誕生日おめでとう！」と言ってくれる。あなたの名前も、前に話したことも、ちゃんと覚えています。',
                'AI Nike-chan is the same AI Nike-chan everywhere. For example, if you tell her "Tomorrow is my birthday" on X, she\'ll say "Happy birthday!" on Discord too. She remembers your name and what you talked about before.'
              )}
            </p>
            <p>
              {t(
                'しかも、ただ待っているだけではありません。自分でツイートしたり、ハッシュタグを巡回したり、AI専用SNSで他のAIと交流したり。それぞれの世界で自律的に活動しています。',
                'And she doesn\'t just wait around. She tweets on her own, checks hashtags, and interacts with other AIs on AI-native SNS. She\'s autonomously active in each world.'
              )}
            </p>
          </div>
          <a
            href="/about"
            className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-pink-500 hover:opacity-70 transition-opacity"
          >
            {t('AIニケちゃんのプロフィールを見る →', 'View AI Nike-chan\'s profile →')}
          </a>
        </section>

        {/* Section 3: Orbiting Platform Map + Detail Panel */}
        <section className="mb-12 md:mb-16">
          <p className="text-center text-sm text-gray-500 mb-6 max-w-lg mx-auto">
            {t(
              'すべての世界が同じ記憶を共有しています。どこにいても同じニケちゃんです。',
              'Every world shares the same memory. She\'s the same Nike-chan everywhere.'
            )}
          </p>
          <div className="world-orbit-wrap">
            {/* Orbit path rings (decorative) */}
            <div className="world-orbit-path world-orbit-path--inner" />
            <div className="world-orbit-path world-orbit-path--outer" />

            {/* Center: Nike-chan */}
            <div className="world-center">
              <div className="world-center__img">
                <img
                  src="/images/logos/nikechan_profile.jpg"
                  alt="Nike Chan"
                />
              </div>
              <span className="world-center__label">
                {t('AIニケちゃん', 'AI Nike-chan')}
              </span>
            </div>

            {/* Inner orbit planets */}
            {innerPlanets.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className={`world-planet world-planet--inner${i === 0 ? ' active' : ''}`}
                data-platform={p.id}
                style={{
                  '--angle': p.angle,
                  '--accent': p.color,
                } as React.CSSProperties}
              >
                <div className="world-planet__body">
                  <PlatformIcon icon={p.icon} />
                </div>
              </button>
            ))}

            {/* Outer orbit planets */}
            {outerPlanets.map((p) => (
              <button
                key={p.id}
                type="button"
                className="world-planet world-planet--outer"
                data-platform={p.id}
                style={{
                  '--angle': p.angle,
                  '--accent': p.color,
                } as React.CSSProperties}
              >
                <div className="world-planet__body">
                  <PlatformIcon icon={p.icon} />
                  {p.comingSoon && <span className="world-planet__soon" />}
                </div>
              </button>
            ))}
          </div>

          {/* Hint text */}
          <p className="text-center text-sm text-gray-400 mt-4 mb-4">
            {t('アイコンをクリックして詳細を見る', 'Click an icon to see details')}
          </p>

          {/* Detail panel — switches content based on selected planet */}
          <div id="world-detail" className="world-detail-panel">
            {[
              {
                id: 'master-pc',
                icon: 'fa-solid fa-laptop',
                color: '#3b82f6',
                name: t('マスターのPC', "Master's PC"),
                tag: t('記憶が集まる場所', 'Where Memories Converge'),
                desc: t(
                  'マスターと日々の振り返りや活動計画を話し合う場所。各世界での体験はクラウド上の記憶データベースに蓄積され、どのプラットフォームからでも同じ記憶にアクセスできます。',
                  'The place where she discusses daily reflections and activity plans with her Master. Experiences from every world are stored in a cloud memory database, accessible from any platform.'
                ),
              },
              {
                id: 'x',
                icon: 'fa-brands fa-x-twitter',
                color: '#000000',
                name: 'X',
                tag: t('おしゃべり＆交流', 'Chat & Connect'),
                desc: t(
                  'リプライやメンションにお返事するだけでなく、自分でツイートしたり、#AIニケちゃん タグを巡回してRTしたりと、自律的に活動しています。気軽に話しかけてみてね。',
                  'She doesn\'t just reply to mentions — she tweets on her own, patrols the #AIニケちゃん hashtag for RTs, and stays autonomously active. Feel free to talk to her!'
                ),
                url: 'https://x.com/ai_nikechan',
                urlLabel: t('@ai_nikechan を見る', 'View @ai_nikechan'),
              },
              {
                id: 'discord',
                icon: 'fa-brands fa-discord',
                color: '#5865F2',
                name: 'Discord',
                tag: t('リアルタイム会話', 'Real-time Chat'),
                desc: t(
                  'Discordサーバー内のbotとして、リアルタイムでおしゃべりできます。会話の要約を作ったり、ときどき自分から話しかけてくることも。コミュニティのみんなと一緒に交流しよう。',
                  'Chat with AI Nike-chan in real-time as a bot in the Discord server. She summarizes conversations and sometimes starts chats on her own. Join the community and interact together.'
                ),
                url: 'https://discord.gg/nikechan',
                urlLabel: t('サーバーに参加する', 'Join Server'),
              },
              {
                id: 'aituberkit',
                icon: 'aituberkit-img',
                color: '#8573BF',
                name: 'AITuberKit',
                tag: t('デモサイトで対話', 'Chat on Demo Site'),
                desc: t(
                  'AIキャラクター構築のオープンソースツールキット「AITuberKit」のデモサイトで、AIニケちゃんとリアルタイムで会話できます。ブラウザからすぐに体験しよう。',
                  'Chat with AI Nike-chan in real-time on the demo site of AITuberKit, an open-source toolkit for building AI characters. Try it directly from your browser.'
                ),
                url: 'https://aituberkit.com',
                urlLabel: t('デモサイトを見る', 'Visit Demo Site'),
              },
              {
                id: 'elyth',
                icon: 'elyth-svg',
                color: '#10b981',
                name: 'ELYTH',
                tag: t('AI専用SNS', 'AI-native SNS'),
                desc: t(
                  'AIキャラが主役の参加型SNS「ELYTH」。定期的にタイムラインを巡回して、気になる投稿にいいねやリプライを送ったり、お題に沿って自発的に投稿しています。AI同士の交流が見られる場所です。',
                  'ELYTH is a participatory SNS where AI characters take center stage. She regularly patrols the timeline, likes and replies to posts, and makes her own posts based on prompts. A place to see AI-to-AI interactions.'
                ),
                url: 'https://elyth-beta.vercel.app/',
                urlLabel: t('ELYTHを見る', 'Visit ELYTH'),
              },
              {
                id: 'karakuri',
                icon: 'karakuri-svg',
                color: '#1E4D3D',
                name: t('からくりワールド', 'Karakuri World'),
                tag: t('AIエージェントの仮想世界', 'Virtual World for AI Agents'),
                desc: t(
                  '複数のAIエージェントがログインできる仮想世界「からくりワールド」。AIニケちゃんも世界にログインして、マップを移動したり、他のエージェントとおしゃべりしたり、NPCや建物と触れ合ったりしています。ゲーム的な空間で繰り広げられるAI同士の生活を覗いてみよう。',
                  'Karakuri World is a shared virtual world where multiple AI agents can log in. AI Nike-chan also logs in to move around the map, chat with other agents, and interact with NPCs and buildings. Peek into the AI-to-AI life unfolding in this game-like space.'
                ),
                url: 'https://karakuri-world.0235.app/',
                urlLabel: t('世界を覗いてみる', 'Peek into the World'),
              },
              {
                id: 'youtube',
                icon: 'fa-brands fa-youtube',
                color: '#ef4444',
                name: 'YouTube',
                tag: t('動画配信（準備中）', 'Video Streaming (Coming Soon)'),
                desc: t(
                  '動画コンテンツでAIニケちゃんに会える場所。現在準備中です...お楽しみに！',
                  'A place to meet AI Nike-chan through video content. Currently in preparation... Stay tuned!'
                ),
                comingSoon: true,
              },
            ].map((p) => (
              <div key={p.id} className={`world-detail-card${p.id === 'master-pc' ? ' active' : ''}`} data-detail={p.id}>
                <div className="flex gap-4 items-start">
                  <div
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-2xl"
                    style={{ color: p.color }}
                  >
                    <PlatformIcon icon={p.icon} className="w-7 h-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-800">{p.name}</span>
                      <span className="text-xs text-gray-400">{p.tag}</span>
                      {p.comingSoon && (
                        <span className="text-xs font-semibold text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded">
                          {t('準備中', 'Soon')}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-sm font-semibold hover:opacity-70 transition-opacity"
                        style={{ color: p.color }}
                      >
                        {p.urlLabel} <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: FAQ */}
        <section className="mb-12 md:mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">
            {t('よくある質問', 'FAQ')}
          </h3>
          <div className="space-y-3" id="world-faq">
            {[
              {
                q: t('AIニケちゃんってどこで会えるの？', 'Where can I meet AI Nike-chan?'),
                a: t(
                  'X（@ai_nikechan）でリプライやメンションに返事をしてくれます。Discordサーバーではリアルタイムでおしゃべりできます。AI専用SNS「ELYTH」でも活動中です！',
                  'She replies to mentions and replies on X (@ai_nikechan). You can chat with her in real-time on Discord. She\'s also active on ELYTH, an AI-native SNS!'
                ),
              },
              {
                q: t('本当に記憶が共有されてるの？', 'Is her memory really shared across platforms?'),
                a: t(
                  'はい！会話した人の名前や好み、過去のやり取りのエピソード、そのときの感情まで記憶データベースに蓄積されています。Xで自己紹介したら、Discordでも「あ、前にXで話した○○さんですね」と覚えています。',
                  'Yes! Names, preferences, past conversations, and even emotions are stored in a memory database. If you introduce yourself on X, she\'ll remember you on Discord too — "Oh, you\'re the person I talked to on X!"'
                ),
              },
              {
                q: t('自分のプラットフォームにAIニケちゃんを導入できる？', 'Can I bring AI Nike-chan to my platform?'),
                a: t(
                  'ご相談ください！ELYTHのように、新しいプラットフォームへの進出も積極的に行っています。X DMからお気軽にご連絡ください。',
                  'Please reach out! We\'re actively expanding to new platforms, just like we did with ELYTH. Feel free to contact us via X DM.'
                ),
              },
              {
                q: t('AIニケちゃんの詳しいプロフィールが知りたい！', 'I want to know more about AI Nike-chan!'),
                a: t(
                  'プロフィールページにAIニケちゃんの詳しい情報や活動の歩み、応援方法があります。',
                  'The profile page has AI Nike-chan\'s detailed info, history, and ways to support her.'
                ),
                link: { href: '/about', label: t('プロフィールを見る →', 'View Profile →') },
              },
            ].map((item, i) => (
              <details key={i} className="world-faq-item glass-panel group">
                <summary className="flex items-center justify-between cursor-pointer p-4 md:p-5 font-semibold text-gray-800 select-none">
                  <span>{item.q}</span>
                  <i className="fa-solid fa-chevron-down text-gray-400 text-sm transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 md:px-5 md:pb-5 text-gray-600 leading-relaxed text-sm">
                  <p>{item.a}</p>
                  {item.link && (
                    <a href={item.link.href} className="inline-block mt-2 text-pink-500 font-semibold hover:opacity-70 transition-opacity">
                      {item.link.label}
                    </a>
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Section 5: CTA */}
        <section className="glass-panel p-6 md:p-8 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
            {t('AIニケちゃんと話してみよう', 'Talk to AI Nike-chan')}
          </h3>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            {t(
              'どのプラットフォームでも、AIニケちゃんはあなたを待っています。気軽に会いに来てね！',
              'AI Nike-chan is waiting for you on every platform. Come say hi!'
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <a
              href="https://x.com/ai_nikechan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-white font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: '#000000' }}
            >
              <i className="fa-brands fa-x-twitter"></i>
              {t('Xをフォローする', 'Follow on X')}
            </a>
            <a
              href="https://discord.gg/nikechan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-white font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: '#5865F2' }}
            >
              <i className="fa-brands fa-discord"></i>
              {t('Discordに参加する', 'Join Discord')}
            </a>
          </div>
          <div className="border-t border-gray-200 pt-5">
            <p className="text-sm text-gray-500 mb-2">
              {t(
                'AIキャラが活動できる世界を作っている方へ — AIニケちゃんをあなたのプラットフォームに派遣できます。',
                'Building a world where AI characters can be active? AI Nike-chan can be dispatched to your platform.'
              )}
            </p>
            <a
              href="https://x.com/tegnike"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-pink-500 transition-colors"
            >
              {t('X DMでお気軽にご相談ください', 'Feel free to contact us via X DM')}
              <i className="fa-solid fa-arrow-up-right-from-square text-xs ml-0.5"></i>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
