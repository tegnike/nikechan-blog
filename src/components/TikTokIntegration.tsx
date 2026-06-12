import { Locale } from '../i18n/config'

interface TikTokIntegrationProps {
  locale: Locale
}

export function TikTokIntegration({ locale }: TikTokIntegrationProps) {
  const isJa = locale === 'ja'

  return (
    <div className="character-page tutorial-redesign tiktok-integration-page min-h-screen">
      <div className="relative py-12 sm:py-16 px-3 sm:px-6">
        <div className="site-shell">
          <section className="glass-panel p-6 sm:p-10 space-y-8">
            <div className="home-section-subheading">
              <span>TIKTOK INTEGRATION</span>
              <h1>{isJa ? 'AIニケちゃん TikTok投稿連携' : 'AI Nike Chan TikTok Posting Integration'}</h1>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {isJa
                ? 'このページは、AIニケちゃん公式サイトで利用するTikTok Login KitおよびContent Posting API連携の説明ページです。クリエイター本人がアカウントを認可し、投稿内容を確認したうえで、オリジナル短尺動画をTikTokへ送信します。'
                : 'This page describes the TikTok Login Kit and Content Posting API integration used for the AI Nike Chan official publishing workflow. The creator authorizes their TikTok account, reviews the selected account and post settings, then sends an original short-form video to TikTok.'}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {[
                ['Login Kit', 'user.info.basic', 'Confirms the authorized TikTok creator account before export.'],
                ['Content Posting API', 'video.publish', 'Posts creator-approved original videos to the authorized profile.'],
                ['Content Posting API', 'video.upload', 'Uploads draft content when Direct Post is not used.'],
              ].map(([product, scope, description]) => (
                <div key={scope} className="tiktok-review-card p-5">
                  <p className="text-sm text-purple-700 font-semibold">{product}</p>
                  <h2 className="text-lg font-bold text-gray-900 mt-1">{scope}</h2>
                  <p className="text-sm text-gray-700 mt-3 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>

            <div className="tiktok-review-card p-5 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">End-to-end posting flow</h2>
              <ol className="space-y-3 text-gray-700">
                <li><strong>1.</strong> The creator opens the AI Nike Chan publishing interface.</li>
                <li><strong>2.</strong> The creator signs in with TikTok Login Kit and grants the selected scopes.</li>
                <li><strong>3.</strong> The app displays the authorized TikTok account returned by <code>user.info.basic</code>.</li>
                <li><strong>4.</strong> The creator selects an original MP4, caption, AIGC disclosure, and privacy option.</li>
                <li><strong>5.</strong> The app uploads the video through the Content Posting API sandbox or production endpoint.</li>
                <li><strong>6.</strong> The app shows publish status polling until the request is complete.</li>
              </ol>
            </div>

            <div className="tiktok-review-card p-5 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Review demo interface</h2>
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6">
                <div className="space-y-3">
                  <div className="rounded-lg border border-purple-100 bg-white/70 p-4">
                    <p className="text-xs uppercase tracking-wide text-purple-700 font-semibold">Authorized account</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">nike_cha_n</p>
                    <p className="text-sm text-gray-600">TikTok account confirmed with Login Kit.</p>
                  </div>
                  <div className="rounded-lg border border-purple-100 bg-white/70 p-4">
                    <p className="text-xs uppercase tracking-wide text-purple-700 font-semibold">Selected video</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">ai-nikechan-short.mp4</p>
                    <p className="text-sm text-gray-600">Original AI character short video reviewed by the creator.</p>
                  </div>
                </div>
                <div className="tiktok-review-card tiktok-review-card--soft p-4 space-y-4">
                  <label className="block">
                    <span className="text-sm font-semibold text-gray-700">Caption</span>
                    <div className="tiktok-review-field mt-2 p-3 text-gray-800">
                      AI Nike Chan is testing a short-form TikTok publishing workflow. #AITuber #AICharacter
                    </div>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="tiktok-review-field p-3">
                      <p className="text-xs text-gray-500">Privacy</p>
                      <p className="font-semibold">Self only / Public</p>
                    </div>
                    <div className="tiktok-review-field p-3">
                      <p className="text-xs text-gray-500">AIGC</p>
                      <p className="font-semibold">Enabled</p>
                    </div>
                    <div className="tiktok-review-field p-3">
                      <p className="text-xs text-gray-500">Status</p>
                      <p className="font-semibold">Publish complete</p>
                    </div>
                  </div>
                  <div className="tiktok-review-action-note">
                    Demo action: the creator confirms these settings in the publishing tool, then sends the upload request to TikTok.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
