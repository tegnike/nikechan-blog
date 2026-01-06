import { FC } from 'react'
import { Locale, getT } from '../i18n/config'
import { PageHeader } from './PageHeader'

interface CharacterListProps {
  locale: Locale
}

// 立ち絵の配置順序（左から: ミカゼ, ぷにけ, AIニケちゃん, 今日は何の日bot, ニケ）
const characters = [
  {
    id: 'mikaze',
    nameEn: 'MIKAZE',
    nameJa: 'ミカゼ',
    image: '/images/characters/sprites/mikaze.png',
    icon: '/images/characters/icons/mikaze.png',
    color: '#61A0DF',
    scale: 1,
    offsetY: 0,
    // クリック領域を人型シルエットに制限
    clipPath: 'polygon(25% 0%, 75% 0%, 80% 10%, 85% 25%, 75% 45%, 70% 60%, 75% 75%, 65% 100%, 35% 100%, 25% 75%, 30% 60%, 25% 45%, 15% 25%, 20% 10%)',
  },
  {
    id: 'punike',
    nameEn: 'PUNIKE',
    nameJa: 'ぷにけ',
    image: '/images/characters/sprites/punike.png',
    icon: '/images/characters/icons/punike.png',
    color: '#F48E84',
    scale: 0.5,
    offsetY: 0,
    // ぷにけは丸い形状なのでより広い領域
    clipPath: 'polygon(15% 0%, 85% 0%, 95% 20%, 100% 50%, 95% 80%, 85% 100%, 15% 100%, 5% 80%, 0% 50%, 5% 20%)',
  },
  {
    id: 'ainike',
    nameEn: 'AI NIKECHAN',
    nameJa: 'AIニケちゃん',
    image: '/images/characters/sprites/ainikechan.png',
    icon: '/images/characters/icons/ainikechan.png',
    color: '#5A4C97',
    scale: 1,
    offsetY: 0,
    clipPath: 'polygon(20% 0%, 80% 0%, 85% 10%, 90% 25%, 80% 45%, 75% 60%, 80% 75%, 70% 100%, 30% 100%, 20% 75%, 25% 60%, 20% 45%, 10% 25%, 15% 10%)',
  },
  {
    id: 'today_norma',
    nameEn: 'TODAY NORMA',
    nameJa: '今日は何の日bot',
    image: '/images/characters/sprites/today_norma.png',
    icon: '/images/characters/icons/today_norma.png',
    color: '#199286',
    scale: 0.67,
    offsetY: 0,
    clipPath: 'polygon(20% 0%, 80% 0%, 85% 15%, 90% 35%, 80% 55%, 75% 70%, 80% 85%, 70% 100%, 30% 100%, 20% 85%, 25% 70%, 20% 55%, 10% 35%, 15% 15%)',
  },
  {
    id: 'nike',
    nameEn: 'NIKE',
    nameJa: 'ニケ',
    image: '/images/characters/sprites/nikechan.png',
    icon: '/images/characters/icons/nikechan.png',
    color: '#F9B1BC',
    scale: 1,
    offsetY: 0,
    clipPath: 'polygon(20% 0%, 80% 0%, 85% 10%, 90% 25%, 80% 45%, 75% 60%, 80% 75%, 70% 100%, 30% 100%, 20% 75%, 25% 60%, 20% 45%, 10% 25%, 15% 10%)',
  },
]

// ナビゲーション用の順序（AIニケ, ニケ, ミカゼ, ぷにけ, 今日は何の日bot）
const navOrder = ['ainike', 'nike', 'mikaze', 'punike', 'today_norma']
const navCharacters = navOrder.map((id) => characters.find((c) => c.id === id)!)

