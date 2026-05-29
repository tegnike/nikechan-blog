import type { Locale } from '../i18n/config'

type LegalPageKind = 'privacy' | 'terms'

type Section = {
  heading: string
  body: string[]
}

type LegalContent = {
  eyebrow: string
  title: string
  lead: string
  updatedAt: string
  sections: Section[]
}

type Props = {
  kind: LegalPageKind
  locale?: Locale
}

const privacyJa: LegalContent = {
  eyebrow: 'PRIVACY',
  title: 'プライバシーポリシー',
  lead: '本サイトにおける情報の取り扱いについて定めます。',
  updatedAt: '2026年5月29日',
  sections: [
    {
      heading: '1. 取得する情報',
      body: [
        '本サイトでは、アクセス解析、セキュリティ、表示改善、問い合わせ対応のために、アクセス日時、IPアドレス、ブラウザ情報、参照元、閲覧ページなどの技術情報を取得する場合があります。',
        '現在、本サイト上で氏名、住所、電話番号、決済情報を直接入力していただくフォームは設置していません。外部サービスへ移動した場合は、各サービスのプライバシーポリシーが適用されます。',
      ],
    },
    {
      heading: '2. 利用目的',
      body: [
        '取得した情報は、本サイトの運営、保守、セキュリティ確保、表示品質の改善、利用状況の把握、不正利用の防止、問い合わせへの対応のために利用します。',
        '法令に基づく場合を除き、取得した情報を上記の目的と無関係な用途で利用しません。',
      ],
    },
    {
      heading: '3. 外部サービス',
      body: [
        '本サイトでは、コンテンツ表示や外部導線のために、X、Discord、pixivFANBOX、GitHub、YouTube、CDN、ホスティングサービス、Supabase等の外部サービスを利用する場合があります。',
        '外部サービス上で取得される情報の取り扱いは、各外部サービスの規約およびプライバシーポリシーに従います。',
      ],
    },
    {
      heading: '4. Cookie等の利用',
      body: [
        '本サイトまたは利用している外部サービスは、表示設定、アクセス解析、セキュリティ、埋め込みコンテンツの表示等のためにCookieまたは類似技術を利用する場合があります。',
        'ブラウザの設定によりCookieを無効化できますが、一部機能や外部コンテンツが正しく表示されない場合があります。',
      ],
    },
    {
      heading: '5. 第三者提供',
      body: [
        '法令に基づく場合、本人の同意がある場合、不正利用や権利侵害への対応に必要な場合を除き、取得した個人情報を第三者に提供しません。',
      ],
    },
    {
      heading: '6. 開示・訂正・削除等',
      body: [
        '本人から個人情報の開示、訂正、利用停止、削除等の請求があった場合、本人確認のうえ、法令に従って合理的な範囲で対応します。',
      ],
    },
    {
      heading: '7. 改定',
      body: [
        '本ポリシーは、サイトの機能追加、利用サービスの変更、法令改正等に応じて改定する場合があります。重要な変更がある場合は、本サイト上で告知します。',
      ],
    },
    {
      heading: '8. お問い合わせ',
      body: [
        '本ポリシーに関するお問い合わせは、Aboutページに掲載しているXまたはDiscordからご連絡ください。',
      ],
    },
  ],
}

