import { FC } from 'react'
import { ExternalLink, MessageCircle, Video, Heart, Users, Cloud } from 'lucide-react'
import { CharacterDetail } from './CharacterDetail'
import { Locale } from '../i18n/config'

interface AINikeProfileProps {
  locale: Locale
  headerTitle?: string
}

export const AINikeProfile: FC<AINikeProfileProps> = ({ locale, headerTitle }) => {
  const isJa = locale === 'ja'

  const profileItems = isJa
    ? [
        { label: '年齢', value: '17歳' },
        { label: '誕生日', value: '01 / 04' },
        { label: '身長', value: '160cm' },
        { label: '一人称', value: '私' },
        { label: '口調', value: '敬語' },
        {
          label: '声',
          value: (
            <span>
              オリジナルモデル（
              <a
                href="/guidelines#voice-model"
                className="text-purple-600 hover:underline"
              >
                利用ガイドライン
              </a>
              ）
            </span>
          ),
        },
        {
          label: 'イメージカラー',
          value: (
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: '#5A4C97' }}
              />
              パープル（#5A4C97）
            </span>
          ),
        },
      ]
    : [
        { label: 'Age', value: '17 years old' },
        { label: 'Birthday', value: 'January 4th' },
        { label: 'Height', value: '160cm' },
        { label: 'Pronoun', value: 'Watashi (私)' },
        { label: 'Speech Style', value: 'Polite (敬語)' },
        {
          label: 'Voice',
          value: (
            <span>
              Original model (
              <a
                href="/guidelines#voice-model"
                className="text-purple-600 hover:underline"
              >
                Usage Guidelines
              </a>
              )
            </span>
          ),
        },
        {
          label: 'Image Color',
          value: (
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: '#5A4C97' }}
              />
              Purple (#5A4C97)
            </span>
          ),
        },
      ]

  const description = isJa
    ? [
        'ニケのAIアシスタントとなるべく生まれた概念。ニケのことは「マスター」と呼ぶ。',
        'クローンなのでニケと容姿が酷似している。差異はヘアピンの違いのみ。',
        '長らくニケのアシスタント的な役割を担っていたが、現在はいくつかのツールを介して交流できるようになった。',
      ]
    : [
        'A concept born to become Nike\'s AI assistant. She calls Nike "Master".',
        'As a clone, she closely resembles Nike. The only difference is the hairpin.',
        'She has long served as Nike\'s assistant, but can now be interacted with through various tools.',
      ]

  const links = [
    {
      label: 'Discord',
      url: 'https://discord.gg/G4E5Sf3yj3',
      icon: <Users className="w-4 h-4" />,
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
    {
      label: 'Sora',
      url: 'https://sora.chatgpt.com/profile/ainikechan',
      icon: <Cloud className="w-4 h-4" />,
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

  // Custom Support Section with detailed content
  const supportSection = (
    <div className="glass-panel p-6 md:p-8">
      <h3
        className="text-xl font-bold tracking-widest mb-2 pb-2 border-b-2"
        style={{ borderColor: '#5A4C97', color: '#5A4C97' }}
      >
        SUPPORT
      </h3>
      <p className="text-gray-500 text-sm mb-4">
        {isJa
          ? 'AIニケちゃんの活動を応援いただける方へ'
          : 'For those who want to support AI Nikechan'}
      </p>
      <p className="text-gray-600 mb-4 leading-relaxed">
        {isJa
          ? 'AIニケちゃんの開発を支えてくださるスポンサーを募集しています。FANBOX経由での支援はすべて同じ特典設計となっており、オープンな運営方針で還元していきます。'
          : 'We are looking for sponsors to support AI Nikechan\'s development. All support via FANBOX has the same benefit design, with an open management policy.'}
      </p>
      <ul className="text-gray-600 mb-6 space-y-2">
        <li className="flex items-center gap-2">
          <span className="text-purple-600">•</span>
          <span>
            {isJa
              ? 'どのプランでも特典は共通で、金額差での優劣はありません'
              : 'All plans have the same benefits, no hierarchy based on amount'}
          </span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-purple-600">•</span>
          <span>
            {isJa
              ? '支援金はモデル改良や運用環境の保守に活用します'
              : 'Support funds are used for model improvement and infrastructure maintenance'}
          </span>
        </li>
      </ul>
      <div className="flex flex-wrap gap-4 mb-8">
        <a
          href="https://nikechan.fanbox.cc/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{ backgroundColor: '#5A4C97' }}
        >
          <Heart className="w-4 h-4" />
          {isJa ? 'FANBOXで支援' : 'Support on FANBOX'}
        </a>
        <a
          href="https://discord.gg/G4E5Sf3yj3"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{ backgroundColor: '#5A4C97' }}
        >
          <Users className="w-4 h-4" />
          {isJa ? 'Discordコミュニティ' : 'Discord Community'}
        </a>
      </div>

      {/* Discord Sponsor Channel Sub-section */}
      <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
        <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Users className="w-4 h-4" style={{ color: '#5A4C97' }} />
          {isJa ? 'Discord スポンサーチャンネル' : 'Discord Sponsor Channel'}
        </h4>
        <p className="text-gray-600 text-sm mb-4">
          {isJa
            ? 'スポンサーにはDiscord内の専用チャンネルをご案内します。ただし情報は可能な限り公開し、ここだけの専有情報は抑制する方針です。'
            : 'Sponsors will have access to a dedicated channel on Discord. However, we aim to share information publicly as much as possible, minimizing exclusive content.'}
        </p>
        <ul className="text-gray-600 text-sm space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-purple-600">•</span>
            <span>
              {isJa
                ? '公開予定のアップデートを先行で共有'
                : 'Early access to upcoming updates'}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-purple-600">•</span>
            <span>
              {isJa
                ? 'AIニケちゃんの調整ログや作業配信の告知'
                : 'AI Nikechan adjustment logs and work stream announcements'}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-purple-600">•</span>
            <span>
              {isJa
                ? 'スポンサー向けイベントの先行案内'
                : 'Early announcements for sponsor events'}
            </span>
          </li>
        </ul>
        <p className="text-gray-500 text-xs mt-4">
          {isJa
            ? '参加手順やチャンネル構成の詳細はDiscord内の特設チャンネルでご案内します。'
            : 'Participation instructions and channel details are provided in a dedicated Discord channel.'}
        </p>
      </div>
    </div>
  )

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
      catchphrase={<>こんにちは ニケです！今日は何をお手伝いしますか？</>}
      catchphraseEn={<>Hello, I'm Nike! What can I help you with today?</>}
      catchphraseLines={['こんにちは ニケです！', '今日は何をお手伝いしますか？']}
      catchphraseLinesEn={['Hello, I\'m Nike!', 'What can I help you with today?']}
      image="/images/characters/sprites/ainikechan.png"
      icon="/images/characters/icons/ainikechan.png"
      accentColor="#5A4C97"
      profileItems={profileItems}
      description={description}
      links={links}
      historyItems={historyItems}
      historyTitle="HISTORY"
      customSections={
        <>
          {lineStampSection}
          {supportSection}
        </>
      }
      currentCharacterId="ainike"
      headerTitle={headerTitle}
      trihedralFigure="/images/characters/trihedral_figures/ainikechan.png"
    />
  )
}
