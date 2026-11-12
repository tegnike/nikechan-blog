import { Heart } from 'lucide-react';
import type { Locale } from '../../i18n/config';
import { getSupportContent } from './supportData';

type Props = {
  locale: Locale;
  /** ボタンと箇条書きの色（キャラクターごとのテーマ色） */
  accent: string;
  /** 特典ボックスの背景・枠線クラス */
  boxClassName: string;
};

const channelIcon = (id: string) => {
  if (id === 'discord') return <img src="/icons/discord.svg" alt="" className="w-4 h-4 brightness-0 invert" />;
  if (id === 'youtube') return <img src="/icons/youtube.svg" alt="" className="w-4 h-4 brightness-0 invert" />;
  return <Heart className="w-4 h-4" />;
};

/** /about と /developer の「応援する」欄。トップの Support セクションと同じ内容を出す */
export function SupportDetails({ locale, accent, boxClassName }: Props) {
  const support = getSupportContent(locale);

  return (
    <div className="character-content-section">
      <p className="text-gray-600 mb-4 leading-relaxed">{support.lead}</p>
      <div className="flex flex-wrap gap-4 mb-3">
        {support.channels.map((channel) => (
          <a
            key={channel.id}
            href={channel.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium nk-hover-fill"
            style={{ backgroundColor: accent }}
          >
            {channelIcon(channel.id)}
            {channel.name}
          </a>
        ))}
      </div>
      <p className="text-gray-500 text-xs mb-8">{support.otherChannels}</p>

      <div className={`character-subcard rounded-xl p-5 border ${boxClassName}`}>
        <h4 className="font-bold text-gray-800 mb-4">{support.benefitsHeading}</h4>
        <ul className="text-gray-600 text-sm space-y-2">
          {support.benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-2">
              <span style={{ color: accent }}>•</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        <p className="text-gray-500 text-xs mt-4">{support.benefitsNote}</p>
      </div>
    </div>
  );
}
