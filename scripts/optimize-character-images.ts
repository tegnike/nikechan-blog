import sharp from 'sharp'
import { createHash } from 'node:crypto'
import { access, mkdir, readFile, writeFile } from 'node:fs/promises'

const characters = ['ainikechan', 'nikechan', 'mikaze', 'punike', 'today_norma']
const manifestPath = 'src/lib/character-images.json'
const quality = 84
interface ImageAsset {
  hash: string
  width: number
  height: number
  src: string
  srcSet: string
}
const previous: Record<string, ImageAsset> = JSON.parse(await readFile(manifestPath, 'utf8').catch(() => '{}'))
const assets: Record<string, ImageAsset> = {}

for (const kind of ['sprites', 'icons']) {
  const directory = `public/images/characters/list/${kind}`
  await mkdir(directory, { recursive: true })
  for (const character of characters) {
    const source = `/images/characters/${kind}/${character}.png`
    const input = await readFile(`public${source}`)
    const metadata = await sharp(input).metadata()
    const width = metadata.width!
    const height = metadata.height!
    const widths = [...new Set((kind === 'sprites' ? [320, 640, 960, 1280] : [160, 320, 500]).map(size => Math.min(size, width)))]
    const outputs = widths.map(size => `/images/characters/list/${kind}/${character}-${size}.webp`)
    const hash = createHash('sha256').update(input).update(`webp-${quality}-alpha100-effort6-${widths.join(',')}`).digest('hex')
    const filesExist = await Promise.all(outputs.map(path => access(`public${path}`).then(() => true, () => false)))
    if (previous[source]?.hash !== hash || filesExist.includes(false)) {
      for (const [index, size] of widths.entries()) {
        await sharp(input).resize({ width: size, withoutEnlargement: true })
          .webp({ quality, alphaQuality: 100, effort: 6 }).toFile(`public${outputs[index]}`)
      }
    }
    assets[source] = { hash, width, height, src: outputs[0], srcSet: outputs.map((path, i) => `${path} ${widths[i]}w`).join(', ') }
  }
}
const content = `${JSON.stringify(assets, null, 2)}\n`
if (await readFile(manifestPath, 'utf8').catch(() => '') !== content) await writeFile(manifestPath, content)
console.log('Character WebP variants and source dimensions synchronized')
