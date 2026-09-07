import { galleryImageUrl } from './galleryImages'

// Gallery data shared between Gallery page and Landing Page

export interface Illustrator {
  id: string
  name: string
  url?: string
}

export interface GalleryItemData {
  id: string
  src: string
  altText?: string // altテキストのベース部分。イラストレーター名が追記される
  illustratorId?: string
  className?: string
  aspectRatio?: string // aspect-[3/4] などを文字列で保持
  displayType?: 'square' | 'portrait' | 'landscape' // LP用の表示形式: square=正方形、portrait=縦長、landscape=横長
}

export const illustrators: Illustrator[] = [
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

export const galleryItemsData: GalleryItemData[] = [
  { id: 'matoi_v', src: galleryImageUrl('/images/illustrations/v_matoi.png'), illustratorId: 'matoi', aspectRatio: 'aspect-[3/4]', displayType: 'portrait' },
  { id: 'icon_v1', src: galleryImageUrl('/images/illustrations/s_icon_v1.jpg'), illustratorId: 'unknown', aspectRatio: 'aspect-[3/4]', displayType: 'square' },
  { id: 'mizuta_s', src: galleryImageUrl('/images/illustrations/s_mizuta.gif'), illustratorId: 'mizuta', aspectRatio: 'aspect-[3/4]', displayType: 'square' },
  { id: 'onago_v', src: galleryImageUrl('/images/illustrations/v_onago.png'), illustratorId: 'onago', aspectRatio: 'aspect-[3/4]', displayType: 'portrait' },
  { id: 'shhh_v', src: galleryImageUrl('/images/illustrations/v_shhh.png'), illustratorId: 'fdk_susk', aspectRatio: 'aspect-[3/4]', displayType: 'portrait' },
  { id: 'suke_v', src: galleryImageUrl('/images/illustrations/v_suke.png'), illustratorId: 'unknown', aspectRatio: 'aspect-[3/4]', displayType: 'portrait' },
  { id: 'unknown_h', src: galleryImageUrl('/images/illustrations/h_unknown.png'), illustratorId: 'unknown', aspectRatio: 'aspect-[16/9]', displayType: 'landscape' },
  { id: 'hayashi_s', src: galleryImageUrl('/images/illustrations/s_hayashi.jpg'), illustratorId: 'chi_momosui', aspectRatio: 'aspect-square', displayType: 'square' },
  { id: 'ikawasa_s1', src: galleryImageUrl('/images/illustrations/s_ikawasa.png'), illustratorId: 'ikawasa', aspectRatio: 'aspect-[3/4]', displayType: 'square' },
  { id: 'icon_v0', src: galleryImageUrl('/images/illustrations/s_icon_v0.jpg'), illustratorId: 'tougenkyou', altText: 'TOUGENKYOU NFT', aspectRatio: 'aspect-[3/4]', displayType: 'square' },
  { id: 'hyamo_v1', src: galleryImageUrl('/images/illustrations/v_hyamo.png'), illustratorId: 'hyamo', aspectRatio: 'aspect-[3/4]', displayType: 'portrait' },
  { id: 'kainushi_lh', src: galleryImageUrl('/images/illustrations/lh_kainushi.png'), illustratorId: 'kainushi', aspectRatio: 'aspect-[27/9]', displayType: 'landscape' },
  { id: 'mira_v', src: galleryImageUrl('/images/illustrations/v_mira.jpg'), illustratorId: 'mira', aspectRatio: 'aspect-[3/4]', displayType: 'portrait' },
  { id: 'kyupo_s', src: galleryImageUrl('/images/illustrations/s_kyupo.gif'), illustratorId: 'kyupo', aspectRatio: 'aspect-[3/4]', displayType: 'square' },
  { id: 'kazuha_v', src: galleryImageUrl('/images/illustrations/v_kazuha.png'), illustratorId: 'kazuha', aspectRatio: 'aspect-[3/4]', displayType: 'portrait' },
  { id: 'darjeeling_v', src: galleryImageUrl('/images/illustrations/v_darjeeling.png'), illustratorId: 'darjeeling', aspectRatio: 'aspect-[2/4]', displayType: 'portrait' },
  { id: 'nora_v', src: galleryImageUrl('/images/illustrations/v_nora.png'), illustratorId: 'nora', aspectRatio: 'aspect-[2/4]', displayType: 'portrait' },
  { id: 'tanaka_v', src: galleryImageUrl('/images/illustrations/v_tanaka.png'), illustratorId: 'tanaka', aspectRatio: 'aspect-[2/4]', displayType: 'portrait' },
  { id: 'nakipanman_s', src: galleryImageUrl('/images/illustrations/s_nakimushipan.gif'), illustratorId: 'nakipanman', aspectRatio: 'aspect-square', displayType: 'square' },
  { id: 'lime_h', src: galleryImageUrl('/images/illustrations/h_lime.png'), illustratorId: 'lime', aspectRatio: 'aspect-[16/9]', displayType: 'landscape' },
  { id: 'sasami_s', src: galleryImageUrl('/images/illustrations/s_sasami.png'), illustratorId: 'sasami', aspectRatio: 'aspect-[3/4]', displayType: 'square' },
  { id: 'imoko_s', src: galleryImageUrl('/images/illustrations/s_imoko.png'), illustratorId: 'unknown', aspectRatio: 'aspect-[3/4]', displayType: 'square' },
  { id: 'tomoto_v', src: galleryImageUrl('/images/illustrations/v_tomoto.png'), illustratorId: 'tomoto', aspectRatio: 'aspect-[3/4]', displayType: 'portrait' },
  { id: 'syake_h', src: galleryImageUrl('/images/illustrations/h_syake.png'), illustratorId: 'syake', aspectRatio: 'aspect-[16/9]', displayType: 'landscape' },
  { id: 'mesao_s', src: galleryImageUrl('/images/illustrations/s_mesao.png'), illustratorId: 'mesao', displayType: 'square' },
  { id: 'aituberkit_lh', src: galleryImageUrl('/images/illustrations/lh_aituberkit.jpg'), illustratorId: 'ruka', altText: 'Illus. Ruka Designer', aspectRatio: 'aspect-[27/9]', displayType: 'landscape' },
  { id: 'obotsuka_v', src: galleryImageUrl('/images/illustrations/v_obotsuka.png'), illustratorId: 'obotsuka', aspectRatio: 'aspect-[3/4]', displayType: 'portrait' },
  { id: 'ikawasa_s2', src: galleryImageUrl('/images/illustrations/s_ikawasa2.png'), illustratorId: 'ikawasa', aspectRatio: 'aspect-[3/4]', displayType: 'square' },
  { id: 'icon_v2', src: galleryImageUrl('/images/illustrations/s_icon_v2.png'), illustratorId: 'matoi', aspectRatio: 'aspect-[3/4]', displayType: 'square' },
  { id: 'fuji_s', src: galleryImageUrl('/images/illustrations/s_fuji.png'), illustratorId: 'fuji', aspectRatio: 'aspect-[3/4]', displayType: 'square' },
  { id: 'hyamo_s2', src: galleryImageUrl('/images/illustrations/s_hyamo2.png'), illustratorId: 'hyamo', aspectRatio: 'aspect-[3/4]', displayType: 'square' },
  { id: 'sen_v', src: galleryImageUrl('/images/illustrations/v_sen.png'), illustratorId: 'sen', aspectRatio: 'aspect-[3/4]', displayType: 'portrait' },
  { id: 'kechon_s', src: galleryImageUrl('/images/illustrations/s_kechon.png'), illustratorId: 'kechon', altText: 'Placeholder Square 1', className: "aspect-square", displayType: 'square' },
  { id: 'unya_s', src: galleryImageUrl('/images/illustrations/s_unya.png'), illustratorId: 'unya', altText: 'Placeholder Square 2', className: "aspect-square", displayType: 'square' },
  { id: 'yumesakimiyo_v', src: galleryImageUrl('/images/illustrations/v_yumesakimiyo.png'), illustratorId: 'yumesakimiyo', aspectRatio: 'aspect-[2/4]', displayType: 'portrait' },
  { id: 'terra_v', src: galleryImageUrl('/images/illustrations/v_terra.png'), illustratorId: 'terra', aspectRatio: 'aspect-[2/4]', displayType: 'portrait' },
  { id: 'yumemurasaki_v', src: galleryImageUrl('/images/illustrations/v_yumemurasaki.png'), illustratorId: 'yumemurasaki', aspectRatio: 'aspect-[2/4]', displayType: 'portrait' },
  { id: 'rotoi_v', src: galleryImageUrl('/images/illustrations/v_rotoi.png'), illustratorId: 'rotoi', aspectRatio: 'aspect-[3/4]', displayType: 'portrait' },
  { id: 'kiyugiku_s', src: galleryImageUrl('/images/illustrations/s_kiyugiku.gif'), illustratorId: 'kiyugiku', aspectRatio: 'aspect-[3/4]', displayType: 'square' },
  { id: 'nuu_s', src: galleryImageUrl('/images/illustrations/s_nuu.png'), illustratorId: 'nuu', aspectRatio: 'aspect-[3/4]', displayType: 'square' },
]

// Fisher-Yates シャッフル
export const shuffle = <T,>(array: T[]): T[] => {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// 画像IDから表示タイプを自動判定
const getDisplayTypeFromId = (id: string): 'square' | 'portrait' | 'landscape' => {
  const prefix = id.split('_')[0];
  switch (prefix) {
    case 's': return 'square';    // s_ = 正方形
    case 'v': return 'portrait';  // v_ = 縦長
    case 'h': return 'landscape'; // h_ = 横長
    case 'lh': return 'landscape'; // lh_ = 横長
    default: return 'portrait';   // デフォルトは縦長
  }
}

// ギャラリーアイテムの詳細情報を取得
export const findItem = (id: string) => {
  const item = galleryItemsData.find(it => it.id === id);
  if (!item) throw new Error(`Gallery item with id "${id}" not found.`);
  const illustrator = item.illustratorId ? illustrators.find(il => il.id === item.illustratorId) : undefined;
  if (item.illustratorId && !illustrator) throw new Error(`Illustrator with id "${item.illustratorId}" for item "${id}" not found.`);
  
  const caption = illustrator ? `Illus. ${illustrator.name}` : 'unknown illus.';
  const alt = item.altText ? item.altText : caption;
  const url = illustrator?.url;
  const displayType = item.displayType || getDisplayTypeFromId(id);

  return { ...item, caption, alt, url, className: item.className ?? item.aspectRatio, displayType };
}

// ランダムに指定数のアイテムを取得
export const getRandomGalleryItems = (count: number = 6) => {
  const shuffled = shuffle(galleryItemsData);
  return shuffled.slice(0, count).map(item => findItem(item.id));
}