import { AlertTriangle, CheckCircle2, Copy, HelpCircle, Sparkles, XCircle } from 'lucide-react'
import derivativeMdJa from '../utils/guidelines/derivative_creation_guideline.md?raw'
import aiMdJa from '../utils/guidelines/ai_generation_guideline.md?raw'
import derivativeMdEn from '../utils/guidelines/en/derivative_creation_guideline.md?raw'
import aiMdEn from '../utils/guidelines/en/ai_generation_guideline.md?raw'
import { mdToHtml } from '../utils/mdToHtml'
import { getT, type Locale } from '../i18n/config'

type Props = {
  active?: 'derivative' | 'ai'
  locale?: Locale
  mode?: 'simple' | 'detail'
}

type QuickGuideTone = 'ok' | 'conditional' | 'ask' | 'ng'

type QuickGuideCard = {
  tone: QuickGuideTone
  title: string
  label: string
  items: string[]
}

const quickGuideIconMap = {
  ok: CheckCircle2,
  conditional: AlertTriangle,
  ask: HelpCircle,
  ng: XCircle,
}

const quickGuideContent: Record<Locale, {
  quickNavLabel: string
  simpleLabel: string
  detailLabel: string
  eyebrow: string
  title: string
  lead: string
  petMessage: string
  cards: QuickGuideCard[]
  aiTitle: string
  aiLead: string
  aiItems: string[]
  aiLink: string
  faqTitle: string
  faqs: { question: string; answer: string }[]
  officialNote: string
  detailTitle: string
  detailLead: string
  detailLinkLabel: string
}> = {
  ja: {
    quickNavLabel: 'ガイドライン表示切り替え',
    simpleLabel: '簡易版',
    detailLabel: '詳細版',
    eyebrow: 'まずここだけ',
    title: 'とりあえずこれを読めばOK！',
    lead: 'AIニケちゃんたちの二次創作は、非公式・非営利・権利尊重を守ればかなり自由に楽しめます。迷ったら、この早見版から確認してください。',
    petMessage: '細かい条件は詳細版が正本です。まずは「OK」「条件つきOK」「相談してね」「NG」を見ればだいたい判断できます。',
    cards: [
      {
        tone: 'ok',
        title: '基本OK',
        label: '作って公開してOK',
        items: [
          'ファンアート、漫画、小説、動画、配信、ゲーム制作',
          'SNS投稿、アイコン、ヘッダー、動画サムネイル',
          '個人利用のグッズ制作、特定個人への単発の無償譲渡',
        ],
      },
      {
        tone: 'conditional',
        title: '条件つきOK',
        label: '条件を守ればOK',
        items: [
          'YouTubeなどの広告、投げ銭、メンバーシップ',
          '同人誌、イラスト本、ポストカードなど印刷物の原価回収頒布',
          'R-18/R-18Gも条件を守ればOK（年齢制限・センシティブ設定・表紙配慮など）',
        ],
      },
      {
        tone: 'ask',
        title: '相談してね',
        label: '先に連絡してほしい',
        items: [
          '大規模頒布、書店委託、商業流通に近い企画',
          '大きな収益が見込まれる投稿・配信・イベント',
          'スポンサー、タイアップ、アフィリエイト、物販導線がある企画',
        ],
      },
      {
        tone: 'ng',
        title: 'これはNG',
        label: '公開・配布できません',
        items: [
          '公式・公認・監修と誤解される表現、なりすまし',
          'デジタル配布の任意支払い、寄付、支援プラン、有料販売',
          'アクキー、衣類、立体物など印刷物以外の販売・頒布',
          '政治・宗教、誹謗中傷、権利侵害、公序良俗に反する内容',
        ],
      },
    ],
    aiTitle: 'AI利用はここが大事',
    aiLead: '生成AIで作る場合は、使ってよい素材の範囲だけ特に注意してください。',
    aiItems: [
      '使える素材はVRMモデル、ロゴ画像、このWebサイトで許可している素材です。',
      '既存イラスト、配信素材、サムネイル、スクリーンショット等はAI入力・参照・学習に使えません。',
      '他の人の二次創作をAI利用する場合は、その作者の明示的な許可が必要です。',
    ],
    aiLink: '生成AIガイドラインの詳細を見る',
    faqTitle: 'よくある判断',
    faqs: [
      {
        question: 'クレジット表記は必須？',
        answer: 'SNSの単発投稿では任意です。配布・頒布する作品や配布ページには「非公式ファンメイド作品」とキャラクター名を明記してください。',
      },
      {
        question: '無料ゲームや無料素材は配布できる？',
        answer: 'できます。価格0円のみで、任意支払い・投げ銭・広告などの収益化機能は無効にしてください。',
      },
      {
        question: '判断に迷ったら？',
        answer: 'まず詳細版を確認し、それでも迷う場合はX DMまたはDiscordコミュニティから相談してください。',
      },
    ],
    officialNote: 'この早見版は読みやすくした要約です。正式な条件や例外判断は、詳細版ガイドラインが優先されます。',
    detailTitle: '詳細版ガイドライン',
    detailLead: '正式な条件、表記テンプレート、FAQはこちらで確認できます。',
    detailLinkLabel: '詳細版はこちら',
  },
  en: {
    quickNavLabel: 'Guidelines view switcher',
    simpleLabel: 'Simple',
    detailLabel: 'Detailed',
    eyebrow: 'Start here',
    title: 'Read this first!',
    lead: 'AI Nike Chan derivative works are broadly welcome when they are unofficial, non-commercial, and respectful of rights. Use this quick guide when you need a fast answer.',
    petMessage: 'The detailed guidelines are the official source. Start with OK, Conditional OK, Ask first, and NG to judge most cases.',
    cards: [
      {
        tone: 'ok',
        title: 'OK',
        label: 'Create and share',
        items: [
          'Fan art, comics, novels, videos, streams, and games',
          'Social posts, icons, headers, and video thumbnails',
          'Personal-use goods and one-time free gifts to a specific person',
        ],
      },
      {
        tone: 'conditional',
        title: 'Conditional OK',
        label: 'Allowed with conditions',
        items: [
          'Platform ads, tips, memberships, and similar standard monetization',
          'Cost-recovery distribution of printed books, art books, and postcards',
          'R-18/R-18G content is OK with conditions such as age gates, sensitive settings, and preview care',
        ],
      },
      {
        tone: 'ask',
        title: 'Ask first',
        label: 'Please contact us first',
        items: [
          'Large-scale distribution, bookstore consignment, or commercial-like projects',
          'Posts, streams, or events expected to generate significant revenue',
          'Sponsorships, tie-ups, affiliate links, or product-sales funnels',
        ],
      },
      {
        tone: 'ng',
        title: 'NG',
        label: 'Do not publish or distribute',
        items: [
          'Misleading official, endorsed, supervised, or impersonation-style presentation',
          'Optional payments, donations, support plans, paid digital distribution',
          'Sales or distribution of acrylic goods, apparel, 3D goods, or non-printed goods',
          'Political or religious claims, defamation, rights infringement, or offensive content',
        ],
      },
    ],
    aiTitle: 'Important for AI use',
    aiLead: 'When using generative AI, pay special attention to which materials are allowed.',
    aiItems: [
      'Allowed materials are VRM models, logo images, and materials explicitly permitted on this website.',
      'Existing illustrations, stream assets, thumbnails, screenshots, and similar materials cannot be used as AI input, references, or training data.',
      'To use another creator\'s derivative work with AI, you need that creator\'s explicit permission first.',
    ],
    aiLink: 'Read the Generative AI Guidelines',
    faqTitle: 'Common questions',
    faqs: [
      {
        question: 'Is credit required?',
        answer: 'For one-off social posts, it is optional. For distributed works and distribution pages, state that it is an unofficial fan-made work and include the character name.',
      },
      {
        question: 'Can I distribute free games or free assets?',
        answer: 'Yes. They must be price 0, and optional payment, tipping, ads, and other monetization features must be disabled.',
      },
      {
        question: 'What if I am unsure?',
        answer: 'Check the detailed guidelines first. If you are still unsure, contact us via X DM or the Discord community.',
      },
    ],
    officialNote: 'This quick guide is a readable summary. The detailed guidelines take priority for official conditions and exception handling.',
    detailTitle: 'Detailed Guidelines',
    detailLead: 'Check the official conditions, attribution templates, and FAQ here.',
    detailLinkLabel: 'View Detailed Guidelines',
  },
}

