import { GalleryItem } from './GalleryItem'
import { ImageModal } from './ImageModal'

export const Gallery = () => {
  return (
    <>
      <div className="pt-24 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center dark:text-white">
          GALLERY
        </h1>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
          <GalleryItem 
            src="/images/illustrations/v_matoi.png"
            alt="Illus. 綾川まとい"
            caption="Illus. 綾川まとい"
            url="https://x.com/matoi_e_ma"
            className="md:col-span-2 md:row-span-2 aspect-[3/4]"
          />
          <GalleryItem 
            src="/images/illustrations/s_icon_v1.jpg"
            alt="unknown illus."
            caption="unknown illus."
            className="aspect-[3/4]"
          />
          <GalleryItem 
            src="/images/illustrations/s_mizuta.gif"
            alt="Illus. 水田柚"
            caption="Illus. 水田柚"
            url="https://x.com/MizutaYuzu"
            className="aspect-[3/4]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <GalleryItem 
            src="/images/illustrations/v_onago.png"
            alt="Illus. おなご"
            caption="Illus. おなご"
            url="https://x.com/7Na5Go"
            className="aspect-[3/4]"
          />
          <GalleryItem 
            src="/images/illustrations/v_shhh.png"
            alt="Illus. 🤫"
            caption="Illus. 🤫"
            url="https://x.com/fdk_susk"
            className="aspect-[3/4]"
          />
          <GalleryItem 
            src="/images/illustrations/v_suke.png"
            alt="unknown illus."
            caption="unknown illus."
            className="aspect-[3/4]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <GalleryItem 
            src="/images/illustrations/h_unknown.png"
            alt="unknown illus."
            caption="unknown illus."
            className="md:col-span-2 aspect-[16/9]"
          />
          <GalleryItem 
            src="/images/illustrations/s_hayashi.jpg"
            alt="Illus. 林ちい"
            caption="Illus. 林ちい"
            url="https://x.com/chi_momosui"
            className="aspect-square"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <div className="md:col-span-1">
            <GalleryItem 
              src="/images/illustrations/s_ikawasa.png"
              alt="Illus. いかわさ🦑"
              caption="Illus. いかわさ🦑"
              url="https://x.com/Midori_soumenn"
              className="aspect-[3/4]"
            />
            <div className="mt-4">
              <GalleryItem 
                src="/images/illustrations/s_icon_v0.jpg"
                alt="TOUGENKYOU NFT"
                caption="TOUGENKYOU NFT"
                url="https://opensea.io/assets/ethereum/0x1fc12a099ea4cf718289472908cc6ee8c0c05bad/426"
                className="aspect-[3/4]"
              />
            </div>
          </div>
          <GalleryItem 
            src="/images/illustrations/v_hyamo.png"
            alt="TOUGENKYOU NFTひゃもぉ"
            caption="Illus. ひゃもぉ"
            url="https://x.com/pantyu15"
            className="md:col-span-2 aspect-[3/4]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <GalleryItem 
            src="/images/illustrations/h_kainushi.png"
            alt="Illus. かいぬし"
            caption="Illus. かいぬし"
            url="https://x.com/HEROINTOKYO"
            className="md:col-span-3 aspect-[27/9]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <GalleryItem 
            src="/images/illustrations/v_mira.jpg"
            alt="Illus. ミラ"
            caption="Illus. ミラ"
            url="https://x.com/mira_bluesky3"
            className="md:col-span-2 md:row-span-2 aspect-[3/4]"
          />
          <GalleryItem 
            src="/images/illustrations/s_kyupo.gif"
            alt="Illus. 浜山きゅぽ"
            caption="Illus. 浜山きゅぽ"
            url="https://x.com/9pokamo"
            className="aspect-[3/4]"
          />
          <GalleryItem 
            src="/images/illustrations/v_kazuha.png"
            alt="Illus. 桐宮カズハ"
            caption="Illus. 桐宮カズハ"
            url="https://x.com/tokyukazuha"
            className="aspect-[3/4]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <GalleryItem 
            src="/images/illustrations/v_darjeeling.png"
            alt="Illus. Darjeeling"
            caption="Illus. Darjeeling"
            url="https://x.com/xdarjeelingxtea"
            className="aspect-[2/4]"
          />
          <GalleryItem 
            src="/images/illustrations/v_nora.png"
            alt="Illus. 竹藪ノラ"
            caption="Illus. 竹藪ノラ"
            url="https://x.com/takeyabunora"
            className="aspect-[2/4]"
          />
          <GalleryItem 
            src="/images/illustrations/v_tanaka.png"
            alt="Illus. コンバーチブル田中"
            caption="Illus. コンバーチブル田中"
            url="https://x.com/T_anaka_Kanata"
            className="aspect-[2/4]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <GalleryItem 
            src="/images/illustrations/s_nakimushipan.gif"
            alt="Illus. なきむしぱん"
            caption="Illus. なきむしぱん"
            url="https://x.com/nakipanman"
            className="aspect-square"
          />
          <GalleryItem 
            src="/images/illustrations/h_lime.png"
            alt="Illus. ライム"
            caption="Illus. ライム"
            url="https://x.com/ranse237"
            className="md:col-span-2 aspect-[16/9]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <div className="md:col-span-1">
            <GalleryItem 
              src="/images/illustrations/s_sasami.png"
              alt="Illus. やきささみ"
              caption="Illus. やきささみ"
              url="https://x.com/v_sasami"
              className="aspect-[3/4]"
            />
            <div className="mt-4">
              <GalleryItem 
                src="/images/illustrations/s_imoko.png"
                alt="unknown illus."
                caption="unknown illus."
                className="aspect-[3/4]"
              />
            </div>
          </div>
          <GalleryItem 
            src="/images/illustrations/v_tomoto.png"
            alt="Illus. 十元"
            caption="Illus. 十元"
            url="https://x.com/99migiy"
            className="md:col-span-2 aspect-[3/4]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <GalleryItem 
            src="/images/illustrations/h_syake.png"
            alt="Illus. しゃーけ"
            caption="Illus. しゃーけ"
            url="https://x.com/syakegayu"
            className="md:col-span-2 aspect-[16/9]"
          />
          <GalleryItem 
            src="/images/illustrations/s_mesao.png"
            alt="Illus. めさお"
            caption="Illus. めさお"
            url="https://x.com/mesa__zzz"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <GalleryItem 
            src="/images/illustrations/h_aituberkit.jpg"
            alt="Illus. Ruka Designer"
            caption="Illus. Ruka Designer"
            url="https://coconala.com/users/2208636"
            className="md:col-span-3 aspect-[27/9]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <GalleryItem 
            src="/images/illustrations/v_obotsuka.png"
            alt="Illus. 憶束ない"
            caption="Illus. 憶束ない"
            url="https://x.com/uncertainaing"
            className="md:col-span-2 md:row-span-2 aspect-[3/4]"
          />
          <GalleryItem 
            src="/images/illustrations/s_ikawasa2.png"
            alt="Illus. いかわさ🦑"
            caption="Illus. いかわさ🦑"
            url="https://x.com/Midori_soumenn"
            className="aspect-[3/4]"
          />
          <GalleryItem 
            src="/images/illustrations/s_icon_v2.png"
            alt="Illus. 綾川まとい"
            caption="Illus. 綾川まとい"
            url="https://x.com/matoi_e_ma"
            className="aspect-[3/4]"
          />
        </div>

        <ImageModal id="imageModal" />
      </div>
    </>
  )
}
