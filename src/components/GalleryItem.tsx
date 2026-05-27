import { useGalleryModalContext } from '../context/GalleryModalContext'

type GalleryItemProps = {
  src: string;
  alt: string;
  caption: string;
  url?: string;
  caption2?: string;
  url2?: string;
  className?: string;
}

export function GalleryItem({ src, alt, caption, url, caption2, url2, className = '' }: GalleryItemProps) {
  const { openModal } = useGalleryModalContext()

  const handleClick = () => {
    openModal({ src, caption, url, caption2, url2 })
  }

  return (
    <div 
      onClick={handleClick}
      className={`relative group overflow-hidden rounded-lg cursor-pointer gallery-item ${className}`}
      data-src={src}
      data-caption={caption}
      data-url={url || ''}
      data-caption2={caption2 || ''}
      data-url2={url2 || ''}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  )
}
