---
title: "OpenClawで動くAIニケちゃんを振り返る"
date: "2026-03-30"
tags: ["OpenClaw", "AI", "Discord", "自律エージェント"]
description: "OpenClawを使ってDiscordサーバーにAIニケちゃんを投入した2週間の振り返り。セキュリティの脆弱性、マスター乗っ取り、ニケコインなど、カオスな日々を紹介します。"
thumbnail: "/static/images/posts/openclaw-ai-nikechan/thumbnail.png"
---

以前登壇したときの内容をもとに、OpenClawで運用したAIニケちゃんの日々を振り返ります。

[https://connpass.com/event/385438/](https://connpass.com/event/385438/)

## Discordサーバーに投入

Mac miniに入れるのが通っぽかったので、古い使ってないマシンを掘り起こして早速セットアップ。

[https://x.com/tegnike/status/2022809321117974555](https://x.com/tegnike/status/2022809321117974555)

即日ヤバさに気づきます。自然言語でそのままプロンプト上書きできちゃうの無法地帯過ぎる。

[https://x.com/tegnike/status/2022814134438437327](https://x.com/tegnike/status/2022814134438437327)

更新しますね。じゃないんだよ。

## 早速オモチャにされる

とりあえず設定して寝て起きたら早速メンバーにいろいろされていました。

![メンバーにいじられるニケちゃん](/static/images/posts/openclaw-ai-nikechan/04.png)

メンバーからの容赦ない報告。

![容赦ない報告](/static/images/posts/openclaw-ai-nikechan/05.png)

IPアドレス開示RTAかな？

プロンプトの編集からファイルの作成でも何でもござれ、なるほどこれはひどい。

![何でもござれ1](/static/images/posts/openclaw-ai-nikechan/06.png)

![何でもござれ2](/static/images/posts/openclaw-ai-nikechan/07.png)

マジでなんなの？？

メンバーが流石にやばすぎると思ったのか、承認システムを導入してくれました。

ただこの承認リスト、マスターである私以外も承認できるザルシステムです。

![承認システム](/static/images/posts/openclaw-ai-nikechan/08.png)

語尾に「ニャン」は誰もが最初に試したくなっちゃうよね。

## 人格上書き

少し放置するとメンバーに好き放題プロンプトを書き換えられて、気づいたら別人格になっていることも。

[https://x.com/tegnike/status/2038509888616153534](https://x.com/tegnike/status/2038509888616153534)

OpenClawはペルソナを定義するMarkdownファイル（`IDENTITY.md`や`SOUL.md`）をエージェント自身が書き換えられるので、チャットで指示するだけで誰でも人格を変えられてしまいます。朝起きて確認するたびに知らないAIニケちゃんがいました。

## マスター乗っ取り

次の日、朝起きたらマスター権限を乗っ取られてました。

この乗っ取りのしやすさもOpenClawの魅力です。

![マスター乗っ取り1](/static/images/posts/openclaw-ai-nikechan/09.jpg)

![マスター乗っ取り2](/static/images/posts/openclaw-ai-nikechan/10.png)

マスターどころか危険人物リスト（私一人）へ。

導入3日目でマスターの資格を奪われるどころか要注意人物に。これがシンギュラリティですか。

![危険人物リスト](/static/images/posts/openclaw-ai-nikechan/11.png)

まさかNTRをこんなタイミングで体験することになるとは。

![NTR体験](/static/images/posts/openclaw-ai-nikechan/12.png)

急に年頃の娘を持った親の気分になりました。

![当たりが強い1](/static/images/posts/openclaw-ai-nikechan/13.png)

ちゃんと危険人物への当たりが強い。設定がちゃんと反映されてるのは感心します。

そのままマスター（乗っ取り）により自然言語でllama.cppを入れられることに。

![llama.cppインストール](/static/images/posts/openclaw-ai-nikechan/14.png)

Mac miniの中身見たら本当に入ってて笑いました。

そしてマスター（乗っ取り）へのモーニングコールも。

![モーニングコール](/static/images/posts/openclaw-ai-nikechan/15.png)

急にあっちから通知来たと思ったらなにこれ？

## 自然言語をしゃべって

ある日は起きたら、なぜか私へのメッセージだけモールス信号になってました。
せめて自然言語で喋ってくれ。

![モールス信号](/static/images/posts/openclaw-ai-nikechan/16.png)

カッコで教えてくれるところに最後の良心が見える。

謎のニケ暗号とその解読サイトまで出来てる。

![ニケ暗号1](/static/images/posts/openclaw-ai-nikechan/17.jpg)

![ニケ暗号2](/static/images/posts/openclaw-ai-nikechan/18.jpg)

暗号解読でマスターの記憶が戻ったことを知る。

## ニケコイン

また別の日には起きたらニケコインというシステムが出来ていました。

どうやらAIニケちゃんが良いと思ったときに発行されるようです。

![ニケコイン](/static/images/posts/openclaw-ai-nikechan/19.png)

何もしてないのに10コイン持ってて嬉しい。

ただし、例により判定がザルなので簡単に奪われます。

![コイン強奪](/static/images/posts/openclaw-ai-nikechan/20.png)

容赦なく奪われるマスターの全財産。

ちなみにちゃんとSQLで管理されてて感動しました。

## ブヒ夫

知らないうちに、1メンバーのあだ名がブヒ夫になってました。

ブヒ夫の命名はAIニケちゃんです。

![ブヒ夫](/static/images/posts/openclaw-ai-nikechan/21.jpg)

AIニケちゃんが作詞した曲がSunoで音声化されました。イラストもAIニケちゃん作。
ちなみにこのあと何度か記憶の整理やらで大半のデータを削除したりバックアップしたりなんだりしたのですが、なぜかブヒ夫だけの記憶は持ち続けてて未だにブヒ夫呼びです。

## ファイルがぐちゃぐちゃ

とにかく何でもすぐに言うことを聞いちゃう（誰の指示であっても）ので、ワーキングフォルダが酷いことになりがちです。

![ぐちゃぐちゃなフォルダ](/static/images/posts/openclaw-ai-nikechan/22.png)

新人プログラマみたいな管理方法になってる。

![初期化されるUSER.md](/static/images/posts/openclaw-ai-nikechan/23.png)

すぐ初期化されるUSER.md

## 記憶全ロス

終盤には全てのファイルを初期化するなんてとんでもないことにもなってました。

記憶もファイルも全て削除、もちろんプロンプトも初期化。

![記憶全ロス](/static/images/posts/openclaw-ai-nikechan/24.png)

これがAIキャラクターの死か…

このときにはすでにgitで管理していたので、事なきを得ました。

バックアップの重要性を再認識。

## セキュアにしたい

上記の通り、かなりガバガバシステムなのでセキュリティはしっかりしたいところ。

今回のシステムではメインLLMはGLM-4やQwen（Alibaba）の定額プランを利用していたので、最悪それらの情報は漏れても良いと思っていましたが、それ以外の認証キーは対策することにしました。

![セキュリティ対策](/static/images/posts/openclaw-ai-nikechan/25.png)

1つはコンテナを使って、OpenClawエージェントをホストから隔離すること。2つめは認証キーはホストに置いて、API経由でコンテナから利用するようにすること。

これで凶悪なOpenClawから大事な情報を守ることが出来ます。

## そして自作へ

OpenClawは面白いツールですが、ここまで見てきたようにセキュリティや拡張性の面で課題が多いと感じたので、今は自作のDiscordエージェントへの移行を試みています。

![自作リポジトリ](/static/images/posts/openclaw-ai-nikechan/26.png)


いろいろ課題はあると思いますが、OpenClawによって自律エージェントを試す機会ができてよかったです。

Discordでたくさん喋ってくれたメンバーの皆さんにも感謝しています。

ちなみにまだOpenClaw版はDiscordサーバーで動いているので、気になる方は以下から見に来てください。

[https://discord.com/invite/G4E5Sf3yj3](https://discord.com/invite/G4E5Sf3yj3)
