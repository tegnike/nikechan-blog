import { FC } from 'react'
import { Locale, getT } from '../i18n/config'

interface CharacterListProps {
  locale: Locale
}

const characters = [
  {
    id: 'ainike',
    nameEn: 'AI NIKECHAN',
    nameJa: 'AIニケちゃん',
    image: '/images/characters/ainikechan.png',
    icon: '/images/about/ai_nikechan_icon.png',
    color: '#5A4C97',
    catchphrase: 'AIエージェントとして、マスターをサポートします',
  },
  {
    id: 'nike',
    nameEn: 'NIKE',
    nameJa: 'ニケ',
    image: '/images/characters/nikechan.png',
    icon: '/images/about/nikechan_icon.png',
    color: '#E87B7B',
    catchphrase: 'AI Character & Agent Developer',
  },
]

export const CharacterList: FC<CharacterListProps> = ({ locale }) => {
  const t = getT(locale)
  const langQuery = locale !== 'ja' ? `?lang=${locale}` : ''

  return (
    <div className="character-page min-h-screen">
      {/* Gradient Header */}
      <div className="character-header relative overflow-hidden">
        <div className="character-header-bg absolute inset-0" />
        <div className="character-header-pattern absolute inset-0" />
        <div className="relative z-10 pt-16 pb-8 text-center">
          <h1 className="character-title text-6xl md:text-8xl font-black tracking-wider text-white drop-shadow-lg">
            CHARACTER
          </h1>
          <p className="mt-4 text-white/80 text-lg tracking-widest">
            {locale === 'ja' ? 'キャラクター紹介' : 'Character Introduction'}
          </p>
        </div>
      </div>

      {/* Character Showcase */}
      <div className="character-showcase relative -mt-8">
        <div className="character-showcase-bg absolute inset-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
          {/* Character Cards */}
          <div className="flex flex-col md:flex-row justify-center items-end gap-4 md:gap-0">
            {characters.map((char, index) => (
              <a
                key={char.id}
                href={`/characters/${char.id}${langQuery}`}
                className={`character-card group relative ${
                  index === 0 ? 'md:-mr-16 z-20' : 'md:-ml-16 z-10'
                }`}
                style={{ '--accent-color': char.color } as React.CSSProperties}
              >
                {/* Character Image */}
                <div className="character-card-image relative">
                  <div className="character-card-glow absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src={char.image}
                    alt={char.nameJa}
                    className="relative z-10 w-full max-w-sm md:max-w-md h-auto object-contain transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500 ease-out"
                  />
                  {/* Name Ribbon */}
                  <div className="character-name-ribbon absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                    <div className="character-ribbon-inner px-6 py-3 text-center">
                      <span className="block text-xs tracking-widest text-white/70 mb-1">
                        {char.nameEn}
                      </span>
                      <span className="block text-xl font-bold text-white">
                        {char.nameJa}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Unit Description */}
          <div className="character-description-panel mt-16 max-w-3xl mx-auto">
            <div className="glass-panel p-8 text-center">
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#5A4C97' }}>
                {locale === 'ja' ? 'AIニケちゃん & マスター' : 'AI Nikechan & Master'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {locale === 'ja'
                  ? 'AIエージェント「AIニケちゃん」と、その開発者であるマスター「ニケ」のプロフィールページです。AIニケちゃんは、ニケのタスクをサポートするために生まれたAIキャラクターで、現在はAITuberKitを通じて交流することができます。'
                  : 'This is the profile page for AI agent "AI Nikechan" and her developer master "Nike". AI Nikechan is an AI character born to support Nike\'s tasks, and you can now interact with her through AITuberKit.'}
              </p>
            </div>
          </div>

          {/* Character Navigation */}
          <div className="character-nav mt-16">
            <div className="flex justify-center gap-6">
              {characters.map((char) => (
                <a
                  key={char.id}
                  href={`/characters/${char.id}${langQuery}`}
                  className="character-nav-item group"
                  style={{ '--accent-color': char.color } as React.CSSProperties}
                >
                  <div className="character-nav-icon relative">
                    <div className="character-nav-ring absolute inset-0 rounded-full border-4 border-transparent group-hover:border-current transition-colors duration-300" style={{ color: char.color }} />
                    <img
                      src={char.icon}
                      alt={char.nameJa}
                      className="w-20 h-20 rounded-full object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                    />
                  </div>
                  <span className="mt-2 text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                    {char.nameJa}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Footer Gradient */}
      <div className="character-footer h-32 relative overflow-hidden">
        <div className="character-footer-gradient absolute inset-0" />
      </div>
    </div>
  )
}
