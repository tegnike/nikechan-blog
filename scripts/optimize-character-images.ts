import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const characters = ['ainikechan', 'nikechan', 'mikaze', 'punike', 'today_norma']

// Keep the transparent masters intact and provide enough pixels for 3x displays.
for (const kind of ['sprites', 'icons']) {
  const widths = kind === 'sprites' ? [320, 640, 960] : [160, 320, 500]
  const directory = `public/images/characters/list/${kind}`
  await mkdir(directory, { recursive: true })
  for (const character of characters) {
    for (const width of widths) {
      await sharp(`public/images/characters/${kind}/${character}.png`)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 92, alphaQuality: 100, effort: 6 })
        .toFile(`${directory}/${character}-${width}.webp`)
    }
  }
}
