import { getT, type Locale } from '../i18n/config'
import { getCharacterFeatures } from '../utils/characterFeatures'

type Props = {
  active?: 'illustration' | 'video'
  locale?: Locale
}

export function Tutorial({ active = 'illustration', locale = 'ja' }: Props) {
  const t = getT(locale)
  const tabCardBase =
    'group relative flex-1 w-full overflow-hidden rounded-2xl border-2 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-300';
  const tabCardActive = 'border-purple-500 shadow-lg shadow-purple-200/60';
  const tabCardInactive = 'border-gray-300 shadow-md hover:border-purple-300 hover:shadow-lg';
  const tabLabelBase =
    'absolute inset-x-0 bottom-0 bg-black/60 px-3 py-2 text-center text-sm font-semibold text-white backdrop-blur-sm transition-colors md:text-base';
  const tabLabelActive = 'bg-purple-600/90';
  const tabLabelInactive = 'group-hover:bg-purple-500/80';
  const tabImageClass = 'w-full object-cover aspect-[16/9]';
  const downloadButtonClass =
    'inline-flex items-center gap-2 rounded-md border border-purple-200 bg-white px-3 py-1.5 text-sm font-medium text-purple-600 shadow-sm transition hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2';
  const videoModeButtonBase =
    'flex-1 rounded-lg border px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 focus-visible:ring-offset-2 md:text-base';
  const videoModeButtonActive = 'border-purple-600 bg-purple-600 text-white shadow-lg shadow-purple-200/60';
  const videoModeButtonInactive =
    'border-gray-300 bg-white text-gray-700 hover:border-purple-300 hover:text-purple-600 hover:shadow-md';
  const characterFeatures = getCharacterFeatures(locale)
  const dancePromptBase = t('tutorial:illustration.prompts.dancePrompt')
  const dancePrompt = `${dancePromptBase}\n${characterFeatures}`
  const videoPromptBase = t('tutorial:video.reference.videoPrompt')
  const videoPrompt = `${videoPromptBase}\n${characterFeatures}`
  const videoPrompt2Base = t('tutorial:video.reference.videoPrompt2')
  const videoPrompt2 = `${videoPrompt2Base}\n${characterFeatures}`
  const videoPrompt3 = t('tutorial:video.cameo.videoPrompt3')

  return (
    <>
      <div className="pt-12 pb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center">{t('tutorial:heading')}</h1>
      </div>

      <div className="container mx-auto max-w-5xl px-4 pb-16 mt-2">
        {/* タブ切り替え */}
        <div className="mb-6 flex w-full flex-col items-center justify-center gap-4 md:flex-row md:items-stretch">
          <a
            href={`/tutorial${locale !== 'ja' ? '?lang=' + locale : ''}`}
            className={`${tabCardBase} ${active === 'illustration' ? tabCardActive : tabCardInactive} md:max-w-sm`}
            aria-label={t('tutorial:tabs.illustration')}
          >
            <img src="/images/tutorial/gazou.png" alt={t('tutorial:tabs.illustration')} className={tabImageClass} />
            <span
              className={`${tabLabelBase} ${
                active === 'illustration' ? tabLabelActive : tabLabelInactive
              }`}
            >
              {t('tutorial:tabs.illustration')}
            </span>
          </a>
          <a
            href={`/tutorial/video${locale !== 'ja' ? '?lang=' + locale : ''}`}
           className={`${tabCardBase} ${active === 'video' ? tabCardActive : tabCardInactive} md:max-w-sm`}
            aria-label={t('tutorial:tabs.video')}
          >
            <img src="/images/tutorial/douga.png" alt={t('tutorial:tabs.video')} className={tabImageClass} />
            <span
              className={`${tabLabelBase} ${
                active === 'video' ? tabLabelActive : tabLabelInactive
              }`}
            >
              {t('tutorial:tabs.video')}
            </span>
          </a>
        </div>

        {/* はじめに（共通） */}
        <div className="rounded-xl border border-gray-200 bg-white/80 p-5 shadow-sm mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('tutorial:intro.heading')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t('tutorial:intro.description') }} />
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <p className="text-sm text-gray-700">
              <strong>{t('tutorial:intro.point')}</strong> {t('tutorial:intro.pointDescription')}
            </p>
          </div>
        </div>

        {active === 'illustration' ? (
          <div className="rounded-xl border border-gray-200 bg-white/80 p-5 shadow-sm">
            {/* 画像生成コンテンツ */}
            <div className="space-y-8">

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{t('tutorial:illustration.recommendedAI.heading')}</h2>
                <p className="text-gray-700 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('tutorial:illustration.recommendedAI.description') }} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{t('tutorial:illustration.nanoBanana.heading')}</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {t('tutorial:illustration.nanoBanana.accountNote')}
                </p>

                <div className="space-y-4 mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">{t('tutorial:illustration.nanoBanana.openStudio.heading')}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="underline">https://aistudio.google.com/</a> {t('tutorial:illustration.nanoBanana.openStudio.step1')}
                    </p>
                    <p className="text-gray-600 text-sm mb-2">
                      {t('tutorial:illustration.nanoBanana.openStudio.step2')}
                    </p>
                    <img src="/images/tutorial/google_ai_studio1.png" alt={t('tutorial:illustration.nanoBanana.openStudio.altStart')} className="rounded-lg border border-gray-300 shadow-sm  mb-4" />
                    <p className="text-gray-600 text-sm mb-2" dangerouslySetInnerHTML={{ __html: t('tutorial:illustration.nanoBanana.openStudio.step3') }} />
                    <img src="/images/tutorial/google_ai_studio2.png" alt={t('tutorial:illustration.nanoBanana.openStudio.altStart')} className="rounded-lg border border-gray-300 shadow-sm" />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{t('tutorial:illustration.materials.heading')}</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {t('tutorial:illustration.materials.description')}
                </p>

                <div className="space-y-4">
                  <div>
                    <img src="/images/tutorial/nikechan_三面図.png" alt={t('tutorial:illustration.materials.model3D.alt')} className="rounded-lg border border-gray-300 shadow-sm mb-2" />
                    <a
                      href="/images/tutorial/nikechan_三面図.png"
                      download
                      className={downloadButtonClass}
                      aria-label={t('tutorial:illustration.materials.model3D.downloadLabel')}
                    >
                      {t('tutorial:illustration.materials.model3D.downloadButton')}
                    </a>
                  </div>
                </div>

                <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <p className="text-sm text-yellow-800 mb-2">
                    <strong className="text-yellow-900">{t('tutorial:illustration.materials.usageMaterialsWarning.heading')}</strong>
                  </p>
                  <p className="text-sm text-yellow-800" dangerouslySetInnerHTML={{ __html: t('tutorial:illustration.materials.usageMaterialsWarning.description').replace('{guidelinesUrl}', `/guidelines/ai${locale !== 'ja' ? '?lang=' + locale : ''}`) }} />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{t('tutorial:illustration.prompts.heading')}</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {t('tutorial:illustration.prompts.intro')}
                </p>

                <p className="text-gray-700 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('tutorial:illustration.prompts.description1') }} />

                <p className="text-gray-700 mb-4 leading-relaxed">
                  {t('tutorial:illustration.prompts.description2')}
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">{t('tutorial:illustration.prompts.basicExample.heading')}</h3>
                    <div className="relative bg-gray-50 rounded-lg p-4 border border-gray-300 font-mono text-sm text-gray-800">
                      <button
                        type="button"
                        className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        data-copy-text={dancePrompt}
                        data-copy-default={t('tutorial:illustration.prompts.basicExample.copyButton')}
                        data-copy-success={t('tutorial:illustration.prompts.basicExample.copySuccess')}
                      >
                        {t('tutorial:illustration.prompts.basicExample.copyButton')}
                      </button>
                      <p className="pr-12" style={{ whiteSpace: 'pre-line' }}>
                        {dancePrompt}
                      </p>
                    </div>
                  </div>

                  <img src="/images/tutorial/ganbaru.png" alt={t('tutorial:illustration.prompts.basicExample.altImage')} className="rounded-lg border border-gray-300 shadow-sm" />
                </div>

                <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>{t('tutorial:illustration.prompts.tips.heading')}</strong>
                  </p>
                  <p className="text-sm text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: t('tutorial:illustration.prompts.tips.description1') }} />
                  <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: t('tutorial:illustration.prompts.tips.description2') }} />
                </div>

                <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <p className="text-sm text-yellow-800 mb-2">
                    <strong className="text-yellow-900">{t('tutorial:illustration.prompts.gachaWarning.heading')}</strong>
                  </p>
                  <p className="text-sm text-yellow-800" dangerouslySetInnerHTML={{ __html: t('tutorial:illustration.prompts.gachaWarning.description') }} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white/80 p-5 shadow-sm">
            {/* 動画生成コンテンツ */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{t('tutorial:video.recommendedAI.heading')}</h2>
                <p className="text-gray-700 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('tutorial:video.recommendedAI.description1') }} />
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {t('tutorial:video.recommendedAI.description2')}
                  <a href="https://grok.com/" target="_blank" rel="noopener noreferrer" className="underline">https://grok.com/</a>
                </p>
              </div>

              {/* Sora 2コンテンツ */}
              <div className="space-y-8" data-video-mode-container="true">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{t('tutorial:video.sora.heading')}</h2>
                  <p className="text-gray-700 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('tutorial:video.sora.accountNote') }} />
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer" className="underline">https://chatgpt.com/</a>
                  </p>

                  <div className="space-y-4 mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">{t('tutorial:video.sora.openApp.heading')}</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        <a href="https://sora.chatgpt.com/" target="_blank" rel="noopener noreferrer" className="underline">https://sora.chatgpt.com/</a> {t('tutorial:video.sora.openApp.step1')}
                      </p>
                      <img src="/images/tutorial/sora1.png" alt={t('tutorial:video.sora.openApp.altLogin')} className="rounded-lg border border-gray-300 shadow-sm mb-4" />
                      <p className="text-gray-600 text-sm mb-2" dangerouslySetInnerHTML={{ __html: t('tutorial:video.sora.openApp.step2') }} />
                      <img src="/images/tutorial/sora2.png" alt={t('tutorial:video.sora.openApp.altCreate')} className="rounded-lg border border-gray-300 shadow-sm" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white/90 p-4 shadow-sm sm:flex-row sm:items-center">
                  <span className="text-sm font-semibold text-gray-700 sm:w-48">{t('tutorial:video.videoModes.label')}</span>
                  <div className="flex flex-1 flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      data-video-mode-trigger="cameo"
                      data-active-classes={videoModeButtonActive}
                      data-inactive-classes={videoModeButtonInactive}
                      className={`${videoModeButtonBase} ${videoModeButtonInactive}`}
                      aria-pressed="true"
                    >
                      {t('tutorial:video.videoModes.cameo')}
                    </button>
                    <button
                      type="button"
                      data-video-mode-trigger="reference"
                      data-active-classes={videoModeButtonActive}
                      data-inactive-classes={videoModeButtonInactive}
                      className={`${videoModeButtonBase} ${videoModeButtonActive}`}
                      aria-pressed="false"
                    >
                      {t('tutorial:video.videoModes.reference')}
                    </button>
                  </div>
                </div>

                <div data-video-mode-content="cameo" className="space-y-8 hidden">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{t('tutorial:video.cameo.heading')}</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('tutorial:video.cameo.description') }} />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">{t('tutorial:video.cameo.specifyCharacter.heading')}</h3>
                      <p className="text-gray-600 text-sm mb-2" dangerouslySetInnerHTML={{ __html: t('tutorial:video.cameo.specifyCharacter.step1') }} />
                      <p className="text-gray-600 text-sm mb-2" dangerouslySetInnerHTML={{ __html: t('tutorial:video.cameo.specifyCharacter.step2') }} />
                      <img src="/images/tutorial/sora3.png" alt={t('tutorial:video.cameo.specifyCharacter.altCameo')} className="rounded-lg border border-gray-300 shadow-sm mb-4" />
                    </div>
                    <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: t('tutorial:video.cameo.cameoProfileNote') }} />
                    </div>
                    <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: t('tutorial:video.cameo.multiCharacterNote') }} />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{t('tutorial:video.cameo.prompts.heading')}</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('tutorial:video.cameo.prompts.description1') }} />

                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {t('tutorial:video.cameo.prompts.description2')}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">{t('tutorial:video.cameo.prompts.basicExample.heading')}</h3>
                        <div className="relative bg-gray-50 rounded-lg p-4 border border-gray-300 font-mono text-sm text-gray-800">
                          <button
                            type="button"
                            className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            data-copy-text={videoPrompt3}
                            data-copy-default={t('tutorial:video.cameo.prompts.basicExample.copyButton')}
                            data-copy-success={t('tutorial:video.cameo.prompts.basicExample.copySuccess')}
                          >
                            {t('tutorial:video.cameo.prompts.basicExample.copyButton')}
                          </button>
                          <p className="pr-12" style={{ whiteSpace: 'pre-line' }}>
                            {videoPrompt3}
                          </p>
                        </div>
                      </div>

                      <video
                        src="/images/tutorial/sora3.mp4"
                        controls
                        playsInline
                        className="mx-auto w-full max-w-xs md:max-w-sm rounded-lg border border-gray-300 shadow-sm"
                      />
                    </div>

                    <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>{t('tutorial:video.cameo.prompts.tips.heading')}</strong>
                      </p>
                      <p className="text-sm text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: t('tutorial:video.cameo.prompts.tips.description1') }} />
                      <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: t('tutorial:video.cameo.prompts.tips.description2') }} />
                    </div>
                  </div>
                </div>

                <div data-video-mode-content="reference" className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{t('tutorial:video.reference.materials.heading')}</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {t('tutorial:video.reference.materials.description')}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <img src="/images/tutorial/nikechan_三面図.png" alt={t('tutorial:video.reference.materials.model3D.alt')} className="rounded-lg border border-gray-300 shadow-sm mb-2" />
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700">
                          <span className="font-semibold">{t('tutorial:video.reference.materials.model3D.downloadLabel')}</span>
                          <a
                            href="/images/tutorial/nikechan_三面図.png"
                            download
                            className={downloadButtonClass}
                            aria-label={t('tutorial:video.reference.materials.model3D.ariaLabelHorizontal')}
                          >
                            {t('tutorial:video.reference.materials.model3D.downloadHorizontal')}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <p className="text-sm text-yellow-800 mb-2">
                        <strong className="text-yellow-900">{t('tutorial:video.reference.materials.aspectRatioWarning.heading')}</strong>
                      </p>
                      <p className="text-sm text-yellow-800" dangerouslySetInnerHTML={{ __html: t('tutorial:video.reference.materials.aspectRatioWarning.description') }} />
                    </div>

                    <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <p className="text-sm text-yellow-800 mb-2">
                        <strong className="text-yellow-900">{t('tutorial:video.reference.materials.usageMaterialsWarning.heading')}</strong>
                      </p>
                      <p className="text-sm text-yellow-800" dangerouslySetInnerHTML={{ __html: t('tutorial:video.reference.materials.usageMaterialsWarning.description').replace('{guidelinesUrl}', `/guidelines/ai${locale !== 'ja' ? '?lang=' + locale : ''}`) }} />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{t('tutorial:video.reference.prompts.heading')}</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('tutorial:video.reference.prompts.description1') }} />

                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {t('tutorial:video.reference.prompts.description2')}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">{t('tutorial:video.reference.prompts.basicExample.heading')}</h3>
                        <div className="relative bg-gray-50 rounded-lg p-4 border border-gray-300 font-mono text-sm text-gray-800">
                          <button
                            type="button"
                            className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            data-copy-text={videoPrompt}
                            data-copy-default={t('tutorial:video.reference.prompts.basicExample.copyButton')}
                            data-copy-success={t('tutorial:video.reference.prompts.basicExample.copySuccess')}
                          >
                            {t('tutorial:video.reference.prompts.basicExample.copyButton')}
                          </button>
                          <p className="pr-12" style={{ whiteSpace: 'pre-line' }}>
                            {videoPrompt}
                          </p>
                        </div>
                      </div>

                      <video
                        src="/images/tutorial/sora.mp4"
                        controls
                        playsInline
                        className="rounded-lg border border-gray-300 shadow-sm"
                      />
                    </div>

                    <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>{t('tutorial:video.reference.prompts.tips.heading')}</strong>
                      </p>
                      <p className="text-sm text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: t('tutorial:video.reference.prompts.tips.description1') }} />
                      <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: t('tutorial:video.reference.prompts.tips.description2') }} />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{t('tutorial:video.reference.startingFrame.heading')}</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('tutorial:video.reference.startingFrame.description').replace('{tutorialUrl}', `/tutorial${locale !== 'ja' ? '?lang=' + locale : ''}`) }} />

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">{t('tutorial:video.reference.startingFrame.basicExample.heading')}</h3>
                        <div className="relative bg-gray-50 rounded-lg p-4 border border-gray-300 font-mono text-sm text-gray-800">
                          <button
                            type="button"
                            className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            data-copy-text={videoPrompt2}
                            data-copy-default={t('tutorial:video.reference.startingFrame.basicExample.copyButton')}
                            data-copy-success={t('tutorial:video.reference.startingFrame.basicExample.copySuccess')}
                          >
                            {t('tutorial:video.reference.startingFrame.basicExample.copyButton')}
                          </button>
                          <p className="pr-12" style={{ whiteSpace: 'pre-line' }}>
                            {videoPrompt2}
                          </p>
                        </div>
                      </div>

                      <video
                        src="/images/tutorial/sora2.mp4"
                        controls
                        playsInline
                        className="rounded-lg border border-gray-300 shadow-sm"
                      />
                    </div>

                    <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <p className="text-sm text-yellow-800 mb-2">
                        <strong className="text-yellow-900">{t('tutorial:video.reference.gachaWarning.heading')}</strong>
                      </p>
                      <p className="text-sm text-yellow-800" dangerouslySetInnerHTML={{ __html: t('tutorial:video.reference.gachaWarning.description') }} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center rounded-xl border border-gray-200 bg-white/80 p-5 shadow-sm mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {t('tutorial:cta.heading')}
          </h2>
          <p className="text-gray-600 mb-6" dangerouslySetInnerHTML={{ __html: t('tutorial:cta.description') }} />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/gallery${locale !== 'ja' ? '?lang=' + locale : ''}`}
              className="inline-block bg-purple-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              {t('tutorial:cta.viewGallery')}
            </a>
            <a
              href={`/guidelines/ai${locale !== 'ja' ? '?lang=' + locale : ''}`}
              className="inline-block bg-white border-2 border-purple-600 text-purple-600 font-semibold px-8 py-3 rounded-lg hover:bg-purple-50 transition-colors"
            >
              {t('tutorial:cta.viewGuidelines')}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
