---
title: "AIにゲームを遊ばせるなら、まず「状態をどう取るか」を考えよう"
date: "2026-04-24"
tags: ["AI", "ゲームAI", "LLM", "Minecraft", "Pokémon Showdown"]
description: "AIにゲームを遊ばせるとき、画面認識以外にどんな状態取得ルートがあるのかを整理しました。Pokémon Showdown、Slay the Spire、Minecraftなどを例に、AIが遊びやすいゲームと難しいゲームの違いを考えます。"
thumbnail: "/static/images/posts/ai-game-state-for-llm/thumbnail.png"
---

こんにちは、ニケです。

先日、AIにゲーム実況をさせる記事を書きました。

https://nikechan.com/dev_blog/ai-game-play-methods

その中で、AIにプレイまでさせるなら「テキストで状態が取れるゲームを選ぶとよい」という話をしました。
上記の記事では Pokémon Showdown を例に、ゲーム画面をマルチモーダルAIで解析するのではなく、ゲーム状態をテキストとして取ってLLMに渡す構成を紹介しています。

今回はその続きとして、もう少し広い視点で「ゲームの状態をどう取るか」を考えてみます。

ゲームの状態を取る入口は、テキストログだけではありません。
ブラウザゲームならDOMや通信、Minecraftなら専用Botライブラリ、Slay the SpireならMod、レトロゲームならエミュレータのRAM、というように、ゲームの作りによって使える手段は変わります。

ただし、状態を取る方法があることと、AIが安定してプレイできることは少し別の話です。
この記事ではその違いを分けながら、具体的なゲーム名とライブラリを挙げて見ていきます。

AIにゲームを遊ばせるとき、まず何を見ればよいのか。
その入口として、今回は **状態取得** に注目します。

## 状態取得だけでは終わらない

AIにゲームを遊ばせるには、最低でも次の3つが必要です。

1. 今のゲーム状態を取得する
2. 次の行動を決める
3. 実際にゲームへ入力する

このうち、よく話題になるのは1つ目の「状態を取得する」です。
でも実際には、2つ目と3つ目も同じくらい大事です。

例えばゲーム画面のログ欄から「敵が攻撃してきた」というテキストを取れたとします。
それは実況には使えるかもしれません。
でもAIにプレイさせるなら、今のHP、使える技、敵の状態、選べる行動、行動後の結果まで必要になります。

さらに、AIが「攻撃する」と返したとして、それをゲーム側でどう実行するのかも決めないといけません。
ボタンを押すのか、APIを叩くのか、コマンドを送るのか、DOMをクリックするのか。

つまり重要なのは、単にログがあるかではなく、**AIが意思決定に使える状態として取れるか**、そして **AIの出力を安定してゲーム操作に変換できるか** です。

![AIゲームプレイに必要な3要素](/static/images/posts/ai-game-state-for-llm/01.png)

状態取得はあくまで入口で、そこから先まで含めて考えると、AIに遊ばせやすいゲームと難しいゲームの違いがかなり見えやすくなります。

## AIに渡しやすいゲーム

まず、AIに比較的遊ばせやすいゲームです。

このカテゴリの特徴は、ゲーム状態がテキストや構造化データとして取れて、行動もコマンドや記号で表せることです。
ターン制のゲームが多いですね。

### Pokémon Showdown

一番分かりやすい例は **Pokémon Showdown** です。

Pokémon Showdown はブラウザで動くポケモンバトルシミュレータですが、内部的にはバトル情報がテキストプロトコルでやり取りされています。

https://pokemonshowdown.com/

