import { WelcomeSection } from "./lp/WelcomeSection";
import { NewsSection } from "./lp/NewsSection";
import { AboutSection } from "./lp/AboutSection";
import { LicenseSection } from "./lp/LicenseSection";
import { GallerySection } from "./lp/GallerySection";
import { SocialLinksSection } from "./lp/SocialLinksSection";
import { ContactSupportSection } from "./lp/ContactSupportSection";
import { SupportSection } from "./lp/SupportSection";
import type { Locale } from '../i18n/config';

type Props = {
  locale?: Locale;
}

export function LandingPage({ locale = 'ja' }: Props) {
  return (
    <div className="character-page min-h-screen">
      {/* ヒーローセクション（維持） */}
      <WelcomeSection locale={locale} />

      {/* メインコンテンツ */}
      <div className="relative">
        <div className="character-showcase-bg absolute inset-0" />
        <div className="relative z-10">
          <AboutSection locale={locale} />
          <NewsSection locale={locale} limit={3} />
          <LicenseSection locale={locale} />
          <GallerySection locale={locale} />
          <SocialLinksSection locale={locale} />
          <SupportSection locale={locale} />
          <ContactSupportSection locale={locale} />
        </div>
      </div>

      {/* フッターグラデーション */}
      <div className="character-footer h-24 relative overflow-hidden">
        <div className="character-footer-gradient absolute inset-0" />
      </div>
    </div>
  );
}
