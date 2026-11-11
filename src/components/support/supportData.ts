import { getT, type Locale } from '../../i18n/config';

/** 支援の窓口。特典はどこから支援しても同じで、文言は home:support にまとめている */
export const SUPPORT_CHANNELS = [
  { id: 'fanbox', href: 'https://nikechan.fanbox.cc/' },
  { id: 'discord', href: 'https://discord.gg/nikechan' },
  { id: 'youtube', href: 'https://www.youtube.com/@nikechan/join' },
] as const;

export function getSupportContent(locale: Locale) {
  const t = getT(locale);
  return {
    heading: t('home:support.heading'),
    lead: t('home:support.lead'),
    channelsHeading: t('home:support.channelsHeading'),
    channels: SUPPORT_CHANNELS.map((channel) => ({
      ...channel,
      name: t(`home:support.channels.${channel.id}.name`),
      description: t(`home:support.channels.${channel.id}.description`),
    })),
    otherChannels: t('home:support.otherChannels'),
    benefitsHeading: t('home:support.benefitsHeading'),
    benefits: t('home:support.benefits', { returnObjects: true }) as string[],
    benefitsNote: t('home:support.benefitsNote'),
  };
}
