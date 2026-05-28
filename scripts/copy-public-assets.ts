import { cp, mkdir, rm } from 'fs/promises'
import { existsSync, readdirSync, statSync } from 'fs'
import { join, relative } from 'path'

const publicDir = 'public'
const assetsDir = 'dist/assets'
const excludedDirs = new Set([
  'expo-video',
])

function isExcluded(path: string): boolean {
  const normalized = path.split('\\').join('/')
  return excludedDirs.has(normalized) || [...excludedDirs].some(dir => normalized.startsWith(`${dir}/`))
}

async function copyDirectoryContents(source: string, destination: string) {
  await mkdir(destination, { recursive: true })

  for (const entry of readdirSync(source)) {
    const sourcePath = join(source, entry)
    const relativePath = relative(publicDir, sourcePath)

    if (isExcluded(relativePath)) {
      continue
    }

    const destinationPath = join(destination, entry)
    const stat = statSync(sourcePath)

    if (stat.isDirectory()) {
      await copyDirectoryContents(sourcePath, destinationPath)
    } else {
      await cp(sourcePath, destinationPath)
    }
  }
}

async function main() {
  await mkdir(assetsDir, { recursive: true })

  for (const excludedDir of excludedDirs) {
    const copiedPath = join(assetsDir, excludedDir)
    if (existsSync(copiedPath)) {
      await rm(copiedPath, { recursive: true, force: true })
    }
  }

  await copyDirectoryContents(publicDir, assetsDir)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
