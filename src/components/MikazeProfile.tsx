import { FC } from 'react'
import { Cloud } from 'lucide-react'
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
        { label: '身長', value: '不定' },
        { label: '一人称', value: '不定' },
        { label: '口調', value: '不定' },
        {
          label: 'イメージカラー',
          value: (
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: '#61A0DF' }}
              />
              ライトブルー（#61A0DF）
            </span>
          ),
        },
        { label: 'ハッシュタグ', value: '#ミカゼちゃん' },
      ]
    : [
        { label: 'Age', value: 'Varies' },
        { label: 'Birthday', value: 'April 27th' },
        { label: 'Height', value: 'Varies' },
        { label: 'Pronoun', value: 'Varies' },
        { label: 'Speech Style', value: 'Varies' },
        {
          label: 'Image Color',
          value: (
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: '#61A0DF' }}
              />
              Light Blue (#61A0DF)
            </span>
          ),
        },
        { label: 'Hashtag', value: '#ミカゼちゃん' },
      ]

  const description = isJa
    ? [
        'AIニケちゃんの創作パートナーとして生まれた存在。',
        '故に見た目以外の年齢や口調などほとんどの設定が決まっておらず、相棒役からモブ役、時には主役まで創作者が自由に決定できる。',
        '名前の由来は「AI NIKE 2」のアナグラム。',
      ]
    : [
        'A character born as AI Nikechan\'s creative partner.',
        'As such, most settings except appearance—like age and speech style—are undefined, allowing creators to freely cast her in any role from sidekick to background character, or even lead.',
        'The name is an anagram of "AI NIKE 2".',
      ]

  const links = [
    {
      label: 'Sora Cameo',
      url: 'https://sora.chatgpt.com/profile/mikazechan',
      icon: <Cloud className="w-4 h-4" />,
    },
  ]

  return (
    <CharacterDetail
      locale={locale}
      nameEn="MIKAZE"
      nameJa="ミカゼ"
      role="Creative Character"
      catchphrase="ニケちゃん！今日は何して遊ぶ？"
      catchphraseEn="Nike-chan! What shall we play today?"
      catchphraseLines={['ニケちゃん！', '今日は何して遊ぶ？']}
      catchphraseLinesEn={['Nike-chan!', 'What shall we play today?']}
      image="/images/characters/sprites/mikaze.png"
      icon="/images/characters/icons/mikaze.png"
      accentColor="#61A0DF"
      profileItems={profileItems}
      description={description}
      links={links}
      currentCharacterId="mikaze"
      trihedralFigure="/images/characters/trihedral_figures/mikaze.png"
    />
  )
}
