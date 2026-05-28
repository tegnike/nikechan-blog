import { getT, type Locale } from '../i18n/config'
import { getCharacterFeatures } from '../utils/characterFeatures'
import { getOptimizedImageSources } from '../utils/imageOptimization'

type Props = {
  locale?: Locale
}

const getOptimizedImageProps = (src: string, sizes = '(max-width: 768px) 100vw, 768px') => {
  const optimizedImage = getOptimizedImageSources(src)
  return {
    src: optimizedImage?.src ?? src,
    srcSet: optimizedImage?.srcSet,
    sizes: optimizedImage ? sizes : undefined,
    loading: 'lazy' as const,
    decoding: 'async' as const,
  }
}

export function Tutorial({ locale = 'ja' }: Props) {
  const t = getT(locale)
  const downloadButtonClass =
    'design-action-button inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2';
  const videoModeButtonBase =
    'video-mode-button flex-1 px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-2 md:text-base';
  const videoModeButtonActive = 'video-mode-button--active';
  const videoModeButtonInactive = 'video-mode-button--inactive';
  const copyButtonClass =
    'absolute top-3 right-3 inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300';
  const promptBoxClass = 'relative bg-gray-50 rounded-lg p-4 border border-gray-300 font-mono text-sm text-gray-800';
  const characterFeatures = getCharacterFeatures(locale)
  const imagePrompt = `${t('tutorial:illustration.prompts.dancePrompt')}\n${characterFeatures}`
  const videoReferencePrompt = `${t('tutorial:video.reference.videoPrompt2')}\n${characterFeatures}`
  const videoStoryPrompt = `${t('tutorial:video.story.videoPrompt')}\n${characterFeatures}`
  const imageServices = [
    { label: t('tutorial:illustration.recommendedAI.services.googleAiStudio'), href: 'https://aistudio.google.com/' },
    { label: t('tutorial:illustration.recommendedAI.services.chatgpt'), href: 'https://chatgpt.com/' },
    { label: t('tutorial:illustration.recommendedAI.services.midjourney'), href: 'https://www.midjourney.com/' },
    { label: t('tutorial:illustration.recommendedAI.services.stabilityAi'), href: 'https://stability.ai/' },
  ]
  const videoServices = [
    { label: t('tutorial:video.recommendedAI.services.veo'), href: 'https://deepmind.google/models/veo/' },
    { label: t('tutorial:video.recommendedAI.services.runway'), href: 'https://runwayml.com/' },
    { label: t('tutorial:video.recommendedAI.services.kling'), href: 'https://kling.art/' },
    { label: t('tutorial:video.recommendedAI.services.pika'), href: 'https://pika.art/' },
    { label: t('tutorial:video.recommendedAI.services.luma'), href: 'https://lumalabs.ai/dream-machine' },
  ]

  return (
    <div className="character-page tutorial-redesign min-h-screen">
      <section className="site-page-hero" aria-labelledby="tutorial-title">
        <div className="character-detail-hero__grid" aria-hidden="true" />
        <div className="site-page-hero__inner">
          <h1 id="tutorial-title">TUTORIALS</h1>
          <p>{t('tutorial:hero.description')}</p>
        </div>
      </section>

      <div className="relative">
        <div className="character-showcase-bg absolute inset-0" />
        <div className="designed-page-main relative z-10 max-w-5xl mx-auto px-4 py-8" data-tutorial-tab-container="true">
          <div className="glass-panel p-6 md:p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('tutorial:intro.heading')}</h2>
            <p className="text-gray-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t('tutorial:intro.description') }} />
            <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
              <p className="text-sm text-gray-700">
                <strong>{t('tutorial:intro.point')}</strong> {t('tutorial:intro.pointDescription')}
              </p>
            </div>
          </div>

          <div className="mb-6 grid w-full grid-cols-2 gap-3" role="tablist" aria-label={t('tutorial:heading')}>
            <button
              type="button"
              data-tutorial-tab-trigger="image"
              data-active-classes={videoModeButtonActive}
              data-inactive-classes={videoModeButtonInactive}
              className={`${videoModeButtonBase} ${videoModeButtonActive} min-h-14`}
              aria-selected="true"
              role="tab"
            >
              {t('tutorial:tabs.illustration')}
            </button>
            <button
              type="button"
              data-tutorial-tab-trigger="video"
              data-active-classes={videoModeButtonActive}
              data-inactive-classes={videoModeButtonInactive}
              className={`${videoModeButtonBase} ${videoModeButtonInactive} min-h-14`}
              aria-selected="false"
              role="tab"
            >
              {t('tutorial:tabs.video')}
            </button>
          </div>

          <section id="image" data-tutorial-tab-content="image" className="glass-panel p-6 md:p-8 scroll-mt-24" role="tabpanel">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{t('tutorial:illustration.recommendedAI.heading')}</h2>
                <p className="text-gray-700 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('tutorial:illustration.recommendedAI.description') }} />
                <ul className="tutorial-service-list text-gray-700">
                  {imageServices.map((service) => (
                    <li key={service.href}>
                      <a href={service.href} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-2 underline-offset-4">
                        {service.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{t('tutorial:illustration.materials.heading')}</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {t('tutorial:illustration.materials.description')}
                </p>

                <div className="space-y-4">
                  <div>
                    <img
                      {...getOptimizedImageProps('/images/tutorial/nikechan_三面図.png')}
                      alt={t('tutorial:illustration.materials.model3D.alt')}
                      width={2048}
                      height={1143}
                      className="rounded-lg border border-gray-300 shadow-sm mb-2"
                    />
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
                  <p className="text-sm text-gray-700 mb-2">
                    <strong className="text-gray-800">{t('tutorial:illustration.materials.usageMaterialsWarning.heading')}</strong>
                  </p>
                  <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: t('tutorial:illustration.materials.usageMaterialsWarning.description').replace('{guidelinesUrl}', `/guidelines/ai${locale !== 'ja' ? '?lang=' + locale : ''}`) }} />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{t('tutorial:illustration.prompts.heading')}</h2>
                <p className="text-gray-700 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('tutorial:illustration.prompts.description1') }} />

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
                  <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: t('tutorial:illustration.prompts.structure') }} />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">{t('tutorial:illustration.prompts.basicExample.heading')}</h3>
                    <div className={promptBoxClass}>
                      <button
                        type="button"
                        className={copyButtonClass}
                        data-copy-text={imagePrompt}
                        data-copy-default={t('tutorial:illustration.prompts.basicExample.copyButton')}
                        data-copy-success={t('tutorial:illustration.prompts.basicExample.copySuccess')}
                      >
                        {t('tutorial:illustration.prompts.basicExample.copyButton')}
                      </button>
                      <p className="pr-12" style={{ whiteSpace: 'pre-line' }}>
                        {imagePrompt}
                      </p>
                    </div>
                  </div>

                  <img {...getOptimizedImageProps('/images/tutorial/ganbaru.png')} alt={t('tutorial:illustration.prompts.basicExample.altImage')} className="rounded-lg border border-gray-300 shadow-sm" />
                </div>

                <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>{t('tutorial:illustration.prompts.tips.heading')}</strong>
                  </p>
                  <p className="text-sm text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: t('tutorial:illustration.prompts.tips.description1') }} />
                  <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: t('tutorial:illustration.prompts.tips.description2') }} />
                </div>

                <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong className="text-gray-800">{t('tutorial:illustration.prompts.gachaWarning.heading')}</strong>
                  </p>
                  <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: t('tutorial:illustration.prompts.gachaWarning.description') }} />
                </div>
              </div>
            </div>
          </section>

          <section id="video" data-tutorial-tab-content="video" className="glass-panel p-6 md:p-8 scroll-mt-24 hidden" role="tabpanel">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{t('tutorial:video.recommendedAI.heading')}</h2>
                <p className="text-gray-700 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('tutorial:video.recommendedAI.description') }} />
                <ul className="tutorial-service-list text-gray-700">
                  {videoServices.map((service) => (
                    <li key={service.href}>
                      <a href={service.href} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-2 underline-offset-4">
                        {service.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{t('tutorial:video.materials.heading')}</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {t('tutorial:video.materials.description')}
                </p>

                <div className="space-y-4">
                  <div>
                    <img
                      {...getOptimizedImageProps('/images/tutorial/nikechan_三面図.png')}
                      alt={t('tutorial:video.materials.model3D.alt')}
                      width={2048}
                      height={1143}
                      className="rounded-lg border border-gray-300 shadow-sm mb-2"
                    />
                    <a
                      href="/images/tutorial/nikechan_三面図.png"
                      download
                      className={downloadButtonClass}
                      aria-label={t('tutorial:video.materials.model3D.downloadLabel')}
                    >
                      {t('tutorial:video.materials.model3D.downloadButton')}
                    </a>
                  </div>
                </div>

                <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong className="text-gray-800">{t('tutorial:video.materials.usageMaterialsWarning.heading')}</strong>
                  </p>
                  <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: t('tutorial:video.materials.usageMaterialsWarning.description').replace('{guidelinesUrl}', `/guidelines/ai${locale !== 'ja' ? '?lang=' + locale : ''}`) }} />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{t('tutorial:video.prompts.heading')}</h2>
                <p className="text-gray-700 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('tutorial:video.prompts.description') }} />
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: t('tutorial:video.prompts.structure') }} />
                </div>
              </div>

              <div className="space-y-8" data-video-mode-container="true">
                <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white/90 p-4 shadow-sm sm:flex-row sm:items-center">
                  <span className="text-sm font-semibold text-gray-700 sm:w-48">{t('tutorial:video.videoModes.label')}</span>
                  <div className="flex flex-1 flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      data-video-mode-trigger="story"
                      data-active-classes={videoModeButtonActive}
                      data-inactive-classes={videoModeButtonInactive}
                      className={`${videoModeButtonBase} ${videoModeButtonActive}`}
                      aria-pressed="true"
                    >
                      {t('tutorial:video.videoModes.story')}
                    </button>
                    <button
                      type="button"
                      data-video-mode-trigger="reference"
                      data-active-classes={videoModeButtonActive}
                      data-inactive-classes={videoModeButtonInactive}
                      className={`${videoModeButtonBase} ${videoModeButtonInactive}`}
                      aria-pressed="false"
                    >
                      {t('tutorial:video.videoModes.reference')}
                    </button>
                  </div>
                </div>

                <div data-video-mode-content="story" className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">{t('tutorial:video.story.heading')}</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('tutorial:video.story.description') }} />
                    <div className={promptBoxClass}>
                      <button
                        type="button"
                        className={copyButtonClass}
                        data-copy-text={videoStoryPrompt}
                        data-copy-default={t('tutorial:video.prompts.basicExample.copyButton')}
                        data-copy-success={t('tutorial:video.prompts.basicExample.copySuccess')}
                      >
                        {t('tutorial:video.prompts.basicExample.copyButton')}
                      </button>
                      <p className="pr-12" style={{ whiteSpace: 'pre-line' }}>
                        {videoStoryPrompt}
                      </p>
                    </div>
                  </div>

                  <video
                    src="/images/tutorial/video-story.mp4"
                    controls
                    playsInline
                    className="mx-auto w-full max-w-xs md:max-w-sm rounded-lg border border-gray-300 shadow-sm"
                  />
                </div>

                <div data-video-mode-content="reference" className="space-y-4 hidden">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">{t('tutorial:video.reference.heading')}</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('tutorial:video.reference.description') }} />
                    <div className={promptBoxClass}>
                      <button
                        type="button"
                        className={copyButtonClass}
                        data-copy-text={videoReferencePrompt}
                        data-copy-default={t('tutorial:video.prompts.basicExample.copyButton')}
                        data-copy-success={t('tutorial:video.prompts.basicExample.copySuccess')}
                      >
                        {t('tutorial:video.prompts.basicExample.copyButton')}
                      </button>
                      <p className="pr-12" style={{ whiteSpace: 'pre-line' }}>
                        {videoReferencePrompt}
                      </p>
                    </div>
                  </div>

                  <video
                    src="/images/tutorial/video-reference.mp4"
                    controls
                    playsInline
                    className="rounded-lg border border-gray-300 shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong className="text-gray-800">{t('tutorial:video.reference.aspectRatioWarning.heading')}</strong>
                  </p>
                  <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: t('tutorial:video.reference.aspectRatioWarning.description') }} />
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>{t('tutorial:video.reference.tips.heading')}</strong>
                  </p>
                  <p className="text-sm text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: t('tutorial:video.reference.tips.description1') }} />
                  <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: t('tutorial:video.reference.tips.description2') }} />
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong className="text-gray-800">{t('tutorial:video.reference.gachaWarning.heading')}</strong>
                  </p>
                  <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: t('tutorial:video.reference.gachaWarning.description') }} />
                </div>
              </div>
            </div>
          </section>

          <div className="glass-panel p-6 md:p-8 mt-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t('tutorial:cta.heading')}
            </h2>
            <p className="text-gray-600 mb-6" dangerouslySetInnerHTML={{ __html: t('tutorial:cta.description') }} />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/gallery${locale !== 'ja' ? '?lang=' + locale : ''}`}
                className="design-action-button"
              >
                {t('tutorial:cta.viewGallery')}
              </a>
              <a
                href={`/guidelines/ai${locale !== 'ja' ? '?lang=' + locale : ''}`}
                className="design-action-button"
              >
                {t('tutorial:cta.viewGuidelines')}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="character-footer h-16 relative overflow-hidden">
        <div className="character-footer-gradient absolute inset-0" />
      </div>
    </div>
  )
}