export const CharacterList: FC<CharacterListProps> = ({ locale }) => {
  const t = getT(locale)
  const langQuery = locale !== 'ja' ? `?lang=${locale}` : ''

  return (
    <div className="character-page min-h-screen">
      <PageHeader title="CHARACTER" />

      {/* Character Showcase */}
      <div className="character-showcase relative -mt-8">
        <div className="character-showcase-bg absolute inset-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
          {/* Mobile: Grid Layout (same order as nav icons) */}
          <div className="grid grid-cols-2 gap-4 md:hidden">
            {navCharacters.map((char, index) => (
              <a
                key={char.id}
                href={`/characters/${char.id}${langQuery}`}
                className={`character-card-mobile group relative flex flex-col items-center p-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  index === 0 ? 'col-span-2' : ''
                }`}
                style={{
                  '--accent-color': char.color,
                  borderBottom: `4px solid ${char.color}`,
                } as React.CSSProperties}
              >
                {/* Character Icon/Image */}
                <div className={`relative mb-3 ${index === 0 ? 'w-28 h-28' : 'w-24 h-24'}`}>
                  <img
                    src={char.icon}
                    alt={char.nameJa}
                    className="w-full h-full rounded-full object-cover shadow-md group-hover:scale-105 transition-transform duration-300"
                    style={{
                      boxShadow: `0 4px 14px ${char.color}40`,
                    }}
                  />
                </div>
                {/* Character Name */}
                <div className="text-center">
                  <span className={`block tracking-widest text-gray-400 uppercase mb-0.5 ${index === 0 ? 'text-sm' : 'text-xs'}`}>
                    {char.nameEn}
                  </span>
                  <span
                    className={`block font-bold ${index === 0 ? 'text-lg' : 'text-base'}`}
                    style={{ color: char.color }}
                  >
                    {char.nameJa}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Desktop: Overlapping Sprites Layout */}
          <div className="hidden md:block relative">
            <div className="flex justify-center items-end">
              {characters.map((char, index) => {
                // z-index: AIニケちゃん(30) > 今日は何の日bot&ぷにけ(20) > ミカゼ&ニケ(10)
                const zIndexMap = [10, 20, 30, 20, 10]
                const marginClass = index === 0
                  ? ''
                  : '-ml-48 lg:-ml-64'

                return (
                  <div
                    key={char.id}
                    className={`character-card group relative pointer-events-none ${marginClass}`}
                    style={{
                      '--accent-color': char.color,
                      zIndex: zIndexMap[index],
                      transform: `translateY(${char.offsetY}px)`,
                    } as React.CSSProperties}
                  >
                    {/* Character Image - 視覚的には完全表示 */}
                    <div
                      className="character-card-image relative"
                      style={{
                        transform: `scale(${char.scale})`,
                        transformOrigin: 'bottom center',
                      }}
                    >
                      <img
                        src={char.image}
                        alt={char.nameJa}
                        className="character-sprite relative z-10 w-full max-w-xs lg:max-w-md h-auto object-contain transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500 ease-out"
                        style={{
                          '--char-color': char.color,
                        } as React.CSSProperties}
                      />
                    </div>
                    {/* クリック領域 - clip-pathで人型シルエットに制限 */}
                    <a
                      href={`/characters/${char.id}${langQuery}`}
                      className="absolute inset-0 pointer-events-auto"
                      style={{
                        clipPath: char.clipPath,
                        transform: `scale(${char.scale})`,
                        transformOrigin: 'bottom center',
                      }}
                      aria-label={char.nameJa}
                    />
                  </div>
                )
              })}
            </div>
            {/* Name Bar - 立ち絵の下に共通バーとして配置 */}
            <div className="flex justify-center mt-4">
              <div className="flex items-stretch rounded-full overflow-hidden shadow-lg">
                {characters.map((char) => (
                  <a
                    key={char.id}
                    href={`/characters/${char.id}${langQuery}`}
                    className="group px-4 lg:px-6 py-3 text-center transition-all duration-300 hover:brightness-110"
                    style={{
                      backgroundColor: char.color,
                      minWidth: '120px',
                    }}
                  >
                    <span className="block text-xs tracking-widest text-white/80 mb-0.5">
                      {char.nameEn}
                    </span>
                    <span className="block text-base lg:text-lg font-bold text-white">
                      {char.nameJa}
                    </span>
                  </a>
                ))}
              </div>
            </div>
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
          <div className="character-nav mt-12 md:mt-16">
            {/* Mobile: Centered */}
            <div className="flex md:hidden flex-wrap justify-center gap-4 pb-4">
              {navCharacters.map((char) => (
                <a
                  key={char.id}
                  href={`/characters/${char.id}${langQuery}`}
                  className="character-nav-item group flex-shrink-0"
                  style={{ '--accent-color': char.color } as React.CSSProperties}
                >
                  <div className="character-nav-icon relative">
                    <div className="character-nav-ring absolute inset-0 rounded-full border-3 border-transparent group-hover:border-current transition-colors duration-300" style={{ color: char.color }} />
                    <img
                      src={char.icon}
                      alt={char.nameJa}
                      className="w-14 h-14 rounded-full object-cover shadow-md group-hover:shadow-lg transition-shadow duration-300"
                    />
                  </div>
                  <span className="mt-2 text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors whitespace-nowrap">
                    {char.nameJa}
                  </span>
                </a>
              ))}
            </div>
            {/* Desktop: Centered flex */}
            <div className="hidden md:flex justify-center gap-6 lg:gap-8">
              {navCharacters.map((char) => (
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
                      className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
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
