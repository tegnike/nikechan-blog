import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { getT, type Locale } from '../../i18n/config';

type Props = {
  locale?: Locale;
}

export function NewsSection({ locale = 'ja' }: Props) {
  const t = getT(locale)
  const newsItems = t('home:news.items', { returnObjects: true }) as any[]

  return (
    <section
      className="relative pt-10 pb-10 sm:pb-20 px-6 sm:px-10 overflow-hidden"
      aria-labelledby="news-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2
            id="news-heading"
            className="mt-4 text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight"
          >
            {t('home:news.heading')}
          </h2>
        </div>

        <div className="mt-10 space-y-10 max-w-4xl mx-auto">
          {newsItems.map((item: any) => (
            <article
              key={item.id}
              className="relative overflow-hidden border border-white/60 bg-white/80 backdrop-blur"
            >
              <div className="">
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600">
                  <span>{item.tag}</span>
                  <span className="inline-flex h-1 w-1 rounded-full bg-indigo-200" />
                  <span>{item.date}</span>
                </div>
                <h3 className="mt-4 text-2xl font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-base text-gray-700 leading-relaxed">
                  {item.description}
                </p>
                {item.embed?.type === "youtube" && (
                  <div className="mt-6">
                    <div
                      className="relative w-full overflow-hidden rounded-2xl border border-white/60 bg-black"
                      style={{ paddingTop: "56.25%" }}
                    >
                      <iframe
                        src={`https://www.youtube.com/embed/${item.embed.id}?rel=0`}
                        title={item.embedTitle || item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                      />
                    </div>
                  </div>
                )}
                {item.cta && (
                  <div className="mt-6">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <a
                        href={`/${item.id}${locale !== 'ja' ? '?lang=' + locale : ''}`}
                      >
                        {item.cta}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
