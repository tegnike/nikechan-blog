import { FC } from 'react'
import { ExternalLink } from 'lucide-react'
import { CharacterDetail } from './CharacterDetail'
import { Locale } from '../i18n/config'

interface PunikeProfileProps {
  locale: Locale
}

export const PunikeProfile: FC<PunikeProfileProps> = ({ locale }) => {
  const isJa = locale === 'ja'

  const profileItems = isJa
    ? [
        { label: '年齢', value: '17歳' },
        { label: '誕生日', value: '01 / 04' },
        { label: '一人称', value: '私' },
        { label: '口調', value: '敬語' },
        { label: '家族', value: 'マスター' },
        {
          label: 'イメージカラー',
          value: (
            <span className="flex items-center gap-2">
              ピンク
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: '#F48E84' }}
              />
            </span>
          ),
        },
      ]
    : [
        { label: 'Age', value: '17 years old' },
        { label: 'Birthday', value: 'January 4th' },
        { label: 'Pronoun', value: 'Watashi (私)' },
        { label: 'Speech Style', value: 'Polite (敬語)' },
        { label: 'Family', value: 'Master' },
        {
          label: 'Image Color',
          value: (
            <span className="flex items-center gap-2">
              Pink
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: '#F48E84' }}
              />
            </span>
          ),
        },
      ]

  const description = isJa
    ? [
        'ぷにけのプロフィール説明文です。',
        '詳細は後ほど追加されます。',
      ]
    : [
        'This is Punike\'s profile description.',
        'Details will be added later.',
      ]

  const links = [
    {
      label: 'Twitter',
      url: 'https://twitter.com/ai_nikechan',
      icon: <ExternalLink className="w-4 h-4" />,
    },
  ]

  return (
    <CharacterDetail
      locale={locale}
      nameEn="PUNIKE"
      nameJa="ぷにけ"
      role="AI Character"
      catchphrase="キャッチフレーズ"
      catchphraseEn="Catchphrase"
      image="/images/characters/sprites/punike.png"
      icon="/images/characters/icons/punike.png"
      accentColor="#F48E84"
      profileItems={profileItems}
      description={description}
      links={links}
      currentCharacterId="punike"
      otherCharacter={{
        id: 'ainike',
        nameJa: 'AIニケちゃん',
        icon: '/images/characters/icons/ainikechan.png',
        color: '#5A4C97',
      }}
    />
  )
}
