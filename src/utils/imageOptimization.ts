export type OptimizedImageSources = {
  src: string
  srcSet: string
}

type ImageRule = {
  sourcePrefix: string
  optimizedPrefix: string
  widths: [number, number]
}

const imageRules: ImageRule[] = [
  { sourcePrefix: '/images/illustrations/', optimizedPrefix: '/images/optimized/illustrations/', widths: [480, 960] },
  { sourcePrefix: '/images/fan_arts/', optimizedPrefix: '/images/optimized/fan_arts/', widths: [320, 640] },
  { sourcePrefix: '/images/models/', optimizedPrefix: '/images/optimized/models/', widths: [480, 960] },
  { sourcePrefix: '/images/tutorial/', optimizedPrefix: '/images/optimized/tutorial/', widths: [480, 960] },
  { sourcePrefix: '/images/guidlines/', optimizedPrefix: '/images/optimized/guidlines/', widths: [480, 960] },
  { sourcePrefix: '/images/logos/', optimizedPrefix: '/images/optimized/logos/', widths: [320, 640] },
  { sourcePrefix: '/images/thumbnails/', optimizedPrefix: '/images/optimized/thumbnails/', widths: [420, 840] },
  { sourcePrefix: '/static/images/posts/', optimizedPrefix: '/static/images/optimized/posts/', widths: [420, 840] },
  { sourcePrefix: '/static/images/news/', optimizedPrefix: '/static/images/optimized/news/', widths: [420, 840] },
]

const stripExtension = (path: string) => path.replace(/\.[^/.?#]+(?=$|[?#])/, '')

export const getOptimizedImageSources = (src: string): OptimizedImageSources | undefined => {
  const rule = imageRules.find(({ sourcePrefix }) => src.startsWith(sourcePrefix))
  if (!rule) return undefined

  const relativePath = src.slice(rule.sourcePrefix.length)
  const optimizedBase = `${rule.optimizedPrefix}${stripExtension(relativePath)}`
  const [smallWidth, largeWidth] = rule.widths

  return {
    src: `${optimizedBase}-${smallWidth}.webp`,
    srcSet: `${optimizedBase}-${smallWidth}.webp ${smallWidth}w, ${optimizedBase}-${largeWidth}.webp ${largeWidth}w`,
  }
}