const privacyEn: LegalContent = {
  eyebrow: 'PRIVACY',
  title: 'Privacy Policy',
  lead: 'This policy explains how information is handled on this website.',
  updatedAt: 'May 29, 2026',
  sections: [
    {
      heading: '1. Information We Collect',
      body: [
        'This website may collect technical information such as access time, IP address, browser information, referrer, and viewed pages for analytics, security, display improvement, and responding to inquiries.',
        'This website currently does not provide forms that directly ask for names, addresses, phone numbers, or payment details. When you move to an external service, that service\'s privacy policy applies.',
      ],
    },
    {
      heading: '2. Purposes of Use',
      body: [
        'Collected information is used to operate and maintain this website, protect security, improve display quality, understand usage, prevent abuse, and respond to inquiries.',
        'Except where required by law, information will not be used for purposes unrelated to those described above.',
      ],
    },
    {
      heading: '3. External Services',
      body: [
        'This website may use external services such as X, Discord, pixivFANBOX, GitHub, YouTube, CDN providers, hosting services, and Supabase for content display and external links.',
        'Information collected on external services is handled according to each service\'s terms and privacy policy.',
      ],
    },
    {
      heading: '4. Cookies and Similar Technologies',
      body: [
        'This website or external services used by it may use cookies or similar technologies for display settings, analytics, security, and embedded content.',
        'You can disable cookies in your browser settings, but some features or external content may not display correctly.',
      ],
    },
    {
      heading: '5. Third-Party Disclosure',
      body: [
        'Personal information will not be disclosed to third parties except where required by law, with the person\'s consent, or where necessary to respond to abuse or rights infringement.',
      ],
    },
    {
      heading: '6. Disclosure, Correction, and Deletion',
      body: [
        'If a person requests disclosure, correction, suspension of use, or deletion of their personal information, we will respond within a reasonable scope in accordance with applicable law after identity confirmation.',
      ],
    },
    {
      heading: '7. Updates',
      body: [
        'This policy may be updated when site features, external services, or applicable laws change. Important changes will be announced on this website.',
      ],
    },
    {
      heading: '8. Contact',
      body: [
        'For questions about this policy, please contact us through X or Discord as listed on the About page.',
      ],
    },
  ],
}

const termsJa: LegalContent = {
  eyebrow: 'TERMS',
  title: 'サイト利用規約',
  lead: '本サイトを利用する際の基本的な条件を定めます。',
  updatedAt: '2026年5月29日',
  sections: [
    {
      heading: '1. 適用範囲',
      body: [
        '本規約は、AIニケちゃんオフィシャルサイトおよび本サイト上で提供するコンテンツの利用に適用されます。',
        '二次創作、生成AI利用、キャラクター素材の取り扱いについては、別途公開している各ガイドラインもあわせて適用されます。',
      ],
    },
    {
      heading: '2. コンテンツの権利',
      body: [
        '本サイトに掲載される文章、画像、動画、ロゴ、キャラクター、デザイン、プログラム等の権利は、作者または正当な権利者に帰属します。',
        '引用、リンク、二次創作、生成AI利用等については、法令、本規約、各ガイドライン、各権利者の利用条件に従ってください。',
      ],
    },
    {
      heading: '3. ファンアート・第三者コンテンツ',
      body: [
        '本サイトに掲載するファンアート、外部記事、外部サービス上のコンテンツ等の権利は、それぞれの作者または権利者に帰属します。',
        '第三者コンテンツを再利用、転載、加工、学習データ化する場合は、各権利者の許諾および利用条件を確認してください。',
        '本サイトのコンテンツについては、別途公開している各ガイドラインも参照してください。',
      ],
    },
    {
      heading: '4. 禁止事項',
      body: [
        '法令または公序良俗に反する行為、第三者または作者の権利を侵害する行為、なりすまし、過度な負荷をかける行為、不正アクセス、スクレイピング等による迷惑行為、サイト運営を妨害する行為を禁止します。',
        '公式、監修、公認であると誤認させる表示や、本サイトの内容を用いた誹謗中傷、差別的表現、詐欺的な誘導も禁止します。',
      ],
    },
    {
      heading: '5. 外部リンク',
      body: [
        '本サイトには外部サイトや外部サービスへのリンクが含まれます。外部サイトの内容、提供条件、情報の取り扱いについて、本サイトは責任を負いません。',
        '外部サービスを利用する場合は、各サービスの規約、ガイドライン、プライバシーポリシーを確認してください。',
      ],
    },
    {
      heading: '6. 免責',
      body: [
        '本サイトの情報は正確性や最新性に配慮して掲載しますが、その完全性、正確性、有用性、継続的な提供を保証するものではありません。',
        '本サイトの利用または利用不能により生じた損害について、法令上認められる範囲で責任を負いません。',
      ],
    },
    {
      heading: '7. 変更・停止',
      body: [
        '本サイトの内容、URL、仕様、提供範囲、各ガイドラインおよび本規約は、予告なく変更、停止、削除する場合があります。',
      ],
    },
    {
      heading: '8. 準拠法',
      body: [
        '本規約は日本法に準拠します。本サイトに関して紛争が生じた場合は、当事者間で誠実に協議して解決を図ります。',
      ],
    },
    {
      heading: '9. お問い合わせ',
      body: [
        '本規約に関するお問い合わせは、Aboutページに掲載しているXまたはDiscordからご連絡ください。',
      ],
    },
  ],
}

