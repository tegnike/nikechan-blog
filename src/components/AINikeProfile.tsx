import { FC } from 'react'

export const AINikeProfile: FC = () => {
  return (
    <>
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
              <li>同人誌の制作・頒布（営利目的の場合はご相談ください）</li>
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
    </>
  )
}