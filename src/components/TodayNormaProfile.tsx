import { FC } from 'react'
import { ExternalLink } from 'lucide-react'
import { CharacterDetail } from './CharacterDetail'
import { Locale } from '../i18n/config'

interface TodayNormaProfileProps {
  locale: Locale
}

export const TodayNormaProfile: FC<TodayNormaProfileProps> = ({ locale }) => {
  const isJa = locale === 'ja'

  const profileItems = isJa
    ? [
        { label: '年齢', value: '17歳' },
        { label: '誕生日', value: '10 / 16' },
        { label: '一人称', value: '私' },
        { label: '口調', value: '敬語' },
        { label: '家族', value: 'マスター' },
        {
          label: 'イメージカラー',
          value: (
            <span className="flex items-center gap-2">
              ターコイズ
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: '#199286' }}
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
              Turquoise
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: '#199286' }}
              />
            </span>
          ),
        },
      ]

  const description = isJa
    ? [
        '今日は何の日botのプロフィール説明文です。',
        '詳細は後ほど追加されます。',
      ]
    : [
        'This is Today Norma\'s profile description.',
        'Details will be added later.',
      ]

  const links = [
    {
      label: 'Twitter',
      url: 'https://twitter.com/today_norma',
      icon: <ExternalLink className="w-4 h-4" />,
    },
  ]

  return (
    <CharacterDetail
      locale={locale}
      nameEn="TODAY NORMA"
      nameJa="今日は何の日bot"
      role="AI Character"
      catchphrase="私は回答に責任を持てないので必ずご自身で確認してください"
      catchphraseEn="I cannot take responsibility for the answers, so please be sure to check for yourself."
      catchphraseLines={['私は回答に責任を持てないので', '必ずご自身で確認してください']}
      catchphraseLinesEn={['I cannot take responsibility for the answers,', 'so please be sure to check for yourself.']}
      image="/images/characters/sprites/today_norma.png"
      icon="/images/characters/icons/today_norma.png"
      accentColor="#199286"
      profileItems={profileItems}
      description={description}
      links={links}
      currentCharacterId="today_norma"
    />
  )
}
