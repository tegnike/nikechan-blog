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
  return (
    <div 
      class={`relative group overflow-hidden rounded-lg cursor-pointer gallery-item ${className}`}
      data-src={src}
      data-caption={caption}
      data-url={url || ''}
      data-caption2={caption2 || ''}
      data-url2={url2 || ''}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-1000" />
    </div>
  )
}
