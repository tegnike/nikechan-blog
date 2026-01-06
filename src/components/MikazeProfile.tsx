import { FC } from 'react'
import { CharacterDetail } from './CharacterDetail'
import { Locale } from '../i18n/config'

interface MikazeProfileProps {
  locale: Locale
}

export const MikazeProfile: FC<MikazeProfileProps> = ({ locale }) => {
  const isJa = locale === 'ja'

  const profileItems = isJa
    ? [
        { label: '年齢', value: '不定' },
        { label: '誕生日', value: '04 / 27' },
        { label: '一人称', value: '私' },
        { label: '口調', value: '敬語' },
        { label: '家族', value: 'マスター' },
        {
          label: 'イメージカラー',
          value: (
            <span className="flex items-center gap-2">
              水色
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: '#61A0DF' }}
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
              Light Blue
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: '#61A0DF' }}
              />
            </span>
          ),
        },
      ]

  const description = isJa
    ? [
        'ミカゼのプロフィール説明文です。',
        '詳細は後ほど追加されます。',
      ]
    : [
        'This is Mikaze\'s profile description.',
        'Details will be added later.',
      ]

  return (
    <CharacterDetail
      locale={locale}
      nameEn="MIKAZE"
      nameJa="ミカゼ"
      role="AI Character"
      catchphrase="ニケちゃん！今日は何して遊ぶ？"
      catchphraseEn="What shall we play today, Nike-chan?"
      catchphraseLines={['ニケちゃん！', '今日は何して遊ぶ？']}
      catchphraseLinesEn={['Nike-chan,', 'what shall we play today?']}
      image="/images/characters/sprites/mikaze.png"
      icon="/images/characters/icons/mikaze.png"
      accentColor="#61A0DF"
      profileItems={profileItems}
      description={description}
      currentCharacterId="mikaze"
    />
  )
}
