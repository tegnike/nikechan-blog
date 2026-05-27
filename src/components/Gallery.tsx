import { GalleryItem } from './GalleryItem'
import { useMemo } from 'react'
import { shuffle, findItem, galleryItemsData, illustrators } from '../utils/galleryData'
import { GalleryToggle } from './GalleryToggle'
import { getT, type Locale } from '../i18n/config'

// 連続する同一タイプの行を避けるために簡易的に整形
const avoidConsecutiveDuplicates = <T extends { type: string }>(source: T[]): T[] => {
  let current = [...source]
  // 最大 10 回まで再配置を試みる
  for (let attempt = 0; attempt < 10; attempt++) {
    let hasDuplicate = false
    const result = [...current]

    for (let i = 1; i < result.length; i++) {
      if (result[i].type === result[i - 1].type) {
        const swapIndex = result.findIndex((r, idx) => idx > i && r.type !== result[i].type)
        if (swapIndex !== -1) {
          ;[result[i], result[swapIndex]] = [result[swapIndex], result[i]]
        } else {
          hasDuplicate = true
          break
        }
      }
    }

    if (!hasDuplicate) return result

    // うまく行かなかった場合は再度シャッフルしてリトライ
    current = shuffle(current)
  }
  return current
}



type Props = {
  locale?: Locale;
}

