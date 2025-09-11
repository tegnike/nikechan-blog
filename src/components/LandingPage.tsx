import { WelcomeSection } from "./lp/WelcomeSection";
import { AboutSection } from "./lp/AboutSection";
import { LicenseSection } from "./lp/LicenseSection";
import { GallerySection } from "./lp/GallerySection";
import { SocialLinksSection } from "./lp/SocialLinksSection";
import { SupportSection } from "./lp/SupportSection";

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <main className="flex-1 relative z-10">
        {/* Top hero section (has its own background) */}
        <WelcomeSection />

        {/* Content sections with subtle white background */}
        <div className="bg-white/30">
          <AboutSection />
        </div>

        <div className="bg-white/30">
          <LicenseSection />
          <GallerySection />
          <SocialLinksSection />
          <SupportSection />
        </div>
      </main>
    </div>
  );
}
