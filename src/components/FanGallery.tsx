import { GalleryToggle } from './GalleryToggle'
import { GalleryItem } from './GalleryItem'
import { fanArts } from '../utils/fanArtsData'
import { shuffle } from '../utils/galleryData'

export function FanGallery() {
  return (
    <>
      <div className="pb-4">
        <div className="pt-12 pb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground">GALLERY</h1>
        </div>
        <GalleryToggle active="fan" />
        <div className="mx-auto mt-4 w-full max-w-4xl px-4">
          <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sky-900">
            <p className="text-sm leading-relaxed">
              当ページに掲載しているファンアートは、各作者の著作物です。二次利用・二次創作（再編集・加工、生成AIの入力や LoRA 学習、印刷・頒布 など）を行う場合は、必ず作者ご本人の許諾を得てください。
              画像をクリックすると作者の X プロフィールへのリンクが表示されます。許諾が得られない場合は二次利用を控えてください。
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          {shuffle([...fanArts]).map(({ src, author }) => (
            <GalleryItem
              key={src}
              src={src}
              alt={author.startsWith('xxx_') ? "" : `Fan art by ${author}`}
              caption={author.startsWith('xxx_') ? "" : `Illus. ${author}`}
              url={author.startsWith('xxx_') ? undefined : `https://x.com/${encodeURIComponent(author)}`}
              className="aspect-square"
            />
          ))}
        </div>
      </div>
    </>
  )
}
