import { GalleryItem } from './GalleryItem'
import { useMemo } from 'react'

// Fisher-Yates で配列をシャッフル
const shuffle = <T,>(array: T[]): T[] => {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

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

interface Illustrator {
  id: string
  name: string
  url?: string
}

interface GalleryItemData {
  id: string
  src: string
  altText?: string // altテキストのベース部分。イラストレーター名が追記される
  illustratorId?: string
  className?: string
  aspectRatio?: string // aspect-[3/4] などを文字列で保持
}

const illustrators: Illustrator[] = [
  { id: 'matoi', name: '綾川まとい', url: 'https://x.com/matoi_e_ma' },
  { id: 'unknown', name: 'unknown illus.' },
  { id: 'mizuta', name: '水田柚', url: 'https://x.com/MizutaYuzu' },
  { id: 'onago', name: 'おなご', url: 'https://x.com/7Na5Go' },
  { id: 'fdk_susk', name: '🤫', url: 'https://x.com/fdk_susk' },
  { id: 'chi_momosui', name: '林ちい', url: 'https://x.com/chi_momosui' },
  { id: 'ikawasa', name: 'いかわさ🦑', url: 'https://x.com/Midori_soumenn' },
  { id: 'tougenkyou', name: 'TOUGENKYOU NFT', url: 'https://opensea.io/assets/ethereum/0x1fc12a099ea4cf718289472908cc6ee8c0c05bad/426' },
  { id: 'hyamo', name: 'ひゃもぉ', url: 'https://x.com/pantyu15' },
  { id: 'kainushi', name: 'かいぬし', url: 'https://x.com/HEROINTOKYO' },
  { id: 'mira', name: 'ミラ', url: 'https://x.com/mira_bluesky3' },
  { id: 'kyupo', name: '浜山きゅぽ', url: 'https://x.com/9pokamo' },
  { id: 'kazuha', name: '桐宮カズハ', url: 'https://x.com/tokyukazuha' },
  { id: 'darjeeling', name: 'Darjeeling', url: 'https://x.com/xdarjeelingxtea' },
  { id: 'nora', name: '竹藪ノラ', url: 'https://x.com/takeyabunora' },
  { id: 'tanaka', name: 'コンバーチブル田中', url: 'https://x.com/T_anaka_Kanata' },
  { id: 'nakipanman', name: 'なきむしぱん', url: 'https://x.com/nakipanman' },
  { id: 'lime', name: 'ライム', url: 'https://x.com/ranse237' },
  { id: 'sasami', name: 'やきささみ', url: 'https://x.com/v_sasami' },
  { id: 'tomoto', name: '十元', url: 'https://x.com/99migiy' },
  { id: 'syake', name: 'しゃーけ', url: 'https://x.com/syakegayu' },
  { id: 'mesao', name: 'めさお', url: 'https://x.com/mesa__zzz' },
  { id: 'ruka', name: 'Ruka Designer', url: 'https://coconala.com/users/2208636' },
  { id: 'obotsuka', name: '憶束ない', url: 'https://x.com/uncertainaing' },
  { id: 'fuji', name: 'ふじ', url: 'https://x.com/f_ukkami' },
  { id: 'sen', name: '栓', url: 'https://x.com/seeenfree' },
  { id: 'kechon', name: 'ケチョンさん', url: 'https://x.com/Ktyon3_ss' },
  { id: 'unya', name: 'うにゃ', url: 'https://x.com/unya_OwO_' },
  { id: 'nuu', name: 'ぬ〜', url: "https://x.com/H1aMx" },
  { id: 'yumesakimiyo', name: '夢咲 澪⛄️', url: 'https://x.com/Yumesaki_Mio' },
  { id: 'yumemurasaki', name: 'ユメムラサキ', url: 'https://x.com/shino_shidu' },
  { id: 'kiyugiku', name: 'きゆぎくkiyugiku', url: 'https://x.com/kiyugiku9' },
  { id: 'terra', name: 'terra', url: 'https://x.com/terra_tiri' },
  { id: 'rotoi', name: 'Rotoi', url: 'https://x.com/Rotoi_1234' },
]

const galleryItemsData: GalleryItemData[] = [
  { id: 'matoi_v', src: '/images/illustrations/v_matoi.png', illustratorId: 'matoi', aspectRatio: 'aspect-[3/4]' },
  { id: 'icon_v1', src: '/images/illustrations/s_icon_v1.jpg', illustratorId: 'unknown', aspectRatio: 'aspect-[3/4]' },
  { id: 'mizuta_s', src: '/images/illustrations/s_mizuta.gif', illustratorId: 'mizuta', aspectRatio: 'aspect-[3/4]' },
  { id: 'onago_v', src: '/images/illustrations/v_onago.png', illustratorId: 'onago', aspectRatio: 'aspect-[3/4]' },
  { id: 'shhh_v', src: '/images/illustrations/v_shhh.png', illustratorId: 'fdk_susk', aspectRatio: 'aspect-[3/4]' },
  { id: 'suke_v', src: '/images/illustrations/v_suke.png', illustratorId: 'unknown', aspectRatio: 'aspect-[3/4]' },
  { id: 'unknown_h', src: '/images/illustrations/h_unknown.png', illustratorId: 'unknown', aspectRatio: 'aspect-[16/9]' },
  { id: 'hayashi_s', src: '/images/illustrations/s_hayashi.jpg', illustratorId: 'chi_momosui', aspectRatio: 'aspect-square' },
  { id: 'ikawasa_s1', src: '/images/illustrations/s_ikawasa.png', illustratorId: 'ikawasa', aspectRatio: 'aspect-[3/4]' },
  { id: 'icon_v0', src: '/images/illustrations/s_icon_v0.jpg', illustratorId: 'tougenkyou', altText: 'TOUGENKYOU NFT', aspectRatio: 'aspect-[3/4]' },
  { id: 'hyamo_v1', src: '/images/illustrations/v_hyamo.png', illustratorId: 'hyamo', aspectRatio: 'aspect-[3/4]' },
  { id: 'kainushi_lh', src: '/images/illustrations/lh_kainushi.png', illustratorId: 'kainushi', aspectRatio: 'aspect-[27/9]' },
  { id: 'mira_v', src: '/images/illustrations/v_mira.jpg', illustratorId: 'mira', aspectRatio: 'aspect-[3/4]' },
  { id: 'kyupo_s', src: '/images/illustrations/s_kyupo.gif', illustratorId: 'kyupo', aspectRatio: 'aspect-[3/4]' },
  { id: 'kazuha_v', src: '/images/illustrations/v_kazuha.png', illustratorId: 'kazuha', aspectRatio: 'aspect-[3/4]' },
  { id: 'darjeeling_v', src: '/images/illustrations/v_darjeeling.png', illustratorId: 'darjeeling', aspectRatio: 'aspect-[2/4]' },
  { id: 'nora_v', src: '/images/illustrations/v_nora.png', illustratorId: 'nora', aspectRatio: 'aspect-[2/4]' },
  { id: 'tanaka_v', src: '/images/illustrations/v_tanaka.png', illustratorId: 'tanaka', aspectRatio: 'aspect-[2/4]' },
  { id: 'nakipanman_s', src: '/images/illustrations/s_nakimushipan.gif', illustratorId: 'nakipanman', aspectRatio: 'aspect-square' },
  { id: 'lime_h', src: '/images/illustrations/h_lime.png', illustratorId: 'lime', aspectRatio: 'aspect-[16/9]' },
  { id: 'sasami_s', src: '/images/illustrations/s_sasami.png', illustratorId: 'sasami', aspectRatio: 'aspect-[3/4]' },
  { id: 'imoko_s', src: '/images/illustrations/s_imoko.png', illustratorId: 'unknown', aspectRatio: 'aspect-[3/4]' },
  { id: 'tomoto_v', src: '/images/illustrations/v_tomoto.png', illustratorId: 'tomoto', aspectRatio: 'aspect-[3/4]' },
  { id: 'syake_h', src: '/images/illustrations/h_syake.png', illustratorId: 'syake', aspectRatio: 'aspect-[16/9]' },
  { id: 'mesao_s', src: '/images/illustrations/s_mesao.png', illustratorId: 'mesao' },
  { id: 'aituberkit_lh', src: '/images/illustrations/lh_aituberkit.jpg', illustratorId: 'ruka', altText: 'Illus. Ruka Designer', aspectRatio: 'aspect-[27/9]' },
  { id: 'obotsuka_v', src: '/images/illustrations/v_obotsuka.png', illustratorId: 'obotsuka', aspectRatio: 'aspect-[3/4]' },
  { id: 'ikawasa_s2', src: '/images/illustrations/s_ikawasa2.png', illustratorId: 'ikawasa', aspectRatio: 'aspect-[3/4]' },
  { id: 'icon_v2', src: '/images/illustrations/s_icon_v2.png', illustratorId: 'matoi', aspectRatio: 'aspect-[3/4]' },
  { id: 'fuji_s', src: '/images/illustrations/s_fuji.png', illustratorId: 'fuji', aspectRatio: 'aspect-[3/4]' },
  { id: 'hyamo_s2', src: '/images/illustrations/s_hyamo2.png', illustratorId: 'hyamo', aspectRatio: 'aspect-[3/4]' },
  { id: 'sen_v', src: '/images/illustrations/v_sen.png', illustratorId: 'sen', aspectRatio: 'aspect-[3/4]' },
  { id: 'kechon_s', src: '/images/illustrations/s_kechon.png', illustratorId: 'kechon', altText: 'Placeholder Square 1', className: "aspect-square" },
  { id: 'unya_s', src: '/images/illustrations/s_unya.png', illustratorId: 'unya', altText: 'Placeholder Square 2', className: "aspect-square" },
  { id: 'yumesakimiyo_v', src: '/images/illustrations/v_yumesakimiyo.png', illustratorId: 'yumesakimiyo', aspectRatio: 'aspect-[2/4]' },
  { id: 'terra_v', src: '/images/illustrations/v_terra.png', illustratorId: 'terra', aspectRatio: 'aspect-[2/4]' },
  { id: 'yumemurasaki_v', src: '/images/illustrations/v_yumemurasaki.png', illustratorId: 'yumemurasaki', aspectRatio: 'aspect-[2/4]' },
  { id: 'rotoi_v', src: '/images/illustrations/v_rotoi.png', illustratorId: 'rotoi', aspectRatio: 'aspect-[3/4]' },
  { id: 'kiyugiku_s', src: '/images/illustrations/s_kiyugiku.gif', illustratorId: 'kiyugiku', aspectRatio: 'aspect-[3/4]' },
  { id: 'nuu_s', src: '/images/illustrations/s_nuu.png', illustratorId: 'nuu', aspectRatio: 'aspect-[3/4]' },
]

const findItem = (id: string) => {
  const item = galleryItemsData.find(it => it.id === id);
  if (!item) throw new Error(`Gallery item with id "${id}" not found.`);
  const illustrator = item.illustratorId ? illustrators.find(il => il.id === item.illustratorId) : undefined;
  if (item.illustratorId && !illustrator) throw new Error(`Illustrator with id "${item.illustratorId}" for item "${id}" not found.`);
  
  const caption = illustrator ? `Illus. ${illustrator.name}` : 'unknown illus.';
  const alt = item.altText ? item.altText : caption;
  const url = illustrator?.url;

  return { ...item, caption, alt, url, className: item.className ?? item.aspectRatio };
}


export const Gallery = () => {
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
    <>
      <div className="pt-12 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white">GALLERY</h1>
      </div>
      <div className="container mx-auto px-4">
        {shuffledRows.map((row) => row.element)}
      </div>
    </>
  )
}
