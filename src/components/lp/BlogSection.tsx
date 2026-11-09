import { getT, type Locale } from '../../i18n/config';
import { getOptimizedImageSources } from '../../utils/imageOptimization';
import { withLang } from '../../utils/langPath';
import { getPostsByLocale } from '../../utils/posts';

type Props = {
  locale?: Locale;
  limit?: number;
}

/** トップページから読み物層（Dev blog）への入口。最新の記事だけ見せる */
export function BlogSection({ locale = 'ja', limit = 3 }: Props) {
  const t = getT(locale);
  const posts = getPostsByLocale(locale).slice(0, limit);
  if (posts.length === 0) return null;

  return (
    <section className="nk-sec" id="blog">
      <div className="site-shell">
        <div className="nk-sec-head">
          <div>
            <h2 className="nk-sec-title">Dev blog</h2>
            <p className="nk-sec-sub">{t('home:blog.heading')}</p>
          </div>
          <a className="nk-btn nk-btn--ghost" href={withLang('/dev-blog', locale)}>{t('home:blog.cta')}</a>
        </div>
        <div className="nk-blog__grid">
          {posts.map((post) => {
            const thumbnail = post.thumbnail ? getOptimizedImageSources(post.thumbnail) : undefined;
            return (
              <a key={post.slug} className="nk-post" href={withLang(`/dev-blog/${post.slug}`, locale)}>
                {post.thumbnail && (
                  <div className="nk-post__img">
                    <img
                      src={thumbnail?.src ?? post.thumbnail}
                      srcSet={thumbnail?.srcSet}
                      sizes="(max-width: 860px) 100vw, 370px"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                <time dateTime={post.date}>{post.date.replace(/-/g, '.')}</time>
                <b>{post.title}</b>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
