import { FC, useState } from 'react'
import { NikeProfile } from './NikeProfile'
import { AINikeProfile } from './AINikeProfile'

export const About: FC = () => {
  const [activeProfile, setActiveProfile] = useState<'nike' | 'ai_nike'>('nike')

  return (
    <div className="min-h-screen py-12 px-4">
      {/* Header with animated gradient */}
      <div className="text-center mb-12">
        <div className="pt-12 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            ABOUT
          </h1>
          </div>
        
        {/* Profile Switcher */}
        <div className="inline-flex p-1 bg-white/5 backdrop-blur-sm rounded-full">
          {[
            { key: 'nike', label: 'ニケ' },
            { key: 'ai_nike', label: 'AIニケちゃん' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveProfile(key as 'nike' | 'ai_nike')}
              className={`px-8 py-3 rounded-full transition-all duration-300 ${
                activeProfile === key 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg active' 
                  : 'text-gray-300 hover:text-white'
              }`}
              data-profile={key}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* ニケのプロフィール */}
        <div id="nike-profile" className={activeProfile === 'nike' ? '' : 'hidden'}>
          <NikeProfile />
        </div>

        {/* AIニケちゃんのプロフィール */}
        <div id="ai_nike-profile" className={activeProfile === 'ai_nike' ? '' : 'hidden'}>
          <AINikeProfile />
        </div>
      </div>
    </div>
  )
} 