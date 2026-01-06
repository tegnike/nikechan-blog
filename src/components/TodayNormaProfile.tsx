import { FC } from 'react'
import { ExternalLink, Cloud } from 'lucide-react'
import { CharacterDetail } from './CharacterDetail'
import { Locale } from '../i18n/config'

interface TodayNormaProfileProps {
  locale: Locale
}

export const TodayNormaProfile: FC<TodayNormaProfileProps> = ({ locale }) => {
  const isJa = locale === 'ja'

  // Calculate age dynamically based on October 16, 2025
  const calculateAge = () => {
    const birthDate = new Date('2025-10-16')
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return Math.max(0, age)
  }
  const age = calculateAge()

  const profileItems = isJa
    ? [
        { label: '年齢', value: `${age}歳` },
        { label: '誕生日', value: '10 / 16' },
        { label: '身長', value: '100cm' },
        { label: '一人称', value: '私' },
        { label: '口調', value: '敬語' },
        {
          label: 'イメージカラー',
          value: (
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: '#199286' }}
              />
              グリーン（#199286）
            </span>
          ),
        },
      ]
    : [
        { label: 'Age', value: `${age} years old` },
        { label: 'Birthday', value: 'October 16th' },
        { label: 'Height', value: '100cm' },
        { label: 'Pronoun', value: 'Watashi (私)' },
        { label: 'Speech Style', value: 'Polite (敬語)' },
        {
          label: 'Image Color',
          value: (
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: '#199286' }}
              />
              Green (#199286)
            </span>
          ),
        },
      ]

  const description = isJa
    ? [
        '今日が何の日かを伝えるTwitter(X) bot。マスターの創作のネタ切れを解消するために即席で作成された。',
        'システムに不具合があるので、稀に誤った日や存在しない日を伝えてしまうことがある。',
        'マスターが生み出したという点で、AIニケちゃんとは姉弟に当たる。通称「ノルカス」。',
      ]
    : [
        'A Twitter(X) bot that tells you what day it is today. Created on the spot to help the Master overcome creative blocks.',
        'Due to system bugs, it occasionally reports incorrect or non-existent days.',
        'As a system derived from the Master, considered a sibling of AI Nikechan. Nicknamed "Norukasu".',
      ]

  const links = [
    {
      label: 'Twitter',
      url: 'https://twitter.com/today_norma',
      icon: <ExternalLink className="w-4 h-4" />,
    },
    {
      label: 'Sora',
      url: 'https://sora.chatgpt.com/profile/today_norma',
      icon: <Cloud className="w-4 h-4" />,
    },
  ]

  return (
    <CharacterDetail
      locale={locale}
      nameEn="TODAY NORMA"
      nameJa="今日は何の日bot"
      role="Bot"
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
      trihedralFigure="/images/characters/trihedral_figures/today_norma.png"
    />
  )
}