function GuidelineQuickStart({ locale }: { locale: Locale }) {
  const content = quickGuideContent[locale]
  const langQuery = locale !== 'ja' ? `?lang=${locale}` : ''

  return (
    <section id="guideline-simple" className="guideline-quick-start" aria-labelledby="guideline-quick-title">
      <div className="guideline-quick-hero">
        <div className="guideline-quick-hero__copy">
          <p className="guideline-quick-eyebrow">{content.eyebrow}</p>
          <h2 id="guideline-quick-title">{content.title}</h2>
          <p>{content.lead}</p>
          <div className="guideline-quick-speech">
            {content.petMessage}
          </div>
        </div>
      </div>

      <div className="guideline-quick-card-grid">
        {content.cards.map((card) => {
          const Icon = quickGuideIconMap[card.tone]

          return (
            <article key={card.tone} className={`guideline-quick-card guideline-quick-card--${card.tone}`}>
              <div className="guideline-quick-card__head">
                <Icon className="h-6 w-6" aria-hidden="true" />
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.label}</p>
                </div>
              </div>
              <ul>
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>

      <div className="guideline-ai-quick">
        <div className="guideline-ai-quick__head">
          <Sparkles className="guideline-ai-quick__icon h-6 w-6" aria-hidden="true" />
          <div>
            <h3>{content.aiTitle}</h3>
            <p>{content.aiLead}</p>
          </div>
        </div>
        <ul>
          {content.aiItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <a href={`/guidelines/ai${langQuery}`}>{content.aiLink}</a>
      </div>

      <div className="guideline-quick-faq" aria-labelledby="guideline-quick-faq-title">
        <h3 id="guideline-quick-faq-title">{content.faqTitle}</h3>
        <div className="guideline-quick-faq__grid">
          {content.faqs.map((faq) => (
            <article key={faq.question}>
              <h4>{faq.question}</h4>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>

      <p className="guideline-quick-note">{content.officialNote}</p>

      <div className="guideline-detail-link-row">
        <a href={`/guidelines/derivative${langQuery}`} className="guideline-detail-link">
          {content.detailLinkLabel}
        </a>
      </div>
    </section>
  )
}

function GuidelineViewSwitch({ activeView, locale }: { activeView: 'simple' | 'detail'; locale: Locale }) {
  const content = quickGuideContent[locale]
  const langQuery = locale !== 'ja' ? `?lang=${locale}` : ''
  const baseClass = 'design-toggle-link'
  const activeClass = 'design-toggle-link--active'
  const inactiveClass = 'design-toggle-link--inactive'

  return (
    <nav className="design-toggle guideline-view-switch" aria-label={content.quickNavLabel}>
      <a
        href={`/guidelines${langQuery}`}
        className={`${baseClass} ${activeView === 'simple' ? activeClass : inactiveClass}`}
      >
        {content.simpleLabel}
      </a>
      <a
        href={`/guidelines/derivative${langQuery}`}
        className={`${baseClass} ${activeView === 'detail' ? activeClass : inactiveClass}`}
      >
        {content.detailLabel}
      </a>
    </nav>
  )
}

export function License({ active = 'derivative', locale = 'ja', mode = 'detail' }: Props) {
  const t = getT(locale)

  const derivativeMd = locale === 'ja' ? derivativeMdJa : derivativeMdEn
  const aiMd = locale === 'ja' ? aiMdJa : aiMdEn

  const content = active === 'derivative' ? derivativeMd : aiMd
  const html = mdToHtml(content)
  const langQuery = locale !== 'ja' ? `?lang=${locale}` : ''

  // 両方のmdファイルを結合
  const combinedContent = locale === 'ja'
    ? `# 二次創作ガイドライン\n\n${derivativeMd}\n\n---\n\n# 生成AIガイドライン\n\n${aiMd}`
    : `# Derivative Creation Guidelines\n\n${derivativeMd}\n\n---\n\n# Generative AI Guidelines\n\n${aiMd}`

  const copyButtonText = locale === 'ja' ? '全てのガイドラインをコピー' : 'Copy All Guidelines'

  return (
    <div className="character-page guideline-redesign min-h-screen">
      <section className="site-page-hero" aria-labelledby="guideline-title">
        <div className="character-detail-hero__grid" aria-hidden="true" />
        <div className="site-page-hero__inner">
          <h1 id="guideline-title">GUIDELINE</h1>
          <p>{locale === 'ja' ? '二次創作・生成AI利用のためのルール' : 'Rules for derivative works and generative AI usage'}</p>
        </div>
      </section>

      {/* コピー用の非表示要素 */}
      <div id="license-content" className="hidden">{combinedContent}</div>

      {/* Main Content */}
      <div className="relative">
        <div className="character-showcase-bg absolute inset-0" />
        <div className="designed-page-main relative z-10 max-w-5xl mx-auto px-4 py-8">
          <GuidelineViewSwitch activeView={mode === 'simple' ? 'simple' : 'detail'} locale={locale} />

          {mode === 'simple' ? (
            <GuidelineQuickStart locale={locale} />
          ) : (
            <>
              <nav className="guideline-detail-tabs" aria-label={locale === 'ja' ? '詳細版の項目' : 'Detailed guideline sections'}>
                <span className="guideline-detail-tabs__label">
                  {locale === 'ja' ? '詳細版' : 'Detailed'}
                </span>
                <a
                  href={`/guidelines/derivative${langQuery}`}
                  className={`guideline-detail-tab ${active === 'derivative' ? 'guideline-detail-tab--active' : ''}`}
                >
                  {t('guidelines:tabs.derivative')}
                </a>
                <a
                  href={`/guidelines/ai${langQuery}`}
                  className={`guideline-detail-tab ${active === 'ai' ? 'guideline-detail-tab--active' : ''}`}
                >
                  {t('guidelines:tabs.ai')}
                </a>
              </nav>

              {/* Content */}
              <div className="glass-panel guideline-content-panel p-6 md:p-8 relative">
                {/* コピーボタン */}
                <div className="guideline-copy-row">
                  <button
                    id="copy-license-btn"
                    type="button"
                    className="guideline-copy-button"
                  >
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    {copyButtonText}
                  </button>
                </div>
                <article className="prose guideline-prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Decorative Footer Gradient */}
      {mode === 'detail' && (
        <div className="character-footer h-16 relative overflow-hidden">
          <div className="character-footer-gradient absolute inset-0" />
        </div>
      )}
    </div>
  )
}
