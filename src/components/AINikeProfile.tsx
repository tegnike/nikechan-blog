import { FC } from 'react'
import { ExternalLink, Heart } from 'lucide-react'
import { CharacterDetail } from './CharacterDetail'
import { getT, Locale } from '../i18n/config'

interface AINikeProfileProps {
  locale: Locale
  headerTitle?: string
}

export const AINikeProfile: FC<AINikeProfileProps> = ({ locale, headerTitle }) => {
  const t = getT(locale)

  const details = t('about:profile.details', { returnObjects: true }) as Record<string, { label: string; value: string; guidelinesLink?: string }>
  const overview = t('about:profile.overview', { returnObjects: true }) as { text: string[] }
  const history = t('about:profile.history', { returnObjects: true }) as { events: Array<{ date: string; label: string; description: string }> }
  const support = t('about:profile.support', { returnObjects: true }) as {
    description: string
    text: string
    features: string[]
    buttons: { fanbox: string; discord: string }
    sponsorChannel: {
      title: string
      description: string
      benefits: string[]
      note: string
    }
  }
  const collaboration = t('about:profile.collaboration', { returnObjects: true }) as {
    description: string
    text: string
    examples: string[]
    cta: string
  }
  const lineStamp = t('about:profile.lineStamp', { returnObjects: true }) as {
    heading: string
    text: string
    button: string
  }

  const profileItems = [
    { label: details.age.label, value: details.age.value },
    { label: details.birthday.label, value: details.birthday.value },
    { label: details.height.label, value: details.height.value },
    { label: details.pronoun.label, value: details.pronoun.value },
    { label: details.tone.label, value: details.tone.value },
    {
      label: details.voice.label,
      value: (
        <span>
          {details.voice.value}
          {locale === 'ja' ? '（' : ' ('}
          <a
            href="/guidelines#voice-model"
            className="text-purple-600 hover:underline"
          >
            {details.voice.guidelinesLink}
          </a>
          {locale === 'ja' ? '）' : ')'}
        </span>
      ),
    },
    {
      label: details.imageColor.label,
      value: (
        <span className="flex items-center gap-2">
          <span
            className="inline-block w-4 h-4 rounded-full border border-gray-300"
            style={{ backgroundColor: '#5A4C97' }}
          />
          {details.imageColor.value}
        </span>
      ),
    },
    { label: details.hashtag.label, value: details.hashtag.value },
  ]

  const description = overview.text

  const links = [
    {
      label: 'Discord',
      url: 'https://discord.gg/nikechan',
      icon: <img src="/icons/discord.svg" alt="Discord" className="w-4 h-4 brightness-0 invert" />,
    },
    {
      label: 'X',
      url: 'https://x.com/ai_nikechan',
      icon: <img src="/icons/x.svg" alt="X" className="w-4 h-4 brightness-0 invert" />,
    },
    {
      label: 'YouTube',
      url: 'https://www.youtube.com/@nikechan',
      icon: <img src="/icons/youtube.svg" alt="YouTube" className="w-4 h-4 brightness-0 invert" />,
    },
    {
      label: 'Sora Cameo',
      url: 'https://sora.chatgpt.com/profile/ainikechan',
      icon: <img src="/icons/sora.svg" alt="Sora" className="w-4 h-4 brightness-0 invert" />,
    },
  ]

  const historyItems = history.events

  // Custom Support Section with detailed content
  const supportSection = (
    <div className="glass-panel p-6 md:p-8">
      <h3
        className="text-xl font-bold tracking-widest mb-2 pb-2 border-b-2"
        style={{ borderColor: '#5A4C97', color: '#5A4C97' }}
      >
        SUPPORT
      </h3>
      <p className="text-gray-600 mb-4 leading-relaxed">
        {support.text}
      </p>
      <ul className="text-gray-600 mb-6 space-y-2">
        {support.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-purple-600">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-4 mb-8">
        <a
          href="https://nikechan.fanbox.cc/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{ backgroundColor: '#5A4C97' }}
        >
          <Heart className="w-4 h-4" />
          {support.buttons.fanbox}
        </a>
        <a
          href="https://discord.gg/nikechan"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{ backgroundColor: '#5A4C97' }}
        >
          <img src="/icons/discord.svg" alt="Discord" className="w-4 h-4 brightness-0 invert" />
          {support.buttons.discord}
        </a>
      </div>

      {/* Discord Sponsor Channel Sub-section */}
      <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
        <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
          <img src="/icons/discord.svg" alt="Discord" className="w-4 h-4 opacity-70" />
          {support.sponsorChannel.title}
        </h4>
        <p className="text-gray-600 text-sm mb-4">
          {support.sponsorChannel.description}
        </p>
        <ul className="text-gray-600 text-sm space-y-2">
          {support.sponsorChannel.benefits.map((benefit, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-purple-600">•</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        <p className="text-gray-500 text-xs mt-4">
          {support.sponsorChannel.note}
        </p>
      </div>
    </div>
  )

  // Collaboration Section
  const collaborationSection = (
    <div className="glass-panel p-6 md:p-8">
      <h3
        className="text-xl font-bold tracking-widest mb-2 pb-2 border-b-2"
        style={{ borderColor: '#5A4C97', color: '#5A4C97' }}
      >
        COLLABORATION
      </h3>
      <p className="text-gray-600 mb-4 leading-relaxed">
        {collaboration.text}
      </p>
      <ul className="text-gray-600 mb-6 space-y-2">
        {collaboration.examples.map((example, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-purple-600">•</span>
            <span>{example}</span>
          </li>
        ))}
      </ul>
      <a
        href="https://x.com/tegnike"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
        style={{ backgroundColor: '#5A4C97' }}
      >
        <img src="/icons/x.svg" alt="X" className="w-4 h-4 brightness-0 invert" />
        {collaboration.cta}
      </a>
    </div>
  )

  // LINE Stamp custom section
  const lineStampSection = (
    <div className="glass-panel p-6 md:p-8">
      <h3
        className="text-xl font-bold tracking-widest mb-4 pb-2 border-b-2"
        style={{ borderColor: '#5A4C97', color: '#5A4C97' }}
      >
        LINE STAMP
      </h3>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <p className="text-lg font-bold text-gray-800 mb-2">
            {lineStamp.heading}
          </p>
          <p className="text-gray-600 mb-4">
            {lineStamp.text}
          </p>
          <a
            href="https://store.line.me/stickershop/product/32003839/ja"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: '#06C755' }}
          >
            <ExternalLink className="w-4 h-4" />
            {lineStamp.button}
          </a>
        </div>
        <div className="flex-shrink-0">
          <img
            src="/images/about/line_stamp.png"
            alt="LINE Stamp"
            className="w-48 h-auto rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  )

  return (
    <CharacterDetail
      locale={locale}
      nameEn="AI NIKECHAN"
      nameJa="AIニケちゃん"
      role="AI Agent / AI VTuber"
      catchphrase={<>こんにちは ニケです！今日は何をお手伝いしますか？</>}
      catchphraseEn={<>Hello, I'm Nike! What can I help you with today?</>}
      catchphraseLines={['こんにちは ニケです！', '今日は何をお手伝いしますか？']}
      catchphraseLinesEn={['Hello, I\'m Nike!', 'What can I help you with today?']}
      image="/images/characters/sprites/ainikechan.png"
      icon="/images/characters/icons/ainikechan.png"
      accentColor="#5A4C97"
      profileItems={profileItems}
      description={description}
      links={links}
      historyItems={historyItems}
      historyTitle="HISTORY"
      customSections={
        <>
          {collaborationSection}
          {lineStampSection}
          {supportSection}
        </>
      }
      currentCharacterId="ainike"
      headerTitle={headerTitle}
      trihedralFigure="/images/characters/trihedral_figures/ainikechan.png"
    />
  )
}
