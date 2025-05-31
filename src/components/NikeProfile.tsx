import { FC } from 'react'

export const NikeProfile: FC = () => {
  return (
    <>
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
    </>
  )
}