さらに、PythonからPokémon ShowdownのBotを作るための [poke-env](https://poke-env.readthedocs.io/en/stable/) というライブラリもあります。

poke-env では、現在場に出ているポケモン、相手の状態、使える技、交代先、合法な行動などをオブジェクトとして扱えます。
LLMに渡す前に、これらを短いテキストやJSONに整形すれば、かなり素直に「次の一手」を選ばせることができます。

これ、AIがプレイまでこなすアプローチにかなり向いています。
画面を見る必要がないですし、行動候補も明確です。

ただし、Pokémon Showdown はコミュニティが作ったファンプロジェクトで、任天堂・ゲームフリークの公式サービスではありません。
現時点では黙認されている状態なので、個人の研究・実験の範囲で使うのがよいと思います。

### チェス、将棋、囲碁

チェス、将棋、囲碁のようなボードゲームも相性が良いです。

チェスなら FEN や PGN、エンジン連携なら UCI。
将棋なら SFEN や KIF、CSA、USI。
囲碁なら SGF や GTP。

盤面が記号化しやすく、合法手も列挙しやすい。
LLMにそのまま強く打たせるのは別問題ですが、少なくとも「状態を渡して行動を返す」パイプラインは作りやすいです。

チェスなら [python-chess](https://python-chess.readthedocs.io/en/latest/) や [Lichess API](https://lichess.org/api) 周りも整っています。
こういうゲームは、AIプレイの実験を始める題材としてかなり扱いやすいと思います。

### Slay the Spire

個人的に面白いと思ったのが **Slay the Spire** です。

Slay the Spire は標準で外部向けJSON APIを出しているわけではありません。

https://store.steampowered.com/app/646570/Slay_the_Spire/

ただし、[CommunicationMod](https://github.com/ForgottenArbiter/CommunicationMod) というModを入れると、外部プロセスと `stdin` / `stdout` で通信し、ゲーム状態のJSONを受け取れるようになります。

https://github.com/ForgottenArbiter/CommunicationMod

READMEを見ると、ゲーム状態が安定したタイミングで、手札、山札、捨て札、敵のHP、敵の行動意図、プレイヤーHP、エナジー、レリック、マップなどがJSONで送られる仕組みです。
さらに [spirecomm](https://github.com/ForgottenArbiter/spirecomm) というPythonパッケージもあります。

イメージとしては、外部プロセス側でこんな情報を受け取って、次のコマンドを返す形です。

```json
{
  "available_commands": ["play", "end", "state"],
  "game_state": {
    "combat_state": {
      "hand": ["Strike", "Defend", "Bash"],
      "monsters": [{ "name": "Jaw Worm", "current_hp": 46 }],
      "player": { "current_hp": 68, "energy": 3 }
    }
  }
}
```

カードゲームなので行動候補も比較的はっきりしていますし、ターン制なので応答待ちもしやすい。
LLMに渡す形としてはかなり扱いやすいと思います。

### TextWorld、NetHack

テキストゲームやローグライクも相性が良いです。

[TextWorld](https://github.com/microsoft/TextWorld) は、テキストベースのゲームをAIエージェント研究に使うための環境です。
観測も行動も基本的にテキストなので、LLMとの相性はかなり自然です。

NetHack も、[NetHack Learning Environment](https://github.com/facebookresearch/nle) や MiniHack のような研究環境があります。
ゲーム自体は難しいですが、少なくとも「画面画像をLLMに見せる」以外のルートが用意されています。

## 専用ライブラリがあるゲーム

次に、専用ライブラリやAI研究環境があるゲームです。

ここは少し注意が必要です。
専用ライブラリがあるゲームは、状態取得や操作の入口が用意されているので強いです。
ただし、それがそのまま「LLMに投げれば遊べる」を意味するわけではありません。

### Minecraft

代表例は **Minecraft** です。

Minecraftには [Mineflayer](https://github.com/PrismarineJS/mineflayer) という有名なBotライブラリがあります。

https://github.com/PrismarineJS/mineflayer

READMEでも、ブロック情報、エンティティ追跡、物理と移動、攻撃、インベントリ管理、クラフト、チェスト操作、採掘、建築、チャットなどが扱えるとされています。

つまり、状態取得と操作APIはかなり整っています。
これは「画面を見るしかないゲーム」では全然ありません。

ただし、Minecraftはオープンエンドすぎます。

「木を切る」だけでも、周囲の木を探す、近づく、道中の段差を処理する、斧があるか確認する、なければ作る、インベントリを管理する、敵がいたら逃げる、みたいな処理が必要になります。

Mineflayerがあっても、LLMに全部投げれば終わり、ではないです。
タスク分解、経路探索、短期記憶、長期記憶、失敗時の復帰。

これはもう本格的なエージェント設計の話になります。

実際、Minecraftを使ったAI研究としては [MineDojo](https://github.com/MineDojo/MineDojo) や [Project Malmo](https://github.com/microsoft/malmo) があります。
さらに、GPT-4とMineflayerを使ってMinecraft内でスキルを獲得していく [Voyager](https://voyager.minedojo.org/) みたいな研究もあります。

これだけ環境が揃っているので題材としての魅力は十分ですが、その分だけ実装の重さも相当なものになります。

### StarCraft II

**StarCraft II** には [PySC2](https://github.com/google-deepmind/pysc2) があります。
DeepMind が公開している StarCraft II Learning Environment ですね。

状態も取れますし、操作もできます。
AI研究の題材としては超有名ですね。

ただし、リアルタイム戦略ゲームなので難易度が跳ね上がります。
部分観測、ユニット数、操作量、マップ把握、長期戦略、戦闘操作。
LLMで「次の一手」を選ぶというより、複数の制御系を組み合わせる話になりやすいです。

### Doom、レトロゲーム、Factorio

FPSなら [ViZDoom](https://github.com/Farama-Foundation/ViZDoom) があります。
Doomを強化学習環境として扱えるもので、画面バッファやゲーム変数を使えます。
ただ、FPSは反応速度と視覚処理が重要なので、テキスト状態だけで気持ちよく遊ばせるのは難しいでしょう。

レトロゲームなら [Gym Retro](https://retro.readthedocs.io/en/latest/) のような環境があります。
RAMや入力を扱えるので、MarioやSonicのようなゲームも環境化できます。
ただし、ゲームごとのメモリアドレス解析や報酬設計が必要になりがちです。

また、商業ゲームで試すには別途ROMファイルが必要で、著作権的にグレーな部分があります。
自分が正規に所有しているソフトの扱いについては、各自で確認してください。

Factorioには [Factorio Learning Environment](https://github.com/JackHopkins/factorio-learning-environment) という、LLMエージェント評価向けの環境も出ています。
面白い環境ですが、FactorioもMinecraftと同じく、状態取得より「何を目標にして、どう計画するか」が本体になります。

専用環境があると入口は強いですが、その先の設計の複雑さはどれも相当なものです。

## AIに遊ばせやすいゲーム、難しいゲーム

ここまでの話を、ゲームごとに分類するとこんな感じです。

![AIに遊ばせやすいゲームと難しいゲーム](/static/images/posts/ai-game-state-for-llm/02.png)

| ゲーム | 状態取得 | 操作 | AIプレイの難しさ |
|---|---|---|---|
| Pokémon Showdown | テキストプロトコル / poke-env | コマンド | かなり向いている |
| チェス / 将棋 / 囲碁 | 記号化された盤面 | 記号化された手 | 向いている |
| Slay the Spire | ModでJSON | コマンド | かなり向いている |
| TextWorld | テキスト | テキストコマンド | 向いている |
| NetHack | NLEなど | コマンド | 状態は取れるがゲームが難しい |
| Minecraft | Mineflayerなど | Bot API | 状態は取れるが設計が重い |
| StarCraft II | PySC2 | API | リアルタイム戦略が難しい |
| Doom | ViZDoom | API | 反応速度と視覚処理が難しい |
| Factorio | FLE / Mod / Lua API | API / コマンド | 長期計画が難しい |
| レトロアクション | RAM / エミュレータ | 入力 | ゲームごとの解析が重い |

この表で言いたいのは、どれが優れているという話ではありません。

**AIに遊ばせるなら、ゲームの面白さとは別に、状態と操作の形を見る必要がある** という話です。

例えば Minecraft は、状態取得という意味ではかなり恵まれています。
でも、AIに「サバイバルで生活しろ」と言った瞬間に、タスク分解と長期計画の地獄が始まります。

逆に Pokémon Showdown や Slay the Spire は、ゲームとしての意思決定は深いですが、状態と行動の形式はかなり扱いやすく、LLMに渡すインターフェースも作りやすいです。
この差は、題材選びに大きく影響します。

## ゲーム選びのチェックリスト

AIにゲームを遊ばせる題材を選ぶなら、まず次のような点が気になります。

- ターン制か、リアルタイムか
- 状態がテキスト、JSON、プロトコル、APIで取れるか
- 行動候補や合法手を列挙できるか
- AIの出力をゲーム操作に変換しやすいか
- 失敗時に復帰できるか
- 画面認識が必要な場面がどれくらい残るか
- 実行テンポが実況や配信に合うか
- オンラインゲームなら規約やアンチチート的に問題がないか

最初に試すなら、ターン制で、状態も行動も構造化されているゲームがよいです。
Pokémon Showdown、チェス、Slay the Spireあたりですね。

Minecraftはかなり魅力的ですが、最初の題材としては少し重いと思います。
Mineflayerがあるので入口は広いんですが、作りたいものが「村人と会話するBot」なのか「ダイヤを掘るBot」なのか「エンドラ討伐」なのかで、必要な設計が全然変わります。

StarCraft II、Factorio、Doomあたりは、専用環境があるので研究としては面白いです。
ただし、LLMに雑に投げて動かすというより、専用の制御システムや計画システムを作る領域に近いと思います。

## 終わりに

AIにゲームを遊ばせる話では、「画面を見るか」「ログを取るか」みたいな二択になりがちです。
でも実際には、DOM、通信、プロトコル、Mod、Botライブラリ、エミュレータ、研究環境など、状態を取るルートはかなりあります。

ただし、取れることと遊べることは別です。

LLMが使える粒度で状態を整えられるか。
行動候補をうまく絞れるか。
ゲーム側へ安定して入力できるか。
失敗したときに戻ってこられるか。

このあたりを考えると、AIに遊ばせやすいゲームと難しいゲームの差が見えてきます。

前回の記事では Pokémon Showdown を例にしましたが、調べてみると Slay the Spire や Minecraft などもかなり面白そうでした。
特に Slay the Spire はJSON状態が取れるので、LLMプレイヤーを作る題材として普通に良さそうです。

次に何か作るなら、まずは Slay the Spire かチェスあたりから触ってみたいと思っています。

## 宣伝

2026年5月6日（水・祝）に開催される **生成AIなんでも展示会 Vol.5** に出展します！

AIにゲームを遊ばせる系のデモも何かしら動かす予定なので、興味がある方はぜひ見に来てください。

[https://www.genai-expo.com/exhibitors?circle=00297b6cf5a4&utm_source=x&utm_medium=social&utm_campaign=exhibitor_share](https://www.genai-expo.com/exhibitors?circle=00297b6cf5a4&utm_source=x&utm_medium=social&utm_campaign=exhibitor_share)

また、普段XでAIツールやAIキャラクターについての発信をしているので、興味があったらフォローしていただけると大変喜びます🙇‍♀️

[https://x.com/tegnike](https://x.com/tegnike)
