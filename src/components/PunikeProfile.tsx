import { FC } from 'react'
import { CharacterDetail } from './CharacterDetail'
import { Locale } from '../i18n/config'

interface PunikeProfileProps {
  locale: Locale
}

export const PunikeProfile: FC<PunikeProfileProps> = ({ locale }) => {
  const isJa = locale === 'ja'

  const profileItems = isJa
    ? [
        { label: '年齢', value: '不詳' },
        { label: '誕生日', value: '09 / 09' },
        { label: '頭身', value: '2〜3頭身' },
        { label: '性格', value: 'お調子者' },
        { label: '声', value: 'VOICEVOX春歌ナナ（音高: 0.07）' },
        {
          label: 'イメージカラー',
          value: (
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: '#F48E84' }}
              />
              コーラル（#F48E84）
            </span>
          ),
        },
        { label: 'ハッシュタグ', value: '#ぷにけ' },
      ]
    : [
        { label: 'Age', value: 'Unknown' },
        { label: 'Birthday', value: 'September 9th' },
        { label: 'Proportions', value: '2-3 heads tall' },
        { label: 'Personality', value: 'Cheerful joker' },
        { label: 'Voice', value: 'VOICEVOX Haruka Nana (Pitch: 0.07)' },
        {
          label: 'Image Color',
          value: (
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: '#F48E84' }}
              />
              Coral (#F48E84)
            </span>
          ),
        },
        { label: 'Hashtag', value: '#ぷにけ' },
      ]

  const description = isJa
    ? [
        'AIニケちゃんの二次創作から生まれたマスコット的存在。',
        '誕生経緯とその見た目から、いじられキャラとして利用されることが多い。',
        'AIニケちゃんにそっくりな見た目をしているが、本人とは何の繋がりもない。',
      ]
    : [
        'A mascot character born from AI Nikechan fan creations.',
        'Due to the origin and appearance, often used as a comedic punching bag character.',
        'Looks just like AI Nikechan, but has no connection to her whatsoever.',
      ]

  const links = [
    {
      label: 'Sora Cameo',
      url: 'https://sora.chatgpt.com/profile/punike',
      icon: <img src="/icons/sora.svg" alt="Sora" className="w-4 h-4 brightness-0 invert" />,
    },
  ]

  return (
    <CharacterDetail
      locale={locale}
      nameEn="PUNIKE"
      nameJa="ぷにけ"
      role="Creative Character"
      catchphrase="どしたん？話聞こか？"
      catchphraseEn="What\'s up? Do you want to talk?"
      catchphraseLines={['どしたん？ 話聞こか？']}
      catchphraseLinesEn={['What\'s up? Do you want to talk?']}
      image="/images/characters/sprites/punike.png"
      icon="/images/characters/icons/punike.png"
      accentColor="#F48E84"
      profileItems={profileItems}
      description={description}
      links={links}
      currentCharacterId="punike"
      trihedralFigure="/images/characters/trihedral_figures/punike.png"
    />
  )
}