const termsEn: LegalContent = {
  eyebrow: 'TERMS',
  title: 'Terms of Use',
  lead: 'These terms set out the basic conditions for using this website.',
  updatedAt: 'May 29, 2026',
  sections: [
    {
      heading: '1. Scope',
      body: [
        'These terms apply to the AI Nike Chan Official Website and the content provided on it.',
        'For derivative works, generative AI usage, and character materials, the separately published guidelines also apply.',
      ],
    },
    {
      heading: '2. Rights to Content',
      body: [
        'Rights to text, images, videos, logos, characters, designs, programs, and other content on this website belong to the creator or the respective rights holders.',
        'Quotations, links, derivative works, and generative AI usage must comply with applicable laws, these terms, the relevant guidelines, and each rights holder\'s conditions.',
      ],
    },
    {
      heading: '3. Fan Art and Third-Party Content',
      body: [
        'Rights to fan art, external articles, external service content, and other third-party content displayed on this website belong to their respective creators or rights holders.',
        'Before reusing, reproducing, modifying, or using third-party content as training data, please confirm permission and applicable conditions from the relevant rights holder.',
        'Please also refer to the separately published guidelines for content on this website.',
      ],
    },
    {
      heading: '4. Prohibited Conduct',
      body: [
        'You may not engage in conduct that violates laws or public order, infringes rights, impersonates others, places excessive load on the site, attempts unauthorized access, causes nuisance through scraping or similar activity, or interferes with site operation.',
        'You may not use this website\'s content for misleading official endorsement claims, defamation, discriminatory expression, or fraudulent guidance.',
      ],
    },
    {
      heading: '5. External Links',
      body: [
        'This website contains links to external sites and services. This website is not responsible for the content, conditions, or information handling of external sites.',
        'When using external services, please review each service\'s terms, guidelines, and privacy policy.',
      ],
    },
    {
      heading: '6. Disclaimer',
      body: [
        'We try to keep information on this website accurate and current, but do not guarantee completeness, accuracy, usefulness, or continuous availability.',
        'To the extent permitted by law, we are not liable for damages arising from use of or inability to use this website.',
      ],
    },
    {
      heading: '7. Changes and Suspension',
      body: [
        'The content, URLs, specifications, scope of provision, guidelines, and these terms may be changed, suspended, or removed without prior notice.',
      ],
    },
    {
      heading: '8. Governing Law',
      body: [
        'These terms are governed by the laws of Japan. If a dispute arises regarding this website, the parties will first seek resolution through good-faith discussion.',
      ],
    },
    {
      heading: '9. Contact',
      body: [
        'For questions about these terms, please contact us through X or Discord as listed on the About page.',
      ],
    },
  ],
}

const contentByKind: Record<LegalPageKind, Record<Locale, LegalContent>> = {
  privacy: {
    ja: privacyJa,
    en: privacyEn,
  },
  terms: {
    ja: termsJa,
    en: termsEn,
  },
}

export function LegalPage({ kind, locale = 'ja' }: Props) {
  const content = contentByKind[kind][locale]

  return (
    <div className="character-page guideline-redesign legal-redesign min-h-screen">
      <section className="site-page-hero" aria-labelledby="legal-title">
        <div className="character-detail-hero__grid" aria-hidden="true" />
        <div className="site-page-hero__inner">
          <h1 id="legal-title">{content.eyebrow}</h1>
          <p>{content.title}</p>
        </div>
      </section>

      <div className="relative">
        <div className="character-showcase-bg absolute inset-0" />
        <main className="designed-page-main relative z-10 max-w-5xl mx-auto px-4 py-8">
          <article className="glass-panel guideline-content-panel legal-content-panel p-6 md:p-8">
            <div className="legal-page-heading">
              <h2>{content.title}</h2>
              <p>{content.lead}</p>
              <p className="legal-updated">
                {locale === 'ja' ? '最終更新日' : 'Last updated'}: {content.updatedAt}
              </p>
            </div>

            <div className="prose guideline-prose legal-prose max-w-none">
              {content.sections.map((section) => (
                <section key={section.heading}>
                  <h3>{section.heading}</h3>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </div>
          </article>
        </main>
      </div>

      <div className="character-footer h-16 relative overflow-hidden">
        <div className="character-footer-gradient absolute inset-0" />
      </div>
    </div>
  )
}
