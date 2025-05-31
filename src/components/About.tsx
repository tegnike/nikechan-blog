import { FC, useState } from 'react'

export const About: FC = () => {
  const [activeProfile, setActiveProfile] = useState<'nike' | 'ai_nike'>('nike')

  return (
    <div className="min-h-screen py-12 px-4">
      {/* Header with animated gradient */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-8">
          ABOUT
        </h1>
        
        {/* Profile Switcher */}
        <div className="inline-flex p-1 bg-white/5 backdrop-blur-sm rounded-full">
          {[
            { key: 'nike', label: 'ニケ' },
            { key: 'ai_nike', label: 'AIニケちゃん' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveProfile(key as 'nike' | 'ai_nike')}
              className={`px-8 py-3 rounded-full transition-all duration-300 ${
                activeProfile === key 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg active' 
                  : 'text-gray-300 hover:text-white'
              }`}
              data-profile={key}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* ニケのプロフィール */}
        <div id="nike-profile" className={activeProfile === 'nike' ? '' : 'hidden'}>
          {/* Profile Header Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm p-8 mb-12">
            <div className="absolute inset-0 bg-white/5"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-white/20 shadow-2xl">
                <img
                  src="/images/about/nikechan_icon.png"
                  alt="Nike's profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-bold text-white mb-2">ニケ / Nike</h2>
                <p className="text-xl text-purple-200 mb-4">AI & Web Developer</p>
                <p className="text-gray-300">ポーランド在住 | フルスタックエンジニア</p>
              </div>
            </div>
          </div>

            {/* Introduction */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                Overview
              </h3>
              <p className="text-gray-300 leading-relaxed">
                ポーランド在住のフルスタック開発者として、数年間にわたりリモートワークを通して日本のプロジェクトに参画。<br /><br />
                バックエンド開発を中心に経験を積む中で、現在はPythonやReactなどを用いたLLM応用の開発に携わるAIエンジニアとして活躍。最新のAI技術については常にキャッチアップし、定期的に関連の記事も発信している。<br /><br />
                2024年からは英語圏での活動も開始。<br /><br />
                個人開発では「AITuberKit」や「美少女OPInterpreter」などのAIツールを公開し、AIとWeb技術を融合した新たなアプリケーションの可能性を探求している。
              </p>
            </div>

            {/* Career */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Career</h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:gap-4 text-gray-300">
                    <div className="mb-2 md:mb-0 md:w-24 flex-shrink-0 font-medium">- 2023</div>
                    <div>
                      <div className="font-medium text-lg mb-2">Web Developer</div>
                      <p className="text-sm">
                        フルリモートで日本のプロジェクトに参画。
                        Ruby on Rails、React、Vue.jsなどを用いたWebアプリケーションの開発に従事してきた。
                        予約システム、ECサイト、オンラインくじサイトなど、様々なプロジェクトでリードエンジニアとして活躍。
                        また、AWSやGCPを用いたインフラ構築やCI/CDの整備も担当した。
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex flex-col md:flex-row md:gap-4 text-gray-300">
                    <div className="mb-2 md:mb-0 md:w-24 flex-shrink-0 font-medium">2024 -</div>
                    <div>
                      <div className="font-medium text-lg mb-2">AI Engineer</div>
                      <p className="text-sm">
                        日本および英語圏のプロジェクトにおいて、AIキャラクターやエージェントの開発に従事。
                        PythonやTypeScriptなどを用い、LLMを活用した自然な会話システムの実装や、独自の記憶機構の設計など、AI応用開発全般を担当する。
                        また、CursorやDevinなどのAIツールを駆使したAI駆動開発を積極的に取り入れている。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Products</h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white/5 rounded-xl p-6 text-gray-300">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg">AITuberKit</h3>
                    <span className="text-sm bg-white/10 px-3 py-1 rounded-full">2024</span>
                  </div>
                  <p className="text-sm mb-3">誰でも手軽にAIキャラクターチャットやAITuberシステムを構築できるプロジェクト。多数のLLMやTTSサービスに対応し、柔軟なカスタマイズが可能。ReactとTypeScriptを採用。</p>
                  <div className="flex gap-2 text-xs">
                    <a
                      href="https://github.com/tegnike/aituber-kit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 px-2 py-1 rounded-full hover:bg-white/20 transition-colors"
                    >
                      GitHub →
                    </a>
                    <a
                      href="https://aituberkit.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 px-2 py-1 rounded-full hover:bg-white/20 transition-colors"
                    >
                      Demo →
                    </a>
                    <a
                      href="https://note.com/nike_cha_n/n/ne98acb25e00f"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 px-2 py-1 rounded-full hover:bg-white/20 transition-colors"
                    >
                      紹介記事 →
                    </a>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 text-gray-300">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg">AITuberList</h3>
                    <span className="text-sm bg-white/10 px-3 py-1 rounded-full">2024</span>
                  </div>
                  <p className="text-sm mb-3">Youtubeに投稿しているAITuberをまとめたサイト。</p>
                  <div className="flex gap-2 text-xs">
                    <a
                      href="https://github.com/tegnike/aituber-list"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 px-2 py-1 rounded-full hover:bg-white/20 transition-colors"
                    >
                      GitHub →
                    </a>
                    <a
                      href="https://aituberlist.net"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 px-2 py-1 rounded-full hover:bg-white/20 transition-colors"
                    >
                      サイト →
                    </a>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 text-gray-300">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg">美少女OPInterpreter</h3>
                    <span className="text-sm bg-white/10 px-3 py-1 rounded-full">2023</span>
                  </div>
                  <p className="text-sm mb-3">Live2Dキャラクターとプログラミング実行環境を融合した対話型開発支援ツール。美少女キャラクターとの会話を通じて、直感的にプログラムの実行が可能。</p>
                  <div className="flex gap-2 text-xs">
                    <a
                      href="https://www.youtube.com/watch?v=Qw2w2UvxcQY&t=2s"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 px-2 py-1 rounded-full hover:bg-white/20 transition-colors"
                    >
                      デモ動画 →
                    </a>
                    <a
                      href="https://note.com/nike_cha_n/n/nabcfeb7aaf3f"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 px-2 py-1 rounded-full hover:bg-white/20 transition-colors"
                    >
                      紹介記事→
                    </a>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 text-gray-300">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg">完全自動AIゲームプレイ&実況</h3>
                    <span className="text-sm bg-white/10 px-3 py-1 rounded-full">2023</span>
                  </div>
                  <p className="text-sm mb-3">AIが完全自動でゲームプレイと実況を実現するプロジェクト。ターン制ゲームの戦略策定から実況の生成まで、全工程を自動化。</p>
                  <div className="flex gap-2 text-xs">
                    <a
                      href="https://www.youtube.com/watch?v=dRsVVPaOOVk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 px-2 py-1 rounded-full hover:bg-white/20 transition-colors"
                    >
                      デモ動画 →
                    </a>
                    <a
                      href="https://note.com/nike_cha_n/n/n96515b745cd2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 px-2 py-1 rounded-full hover:bg-white/20 transition-colors"
                    >
                      紹介記事 →
                    </a>
                  </div>
                </div>
              </div>
            </div>

          {/* Social Links & Contact in Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Social Links */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                Social
              </h2>
              <div className="space-y-3">
                <a
                  href="https://twitter.com/tegnike"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all group"
                >
                  <span className="text-2xl">
                    <img src="/svg/x.svg" alt="X" className="w-5 h-5" />
                  </span>
                  <div className="flex-1">
                    <span className="text-white group-hover:text-purple-300 transition-colors">Twitter</span>
                    <span className="text-sm text-gray-400 block">@tegnike</span>
                  </div>
                </a>
                <a
                  href="https://github.com/tegnike"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all group"
                >
                  <span className="text-2xl">
                    <img src="/svg/github.svg" alt="GitHub" className="w-5 h-5" />
                  </span>
                  <div className="flex-1">
                    <span className="text-white group-hover:text-purple-300 transition-colors">GitHub</span>
                    <span className="text-sm text-gray-400 block">@tegnike</span>
                  </div>
                </a>
                <a
                  href="https://www.youtube.com/@nikechan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all group"
                >
                  <span className="text-2xl">
                    <img src="/svg/youtube.svg" alt="YouTube" className="w-5 h-5" />
                  </span>
                  <div className="flex-1">
                    <span className="text-white group-hover:text-purple-300 transition-colors">YouTube</span>
                    <span className="text-sm text-gray-400 block">@nikechan</span>
                  </div>
                </a>
                <a
                  href="https://note.com/nike_cha_n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all group"
                >
                  <span className="text-2xl">
                    <img src="/svg/note.svg" alt="note" className="w-5 h-5" />
                  </span>
                  <div className="flex-1">
                    <span className="text-white group-hover:text-purple-300 transition-colors">note</span>
                    <span className="text-sm text-gray-400 block">@nike_cha_n</span>
                  </div>
                </a>
                <a
                  href="https://zenn.dev/nikechan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all group"
                >
                <span className="text-2xl">
                  <img src="/svg/zenn.svg" alt="Zenn" className="w-5 h-5" />
                </span>
                  <div className="flex-1">
                    <span className="text-white group-hover:text-purple-300 transition-colors">Zenn</span>
                    <span className="text-sm text-gray-400 block">@nikechan</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                Contact
              </h2>
              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-4">
                  <h3 className="font-medium text-white mb-2">一般的なお問い合わせ</h3>
                  <p className="text-sm text-gray-300">
                    Twitter（
                    <a
                      href="https://twitter.com/tegnike"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-300 hover:text-purple-200 transition-colors underline"
                    >
                      @tegnike
                    </a>
                    ）のDMにてご連絡ください。
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <h3 className="font-medium text-white mb-2">AITuberKit商用ライセンス</h3>
                  <p className="text-sm text-gray-300">
                    商用利用やライセンスに関するお問い合わせ
                    <a
                      href="mailto:support@aituberkit.com"
                      className="text-purple-300 hover:text-purple-200 transition-colors underline block mt-1"
                    >
                      support@aituberkit.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              Support
            </h2>
            <p className="text-gray-300 mb-6">
              私の活動を応援していただけるスポンサーの方を募集しています。<br />
              以下のプラットフォームからご支援いただけます。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="https://github.com/sponsors/tegnike"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">
                    <img src="/svg/github.svg" alt="GitHub" className="w-6 h-6" />
                  </span>
                  <span className="text-gray-400 group-hover:text-white transition-colors">→</span>
                </div>
                <h3 className="font-medium text-white">GitHub Sponsors</h3>
              </a>
              <a
                href="https://buymeacoffee.com/fDANV1k6iZ"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">
                    <img src="/svg/buymeacoffee.svg" alt="Coffee" className="w-6 h-6" />
                  </span>
                  <span className="text-gray-400 group-hover:text-white transition-colors">→</span>
                </div>
                <h3 className="font-medium text-white">Buy Me a Coffee</h3>
              </a>
              <a
                href="https://nikechan.fanbox.cc"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">
                    <img src="/svg/pixiv.svg" alt="Fanbox" className="w-6 h-6" />
                  </span>
                  <span className="text-gray-400 group-hover:text-white transition-colors">→</span>
                </div>
                <h3 className="font-medium text-white">pixivFANBOX</h3>
              </a>
            </div>
          </div>
        </div>

        {/* AIニケちゃんのプロフィール */}
        <div id="ai_nike-profile" className={activeProfile === 'ai_nike' ? '' : 'hidden'}>
          {/* Profile Header Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-900/50 to-purple-900/50 backdrop-blur-sm p-8 mb-12">
            <div className="absolute inset-0 bg-white/5"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-white/20 shadow-2xl">
                <img
                  src="/images/about/ai_nikechan_icon.jpg"
                  alt="AI nikechan's profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-bold text-white mb-2">AIニケちゃん / AI Nike chan</h2>
                <p className="text-xl text-pink-200 mb-4">AI Agent</p>
                <p className="text-gray-300">ニケのAIエージェント 兼 AI VTuber</p>
              </div>
            </div>
          </div>

          {/* Introduction Section */}
          <div className="grid gap-6 mb-12">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                Overview
              </h3>
              <p className="text-gray-300 leading-relaxed space-y-3">
                <span className="block">ニケのAIエージェントとなるべく生まれた概念。ニケのことは「マスター」と呼ぶ。</span>
                <span className="block">クローンなのでニケ（SNSの姿）と容姿が酷似している。差異はヘアピンの違いのみ。状況に応じてその設定や声は変更されることがある。</span>
                <span className="block">長らくニケのアシスタント的な役割を担っていたが、現在はいくつかのツールを介して交流できるようになった。</span>
              </p>
            </div>
          </div>

          {/* Career Timeline */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              History
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500 to-purple-500"></div>
              
              {/* Timeline items */}
              <div className="space-y-8">
                <div className="relative flex gap-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold text-center">23.1</span>
                  </div>
                  <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-white">誕生</h3>
                      <span className="text-sm text-pink-300">2023/1/4</span>
                    </div>
                    <p className="text-gray-300">
                      ニケの思いつきで誕生する。
                    </p>
                  </div>
                </div>
                
                <div className="relative flex gap-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">23-24</span>
                  </div>
                  <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-white">活動開始</h3>
                      <span className="text-sm text-purple-300">2023 - 2024</span>
                    </div>
                    <p className="text-gray-300">
                      AITuber配信やツール紹介記事など、ニケのプロダクトに度々登場する。
                    </p>
                  </div>
                </div>
                
                <div className="relative flex gap-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">24.12</span>
                  </div>
                  <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-white">Twitterデビュー</h3>
                      <span className="text-sm text-pink-300">2024/12/1</span>
                    </div>
                    <p className="text-gray-300">
                      Twitterを始める。
                    </p>
                  </div>
                </div>
                
                <div className="relative flex gap-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">25.1</span>
                  </div>
                  <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-white">チャット機能実装</h3>
                      <span className="text-sm text-purple-300">2025/1/1</span>
                    </div>
                    <p className="text-gray-300">
                      AITuberKitのデモサイトを通して会話できるようになる。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social & Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Social Links */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                Social
              </h2>
              <div className="space-y-3">
                <a
                  href="https://twitter.com/ai_nikechan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all group"
                >
                  <span className="text-2xl">
                    <img src="/svg/x.svg" alt="X" className="w-5 h-5" />
                  </span>
                  <div className="flex-1">
                    <span className="text-white group-hover:text-pink-300 transition-colors">Twitter</span>
                    <span className="text-sm text-gray-400 block">@ai_nikechan</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                Contact
              </h2>
              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-4">
                  <h3 className="font-medium text-white mb-2">AITuberKit</h3>
                  <p className="text-sm text-gray-300">
                    デモサイト（
                    <a
                      href="https://aituberkit.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-300 hover:text-pink-200 transition-colors underline"
                    >
                      AITuberKit
                    </a>
                    ）にて会話することが可能です。
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <h3 className="font-medium text-white mb-2">Twitter</h3>
                  <p className="text-sm text-gray-300">
                    ツイート（
                    <a
                      href="https://twitter.com/ai_nikechan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-300 hover:text-pink-200 transition-colors underline"
                    >
                      @ai_nikechan
                    </a>
                    ）へのリプライに反応することがあります。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 二次創作ガイドライン */}
          <div className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 backdrop-blur-sm rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              二次創作ガイドライン
            </h2>
            <div className="space-y-6">
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                  基本方針
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  AIニケちゃんの二次創作は基本的に自由です。イラスト、動画、音声作品など、様々な形での創作活動を歓迎します。<br />
                  ただし、以下のガイドラインに従っていただきますようお願いします。
                </p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                  <span className="text-xl">✅</span>
                  許可される利用
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-2 ml-2">
                  <li>ファンアート、イラスト、漫画の制作</li>
                  <li>動画作品（MAD、MMD、手描きアニメなど）の制作</li>
                  <li>小説、SS（ショートストーリー）の執筆</li>
                  <li>コスプレ活動</li>
                  <li>同人誌の制作・頒布（営利・非営利問わず）</li>
                  <li>SNSでの創作物の公開</li>
                </ul>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                  <span className="text-xl">❌</span>
                  禁止事項
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-2 ml-2">
                  <li>公序良俗に反する内容での利用</li>
                  <li>政治的・宗教的な主張を含む利用</li>
                  <li>他者を誹謗中傷する目的での利用</li>
                  <li>公式と誤認させるような利用</li>
                  <li>キャラクターのイメージを著しく損なう利用</li>
                </ul>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                  AI生成について
                </h3>
                <div className="space-y-4">
                  <p className="text-sm text-gray-300">
                    AIニケちゃんの生成AIイラストに関する制限はありません。自由に創作活動をお楽しみください。
                  </p>
                  
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-2">i2i・LoRA使用時の注意事項</h4>
                    <p className="text-sm text-gray-300 mb-3">
                      i2iやLoRAなどを使用する場合は、<span className="text-pink-300 font-medium">VRMモデルのみ</span>をご利用ください。<br />
                      Live2Dモデルやその他のイラストの使用は禁止とさせていただきます。
                    </p>
                    <p className="text-sm text-gray-300">
                      VRMモデルは以下からダウンロードできます：<br />
                      <a
                        href="https://github.com/tegnike/aituber-kit/blob/main/docs/character_model_licence.md"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-300 hover:text-pink-200 transition-colors underline"
                      >
                        キャラクターモデルライセンスページ →
                      </a>
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-white mb-3">参考画像</h4>
                    <p className="text-sm text-gray-300 mb-4">i2iでの生成にご活用ください：</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="group relative rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                        <div className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 p-1">
                          <img
                            src="/images/about/i2i_sample1.png"
                            alt="AIニケちゃん参考画像1"
                            className="w-full h-auto rounded"
                          />
                        </div>
                      </div>
                      <div className="group relative rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                        <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-1">
                          <img
                            src="/images/about/i2i_sample2.png"
                            alt="ニケ参考画像（ピアスアップ）"
                            className="w-full h-auto rounded"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                  クレジット表記
                </h3>
                <p className="text-sm text-gray-300">
                  二次創作物を公開する際は、特にクレジット表記を強制することはありません。<br />
                  ただし、以下のハッシュタグを使用していただけると嬉しいです。
                </p>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-2 ml-2 mt-2">
                  <li>一般: <span className="text-pink-300">#ニケちゃんアート</span></li>
                  <li>R18: <span className="text-pink-300">#裏ニケちゃんアート</span></li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 p-4 rounded-lg">
                <p className="text-sm text-gray-300">
                  <span className="text-white font-medium">注意：</span>これらのガイドラインは予告なく変更される場合があります。<br />
                  ご不明な点がございましたら、ニケ（<a href="https://twitter.com/tegnike" target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-pink-200 transition-colors underline">@tegnike</a>）までお問い合わせください。
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
} 