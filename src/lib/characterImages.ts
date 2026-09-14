import images from './character-images.json'

export function getCharacterImage(source: string) {
  return (images as Partial<Record<string, (typeof images)[keyof typeof images]>>)[source]
}
