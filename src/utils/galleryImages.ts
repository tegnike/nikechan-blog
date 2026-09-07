export const GALLERY_IMAGE_ORIGIN = 'https://images.nikechan.com'

export const GALLERY_IMAGE_PREFIXES = [
  '/images/fan_arts/',
  '/images/illustrations/',
  '/images/optimized/fan_arts/',
  '/images/optimized/illustrations/',
] as const

export const galleryImageUrl = (path: string): string =>
  GALLERY_IMAGE_PREFIXES.some(prefix => path.startsWith(prefix))
    ? `${GALLERY_IMAGE_ORIGIN}${path}`
    : path
