type Props = {
  active?: 'illustration' | 'video'
}

export function Tutorial({ active = 'illustration' }: Props) {
  const tabCardBase =
    'group relative flex-1 w-full overflow-hidden rounded-2xl border-2 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-300';
  const tabCardActive = 'border-purple-500 shadow-lg shadow-purple-200/60';
  const tabCardInactive = 'border-transparent hover:border-purple-300 hover:shadow-md';
  const tabLabelBase =
    'absolute inset-x-0 bottom-0 bg-black/60 px-3 py-2 text-center text-sm font-semibold text-white backdrop-blur-sm transition-colors md:text-base';
  const tabLabelActive = 'bg-purple-600/90';
  const tabLabelInactive = 'group-hover:bg-purple-500/80';
  const tabImageClass = 'w-full object-cover aspect-[16/9]';
  const downloadButtonClass =
    'inline-flex items-center gap-2 rounded-md border border-purple-200 bg-white px-3 py-1.5 text-sm font-medium text-purple-600 shadow-sm transition hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2';
  const dancePrompt = [
    'この画像の女の子がダンスを踊っている。',
    '女の子の特徴を以下に示す。',
    '- ヘアピンは「AI」という文字の形をしています。',
    '- 黒いシュシュを使って高めの位置でポニーテールをまとめています。',
    '- Tシャツの胸の部分には、「AITuber」という文字が書かれています。',
  ].join('\n');
  const videoPrompt = [
    'AIニケちゃんがカメラ正面で軽快にステップを踏みながらダンスをする短い動画。',
    '映像の特徴を以下に示す。',
    '- 表情は楽しそうな笑顔で、視線はカメラの方向を向いています。',
    '- トップスの胸元には「AITuber」というロゴが読み取れるように表示します。',
    '- 背景はシンプルなパステルカラーのスタジオで、全体的に明るい印象にします。',
    '- 映像全体はアニメ調で、ふんわりとしたライティングにします。',
  ].join('\n');

  return (
    <>
      <div className="pt-12 pb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center">TUTORIAL</h1>
      </div>

      <div className="container mx-auto max-w-5xl px-4 pb-16">
        {/* はじめに（共通） */}
        <div className="rounded-xl border border-gray-200 bg-white/80 p-5 shadow-sm mt-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">はじめに</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            AIニケちゃんは、比較的ガイドラインが緩いキャラクターです。<br />
            このページでは、AIを使ったニケちゃんの画像 および 動画を生成する方法をご紹介します。
          </p>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <p className="text-sm text-gray-700">
              <strong>ポイント：</strong> AI初心者の方でも問題ありません！こちらの手順を参考にオリジナルキャラでも挑戦してみてください。
            </p>
          </div>
        </div>

        {/* タブ切り替え */}
        <div className="mb-6 flex w-full flex-col items-center justify-center gap-4 md:flex-row md:items-stretch">
          <a
            href="/tutorial"
           className={`${tabCardBase} ${active === 'illustration' ? tabCardActive : tabCardInactive} md:max-w-sm`}
            aria-label="画像を生成する"
          >
            <img src="/images/how_to_make/gazou.png" alt="画像生成のタブ画像" className={tabImageClass} />
            <span
              className={`${tabLabelBase} ${
                active === 'illustration' ? tabLabelActive : tabLabelInactive
              }`}
            >
              画像を生成する
            </span>
          </a>
          <a
            href="/tutorial/video"
           className={`${tabCardBase} ${active === 'video' ? tabCardActive : tabCardInactive} md:max-w-sm`}
            aria-label="動画を生成する"
          >
            <img src="/images/how_to_make/douga.png" alt="動画生成のタブ画像" className={tabImageClass} />
            <span
              className={`${tabLabelBase} ${
                active === 'video' ? tabLabelActive : tabLabelInactive
              }`}
            >
              動画を生成する
            </span>
          </a>
        </div>

        {active === 'illustration' ? (
          <div className="rounded-xl border border-gray-200 bg-white/80 p-5 shadow-sm">
            {/* 画像生成コンテンツ */}
            <div className="space-y-8">

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">おすすめの画像生成AI</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  AIニケちゃんの画像を生成するには、さまざまな画像生成AIツールが利用できます。<br />
                  それぞれのツールには特徴があり、用途や予算に応じて選ぶことができます。<br />
                  初心者の方には無料で使えるGoogle AI Studioの<b>Nano Banana</b>がおすすめです。以下に使い方を解説します。
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Nano Bananaの使い方</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                Google アカウントが必要なのであらかじめ取得しておきましょう。
                </p>

                <div className="space-y-4 mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Google AI Studioを開く</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer">https://aistudio.google.com/</a> にアクセスし、Googleアカウントでログインします。
                    </p>
                    <p className="text-gray-600 text-sm mb-2">
                      ログイン後、以下のような画面が表示されるので、「Try Nano Banana」をクリックします。
                    </p>
                    <img src="/images/how_to_make/image1.png" alt="Nano Banana Start" className="rounded-lg border border-gray-300 shadow-sm  mb-4" />
                    <p className="text-gray-600 text-sm mb-2">
                      以下のような画面が表示されたら準備OKです。下の入力欄にテキストや画像を入力します。<br />
                      右側のサイドバーは特に操作する必要はありませんが、「Aspect Ratio」は生成される画像のアスペクト比を決定するものなので、必要に応じて変更してください（横 : 縦で表示されています）。
                    </p>
                    <img src="/images/how_to_make/image2.png" alt="Nano Banana Start" className="rounded-lg border border-gray-300 shadow-sm" />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">資料を用意する</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  画像生成はテキストによる指示のみでも可能ですが、参考画像をアップロードするとより精度が上がります。
                  以下のAIニケちゃんの画像をダウンロードしておきましょう。
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">3Dモデル</h3>
                    <img src="/images/how_to_make/nikechan_三面図_vrm_outer.png" alt="AIニケちゃん 3Dモデル" className="rounded-lg border border-gray-300 shadow-sm mb-2" />
                    <a
                      href="/images/how_to_make/nikechan_三面図_vrm_outer.png"
                      download
                      className={downloadButtonClass}
                      aria-label="AIニケちゃん 3Dモデル画像をダウンロード"
                    >
                      画像をダウンロード
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">アニメ風</h3>
                    <img src="/images/how_to_make/nikechan_三面図_アニメ風.png" alt="AIニケちゃん アニメ風" className="rounded-lg border border-gray-300 shadow-sm mb-2" />
                    <a
                      href="/images/how_to_make/nikechan_三面図_アニメ風.png"
                      download
                      className={downloadButtonClass}
                      aria-label="AIニケちゃん アニメ風画像をダウンロード"
                    >
                      画像をダウンロード
                    </a>
                  </div>
                </div>

                <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <p className="text-sm text-yellow-800 mb-2">
                    <strong className="text-yellow-900">使用可能素材について：</strong>
                  </p>
                  <p className="text-sm text-yellow-800">
                    AIニケちゃん作品をAIを用いて作成する場合、使用できる素材と使用できない素材があります。上記の画像については問題ありません。詳細は <a href="/guidelines/ai" className="text-yellow-900 underline">ガイドラインページ</a> をご覧ください。
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">プロンプトの書き方とサンプル</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  では早速画像を生成してみましょう。
                </p>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  画像生成AIでは「プロンプト」と呼ばれる指示文を入力することで、望んだ画像を生成することができます。<br />
                  従来の画像生成ツールでは、細かい指示を出すのが難しい場合もありましたが、Nano Bananaでは比較的自然な文章で指示が可能です。<br />
                  特に画像を参照させる場合は、プロンプトはかなりシンプルにしても良い結果が得られます。
                </p>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  以下にサンプルをご紹介します。
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">基本プロンプト例</h3>
                    <div className="relative bg-gray-50 rounded-lg p-4 border border-gray-300 font-mono text-sm text-gray-800">
                      <button
                        type="button"
                        className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        data-copy-text={dancePrompt}
                        data-copy-default="コピー"
                        data-copy-success="コピーしました"
                      >
                        コピー
                      </button>
                      <p className="pr-12">
                        この画像の女の子がダンスを踊っている。<br />
                        女の子の特徴を以下に示す。<br />
                        - ヘアピンは「AI」という文字の形をしています。<br />
                        - 黒いシュシュを使って高めの位置でポニーテールをまとめています。<br />
                        - Tシャツの胸の部分には、「AITuber」という文字が書かれています。<br />
                      </p>
                    </div>
                  </div>

                  <img src="/images/how_to_make/dance.png" alt="Nano Banana Prompt Example" className="rounded-lg border border-gray-300 shadow-sm" />
                </div>

                <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>プロンプトのコツ：</strong>
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    参照画像を渡しても、細かい部分がうまく反映されない場合があります。<br />
                    AIニケちゃんの場合は、ヘアピンの形や胸の文字などがよく破綻してしまいます。<br />
                  </p>
                  <p className="text-sm text-gray-700">
                    そのため、細かい要素に関しては、キャラクターの特徴として明示的に指示することが重要です。<br />
                    上記の例の「女の子の特徴を以下に示す。」より下の文章は、私も必ず含めるようにしています。
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white/80 p-5 shadow-sm">
            {/* 動画生成コンテンツ */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">おすすめの動画生成AI</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  静止画から動画を生成するAIツールを使えば、AIニケちゃんを手軽に動かせます。<br />
                  無料枠から商用利用まで用途が分かれるので、目指したいクオリティや尺に合わせて選びましょう。
                </p>
                <ul className="space-y-3">
                  <li className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <strong className="text-purple-700">Pika Labs</strong>
                    <p className="text-gray-600 text-sm mt-1">
                      直感的なUIで動画生成ができる人気サービス。静止画アップロード＋プロンプトで数秒のアニメーションを作れます。
                      アニメ調にも強く、まずはここから試してみるのがおすすめです（無料プランあり）。
                    </p>
                  </li>
                  <li className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <strong className="text-purple-700">Runway Gen-3</strong>
                    <p className="text-gray-600 text-sm mt-1">
                      高品質な生成結果と細かなパラメータ指定が魅力の有料サービス。滑らかな動きやカメラワークを付けたいときに便利です。
                      素材の再編集やシーケンス作成など、制作ワークフローをまとめて扱えます。
                    </p>
                  </li>
                  <li className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <strong className="text-purple-700">AnimateDiff / Stable Video Diffusion</strong>
                    <p className="text-gray-600 text-sm mt-1">
                      ローカル実行できるオープンソース系。準備はやや大変ですが、細かい調整や長尺動画を自由に試したい場合に向いています。
                      ComfyUIなどのワークフローと組み合わせると、より高度な制御ができます。
                    </p>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Pika Labsの使い方</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  ここではPika Labsを例に、動画生成の基本手順を紹介します。ブラウザからアクセスでき、静止画とプロンプトさえあればOKです。
                </p>

                <div className="space-y-4 mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Pika Labsにアクセスする</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      <a href="https://pika.art/" target="_blank" rel="noopener noreferrer">https://pika.art/</a> にアクセスし、GoogleまたはDiscordアカウントでログインします。
                    </p>
                    <p className="text-gray-600 text-sm">
                      ログイン後のダッシュボードで「Create」→「Image to Video」を選びます。
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">入力素材をアップロード</h3>
                    <p className="text-gray-600 text-sm">
                      「Upload Image」から生成したAIニケちゃんの静止画を選択します。背景がシンプルな画像の方が破綻が少なくなります。
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">モーションとスタイルを設定</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Prompt欄に動画の動きを指定します（例：<em>anime girl dancing in place, gentle camera</em>）。<br />
                      右側の「Motion」プリセットを選ぶか、必要に応じてカメラワークを「Static」に設定します。
                    </p>
                    <p className="text-gray-600 text-sm">
                      ネガティブプロンプト欄には、崩したくない要素（例：<em>no distorted face, logo stays readable</em>）を記入しましょう。
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">生成・書き出し</h3>
                    <p className="text-gray-600 text-sm">
                      「Generate」をクリックすると数十秒〜1分ほどでプレビューが表示されます。気になる箇所があればプロンプトやモーションを微調整して再生成します。<br />
                      完成したら「Download」からMP4またはGIF形式で保存できます。
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">資料を用意する</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  動画生成でも、ベースとなる静止画がとても重要です。下記のリファレンス画像を使えば、キャラクター造形を安定させやすくなります。
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">3Dモデル</h3>
                    <img src="/images/how_to_make/nikechan_三面図_vrm_outer.png" alt="AIニケちゃん 3Dモデル" className="rounded-lg border border-gray-300 shadow-sm mb-2" />
                    <a
                      href="/images/how_to_make/nikechan_三面図_vrm_outer.png"
                      download
                      className={downloadButtonClass}
                      aria-label="AIニケちゃん 3Dモデル画像をダウンロード"
                    >
                      画像をダウンロード
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">アニメ風</h3>
                    <img src="/images/how_to_make/nikechan_三面図_アニメ風.png" alt="AIニケちゃん アニメ風" className="rounded-lg border border-gray-300 shadow-sm mb-2" />
                    <a
                      href="/images/how_to_make/nikechan_三面図_アニメ風.png"
                      download
                      className={downloadButtonClass}
                      aria-label="AIニケちゃん アニメ風画像をダウンロード"
                    >
                      画像をダウンロード
                    </a>
                  </div>
                </div>

                <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <p className="text-sm text-yellow-800 mb-2">
                    <strong className="text-yellow-900">使用可能素材について：</strong>
                  </p>
                  <p className="text-sm text-yellow-800">
                    AIニケちゃんの動画を作成する際も、上記の静止画を素材として利用できます。<br />
                    利用可能な範囲は <a href="/guidelines/ai" className="text-yellow-900 underline">ガイドラインページ</a> を必ず確認してください。
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">プロンプトの書き方とサンプル</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  動画生成では、動き・カメラ・表情の3点を意識すると安定した結果になりやすいです。<br />
                  画像生成のときに使った特徴をそのまま流用しつつ、動きの強弱を追加してみましょう。
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">基本モーションを指定する例</h3>
                    <div className="relative bg-gray-50 rounded-lg p-4 border border-gray-300 font-mono text-sm text-gray-800">
                      <button
                        type="button"
                        className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        data-copy-text={videoPrompt}
                        data-copy-default="コピー"
                        data-copy-success="コピーしました"
                      >
                        コピー
                      </button>
                      <p className="pr-12">
                        AIニケちゃんがカメラ正面で軽快にステップを踏みながらダンスをする短い動画。<br />
                        映像の特徴を以下に示す。<br />
                        - 表情は楽しそうな笑顔で、視線はカメラの方向を向いています。<br />
                        - トップスの胸元には「AITuber」というロゴが読み取れるように表示します。<br />
                        - 背景はシンプルなパステルカラーのスタジオで、全体的に明るい印象にします。<br />
                        - 映像全体はアニメ調で、ふんわりとしたライティングにします。<br />
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">英語プロンプト例</h3>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-300 font-mono text-sm text-gray-800">
                      <p>
                        anime girl, nike-chan, dancing in place, smiling at camera, long black hair flows gently, pastel studio background, logo on shirt stays readable, soft lighting, high quality, smooth motion, camera static
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>プロンプトのコツ：</strong>
                  </p>
                  <p className="text-sm text-gray-700">
                    動きが激しすぎるとキャラ崩れにつながるため、最初は「gentle」「soft」など穏やかな表現から試すと安定します。<br />
                    画面揺れを抑えたい場合は「camera stays still」や「background remains steady」といった指定を追加しましょう。
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
                <p className="text-gray-700 leading-relaxed">
                  <strong className="text-purple-700">動画生成のコツ：</strong>
                  まずは3〜4秒程度の短いループ動画からスタートすると、修正箇所が分かりやすく学習しやすいです。<br />
                  生成した動画は動画編集ソフト（DaVinci Resolve、Premiere Proなど）でBGMやテロップを加えると完成度が一気に上がります。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center rounded-xl border border-gray-200 bg-white/80 p-5 shadow-sm mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            AIニケちゃんの二次創作を楽しもう！
          </h2>
          <p className="text-gray-600 mb-6">
            作った作品はぜひSNSでシェアしてください。<br />
            ハッシュタグ「#AIニケちゃん」で投稿すると、管理者が必ずチェックしに行きます！
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/gallery"
              className="inline-block bg-purple-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              作品ギャラリーを見る
            </a>
            <a
              href="/guidelines/ai"
              className="inline-block bg-white border-2 border-purple-600 text-purple-600 font-semibold px-8 py-3 rounded-lg hover:bg-purple-50 transition-colors"
            >
              ガイドラインを確認
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
