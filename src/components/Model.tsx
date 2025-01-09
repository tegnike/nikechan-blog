import { GalleryItem } from './GalleryItem'
import { ImageModal } from './ImageModal'

export const Model = () => {
  return (
    <>
      <div className="pt-24 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center dark:text-white">
          MODEL
        </h1>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GalleryItem 
            src="/images/models/live2d.png"
            alt="Illus. 綾川まとい"
            caption="Illus. 綾川まとい"
            url="https://x.com/t_anaka_kanata"
            caption2="Model. チッパー"
            url2="https://x.com/Chipper_tyvt"
            className="aspect-[2/4]"
          />
          <GalleryItem 
            src="/images/models/vrmv1.png"
            alt="Model. 琳"
            caption="Model. 琳"
            url="https://x.com/rin_tyn25"
            className="aspect-[2/4]"
          />
          <GalleryItem 
            src="/images/models/vrmv2.png"
            alt="Model. たまごん"
            caption="Model. たまごん"
            url="https://x.com/_TAMA_GON_"
            className="aspect-[2/4]"
          />
        </div>

        <ImageModal id="imageModal" />
      </div>
    </>
  )
}
