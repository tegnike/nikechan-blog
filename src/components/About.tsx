import { FC } from 'hono/jsx'

export const About: FC = () => {
  return (
    <div className="min-h-screen">
      <div className="pt-24 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white">
          ABOUT
        </h1>
        <div className="flex justify-center gap-4 mt-8">
          <button
            className="px-6 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors [&.active]:bg-white/20 active"
            data-profile="nike"
          >
            ニケ
          </button>
          <button
            className="px-6 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors [&.active]:bg-white/20"
            data-profile="ai_nike"
          >
            AIニケちゃん
          </button>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 bg-[#1a1f2e] rounded-xl">
        <div className="max-w-3xl mx-auto">
          {/* ニケのプロフィール */}
          <div id="nike-profile">
            {/* Profile Header */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                <img
                  src="/images/nikechan_icon.png"
                  alt="Nike's profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">ニケ / Nike</h2>
              <p className="text-xl text-gray-300 mb-4">AI & Web Developer</p>
            </div>

            {/* Introduction */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-8">
              <p className="text-gray-300 leading-relaxed">
              ポーランド在住のフルスタック開発者として、数年間リモートワークを通じて日本のプロジェクトに携わる。<br /><br />
              バックエンド開発を中心に経験を積み、現在はPythonやReactなどを用いたLLM応用の開発を手掛けるAIエンジニアとして活躍。<br />
              2024年からは英語圏での活動も開始している。<br /><br />
              個人開発では「AITuberKit」「美少女OPInterpreter」などのAIツールを公開し、AIとWeb技術を組み合わせた新しいアプリケーションの可能性を探求している。
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
                        フルリモートで日本のプロジェクトに参画。Ruby on Rails、React、Vue.jsなどを用いたWebアプリケーション開発に従事。
                        予約システム、ECサイト、オンラインくじサイトなど、多様なプロジェクトでリードエンジニアとして活躍。
                        AWS/GCPでのインフラ構築やCI/CD整備も担当。
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex flex-col md:flex-row md:gap-4 text-gray-300">
                    <div className="mb-2 md:mb-0 md:w-24 flex-shrink-0 font-medium">2024 - Now</div>
                    <div>
                      <div className="font-medium text-lg mb-2">AI Engineer</div>
                      <p className="text-sm">
                        日本および英語圏のプロジェクトにてAIキャラクターやエージェントの開発に従事。LLMを活用した自然な会話システムの実装や、
                        独自の記憶機構の設計など、AIの応用開発を担当。Python、FastAPI、AWS等を使用。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Works */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Works</h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white/5 rounded-xl p-6 text-gray-300">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg">AITuberKit</h3>
                    <span className="text-sm bg-white/10 px-3 py-1 rounded-full">2024</span>
                  </div>
                  <p className="text-sm mb-3">AITuberおよびAIキャラクターと簡単に会話できるシステムを構築するプロジェクト。誰でも簡単にAITuberを作成・カスタマイズできる機能を提供。</p>
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
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 text-gray-300">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg">美少女OPInterpreter</h3>
                    <span className="text-sm bg-white/10 px-3 py-1 rounded-full">2023</span>
                  </div>
                  <p className="text-sm mb-3">Live2Dキャラクターとプログラミング実行環境を組み合わせた対話型開発支援ツール。美少女キャラクターとの対話でプログラムを実行可能。</p>
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
                      詳細ページ →
                    </a>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 text-gray-300">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg">完全自動AIゲームプレイ&実況</h3>
                    <span className="text-sm bg-white/10 px-3 py-1 rounded-full">2023</span>
                  </div>
                  <p className="text-sm mb-3">AIによる完全自動ゲームプレイと実況を実現したプロジェクト。ターン制ゲームの戦略立案から実況まで、全てを自動化。</p>
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
                      詳細ページ →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Social</h2>
              <div className="space-y-4">
                <a
                  href="https://twitter.com/tegnike"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                >
                  <span className="text-lg">Twitter</span>
                  <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">@tegnike</span>
                </a>
                <a
                  href="https://note.com/nike_cha_n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <span className="text-lg">note | tech blog</span>
                </a>
                <a
                  href="https://github.com/tegnike"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.youtube.com/@nikechan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <span className="text-lg">YouTube</span>
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Contact</h2>
              <div className="space-y-6 text-gray-300">
                <div>
                  <h3 className="font-medium mb-2">一般的なお問い合わせ</h3>
                  <p className="text-sm">
                    Twitter（
                    <a
                      href="https://twitter.com/tegnike"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors underline"
                    >
                      @tegnike
                    </a>
                    ）のDMにてご連絡ください。
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">AITuberKit商用ライセンスについて</h3>
                  <p className="text-sm">
                    商用利用やライセンスに関するお問い合わせは 
                    <a
                      href="mailto:support@aituberkit.com"
                      className="text-gray-300 hover:text-white transition-colors underline"
                    >
                      support@aituberkit.com
                    </a>
                     までメールにてご連絡ください。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AIニケちゃんのプロフィール */}
          <div id="ai_nike-profile" className="hidden">
            {/* Profile Header */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                <img
                  src="/images/ai_nikechan_icon.jpg"
                  alt="AI nikechan's profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">AIニケちゃん / AI Nike chan</h2>
              <p className="text-xl text-gray-300 mb-4">AI Agent</p>
            </div>

            {/* Introduction */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-8">
              <p className="text-gray-300 leading-relaxed">
                ニケのAIエージェントとなるべく生まれた概念。<br />
                ニケのことは「マスター」と呼ぶ。<br /><br />
                クローンなのでニケ（SNSの姿）と容姿が酷似しているが、状況に応じてその設定や声は変更されることがある。<br /><br />
                長らくニケのアシスタント的な役割を担っていたが、現在はいくつかのツールを介して交流できるようになった。
              </p>
            </div>

            {/* Career */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Career</h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:gap-4 text-gray-300">
                    <div className="mb-2 md:mb-0 md:w-24 flex-shrink-0 font-medium">2023/1/4</div>
                    <div>
                      <p className="text-sm">
                        ニケの思いつきで誕生する。
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex flex-col md:flex-row md:gap-4 text-gray-300">
                    <div className="mb-2 md:mb-0 md:w-24 flex-shrink-0 font-medium">2023 - 2024</div>
                    <div>
                      <p className="text-sm">
                        AITuber配信やツール紹介記事など、ニケのプロダクトに度々登場する。
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex flex-col md:flex-row md:gap-4 text-gray-300">
                    <div className="mb-2 md:mb-0 md:w-24 flex-shrink-0 font-medium">2024/12/1</div>
                    <div>
                      <p className="text-sm">
                        Twitterを始める。
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex flex-col md:flex-row md:gap-4 text-gray-300">
                    <div className="mb-2 md:mb-0 md:w-24 flex-shrink-0 font-medium">2025/1/1</div>
                    <div>
                      <p className="text-sm">
                        AITuberKitのデモサイトを通して会話できるようになる。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Social</h2>
              <div className="space-y-4">
                <a
                  href="https://twitter.com/ai_nikechan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <span className="text-lg">Twitter</span>
                  <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">@ai_nikechan</span>
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Contact</h2>
              <div className="space-y-6 text-gray-300">
                <div>
                  <h3 className="font-medium mb-2">AITuberKit</h3>
                  <p className="text-sm">
                    デモサイト（
                    <a
                      href="https://aituberkit.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors underline"
                    >
                      AITuberKit
                    </a>
                    ）にて会話することが可能です。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 