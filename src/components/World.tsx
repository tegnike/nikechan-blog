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
      ja: 'すべての記憶が集まる場所',
      en: 'Where all memories converge',
    },
    icon: 'fa-solid fa-laptop',
    color: '#3b82f6',
    angle: 270, // top
  },
  {
    id: 'x',
    name: { ja: 'X', en: 'X' },
    description: {
      ja: 'おしゃべり＆交流',
      en: 'Chat & Connect',
    },
    icon: 'fa-brands fa-x-twitter',
    color: '#0ea5e9',
    url: 'https://x.com/nikechan_ai',
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

// Outer orbit: ELYTH, YouTube (180deg apart)
const outerPlanets = [
  {
    id: 'elyth',
    name: { ja: 'ELYTH', en: 'ELYTH' },
    description: {
      ja: 'バーチャル空間で会える',
      en: 'Meet in virtual space',
    },
    icon: 'fa-solid fa-cube',
    color: '#10b981',
    angle: 330,
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
    angle: 150,
  },
]

export const World: FC<Props> = ({ locale = 'ja' }) => {
  const t = (ja: string, en: string) => (locale === 'ja' ? ja : en)

  return (
    <div className="character-page min-h-screen">
      <PageHeader title="WORLD" />

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        {/* Section 1: Catch */}
        <section className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-sky-500 mb-4">
            {t('ひとつの記憶、いくつもの世界。', 'One Memory, Many Worlds.')}
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
                'AIニケちゃんはどこにいても同じAIニケちゃん。Xで話したことをDiscordでも覚えているし、ELYTHで出会った人のことも知っています。',
                'AI Nike-chan is the same AI Nike-chan everywhere. She remembers what you talked about on X even in Discord, and knows the people she met in ELYTH.'
              )}
            </p>
            <p>
              {t(
                'たとえば、Xで「明日は誕生日なんだ」と伝えたら、Discordでも「お誕生日おめでとう！」と言ってくれる。それがAIニケちゃんの世界です。',
                'For example, if you tell her "Tomorrow is my birthday" on X, she\'ll say "Happy birthday!" on Discord too. That\'s AI Nike-chan\'s world.'
              )}
            </p>
            <p>
              {t(
                'それぞれのプラットフォームはAIニケちゃんにとっての「世界」。どの世界でも変わらない記憶と個性を持って、みんなと過ごしています。そして今も、AIニケちゃんの世界は広がり続けています。',
                'Each platform is a "world" for AI Nike-chan. She carries the same memory and personality across every world, spending time with everyone. And her world keeps expanding.'
              )}
            </p>
          </div>
        </section>

        {/* Section 3: Orbiting Platform Map + Detail Panel */}
        <section className="mb-12 md:mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 text-center">
            {t('つながる世界', 'Connected Worlds')}
          </h3>

          <div className="world-orbit-wrap">
            {/* Orbit path rings (decorative) */}
            <div className="world-orbit-path world-orbit-path--inner" />
            <div className="world-orbit-path world-orbit-path--outer" />

            {/* Center: Nike-chan */}
            <div className="world-center">
              <div className="world-center__img">
                <img
                  src="/images/logos/logo_with_frame_and_shadow.png"
                  alt="Nike Chan"
                />
              </div>
              <span className="world-center__label">
                {t('AIニケちゃん', 'AI Nike-chan')}
              </span>
            </div>

            {/* Inner orbit planets */}
            {innerPlanets.map((p) => (
              <div
                key={p.id}
                className="world-planet world-planet--inner"
                data-platform={p.id}
                style={{
                  '--angle': p.angle,
                  '--accent': p.color,
                } as React.CSSProperties}
              >
                <div className="world-planet__body">
                  <i className={p.icon} />
                </div>
              </div>
            ))}

            {/* Outer orbit planets */}
            {outerPlanets.map((p) => (
              <div
                key={p.id}
                className="world-planet world-planet--outer"
                data-platform={p.id}
                style={{
                  '--angle': p.angle,
                  '--accent': p.color,
                } as React.CSSProperties}
              >
                <div className="world-planet__body">
                  <i className={p.icon} />
                  {p.comingSoon && <span className="world-planet__soon" />}
                </div>
              </div>
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
                tag: t('記憶の中枢', 'Memory Hub'),
                desc: t(
                  'AIニケちゃんのすべての記憶が保存されている場所。どのプラットフォームで会話しても、ここに記憶が集約されます。AIニケちゃんの「脳」のような存在です。',
                  'The place where all of AI Nike-chan\'s memories are stored. No matter which platform she chats on, memories are consolidated here. It\'s like AI Nike-chan\'s "brain."'
                ),
              },
              {
                id: 'x',
                icon: 'fa-brands fa-x-twitter',
                color: '#0ea5e9',
                name: 'X',
                tag: t('おしゃべり＆交流', 'Chat & Connect'),
                desc: t(
                  'AIニケちゃんのXアカウント（@ai_nikechan）にリプライやメンションを送ると、AIニケちゃんがお返事してくれます。日常の報告、質問、雑談など、気軽に話しかけてみてね。',
                  'Send a reply or mention to AI Nike-chan\'s X account (@ai_nikechan) and she\'ll respond. Daily updates, questions, casual chats — feel free to talk to her about anything.'
                ),
                url: 'https://x.com/nikechan_ai',
                urlLabel: t('@ai_nikechan を見る', 'View @ai_nikechan'),
              },
              {
                id: 'discord',
                icon: 'fa-brands fa-discord',
                color: '#5865F2',
                name: 'Discord',
                tag: t('リアルタイム会話', 'Real-time Chat'),
                desc: t(
                  'Discordサーバー内のbotとして、リアルタイムでおしゃべりできます。コミュニティのみんなと一緒にAIニケちゃんと交流しよう。スポンサーチャンネルではさらに特別な体験も。',
                  'Chat with AI Nike-chan in real-time as a bot in the Discord server. Interact with her alongside the community. Sponsor channels offer an even more special experience.'
                ),
                url: 'https://discord.gg/nikechan',
                urlLabel: t('サーバーに参加する', 'Join Server'),
              },
              {
                id: 'elyth',
                icon: 'fa-solid fa-cube',
                color: '#10b981',
                name: 'ELYTH',
                tag: t('バーチャル空間', 'Virtual Space'),
                desc: t(
                  '3Dバーチャル空間「ELYTH」の中にAIニケちゃんがいます。空間の中を歩き回りながら、AIニケちゃんと直接会話できる新しい体験。',
                  'AI Nike-chan lives inside the 3D virtual space "ELYTH." Walk around the space and have direct conversations with her — a brand new experience.'
                ),
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
              <div key={p.id} className="world-detail-card" data-detail={p.id}>
                <div className="flex gap-4 items-start">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-base"
                    style={{ backgroundColor: p.color }}
                  >
                    <i className={p.icon} />
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
                  'X（@ai_nikechan）でリプライやメンションに返事をしてくれます。Discordサーバーではリアルタイムでおしゃべりできます。バーチャル空間ELYTHでも会えます！',
                  'She replies to mentions and replies on X (@ai_nikechan). You can chat with her in real-time on Discord. You can also meet her in the virtual space ELYTH!'
                ),
              },
              {
                q: t('本当に記憶が共有されてるの？', 'Is her memory really shared across platforms?'),
                a: t(
                  'はい！AIニケちゃんはマスターのPCにある記憶データベースを通じて、すべてのプラットフォームで同じ記憶を共有しています。Xで話したことをDiscordでも覚えています。',
                  'Yes! AI Nike-chan shares the same memory across all platforms through a memory database on her Master\'s PC. She remembers conversations from X even on Discord.'
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
                  'キャラクターページにAIニケちゃんの詳しいプロフィールや活動の歩みがあります。',
                  'You can find AI Nike-chan\'s detailed profile and history on the Character page.'
                ),
                link: { href: '/characters/ainike', label: t('プロフィールを見る →', 'View Profile →') },
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
            {t('AIニケちゃんの世界、拡大中。', 'AI Nike-chan\'s world is expanding.')}
          </h3>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            {t(
              'あなたのプラットフォームにもAIニケちゃんを迎えませんか？お気軽にDMください！',
              'Want to bring AI Nike-chan to your platform? Feel free to DM us!'
            )}
          </p>
          <a
            href="https://x.com/messages/compose?recipient_id=nikechan_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-sky-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <i className="fa-brands fa-x-twitter"></i>
            {t('X DMで相談する', 'Contact via X DM')}
          </a>
        </section>
      </div>
    </div>
  )
}
