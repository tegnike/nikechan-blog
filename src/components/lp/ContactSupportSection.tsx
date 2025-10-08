import { Button } from "./ui/button";
import { Mail, MessageSquare, AtSign } from "lucide-react";
import { motion } from "motion/react";

export function ContactSupportSection() {
  return (
    <section id="contact" className="relative pt-10 pb-10 sm:pb-20 px-6 sm:px-10 overflow-hidden">
      <div className="container relative z-10 mx-auto max-w-6xl">
        <div
          className="text-center mb-10"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            お問い合わせ
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 backdrop-blur mx-auto max-w-3xl">
          <div className="">
            <div className="space-y-5 sm:space-y-6">
              {/* Twitter (X) */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-white/60 bg-white/70 backdrop-blur">
                <div className="flex items-center gap-3">
                  <AtSign className="w-4 h-4 text-gray-700" />
                  <div>
                    <div className="text-sm text-gray-500">Twitter (X)</div>
                    <div className="text-base font-semibold text-gray-900">DMでご連絡ください</div>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm" className="gap-1.5">
                  <a href="https://twitter.com/tegnike" target="_blank" rel="noopener noreferrer">
                    @tegnike
                  </a>
                </Button>
              </div>

              {/* Discord */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-white/60 bg-white/70 backdrop-blur">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                  <div>
                    <div className="text-sm text-gray-500">Discord</div>
                    <div className="text-base font-semibold text-gray-900">コミュニティ内でのご相談はこちら</div>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm">
                  <a href="https://discord.gg/G4E5Sf3yj3" target="_blank" rel="noopener noreferrer">
                    参加リンク
                  </a>
                </Button>
              </div>

              {/* Email */}
              <div className="rounded-2xl border border-white/60 bg-white/60 p-4 backdrop-blur">
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-4 h-4" />
                  <p className="font-medium">メール</p>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  メール窓口は現在準備中です。恐れ入りますが、当面は Twitter (X) または Discord よりご連絡ください。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
