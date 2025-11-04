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
    <div className="min-h-screen flex flex-col relative">
      <main className="flex-1 relative z-10">
        {/* Top hero section (has its own background) */}
        <WelcomeSection locale={locale} />

        {/* Content sections share a subtle white background (ambient spots removed) */}
        <div className="bg-white/30">
          <AboutSection locale={locale} />
          <NewsSection locale={locale} />
          <LicenseSection locale={locale} />
          <GallerySection locale={locale} />
          <SocialLinksSection locale={locale} />
          <SupportSection locale={locale} />
          <ContactSupportSection locale={locale} />
        </div>
      </main>
    </div>
  );
}
