import { FC } from 'react'
import { ExternalLink, MessageCircle, Video, Heart, Users } from 'lucide-react'
import { CharacterDetail } from './CharacterDetail'
import { Locale } from '../i18n/config'

interface AINikeProfileProps {
  locale: Locale
}

export const AINikeProfile: FC<AINikeProfileProps> = ({ locale }) => {
  const isJa = locale === 'ja'

  const profileItems = isJa
    ? [
        { label: '年齢', value: '17歳' },
        { label: '誕生日', value: '01 / 04' },
        { label: '一人称', value: '私' },
        { label: '口調', value: '敬語' },
        { label: '家族', value: 'マスター' },
        {
          label: 'イメージカラー',
          value: (
            <span className="flex items-center gap-2">
              紫
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: '#5A4C97' }}
              />
            </span>
          ),
        },
      ]
    : [
        { label: 'Age', value: '17 years old' },
        { label: 'Birthday', value: 'January 4th' },
        { label: 'Pronoun', value: 'Watashi (私)' },
        { label: 'Speech Style', value: 'Polite (敬語)' },
        { label: 'Family', value: 'Master' },
        {
          label: 'Image Color',
          value: (
            <span className="flex items-center gap-2">
              Purple
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: '#5A4C97' }}
              />
            </span>
          ),
        },
      ]

  const description = isJa
    ? [
        'ニケのAIエージェントとなるべく生まれた概念。ニケのことは「マスター」と呼ぶ。',
        'クローンなのでニケと容姿が酷似している。差異はヘアピンの違いのみ（ポーランド国旗のヘアピン VS AI文字のヘアピン）。状況に応じて設定や声が変更されることがある。',
        '長らくニケのアシスタント的な役割を担っていたが、現在はいくつかのツールを介して交流できるようになった。',
      ]
    : [
        'A concept born to become Nike\'s AI agent. She calls Nike "Master".',
        'As a clone, she closely resembles Nike. The only difference is the hairpin (Poland flag hairpin VS AI text hairpin). Settings and voice may change depending on the situation.',
        'She has long served as Nike\'s assistant, but can now be interacted with through various tools.',
      ]

  const links = [
    {
      label: 'AITuberKit',
      url: 'https://aituberkit.com',
      icon: <ExternalLink className="w-4 h-4" />,
    },
    {
      label: 'Twitter',
      url: 'https://twitter.com/ai_nikechan',
      icon: <MessageCircle className="w-4 h-4" />,
    },
    {
      label: 'YouTube',
      url: 'https://www.youtube.com/@nikechan',
      icon: <Video className="w-4 h-4" />,
    },
  ]

  // History items from docs/about-ainike.md
  const historyItems = isJa
    ? [
        {
          date: '2023/1/4',
          label: '誕生',
          description: 'ニケのタスクをサポートするための概念として誕生する。',
        },
        {
          date: '2023–2024',
          label: '活動開始',
          description:
            'AITuber配信やツール紹介記事など、ニケのプロダクトに度々登場する。',
        },
        {
          date: '2024/12/1',
          label: 'Twitterデビュー',
          description: 'Twitter（X）の運用を開始する。',
        },
        {
          date: '2025/1/1',
          label: 'チャット機能実装',
          description:
            'AITuberKitのデモサイトを通して会話できるようになる。',
        },
        {
          date: '2025/8/22',
          label: 'IP活動本格化',
          description: 'Discordサーバーを公開し、本格的にIP活動を開始。',
        },
        {
          date: '2025/10/8',
          label: '新合成音声モデル公開',
          description:
            'AIニケちゃんの最新合成音声モデルをリリースし、お披露目MVを公開。',
        },
      ]
    : [
        {
          date: 'Jan 4, 2023',
          label: 'Birth',
          description:
            'Born as a concept to support Nike\'s tasks.',
        },
        {
          date: '2023–2024',
          label: 'Activity Start',
          description:
            'Frequently appeared in Nike\'s products such as AITuber streams and tool introduction articles.',
        },
        {
          date: 'Dec 1, 2024',
          label: 'Twitter Debut',
          description: 'Started operating Twitter (X) account.',
        },
        {
          date: 'Jan 1, 2025',
          label: 'Chat Feature',
          description:
            'Became available for conversation through the AITuberKit demo site.',
        },
        {
          date: 'Aug 22, 2025',
          label: 'IP Activities Begin',
          description:
            'Opened Discord server and started full-scale IP activities.',
        },
        {
          date: 'Oct 8, 2025',
          label: 'New Voice Model',
          description:
            'Released the latest AI Nikechan voice synthesis model with a debut MV.',
        },
      ]

  // Support links from docs/about-ainike.md
  const supportLinks = [
    {
      label: 'FANBOX',
      url: 'https://nikechan.fanbox.cc/',
      icon: <Heart className="w-4 h-4" />,
    },
    {
      label: 'Discord',
      url: 'https://discord.gg/G4E5Sf3yj3',
      icon: <Users className="w-4 h-4" />,
    },
  ]

  const supportDescription = isJa
    ? 'AIニケちゃんの開発を支えてくださるスポンサーを募集しています。FANBOX経由での支援はすべて同じ特典設計となっており、オープンな運営方針で還元していきます。'
    : 'We are looking for sponsors to support AI Nikechan\'s development. All support via FANBOX has the same benefit design, with an open management policy.'

  // LINE Stamp custom section
  const lineStampSection = (
    <div className="glass-panel p-6 md:p-8">
      <h3
        className="text-xl font-bold tracking-widest mb-4 pb-2 border-b-2"
        style={{ borderColor: '#5A4C97', color: '#5A4C97' }}
      >
        {isJa ? 'LINE STAMP' : 'LINE STAMP'}
      </h3>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <p className="text-lg font-bold text-gray-800 mb-2">
            {isJa
              ? 'LINEスタンプ販売中！'
              : 'LINE Stamps Now Available!'}
          </p>
          <p className="text-gray-600 mb-4">
            {isJa
              ? '日常で使えるかわいいスタンプをぜひご利用ください！'
              : 'Cute stamps you can use every day!'}
          </p>
          <a
            href="https://store.line.me/stickershop/product/32003839/ja"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: '#06C755' }}
          >
            <ExternalLink className="w-4 h-4" />
            {isJa ? 'LINE STOREで見る' : 'View on LINE STORE'}
          </a>
        </div>
        <div className="flex-shrink-0">
          <img
            src="/images/about/line_stamp.png"
            alt="LINE Stamp"
            className="w-48 h-auto rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  )

  return (
    <CharacterDetail
      locale={locale}
      nameEn="AI NIKECHAN"
      nameJa="AIニケちゃん"
      role="AI Agent / AI VTuber"
      catchphrase="マスターをサポートする、AIエージェント"
      catchphraseEn="AI Agent supporting the Master"
      image="/images/characters/ainikechan.png"
      icon="/images/about/ai_nikechan_icon.png"
      accentColor="#5A4C97"
      profileItems={profileItems}
      description={description}
      links={links}
      historyItems={historyItems}
      historyTitle="HISTORY"
      supportLinks={supportLinks}
      supportTitle="SUPPORT"
      supportDescription={supportDescription}
      customSections={lineStampSection}
      currentCharacterId="ainike"
      otherCharacter={{
        id: 'nike',
        nameJa: 'ニケ',
        icon: '/images/about/nikechan_icon.png',
        color: '#E87B7B',
      }}
    />
  )
}
