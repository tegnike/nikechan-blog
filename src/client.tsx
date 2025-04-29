import React from 'react'
import { createRoot } from 'react-dom/client'
import { GalleryModalProvider } from './context/GalleryModalContext'
import { GalleryModal } from './components/GalleryModal'
import type { GalleryModalItem } from './context/GalleryModalContext'

function bootstrap() {
  // モーダル専用のルート要素
  const container = document.createElement('div')
  document.body.appendChild(container)
  createRoot(container).render(
    <GalleryModalProvider>
      <GalleryModal />
    </GalleryModalProvider>
  )

  // クリックイベントをデリゲーションで取得
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('.gallery-item') as HTMLElement | null
    if (!target) return
    const item: GalleryModalItem = {
      src: target.getAttribute('data-src') || '',
      caption: target.getAttribute('data-caption') || '',
      url: target.getAttribute('data-url') || undefined,
      caption2: target.getAttribute('data-caption2') || undefined,
      url2: target.getAttribute('data-url2') || undefined,
    }
    ;(window as any).openGalleryModal?.(item)
  })

  // プロフィール切り替え機能を追加
  function setupProfileToggle() {
    const profileButtons = document.querySelectorAll('[data-profile]') as NodeListOf<HTMLButtonElement>
    if (profileButtons.length === 0) return // About ページ以外では何もしない

    profileButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement
        const profileId = target.getAttribute('data-profile')
        if (!profileId) return

        // すべてのプロフィールを非表示
        document.querySelectorAll('[id$="-profile"]').forEach((profile) => {
          profile.classList.add('hidden')
        })

        // 選択したプロフィールを表示
        const targetProfile = document.getElementById(`${profileId}-profile`)
        if (targetProfile) targetProfile.classList.remove('hidden')

        // ボタンのアクティブ状態を更新
        profileButtons.forEach((btn) => btn.classList.remove('active'))
        target.classList.add('active')
      })
    })
  }

  setupProfileToggle()
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap)
  } else {
    bootstrap()
  }
} 