export const Gallery = ({ locale = 'ja' }: Props) => {
  const t = getT(locale);
  // 行（レイアウトパターン毎）を定義
  const rows = useMemo(
    () => [
      {
        type: 'VS2',
        element: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4" key="row-1">
            <GalleryItem
              {...findItem('matoi_v')}
              className={`${findItem('matoi_v').className ?? ''} md:col-span-2 md:row-span-2`}
            />
            <GalleryItem {...findItem('icon_v1')} />
            <GalleryItem {...findItem('mizuta_s')} />
          </div>
        ),
      },
      {
        type: 'VVV',
        element: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4" key="row-2">
            <GalleryItem {...findItem('onago_v')} />
            <GalleryItem {...findItem('shhh_v')} />
            <GalleryItem {...findItem('suke_v')} />
          </div>
        ),
      },
      {
        type: 'H+S',
        element: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4" key="row-3">
            <GalleryItem {...findItem('unknown_h')} className={`${findItem('unknown_h').className ?? ''} md:col-span-2`} />
            <GalleryItem {...findItem('hayashi_s')} />
          </div>
        ),
      },
      // 以下、元の順序のまま全行を定義
      {
        type: 'Nested',
        element: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4" key="row-4">
            <div className="md:col-span-1">
              <GalleryItem {...findItem('ikawasa_s1')} />
              <div className="mt-4">
                <GalleryItem {...findItem('icon_v0')} />
              </div>
            </div>
            <GalleryItem {...findItem('hyamo_v1')} className={`${findItem('hyamo_v1').className ?? ''} md:col-span-2`} />
          </div>
        ),
      },
      {
        type: 'LONG',
        element: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4" key="row-5">
            <GalleryItem {...findItem('kainushi_lh')} className={`${findItem('kainushi_lh').className ?? ''} md:col-span-3`} />
          </div>
        ),
      },
      {
        type: 'VS2',
        element: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4" key="row-6">
            <GalleryItem {...findItem('mira_v')} className={`${findItem('mira_v').className ?? ''} md:col-span-2 md:row-span-2`} />
            <GalleryItem {...findItem('kyupo_s')} />
            <GalleryItem {...findItem('kazuha_v')} />
          </div>
        ),
      },
      {
        type: 'VVV',
        element: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4" key="row-7">
            <GalleryItem {...findItem('darjeeling_v')} />
            <GalleryItem {...findItem('nora_v')} />
            <GalleryItem {...findItem('tanaka_v')} />
          </div>
        ),
      },
      {
        type: 'S+H',
        element: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4" key="row-8">
            <GalleryItem {...findItem('nakipanman_s')} />
            <GalleryItem {...findItem('lime_h')} className={`${findItem('lime_h').className ?? ''} md:col-span-2`} />
          </div>
        ),
      },
      {
        type: 'Nested',
        element: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4" key="row-9">
            <div className="md:col-span-1">
              <GalleryItem {...findItem('sasami_s')} />
              <div className="mt-4">
                <GalleryItem {...findItem('imoko_s')} />
              </div>
            </div>
            <GalleryItem {...findItem('tomoto_v')} className={`${findItem('tomoto_v').className ?? ''} md:col-span-2`} />
          </div>
        ),
      },
      {
        type: 'H+S',
        element: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4" key="row-10">
            <GalleryItem {...findItem('syake_h')} className={`${findItem('syake_h').className ?? ''} md:col-span-2`} />
            <GalleryItem {...findItem('mesao_s')} />
          </div>
        ),
      },
      {
        type: 'LONG',
        element: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4" key="row-11">
            <GalleryItem {...findItem('aituberkit_lh')} className={`${findItem('aituberkit_lh').className ?? ''} md:col-span-3`} />
          </div>
        ),
      },
      {
        type: 'VS2',
        element: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4" key="row-12">
            <GalleryItem {...findItem('obotsuka_v')} className={`${findItem('obotsuka_v').className ?? ''} md:col-span-2 md:row-span-2`} />
            <GalleryItem {...findItem('ikawasa_s2')} />
            <GalleryItem {...findItem('icon_v2')} />
          </div>
        ),
      },
      {
        type: 'Nested',
        element: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4" key="row-13">
            <div className="md:col-span-1">
              <GalleryItem {...findItem('fuji_s')} />
              <div className="mt-4">
                <GalleryItem {...findItem('hyamo_s2')} />
              </div>
            </div>
            <GalleryItem {...findItem('sen_v')} className={`${findItem('sen_v').className ?? ''} md:col-span-2`} />
          </div>
        ),
      },
      {
        type: 'SS', // Square + Square
        element: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4" key="row-14">
            <GalleryItem
              {...findItem('kechon_s')}
            />
            <GalleryItem
              {...findItem('unya_s')}
            />
          </div>
        ),
      },
      {
        type: 'VVV',
        element: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4" key="row-15">
            <GalleryItem {...findItem('yumesakimiyo_v')} />
            <GalleryItem {...findItem('terra_v')} />
            <GalleryItem {...findItem('yumemurasaki_v')} />
          </div>
        ),
      },
      {
        type: 'VS2',
        element: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4" key="row-16">
            <GalleryItem {...findItem('rotoi_v')} className={`${findItem('rotoi_v').className ?? ''} md:col-span-2 md:row-span-2`} />
            <GalleryItem {...findItem('kiyugiku_s')} />
            <GalleryItem {...findItem('nuu_s')} />
          </div>
        ),
      },
    ],
    []
  )

  const shuffledRows = useMemo(() => avoidConsecutiveDuplicates(shuffle(rows)), [rows])

  return (
    <div className="character-page gallery-redesign min-h-screen">
      <section className="site-page-hero" aria-labelledby="gallery-title">
        <div className="character-detail-hero__grid" aria-hidden="true" />
        <div className="site-page-hero__inner">
          <h1 id="gallery-title">GALLERY</h1>
          <p>{locale === 'ja' ? 'コミッションイラストと公式作品のギャラリー' : 'Commissioned illustrations and official works'}</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative">
        <div className="character-showcase-bg absolute inset-0" />
        <div className="designed-page-main relative z-10 max-w-7xl mx-auto px-4 py-8">
          {/* Toggle */}
          <GalleryToggle active="commissioned" locale={locale} />

          {/* Notice */}
          <div className="mx-auto mt-6 w-full max-w-4xl">
            <div className="glass-panel px-6 py-4">
              <p className="text-sm leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: t('gallery:commissioned.notice') }} />
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="mt-8">
            {shuffledRows.map((row) => row.element)}
          </div>
        </div>
      </div>

      {/* Decorative Footer Gradient */}
      <div className="character-footer h-16 relative overflow-hidden">
        <div className="character-footer-gradient absolute inset-0" />
      </div>
    </div>
  )
}
