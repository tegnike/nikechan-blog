import type { Locale } from '../../i18n/config';
import { getSupportContent } from '../support/supportData';

type Props = {
  locale?: Locale;
}

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function SupportSection({ locale = 'ja' }: Props) {
  const support = getSupportContent(locale);

  return (
    <section className="nk-sec nk-support" id="support">
      <div className="site-shell">
        <h2 className="nk-sec-title">Support</h2>
        <p className="nk-sec-sub">{support.heading}</p>
        <p className="nk-support__lead">{support.lead}</p>

        <div className="nk-support__grid">
          <div>
            <h3>{support.channelsHeading}</h3>
            <ul className="nk-support__channels">
              {support.channels.map((channel) => (
                <li key={channel.id}>
                  <a href={channel.href} target="_blank" rel="noopener noreferrer">
                    <span>
                      <b>{channel.name}</b>
                      <small>{channel.description}</small>
                    </span>
                    <Arrow />
                  </a>
                </li>
              ))}
            </ul>
            <p className="nk-support__note">{support.otherChannels}</p>
          </div>

          <div>
            <h3>{support.benefitsHeading}</h3>
            <ul>
              {support.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
            </ul>
            <p className="nk-support__note">{support.benefitsNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
