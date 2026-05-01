---
title: "Remotionでキャラクター解説動画を作るためのMotionPNGTuberスキルを作りました"
date: "2026-05-01"
tags: ["Remotion", "Codex", "Claude Code", "MotionPNGTuber"]
description: "Claude CodeやCodexでRemotion動画を作るためのスキルと、その上に作ったMotionPNGTuber向け派生スキルについて紹介します。キャラクター解説動画をコードで安定して作るための考え方と使い方をまとめました。"
thumbnail: "/static/images/posts/remotion-motionpngtuber-skill/thumbnail.png"
---

こんにちは、ニケです。
皆さん、**Remotion**使っていますでしょうか？

RemotionはReactで動画を作るためのフレームワークです。
公式サイトでも「Reactで本物のMP4動画を作る」「データを渡して動的に動画を変える」「ローカルやサーバーでレンダリングする」といった用途が紹介されています。

[https://www.remotion.dev/](https://www.remotion.dev/)

公式ドキュメントにはClaude Code、Codex、CursorのようなAIエージェント向けに**Agent Skills**が用意されていて、RemotionプロジェクトでのベストプラクティスをAIに渡せるようになっています。

[https://www.remotion.dev/docs/ai/skills](https://www.remotion.dev/docs/ai/skills)

これを導入すると、Claude CodeやCodexに「Remotionで動画を作って」と頼むだけで、ただReactコンポーネントを書くだけではなく、Composition、Sequence、Audio、Video、字幕、アニメーション、アセット読み込み、レンダリング確認といったRemotion特有の作法を踏まえて動画を作成してくれます。

今回はこのRemotionスキルの**派生スキル**として、**MotionPNGTuberをRemotionで扱うためのスキル**を作ったので紹介していこうと思います。

なお、HyperFramesにも対応したので、RemotionだけでなくHyperFramesで動画を組む場合にも使えるようになっています。

## 作ったもの

**remotion-motionpngtuber** というスキルを作成しました。

https://github.com/tegnike/remotion-motionpngtuber

名前の通り、Remotionの動画制作にMotionPNGTuberのキャラクター表示を組み込むためのものです。

- MotionPNGTuberの素材を読み取り適切な位置に配置する
- VOICEVOXやAivisSpeechでセリフ音声を生成する
- 音声の尺に合わせて字幕と口パクをRemotionのタイムラインに置く
- グリーンバック素材なら透過処理して、最終MP4まで確認する

## MotionPNGTuberとは

MotionPNGTuberは、[ろてじん](https://x.com/rotejin)さんが公開している動画ベースのリアルタイム口パクシステムです。

https://github.com/rotejin/MotionPNGTuber

GitHubの説明では「PNGTuber以上Live2D未満」と表現されています。
従来のPNGTuberのように静止画を切り替えるだけではなく、ループ動画を使うことで髪揺れや服の揺れのような動きも出せる一方、Live2Dほど専門的なモデル制作知識は必要ない、という立ち位置です。

https://x.com/rotejin/status/2005774807737225478

今回やりたかったのは、このツールを**Remotionの動画生成パイプラインに持ち込む**ことです。

MotionPNGTuberのモデルをRemotionで扱えるようにしておくと、口パクするキャラクターをそのまま動画に挿入できます。
セリフ音声と字幕を用意してタイムラインに置けば、キャラクターが喋っている動画をそのまま組み立てられるわけですね。

毎回動画編集ソフトでキャラクター素材を重ねたり、口の開閉を手で合わせたりする必要がなくなります。

## 作成例

以下は展示会用の解説動画をRemotionとMotionPNGTuberで作ったときの例です。

https://x.com/tegnike/status/2049440728028156328

この動画は全てRemotionで作成されています。
ゲーム画面、テロップ、キャラクター、音声を良い感じに組み合わせてくれていますね。

## 使い方

使い方は、ざっくり以下の流れです。

### 1. スキルを導入する

まずはRemotion公式のスキルを入れます。

```bash
npx skills add remotion-dev/skills
```

これはRemotion公式ドキュメントに載っている導入コマンドです。
これでRemotionのComposition、Sequence、Audio、Video、字幕、レンダリング確認などの作法をAIエージェントが参照できるようになります。

次に、今回作った `remotion-motionpngtuber` スキルを入れます。

https://github.com/tegnike/remotion-motionpngtuber

Codexで使う場合は、このリポジトリをCodexのプラグインマーケットプレイスとして追加します。

```bash
codex plugin marketplace add https://github.com/tegnike/remotion-motionpngtuber.git
```

追加したらCodexを再起動して、プラグイン一覧から `MotionPNGTuber for Remotion and HyperFrames` をインストールします。

Claude Codeで使う場合は、Claude Code側のプラグインマーケットプレイスに追加してからインストールします。

```bash
claude plugin marketplace add tegnike/remotion-motionpngtuber
claude plugin install remotion-motionpngtuber@remotion-motionpngtuber
```

Claude Codeでは、以下のようにプラグインのスキル名を指定して呼び出します。

```text
/remotion-motionpngtuber:remotion-motionpngtuber RemotionでMotionPNGTuberキャラクターを使った動画を作ってください。
```

### 2. MotionPNGTuber素材を用意する

MotionPNGTuberで素材を作ります。

こちらの作成方法は[MotionPNGTuberのGitHubリポジトリ](https://github.com/rotejin/MotionPNGTuber)のREADMEを参照してください。
最終的に以下のようなファイル構成で素材ができればOKです。

```text
character/
├── mouth_track.json
├── loop_mouthless_h264.mp4
└── mouth/
    ├── closed.png
    ├── open.png
    └── half.png
```

### 3. TTSエンジンを立ち上げる

VOICEVOX または AivisSpeechをローカルで立ち上げます。
AivisSpeechを使う場合は、必要に応じてモデルをアップロードしておいてください。

https://voicevox.hiroshiba.jp/

https://aivis-project.com/

### 4. CodexやClaude Codeに依頼する

あとはAIエージェントに、MotionPNGTuber素材、TTSエンジン、セリフ、動画構成などを渡して依頼します。

例えばこんな感じです。

```text
Remotionを使って、1分ほどの今日のITニュースの動画を作ってください。

- MotionPNGTuber素材: public/expo-video/character/
- TTS: AivisSpeech, モデルID: XXXXX

PNGTUberは右下に配置し、セリフは下部にテロップで設置してください。
```

https://x.com/tegnike/status/2049545490623009134

なお、サンプルとしてAIニケちゃんのMotionPNGTuberが同梱されているので、未指定だとそちらが使用されます。

## 宣伝

普段XでAIツールやAIキャラクターについての発信をしているので、興味があったらフォローしていただけると大変喜びます🙇‍♀️

[https://x.com/tegnike](https://x.com/tegnike)
