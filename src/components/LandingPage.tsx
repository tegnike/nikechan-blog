import { WelcomeSection } from "./lp/WelcomeSection";
import { HomeNewsSection } from "./lp/HomeNewsSection";
import { YoutubeSection } from "./lp/YoutubeSection";
import { CharacterSection } from "./lp/CharacterSection";
import { GallerySection } from "./lp/GallerySection";
import { LicenseSection } from "./lp/LicenseSection";
import { BlogSection } from "./lp/BlogSection";
import { SupportSection } from "./lp/SupportSection";
import { BlobDefs } from "./lp/Blob";
import type { Locale } from '../i18n/config';
import type { LatestYoutube } from '../lib/youtube';

type Props = {
  locale?: Locale;
  youtube?: LatestYoutube;
}

export function LandingPage({ locale = 'ja', youtube }: Props) {
  return (
    <main className="nk-home">
      <BlobDefs />
      <WelcomeSection locale={locale} />
      <HomeNewsSection locale={locale} />
      <YoutubeSection locale={locale} tone="tint" latest={youtube} />
      <CharacterSection locale={locale} />
      <GallerySection locale={locale} />
      <LicenseSection locale={locale} />
      <BlogSection locale={locale} />
      <SupportSection locale={locale} />
    </main>
  );
}
