import { FC } from 'hono/jsx'

export const AboutMe: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1f2e] to-[#141821] dark:from-[#1a1f2e] dark:to-[#141821]">
      <div className="pt-24 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white">
          ABOUT ME
        </h1>
      </div>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Introduction */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 mb-8">
            <p className="text-gray-300 leading-relaxed">
              Webエンジニア経験を持つフルスタック開発者として、Ruby on Railsを中心としたバックエンド開発を得意としています。
              2024年からはAIエンジニアとしてキャリアを広げ、LLMを活用したAIキャラクター開発やAIエージェント開発に注力しています。
              技術革新への情熱を持ち続け、AIとWeb技術の両方を活かした革新的なプロダクト開発に取り組んでいます。
            </p>
          </div>

          {/* Career */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Career</h2>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex gap-4 text-gray-300">
                  <div className="w-24 flex-shrink-0">2024 - Now</div>
                  <div>
                    <div className="font-medium">AI Engineer</div>
                    <p className="text-sm text-gray-400 mt-1">
                      AIキャラクターやエージェントの開発に従事。LLMを活用した自然な会話システムの実装や、
                      独自の記憶機構の設計など、AIの応用開発を担当。Python、FastAPI、AWS等を使用。
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex gap-4 text-gray-300">
                  <div className="w-24 flex-shrink-0">- 2023</div>
                  <div>
                    <div className="font-medium">Web Developer</div>
                    <p className="text-sm text-gray-400 mt-1">
                      Ruby on Rails、React、Vue.jsなどを用いたWebアプリケーション開発に従事。
                      予約システム、ECサイト、オンラインくじサイトなど、多様なプロジェクトでリードエンジニアとして活躍。
                      AWS/GCPでのインフラ構築やCI/CD整備も担当。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Works */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 mb-8">
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
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Social</h2>
            <div className="space-y-4">
              <a
                href="https://twitter.com/tegnike"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
              >
                <span className="text-lg">Twitter | メイン</span>
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">@tegnike</span>
              </a>
              <a
                href="https://twitter.com/ai_nikechan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <span className="text-lg">Twitter | AI</span>
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">@ai_nikechan</span>
              </a>
              <a
                href="https://note.com/nikechan_note"
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
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Contact</h2>
            <div className="space-y-6 text-gray-300">
              <div>
                <h3 className="font-medium mb-2">一般的なお問い合わせ</h3>
                <p className="text-sm text-gray-400">
                  Twitter（
                  <a
                    href="https://twitter.com/tegnike"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    @tegnike
                  </a>
                  ）のDMにてご連絡ください。
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">AITuberKit商用ライセンスについて</h3>
                <p className="text-sm text-gray-400">
                  商用利用やライセンスに関するお問い合わせは 
                  <a
                    href="mailto:support@aituberkit.com"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    support@aituberkit.com
                  </a>
                   までメールにてご連絡ください。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 