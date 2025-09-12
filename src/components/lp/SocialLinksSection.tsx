import * as React from "react";
import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M18.146 2H21l-6.5 7.43L22 22h-6.8l-4.25-5.57L5.9 22H3l6.94-7.93L2 2h6.86l3.87 5.2L18.146 2Zm-1.19 18h1.92L7.12 4h-1.9l11.736 16Z"
    />
  </svg>
);

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M20 5.54A17.2 17.2 0 0 0 15.7 4l-.23.47a15.3 15.3 0 0 1 3.46 1.3c-3.23-1.52-6.84-1.52-10.07 0 .36-.2.74-.36 1.13-.52L9.7 4C8.48 4.33 7.3 4.8 6.18 5.4 3.8 8.95 3.2 12.4 3.46 15.82c1.25.92 2.6 1.63 4.03 2.12l.86-1.81c-.47-.18-.92-.4-1.34-.66l.3-.23c2.59 1.2 5.57 1.2 8.16 0l.3.23c-.42.26-.87.48-1.34.66l.86 1.81c1.43-.49 2.78-1.2 4.03-2.12.33-4.17-.38-7.57-1.7-10.28ZM9.72 13.88c-.8 0-1.45-.75-1.45-1.68 0-.93.64-1.68 1.45-1.68.8 0 1.45.75 1.45 1.68 0 .93-.65 1.68-1.45 1.68Zm4.56 0c-.8 0-1.45-.75-1.45-1.68 0-.93.65-1.68 1.45-1.68s1.45.75 1.45 1.68c0 .93-.64 1.68-1.45 1.68Z"
    />
  </svg>
);

const YouTubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M23 7.5c0-1.4-1.1-2.5-2.4-2.7C18.7 4.3 15.6 4 12 4s-6.7.3-8.6.8C2.1 5 1 6.1 1 7.5 1 9 1 11 1 12.5S1 16 1 17.5c0 1.4 1.1 2.5 2.4 2.7C5.3 20.7 8.4 21 12 21s6.7-.3 8.6-.8c1.3-.2 2.4-1.3 2.4-2.7 0-1.5 0-3.5 0-5s0-3.5 0-5Zm-13 7.7V8.8l6.2 3.2-6.2 3.2Z"
    />
  </svg>
);

export function SocialLinksSection() {
  const links = [
    {
      label: "Twitter (X)",
      handle: "@tegnike",
      href: "https://twitter.com/tegnike",
      Icon: XIcon,
      accent: "text-gray-900",
      ring: "ring-gray-300",
      note: "管理者のアカウント",
    },
    {
      label: "Twitter (X)",
      handle: "@ai_nikechan",
      href: "https://twitter.com/ai_nikechan",
      Icon: XIcon,
      accent: "text-gray-900",
      ring: "ring-gray-300",
      note: "AIニケちゃんのアカウント",
    },
    {
      label: "Discord",
      handle: "参加リンク",
      href: "https://discord.gg/4jv5AuybqC",
      Icon: DiscordIcon,
      accent: "text-indigo-600",
      ring: "ring-indigo-300",
    },
    {
      label: "YouTube",
      handle: "@nikechan",
      href: "https://www.youtube.com/@nikechan",
      Icon: YouTubeIcon,
      accent: "text-red-600",
      ring: "ring-red-300",
    },
  ] as const;

  return (
    <section className="relative pt-10 pb-20 px-4 overflow-hidden">
      <div className="container relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            SNS
          </h2>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            各種SNSでニケちゃんとつながろう。最新情報やコミュニティ活動をチェック
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {links.map(({ label, handle, href, Icon, accent, ring, note }, i) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className={`relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-sm backdrop-blur ring-2 ${ring}`}>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm border ${ring}`}>
                        <Icon className={`h-6 w-6 ${accent}`} />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">{label}</div>
                        <div className="text-xl font-bold text-gray-900">{handle}</div>
                        {note && (
                          <div className="text-sm text-gray-600">{note}</div>
                        )}
                      </div>
                    </div>

                    <Button asChild size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        開く
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
