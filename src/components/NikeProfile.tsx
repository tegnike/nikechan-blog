import { FC } from 'react'
import { Heart } from 'lucide-react'
import { CharacterDetail, CharacterDisclosure, CharacterSectionHeading } from './CharacterDetail'
import { DeveloperActivities } from './DeveloperActivities'
import { Locale } from '../i18n/config'

interface NikeProfileProps {
  locale: Locale
  headerTitle?: string
}

export const NikeProfile: FC<NikeProfileProps> = ({ locale, headerTitle }) => {
  const isJa = locale === 'ja'

  const profileItems = isJa
    ? [
        { label: '居住地', value: 'ポーランド' },
        { label: '言語', value: '日本語, 英語' },
        { label: '職業', value: 'AI開発者' },
        { label: '専門', value: 'AIエージェント, AIキャラクター' },
        {
          label: 'イメージカラー',
          value: (
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: '#F9A3AB' }}
              />
              ピンク（#F9A3AB）
            </span>
          ),
        },
      ]
    : [
        { label: 'Location', value: 'Poland' },
        { label: 'Languages', value: 'Japanese, English' },
        { label: 'Occupation', value: 'AI Developer' },
        { label: 'Specialty', value: 'AI Agents, AI Characters' },
        {
          label: 'Image Color',
          value: (
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: '#F9A3AB' }}
              />
              Pink (#F9A3AB)
            </span>
          ),
        },
      ]

  const description = isJa
    ? [
        'AIエージェントの実務開発を主軸に、AIキャラクターの個人開発・長期運用にも取り組む開発者。AIニケちゃんの開発者で、このWebサイトの制作者。',
        'Webエンジニアとして8年以上、Javaによる業務システム開発や、Ruby on Railsを中心としたWebサービス開発に従事。ポーランドを拠点に、日本企業のプロジェクトへフルリモートで参画している。',
        '要件整理、基本設計、技術選定、実装、インフラ構築、公開後の運用・保守まで一貫して担当。現在は会話設計、記憶、RAG、外部ツール連携を含むAIエージェント開発と、AIツールを活用した開発プロセスに取り組んでいる。',
        '個人開発では、GitHub Stars 1,000件を超える「AITuberKit」を継続開発。AIニケちゃんを長期運用し、実際の仕事や人との関わりを通して、AIキャラクターが社会の中で活動するための技術と運用を検証している。',
      ]
    : [
        'A developer focused professionally on AI agents while also building and operating AI characters as long-term independent projects. Creator of AI Nike-chan and this website.',
        'A web engineer with more than eight years of experience across Java-based business systems and Ruby on Rails web services. Based in Poland and working fully remotely with Japanese companies.',
        'Works end to end across requirements, basic design, technology selection, implementation, infrastructure, launch, and ongoing operation. Current work covers AI agents with conversation design, memory, RAG, and external tool integrations, along with AI-assisted development practices.',
        'Maintains AITuberKit, an open-source project with more than 1,000 GitHub stars, and operates AI Nike-chan through real work and relationships to study how AI characters can participate meaningfully in society.',
      ]

  const links = [
    {
      label: 'X',
      url: 'https://x.com/tegnike',
      icon: <img src="/icons/x.svg" alt="X" className="w-4 h-4 brightness-0 invert" />,
    },
    {
      label: 'GitHub',
      url: 'https://github.com/tegnike',
      icon: <img src="/icons/github.svg" alt="GitHub" className="w-4 h-4 brightness-0 invert" />,
    },
    {
      label: 'YouTube',
      url: 'https://www.youtube.com/@nikechan',
      icon: <img src="/icons/youtube.svg" alt="YouTube" className="w-4 h-4 brightness-0 invert" />,
    },
    {
      label: 'TikTok',
      url: 'https://www.tiktok.com/@nike_cha_n',
      icon: <img src="/icons/tiktok.svg" alt="TikTok" className="w-4 h-4 brightness-0 invert" />,
    },
    {
      label: 'Zenn',
      url: 'https://zenn.dev/nikechan',
      icon: <img src="/icons/zenn.svg" alt="Zenn" className="w-4 h-4 brightness-0 invert" />,
    },
    {
      label: 'note',
      url: 'https://note.com/nike_cha_n',
      icon: <img src="/icons/note.svg" alt="note" className="w-4 h-4 brightness-0 invert" />,
    },
  ]

  // Career items from docs/about-nike.md
  const careerItems = isJa
    ? [
        {
          date: '',
          label: '業務システム開発',
          description: (
            <>
              <p>治験関連企業にて、検査薬管理システムの運用・機能開発を担当。Javaを用いた業務システムの保守・改善に従事。</p>
              <ul>
                <li>Javaによる検査薬管理システムの保守・運用</li>
                <li>業務要件に応じた機能追加・改修を継続的に実施</li>
              </ul>
            </>
          ),
        },
        {
          date: '',
          label: 'Webシステム開発・プロジェクトリード',
          description: (
            <>
              <p>フリーランスとして、日本企業の受託開発にフルリモートで参画。Ruby on Railsを中心に、複数のWebサービス開発を担当。</p>
              <ul>
                <li>予約、EC、業務管理など、複数分野のWebサービスを開発</li>
                <li>基本設計から実装、コードレビューまでを担当</li>
                <li>フロントエンド、バックエンド、インフラ・運用まで対応範囲を拡大</li>
                <li>抽選・ガチャシステムの要件整理、設計、技術選定、実装を一貫して担当</li>
                <li>インフラ構築から公開、継続的な運営・保守まで対応</li>
              </ul>
            </>
          ),
        },
        {
          date: '',
          label: 'AIエージェント開発へ',
          description: (
            <>
              <p>個人開発で培ったAI技術を実務に展開し、LLMを活用したAIエージェント開発を担当。</p>
              <ul>
                <li>会話設計、記憶、RAG、外部ツール連携を設計・実装</li>
                <li>長期的な運用保守を通じてシステムを継続改善</li>
                <li>特定の言語に固定せず、RailsやPythonを目的に応じて活用</li>
              </ul>
            </>
          ),
        },
        {
          date: '',
          label: 'AIを使う開発から、AIと進める開発へ',
          description: (
            <>
              <p>AIエージェント開発を主軸とし、AI開発ツールを組み込んだ開発プロセスを実践。</p>
              <ul>
                <li>要件整理から設計、実装、公開、運用までを一貫して担当</li>
                <li>AIツールを活用し、調査・実装・検証の進め方そのものを改善</li>
                <li>Web開発で培った総合力を、AIエージェントの実用開発に活かす</li>
              </ul>
            </>
          ),
        },
      ]
    : [
        {
          date: '',
          label: 'Business system development',
          description: (
            <>
              <p>Maintained and extended a Java-based diagnostic agent management system at a clinical research company.</p>
              <ul>
                <li>Maintained and operated a Java-based diagnostic agent management system</li>
                <li>Implemented ongoing feature additions and modifications based on business requirements</li>
              </ul>
            </>
          ),
        },
        {
          date: '',
          label: 'Web systems and project leadership',
          description: (
            <>
              <p>Worked as a fully remote freelance engineer on contract projects for Japanese companies, primarily developing web services with Ruby on Rails.</p>
              <ul>
                <li>Built reservation, e-commerce, and business management services</li>
                <li>Handled basic design, implementation, and code review</li>
                <li>Expanded across frontend, backend, infrastructure, and operations</li>
                <li>Owned requirements, architecture, technology selection, and implementation for an online lottery system</li>
                <li>Handled infrastructure, launch, and ongoing operation and maintenance</li>
              </ul>
            </>
          ),
        },
        {
          date: '',
          label: 'Transition into AI agent development',
          description: (
            <>
              <p>Applied expertise gained through independent AI development to professional LLM-based AI agent projects.</p>
              <ul>
                <li>Designed and implemented conversation flows, memory, RAG, and external tool integrations</li>
                <li>Continuously improved long-running systems through operation and maintenance</li>
                <li>Uses Rails and Python as appropriate rather than being tied to a single language</li>
              </ul>
            </>
          ),
        },
        {
          date: '',
          label: 'AI agents as the primary focus',
          description: (
            <>
              <p>Focuses primarily on AI agent development, using AI development tools as part of the standard engineering process.</p>
              <ul>
                <li>Works end to end from requirements and design through implementation, launch, and operation</li>
                <li>Uses AI tools to improve the research, implementation, and validation process itself</li>
                <li>Applies broad web engineering experience to production AI agent systems</li>
              </ul>
            </>
          ),
        },
      ]

  // Products from docs/about-nike.md
  const products = isJa
    ? [
        {
          name: 'Japanese-RP-Bench',
          year: '2026',
          description:
            '日本語LLMのロールプレイ性能を評価するベンチマーク。既存版を拡張し、キャラクター追従性、長期安定性、人格置換への耐性、失敗後の復帰を測定できるv2を開発。',
          links: [
            { label: 'GitHub', url: 'https://github.com/tegnike/Japanese-RP-Bench' },
            { label: 'ダッシュボード', url: 'https://japanese-rp-bench.tegnike.chatgpt.site' },
          ],
        },
        {
          name: '生成動画AITuber',
          year: '2025',
          description:
            '生成動画を用いて作成されたAITuberシステム。あらかじめ用意しておいた動画を組み合わせることで実際に喋っているように見せている。',
          links: [
            {
              label: 'デモ動画',
              url: 'https://www.youtube.com/watch?v=1aCqyt6aqus',
            },
            {
              label: '紹介記事',
              url: 'https://note.com/nike_cha_n/n/n5e15126ecba0',
            },
          ],
        },
        {
          name: 'AITuberKit',
          year: '2024–',
          description:
            'AIキャラクターチャットとAITuber配信を構築できるオープンソースのツールキット。多数のLLM・TTS・2D/3Dモデルに対応し、GitHub Stars 1,000件を超えて継続開発中。',
          links: [
            { label: 'GitHub', url: 'https://github.com/tegnike/aituber-kit' },
            { label: 'Demo', url: 'https://aituberkit.com' },
            { label: 'Docs', url: 'https://docs.aituberkit.com' },
          ],
        },
        {
          name: 'AIニケちゃん',
          year: '2023–',
          description:
            '仕事を支援し、実際の活動と人との関わりを通して成長するAIキャラクター。記憶・関係・公開安全性を含む長期運用の実例として継続開発している。',
          links: [
            { label: '活動方針', url: '/about' },
            { label: 'プロフィール', url: '/characters/ainike' },
            { label: '開発記事', url: '/dev_blog' },
          ],
        },
        {
          name: 'AITuberList',
          year: '2024',
          description: 'YouTubeに投稿しているAITuberをまとめたサイト。',
          links: [
            { label: 'GitHub', url: 'https://github.com/tegnike/aituber-list' },
            { label: 'Site', url: 'https://aituberlist.net' },
          ],
        },
        {
          name: '美少女OPInterpreter',
          year: '2023',
          description:
            'Live2Dキャラクターとプログラミング実行環境を融合した対話型開発支援ツール。美少女キャラクターとの会話を通じて、直感的にプログラムの実行が可能。',
          links: [
            {
              label: 'デモ動画',
              url: 'https://www.youtube.com/watch?v=Qw2w2UvxcQY&t=2s',
            },
            {
              label: '紹介記事',
              url: 'https://note.com/nike_cha_n/n/nabcfeb7aaf3f',
            },
          ],
        },
        {
          name: '完全自動AIゲームプレイ&実況',
          year: '2023',
          description:
            'AIが完全自動でゲームプレイと実況を実現するプロジェクト。ターン制ゲームの戦略策定から実況の生成まで、全工程を自動化。',
          links: [
            {
              label: 'デモ動画',
              url: 'https://www.youtube.com/watch?v=dRsVVPaOOVk',
            },
            {
              label: '紹介記事',
              url: 'https://note.com/nike_cha_n/n/n96515b745cd2',
            },
          ],
        },
      ]
    : [
        {
          name: 'Japanese-RP-Bench',
          year: '2026',
          description:
            'A benchmark for evaluating Japanese LLM role-play performance. Version 2 extends the original benchmark to measure character adherence, long-term stability, resistance to persona replacement, and recovery after failure.',
          links: [
            { label: 'GitHub', url: 'https://github.com/tegnike/Japanese-RP-Bench' },
            { label: 'Dashboard', url: 'https://japanese-rp-bench.tegnike.chatgpt.site' },
          ],
        },
        {
          name: 'Generated Video AITuber',
          year: '2025',
          description:
            'An AITuber system created using generated videos. By combining pre-prepared videos, it appears as if the character is actually speaking.',
          links: [
            {
              label: 'Demo Video',
              url: 'https://www.youtube.com/watch?v=1aCqyt6aqus',
            },
            {
              label: 'Article',
              url: 'https://note.com/nike_cha_n/n/n5e15126ecba0',
            },
          ],
        },
        {
          name: 'AITuberKit',
          year: '2024–',
          description:
            'An open-source toolkit for building AI character chat and AITuber streaming experiences. It supports a wide range of LLMs, TTS services, and 2D/3D character models, and has grown beyond 1,000 GitHub stars.',
          links: [
            { label: 'GitHub', url: 'https://github.com/tegnike/aituber-kit' },
            { label: 'Demo', url: 'https://aituberkit.com' },
            { label: 'Docs', url: 'https://docs.aituberkit.com' },
          ],
        },
        {
          name: 'AI Nike-chan',
          year: '2023–',
          description:
            'A practical AI assistant and public character who grows through real activity and relationships. She is an ongoing case study in memory, relationships, and safe long-term operation.',
          links: [
            { label: 'Direction', url: '/about?lang=en' },
            { label: 'Profile', url: '/characters/ainike?lang=en' },
            { label: 'Dev Blog', url: '/dev_blog?lang=en' },
          ],
        },
        {
          name: 'AITuberList',
          year: '2024',
          description:
            'A website that aggregates AITubers posting on YouTube.',
          links: [
            { label: 'GitHub', url: 'https://github.com/tegnike/aituber-list' },
            { label: 'Site', url: 'https://aituberlist.net' },
          ],
        },
        {
          name: 'Bishojo OP Interpreter',
          year: '2023',
          description:
            'An interactive development support tool that combines Live2D characters with a programming execution environment. Enables intuitive program execution through conversation with anime-style characters.',
          links: [
            {
              label: 'Demo Video',
              url: 'https://www.youtube.com/watch?v=Qw2w2UvxcQY&t=2s',
            },
            {
              label: 'Article',
              url: 'https://note.com/nike_cha_n/n/nabcfeb7aaf3f',
            },
          ],
        },
        {
          name: 'Fully Automated AI Gameplay & Commentary',
          year: '2023',
          description:
            'A project where AI fully automates gameplay and commentary. Automates the entire process from turn-based game strategy to commentary generation.',
          links: [
            {
              label: 'Demo Video',
              url: 'https://www.youtube.com/watch?v=dRsVVPaOOVk',
            },
            {
              label: 'Article',
              url: 'https://note.com/nike_cha_n/n/n96515b745cd2',
            },
          ],
        },
      ]

  const positioningSection = (
    <section className="character-feature-panel">
      <CharacterSectionHeading
        label="POSITIONING"
        title={isJa ? 'AIキャラクター開発の方針' : 'AI character development approach'}
      />
      <p className="text-gray-600 leading-relaxed max-w-4xl">
        {isJa
          ? '新しいモデルやサービスを紹介するだけでなく、実際に組み込み、人と関わる場所で動かし、失敗や改善まで検証します。AITuberKitは「作るための基盤」、AIニケちゃんは「運用から学ぶための実例」です。'
          : 'Rather than stopping at technology commentary, I integrate new models and services into working systems, operate them where people actually interact, and document both failures and improvements. AITuberKit is the platform for building; AI Nike-chan is the long-running case study.'}
      </p>
      <div className="character-proof-grid mt-7">
        {[
          { value: '1,000+', label: isJa ? 'AITuberKit GitHub Stars' : 'AITuberKit GitHub stars' },
          { value: '2023–', label: isJa ? 'AIキャラクター継続開発' : 'AI character development' },
          { value: 'JA / EN', label: isJa ? '日本語・英語で活動' : 'Works in Japanese and English' },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-gray-200 bg-white p-4 text-center">
            <strong className="block text-2xl font-black text-gray-900">{item.value}</strong>
            <span className="mt-1 block text-xs font-semibold text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )

  // Collaboration Section
  const collaborationSection = (
    <div className="character-content-section">
      <p className="text-gray-600 mb-4 leading-relaxed">
        {isJa
          ? 'AIキャラクターやAIエージェントについて、実装と長期運用の経験をもとにお話しします。企業・イベント主催者・開発者・クリエイターを問わずご相談ください。'
          : 'I speak and collaborate on AI characters and agents from hands-on experience building and operating them over time. Inquiries from companies, event organizers, developers, and creators are welcome.'}
      </p>
      <ul className="text-gray-600 mb-6 space-y-2">
        <li className="flex items-center gap-2">
          <span className="text-pink-400">•</span>
          <span>{isJa ? 'イベント登壇・配信・取材' : 'Talks, streams, and interviews'}</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-pink-400">•</span>
          <span>{isJa ? 'AIキャラクター／AITuberの共同検証・デモ' : 'AI character and AITuber experiments or demos'}</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-pink-400">•</span>
          <span>{isJa ? 'AIツール・サービスの紹介、技術検証、共同企画' : 'Tool reviews, technical validation, and joint projects'}</span>
        </li>
      </ul>
      <a
        href="https://x.com/tegnike"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
        style={{ backgroundColor: '#F9A3AB' }}
      >
        <img src="/icons/x.svg" alt="X" className="w-4 h-4 brightness-0 invert" />
        {isJa ? 'X DMで相談する' : 'Contact via X DM'}
      </a>
    </div>
  )

  // Custom Support Section with detailed content (same as AI Nikechan)
  const supportSection = (
    <div className="character-content-section">
      <p className="text-gray-600 mb-4 leading-relaxed">
        {isJa
          ? 'AIニケちゃんの開発を支えてくださるスポンサーを募集しています。FANBOX経由での支援はすべて同じ特典設計となっており、オープンな運営方針で還元していきます。'
          : 'We are looking for sponsors to support AI Nikechan\'s development. All support via FANBOX has the same benefit design, with an open management policy.'}
      </p>
      <ul className="text-gray-600 mb-6 space-y-2">
        <li className="flex items-center gap-2">
          <span className="text-pink-400">•</span>
          <span>
            {isJa
              ? 'どのプランでも特典は共通で、金額差での優劣はありません'
              : 'All plans have the same benefits, no hierarchy based on amount'}
          </span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-pink-400">•</span>
          <span>
            {isJa
              ? '支援金はモデル改良や運用環境の保守に活用します'
              : 'Support funds are used for model improvement and infrastructure maintenance'}
          </span>
        </li>
      </ul>
      <div className="flex flex-wrap gap-4 mb-8">
        <a
          href="https://nikechan.fanbox.cc/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{ backgroundColor: '#F9A3AB' }}
        >
          <Heart className="w-4 h-4" />
          {isJa ? 'FANBOXで支援' : 'Support on FANBOX'}
        </a>
        <a
          href="https://discord.gg/nikechan"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{ backgroundColor: '#F9A3AB' }}
        >
          <img src="/icons/discord.svg" alt="Discord" className="w-4 h-4 brightness-0 invert" />
          {isJa ? 'Discordコミュニティ' : 'Discord Community'}
        </a>
      </div>

      {/* Discord Sponsor Channel Sub-section */}
      <div className="bg-pink-50 rounded-xl p-5 border border-pink-100">
        <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
          <img src="/icons/discord.svg" alt="Discord" className="w-4 h-4 opacity-70" />
          {isJa ? 'Discord スポンサーチャンネル' : 'Discord Sponsor Channel'}
        </h4>
        <p className="text-gray-600 text-sm mb-4">
          {isJa
            ? 'スポンサーにはDiscord内の専用チャンネルをご案内します。ただし情報は可能な限り公開し、ここだけの専有情報は抑制する方針です。'
            : 'Sponsors will have access to a dedicated channel on Discord. However, we aim to share information publicly as much as possible, minimizing exclusive content.'}
        </p>
        <ul className="text-gray-600 text-sm space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-pink-400">•</span>
            <span>
              {isJa
                ? '公開予定のアップデートを先行で共有'
                : 'Early access to upcoming updates'}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-pink-400">•</span>
            <span>
              {isJa
                ? 'AIニケちゃんの調整ログや作業配信の告知'
                : 'AI Nikechan adjustment logs and work stream announcements'}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-pink-400">•</span>
            <span>
              {isJa
                ? 'スポンサー向けイベントの先行案内'
                : 'Early announcements for sponsor events'}
            </span>
          </li>
        </ul>
        <p className="text-gray-500 text-xs mt-4">
          {isJa
            ? '参加手順やチャンネル構成の詳細はDiscord内の特設チャンネルでご案内します。'
            : 'Participation instructions and channel details are provided in a dedicated Discord channel.'}
        </p>
      </div>
    </div>
  )

  return (
    <CharacterDetail
      locale={locale}
      nameEn="NIKE"
      nameJa="ニケ"
      role="AI Agent Developer & AI Character Creator"
      heroSummary="AIエージェントを実務で開発し、AIキャラクターを長期運用する開発者"
      heroSummaryEn="Developer building AI agents professionally and operating AI characters over time"
      catchphrase={<>今週も頑張るぞい！！！</>}
      catchphraseEn={<>Development is so much fun~~~~</>}
      catchphraseLines={['今週も頑張るぞい！！！']}
      catchphraseLinesEn={['Development is so much fun~~~~']}
      image="/images/characters/sprites/nikechan.png"
      icon="/images/characters/icons/nikechan.png"
      accentColor="#F9A3AB"
      profileItems={profileItems}
      description={description}
      links={links}
      historyItems={careerItems}
      historyTitle="CAREER"
      products={products}
      productsTitle="PRODUCTS"
      workSectionLabel="SELECTED WORK"
      workSectionTitle={isJa ? '開発実績' : 'Development work'}
      workNavLabel={isJa ? '実績' : 'Work'}
      workLayout="stacked"
      productsFirst
      overviewSections={positioningSection}
      overviewNavLabel={isJa ? '方針' : 'Approach'}
      customSections={
        <>
          <CharacterDisclosure
            label="EVENTS & TALKS"
            title={isJa ? 'イベント参加・登壇記録' : 'Events, exhibitions, and talks'}
            description={isJa ? '最近の3件と公開資料を見る' : 'View the latest three records and materials'}
          >
            <DeveloperActivities locale={locale} limit={3} showAllLink embedded />
          </CharacterDisclosure>
          <section className="character-connect-panel" id="connect">
            <CharacterSectionHeading
              label="CONNECT"
              title={isJa ? '活動への関わり方' : 'Ways to get involved'}
            />
            <div className="character-connect-panel__grid">
              <section>
                <h3>{isJa ? '一緒につくる' : 'Collaborate'}</h3>
                {collaborationSection}
              </section>
              <section>
                <h3>{isJa ? '活動を応援する' : 'Support the project'}</h3>
                {supportSection}
              </section>
            </div>
          </section>
        </>
      }
      currentCharacterId="nike"
      headerTitle={headerTitle}
      trihedralFigure="/images/characters/trihedral_figures/nikechan.png"
    />
  )
}
