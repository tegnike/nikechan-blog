import { WelcomeSection } from "./lp/WelcomeSection";
import { HomeNewsSection } from "./lp/HomeNewsSection";
import { CharacterSection } from "./lp/CharacterSection";
import { GallerySection } from "./lp/GallerySection";
import { LicenseSection } from "./lp/LicenseSection";
import { BlogSection } from "./lp/BlogSection";
import { SupportSection } from "./lp/SupportSection";
import { BlobDefs } from "./lp/Blob";
import type { Locale } from '../i18n/config';

type Props = {
  locale?: Locale;
}

export function LandingPage({ locale = 'ja' }: Props) {
  return (
    <main className="nk-home">
      <BlobDefs />
      <WelcomeSection locale={locale} />
      <HomeNewsSection locale={locale} />
      <CharacterSection locale={locale} />
      <GallerySection locale={locale} />
      <LicenseSection locale={locale} />
      <BlogSection locale={locale} />
      <SupportSection locale={locale} />
    </main>
  );
}
