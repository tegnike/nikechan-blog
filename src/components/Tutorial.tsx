type Props = {
  active?: 'illustration' | 'video'
}

export function Tutorial({ active = 'illustration' }: Props) {
  const tabCardBase =
    'group relative flex-1 w-full overflow-hidden rounded-2xl border-2 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-300';
  const tabCardActive = 'border-purple-500 shadow-lg shadow-purple-200/60';
  const tabCardInactive = 'border-gray-300 shadow-md hover:border-purple-300 hover:shadow-lg';
  const tabLabelBase =
    'absolute inset-x-0 bottom-0 bg-black/60 px-3 py-2 text-center text-sm font-semibold text-white backdrop-blur-sm transition-colors md:text-base';
  const tabLabelActive = 'bg-purple-600/90';
  const tabLabelInactive = 'group-hover:bg-purple-500/80';
  const tabImageClass = 'w-full object-cover aspect-[16/9]';
  const downloadButtonClass =
    'inline-flex items-center gap-2 rounded-md border border-purple-200 bg-white px-3 py-1.5 text-sm font-medium text-purple-600 shadow-sm transition hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2';
  const videoModeButtonBase =
    'flex-1 rounded-lg border px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 focus-visible:ring-offset-2 md:text-base';
  const videoModeButtonActive = 'border-purple-600 bg-purple-600 text-white shadow-lg shadow-purple-200/60';
  const videoModeButtonInactive =
    'border-gray-300 bg-white text-gray-700 hover:border-purple-300 hover:text-purple-600 hover:shadow-md';
  const dancePrompt = [
    'この画像のキャラがダンスを踊っている。',
    '女の子の特徴を以下に示す。',
    '- ヘアピンは「AI」という文字の形をしています。',
    '- 黒いシュシュを使って高めの位置でポニーテールをまとめています。',
    '- Tシャツの胸の部分には、「AITuber」という文字が書かれています。',
  ].join('\n');
  const videoPrompt = [
    'この女の子が日本の有名なアニメの主人公となっている映像。',
    '- 作画枚数多め',
    '- 24 fps',
    '- 高速なカット割り',
    '女の子の特徴を以下に示す。',
    '- ヘアピンは「AI」という文字の形をしています。',
    '- 黒いシュシュを使って高めの位置でポニーテールをまとめています。',
    '- Tシャツの胸の部分には、「AITuber」という文字が書かれています。',
  ].join('\n');
  const videoPrompt2 = [
    'イラストの女の子がカラオケボックスで日本のアニメソングを熱唱している。 カットが0.5秒毎に切り替わる。自然なアニメーション。',
    '女の子の特徴を以下に示す。',
    '- ヘアピンは「AI」という文字の形をしています。',
    '- 黒いシュシュを使って高めの位置でポニーテールをまとめています。',
    '- Tシャツの胸の部分には、「AITuber」という文字が書かれています。',
  ].join('\n');
  const videoPrompt3 = [
    '@ainikechan',
    '魔法使いの姿をして箒の上に乗っている。',
    '真っ暗で顔の見えない悪の魔法使いとの魔法バトル。',
    'セリフ無しで戦闘メイン。',
    'ダイナミックな戦闘アクションシーン。',
    '0.5秒毎に戦闘が切り替わる。',
    'ハロウィンの雰囲気のある幻想的なフィールド。',
  ]

  return (
    <>
      <div className="pt-12 pb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center">TUTORIAL</h1>
      </div>

      <div className="container mx-auto max-w-5xl px-4 pb-16 mt-2">
        {/* タブ切り替え */}
        <div className="mb-6 flex w-full flex-col items-center justify-center gap-4 md:flex-row md:items-stretch">
          <a
            href="/tutorial"
            className={`${tabCardBase} ${active === 'illustration' ? tabCardActive : tabCardInactive} md:max-w-sm`}
            aria-label="画像を生成する"
          >
            <img src="/images/tutorial/gazou.png" alt="画像生成のタブ画像" className={tabImageClass} />
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
            <img src="/images/tutorial/douga.png" alt="動画生成のタブ画像" className={tabImageClass} />
            <span
              className={`${tabLabelBase} ${
                active === 'video' ? tabLabelActive : tabLabelInactive
              }`}
            >
              動画を生成する
            </span>
          </a>
        </div>

        {/* はじめに（共通） */}
        <div className="rounded-xl border border-gray-200 bg-white/80 p-5 shadow-sm mb-6">
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

        {active === 'illustration' ? (
          <div className="rounded-xl border border-gray-200 bg-white/80 p-5 shadow-sm">
            {/* 画像生成コンテンツ */}
            <div className="space-y-8">

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">おすすめの画像生成AI</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  AIニケちゃんの画像を生成するには、さまざまな画像生成AIツールが利用できます。<br />
                  それぞれのツールには特徴があり、用途や予算に応じて選ぶことができます。<br />
                  初心者の方には無料で使えるGoogle AI Studioの<strong className="text-purple-700">Nano Banana</strong>がおすすめです。以下に使い方を解説します。
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
                      <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="underline">https://aistudio.google.com/</a> にアクセスし、Googleアカウントでログインします。
                    </p>
                    <p className="text-gray-600 text-sm mb-2">
                      ログイン後、以下のような画面が表示されるので、「Try Nano Banana」をクリックします。
                    </p>
                    <img src="/images/tutorial/google_ai_studio1.png" alt="Nano Banana Start" className="rounded-lg border border-gray-300 shadow-sm  mb-4" />
                    <p className="text-gray-600 text-sm mb-2">
                      以下のような画面が表示されたら準備OKです。下の入力欄にテキストや画像を入力します。<br />
                      右側のサイドバーは特に操作する必要はありませんが、「Aspect Ratio」は生成される画像のアスペクト比を決定するものなので、必要に応じて変更してください（横 : 縦で表示されています）。
                    </p>
                    <img src="/images/tutorial/google_ai_studio2.png" alt="Nano Banana Start" className="rounded-lg border border-gray-300 shadow-sm" />
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
                    <img src="/images/tutorial/nikechan_三面図_vrm_outer.png" alt="AIニケちゃん 3Dモデル" className="rounded-lg border border-gray-300 shadow-sm mb-2" />
                    <a
                      href="/images/tutorial/nikechan_三面図_vrm_outer.png"
                      download
                      className={downloadButtonClass}
                      aria-label="AIニケちゃん 3Dモデル画像をダウンロード"
                    >
                      画像をダウンロード
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">アニメ風</h3>
                    <img src="/images/tutorial/nikechan_三面図_アニメ風.png" alt="AIニケちゃん アニメ風" className="rounded-lg border border-gray-300 shadow-sm mb-2" />
                    <a
                      href="/images/tutorial/nikechan_三面図_アニメ風.png"
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
                  従来の画像生成ツールでは、細かい指示をする必要がありハードルが高かったのですが、Nano Bananaでは比較的自然な文章で指示が可能です。<br />
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
                        この画像のキャラがダンスを踊っている。<br />
                        女の子の特徴を以下に示す。<br />
                        - ヘアピンは「AI」という文字の形をしています。<br />
                        - 黒いシュシュを使って高めの位置でポニーテールをまとめています。<br />
                        - Tシャツの胸の部分には、「AITuber」という文字が書かれています。<br />
                      </p>
                    </div>
                  </div>

                  <img src="/images/tutorial/dance.png" alt="Nano Banana Prompt Example" className="rounded-lg border border-gray-300 shadow-sm" />
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
                    上記の例の「女の子の特徴を以下に示す。」より下の文章は、私も毎回必ず含めるようにしています。
                  </p>
                </div>

                <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <p className="text-sm text-yellow-800 mb-2">
                    <strong className="text-yellow-900">生成AIのガチャについて：</strong>
                  </p>
                  <p className="text-sm text-yellow-800">
                    生成AIはガチャの要素が強く、同じプロンプトを使っても毎回異なる結果が出ます。<br />
                    そのため、プロンプトが完璧でも期待通りの生成物が出ないことがあるので、気に入った結果が出るまで根気よく試すことが大事です。
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
                  AIで動画を生成するには、OpenAIが開発した<strong className="text-purple-700">Sora 2</strong>がおすすめです。<br />
                  自然な動きや複数のカットを生成でき、場面にあった音声も自動で付与される最新のAIツールです。ブラウザやアプリから利用する場合は無料で利用できます。
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  ただし、Sora 2は一部のユーザで利用できないことが確認できています（詳しい条件は不明）。<br />
                  こちらが利用できない場合は、Xが公開している同じく無料の<strong className="text-purple-700">Grok</strong>を試してみてください。<br />
                  <a href="https://grok.com/" target="_blank" rel="noopener noreferrer" className="underline">https://grok.com/</a>
                </p>
              </div>

              {/* Sora 2コンテンツ */}
              <div className="space-y-8" data-video-mode-container="true">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Sora 2の使い方</h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    ChatGPTのアカウントが必要なので、あらかじめ取得しておきましょう。<br />
                    <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer" className="underline">https://chatgpt.com/</a>
                  </p>

                  <div className="space-y-4 mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Sora 2アプリを開く</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        <a href="https://sora.chatgpt.com/" target="_blank" rel="noopener noreferrer" className="underline">https://sora.chatgpt.com/</a> にアクセスし、ChatGPTアカウントでログインします。<br />
                        ログイン後、以下のような画面が表示されます。
                      </p>
                      <img src="/images/tutorial/sora1.png" alt="Sora 2 Login" className="rounded-lg border border-gray-300 shadow-sm mb-4" />
                      <p className="text-gray-600 text-sm mb-2">
                        下部の入力フォームに動画のプロンプトを入力します。画像を参照させる場合は「+」ボタンから選びましょう。<br />
                        Orientation（向き）では、縦長か横長が選べます。Duration（時間）では、10秒か15秒が選べます。
                      </p>
                      <img src="/images/tutorial/sora2.png" alt="Sora 2 Create Video" className="rounded-lg border border-gray-300 shadow-sm" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white/90 p-4 shadow-sm sm:flex-row sm:items-center">
                  <span className="text-sm font-semibold text-gray-700 sm:w-48">動画の作り方を選ぶ</span>
                  <div className="flex flex-1 flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      data-video-mode-trigger="cameo"
                      data-active-classes={videoModeButtonActive}
                      data-inactive-classes={videoModeButtonInactive}
                      className={`${videoModeButtonBase} ${videoModeButtonInactive}`}
                      aria-pressed="true"
                    >
                      カメオ機能を利用する
                    </button>
                    <button
                      type="button"
                      data-video-mode-trigger="reference"
                      data-active-classes={videoModeButtonActive}
                      data-inactive-classes={videoModeButtonInactive}
                      className={`${videoModeButtonBase} ${videoModeButtonActive}`}
                      aria-pressed="false"
                    >
                      画像参照をする
                    </button>
                  </div>
                </div>

                <div data-video-mode-content="cameo" className="space-y-8 hidden">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">カメオ機能で生成する</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      カメオ機能を使うと簡単にAIニケちゃんの動画を生成することができます。<br />
                      聞き慣れない単語と思われる方もいるかも知れませんが、全く難しいことはありません。
                    </p>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">入力欄でAIニケちゃんを指定する</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        入力欄に <strong>@（アットマーク）</strong> と入力すると、複数の選択肢が現れます。<br />
                        これがカメオというもので、あらかじめ登録されている人物やキャラクターを参考にして動画を生成出来るようになります。
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        AIニケちゃんの場合は <strong>@ainikechan</strong> で利用可能です。
                      </p>
                      <img src="/images/tutorial/sora3.png" alt="Sora 2 Cameo" className="rounded-lg border border-gray-300 shadow-sm mb-4" />
                    </div>
                    <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm text-gray-700">
                        登録されたカメオから生成された作品は誰でも見ることが可能なので、作品作りの参考にするとよいでしょう。<br />
                        AIニケちゃんの場合は、 <a href="https://sora.chatgpt.com/profile/ainikechan" className="underline" target="_blank" rel="noopener noreferrer">https://sora.chatgpt.com/profile/ainikechan</a> から見ることができます。
                      </p>
                    </div>
                    <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm text-gray-700">
                        カメオ機能では複数キャラを指定することも可能です。<br />
                        ただし、4キャラ以上を同時に指定すると、体感的にキャラ崩壊が起こりやすい気がしているので注意が必要です。
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">プロンプトの書き方とサンプル</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      動画生成AIでは「プロンプト」と呼ばれる指示文を入力することで、望んだ動画を生成することができます。<br />
                      Sora 2では、シンプルな指示でもある程度自由に動いてくれますが、より望んだ結果を得るためには具体的な指示を与えることが重要です。
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
                            data-copy-text={videoPrompt3}
                            data-copy-default="コピー"
                            data-copy-success="コピーしました"
                          >
                            コピー
                          </button>
                          <p className="pr-12">
                            @ainikechan<br />
                            魔法使いの姿をして箒の上に乗っている。<br />
                            真っ暗で顔の見えない悪の魔法使いとの魔法バトル。<br />
                            セリフ無しで戦闘メイン。<br />
                            ダイナミックな戦闘アクションシーン。<br />
                            0.5秒毎に戦闘が切り替わる。<br />
                            ハロウィンの雰囲気のある幻想的なフィールド。
                          </p>
                        </div>
                      </div>

                      <video
                        src="/images/tutorial/sora3.mp4"
                        controls
                        playsInline
                        className="mx-auto w-full max-w-xs md:max-w-sm rounded-lg border border-gray-300 shadow-sm"
                      />
                    </div>

                    <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>プロンプトのコツ：</strong>
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        上記の例ではうまくいっていますが、細かい部分が適切に反映されない場合が良くあります。<br />
                        AIニケちゃんの場合は、ヘアピンの形や胸の文字などがよく破綻してしまいます。<br />
                      </p>
                      <p className="text-sm text-gray-700">
                        その場合、細かい要素に関しては、キャラクターの特徴として明示的に指示することが重要です。<br />
                        例えば、「@ainikechan はAIという文字の形をしたヘアピンをしている」などの指示を付け加えるとよいでしょう。
                      </p>
                    </div>
                  </div>
                </div>

                <div data-video-mode-content="reference" className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">資料を用意する</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      動画生成でも、ベースとなる静止画がとても重要です。下記のリファレンス画像を使えば、キャラクター造形を安定させやすくなります。
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">3Dモデル</h3>
                        <img src="/images/tutorial/nikechan_三面図_vrm_outer.png" alt="AIニケちゃん 3Dモデル" className="rounded-lg border border-gray-300 shadow-sm mb-2" />
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700">
                          <span className="font-semibold">ダウンロードする</span>
                          <a
                            href="/images/tutorial/nikechan_三面図_vrm_outer.png"
                            download
                            className={downloadButtonClass}
                            aria-label="AIニケちゃん 3Dモデル画像（横向き）のダウンロード"
                          >
                            横向きの動画用
                          </a>
                          <a
                            href="/images/tutorial/nikechan_三面図_vrm_outer_縦.png"
                            download
                            className={downloadButtonClass}
                            aria-label="AIニケちゃん 3Dモデル画像（縦向き）のダウンロード"
                          >
                            縦向きの動画用
                          </a>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">アニメ風</h3>
                        <img src="/images/tutorial/nikechan_三面図_アニメ風.png" alt="AIニケちゃん アニメ風" className="rounded-lg border border-gray-300 shadow-sm mb-2" />
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700">
                          <span className="font-semibold">ダウンロードする</span>
                          <a
                            href="/images/tutorial/nikechan_三面図_アニメ風.png"
                            download
                            className={downloadButtonClass}
                            aria-label="AIニケちゃん アニメ風画像（横向き）のダウンロード"
                          >
                            横向きの動画用
                          </a>
                          <a
                            href="/images/tutorial/nikechan_三面図_アニメ風_縦.png"
                            download
                            className={downloadButtonClass}
                            aria-label="AIニケちゃん アニメ風画像（縦向き）のダウンロード"
                          >
                            縦向きの動画用
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <p className="text-sm text-yellow-800 mb-2">
                        <strong className="text-yellow-900">資料のアスペクト比について：</strong>
                      </p>
                      <p className="text-sm text-yellow-800">
                        Sora 2では、生成される動画にあったアスペクト比の画像を用意しないと、意図しないトリミングが発生し、画像参照が上手く行われないことがあります。<br />
                        横向きの動画を生成する場合は横長の画像、縦向きの動画を生成する場合は縦長の画像を選んで使い分けましょう。
                      </p>
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
                      動画生成AIでは「プロンプト」と呼ばれる指示文を入力することで、望んだ動画を生成することができます。<br />
                      Sora 2では、シンプルな指示でもある程度自由に動いてくれますが、より望んだ結果を得るためには具体的な指示を与えることが重要です。
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
                            data-copy-text={videoPrompt}
                            data-copy-default="コピー"
                            data-copy-success="コピーしました"
                          >
                            コピー
                          </button>
                          <p className="pr-12">
                            この女の子が日本の有名なアニメの主人公となっている映像。<br />
                            - 作画枚数多め<br />
                            - 24 fps<br />
                            - 高速なカット割り<br />
                            女の子の特徴を以下に示す。<br />
                            - ヘアピンは「AI」という文字の形をしています。<br />
                            - 黒いシュシュを使って高めの位置でポニーテールをまとめています。<br />
                            - Tシャツの胸の部分には、「AITuber」という文字が書かれています。
                          </p>
                        </div>
                      </div>

                      <video
                        src="/images/tutorial/sora.mp4"
                        controls
                        playsInline
                        className="rounded-lg border border-gray-300 shadow-sm"
                      />
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
                        上記の例の「女の子の特徴を以下に示す。」より下の文章は、私も毎回必ず含めるようにしています。
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">開始フレームを用意する</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      三面図をそのまま渡すよりも、最初のフレームとして自然なポーズを取らせた画像を渡すと、より良い結果が得られやすくなります。<br />
                      画像はNano Bananaを使って生成するのが良いでしょう。画像生成については <a href="/tutorial" className="underline">画像生成チュートリアルページ</a> をご覧ください。
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">基本プロンプト例</h3>
                        <div className="relative bg-gray-50 rounded-lg p-4 border border-gray-300 font-mono text-sm text-gray-800">
                          <button
                            type="button"
                            className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            data-copy-text={videoPrompt2}
                            data-copy-default="コピー"
                            data-copy-success="コピーしました"
                          >
                            コピー
                          </button>
                          <p className="pr-12">
                            イラストの女の子がカラオケボックスで日本のアニメソングを熱唱している。 カットが0.5秒毎に切り替わる。自然なアニメーション。<br />
                            女の子の特徴を以下に示す。<br />
                            - ヘアピンは「AI」という文字の形をしています。<br />
                            - 黒いシュシュを使って高めの位置でポニーテールをまとめています。<br />
                            - Tシャツの胸の部分には、「AITuber」という文字が書かれています。
                          </p>
                        </div>
                      </div>

                      <video
                        src="/images/tutorial/sora2.mp4"
                        controls
                        playsInline
                        className="rounded-lg border border-gray-300 shadow-sm"
                      />
                    </div>

                    <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <p className="text-sm text-yellow-800 mb-2">
                        <strong className="text-yellow-900">生成AIのガチャについて：</strong>
                      </p>
                      <p className="text-sm text-yellow-800">
                        生成AIはガチャの要素が強く、同じプロンプトを使っても毎回異なる結果が出ます。<br />
                        そのため、プロンプトが完璧でも期待通りの生成物が出ないことがあるので、気に入った結果が出るまで根気よく試すことが大事です。
                      </p>
                    </div>
                  </div>
                </div>
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
