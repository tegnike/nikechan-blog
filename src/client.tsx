import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
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

  // クリックイベントをデリゲーションで取得 (ギャラリー用)
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
        profileButtons.forEach((btn) => btn.classList.remove('active')) // `active`クラスは例。AboutページのCSSに依存
        target.classList.add('active') // `active`クラスは例。AboutページのCSSに依存
      })
    })
  }

  // 文字起こしトグル機能
  function setupTranscriptToggle() {
    const btn = document.getElementById('toggle-transcript-button')
    if (!btn) return
    const icon = document.getElementById('transcript-icon')
    const content = document.getElementById('transcript-content')
    if (!icon || !content) return
    btn.addEventListener('click', () => {
      const isOpen = !content.classList.toggle('hidden')
      icon.classList.toggle('fa-chevron-up', isOpen)
      icon.classList.toggle('fa-chevron-down', !isOpen)
    })
  }

  // 汎用タブ切り替え機能（例: BlogDetailV3の分析タブなど）
  function setupTabs() {
    const tabContainers = document.querySelectorAll<HTMLElement>('[data-tab-container]')
    if (tabContainers.length === 0) return

    tabContainers.forEach(container => {
      const triggers = container.querySelectorAll<HTMLButtonElement>('.tab-trigger')
      const contents = container.querySelectorAll<HTMLElement>('.tab-content')
      if (triggers.length === 0 || contents.length === 0) return

      triggers.forEach(tr => {
        tr.addEventListener('click', () => {
          const targetId = tr.getAttribute('data-target') // data-target属性を使用
          if (!targetId) return

          triggers.forEach(t => t.classList.remove('active')) // `active`クラスは汎用的な例
          tr.classList.add('active') // `active`クラスは汎用的な例

          contents.forEach(ct => {
            ct.classList.toggle('hidden', ct.id !== targetId) // IDで一致判定
          })
        })
      })

      // 初期状態でアクティブなタブを設定 (最初のトリガーをアクティブにするなど)
      if (triggers.length > 0 && !container.querySelector('.tab-trigger.active')) {
          // 既にアクティブなトリガーがなければ最初のトリガーをクリック
          triggers[0].click();
      }
    })
  }

  // ブログページの年月タブ切り替え機能
  function setupBlogMonthTabs() {
    const monthTabsContainer = document.querySelector('.flex.space-x-2.min-w-max.p-2') // Blog.tsxのクラス構造に合わせる
    if (!monthTabsContainer) return // ブログページ以外では何もしない

    const monthTabs = monthTabsContainer.querySelectorAll<HTMLButtonElement>('.month-tab')
    const monthContents = document.querySelectorAll<HTMLElement>('.month-content')

    if (monthTabs.length === 0 || monthContents.length === 0) return

    monthTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const clickedTab = e.currentTarget as HTMLButtonElement
        const targetMonth = clickedTab.getAttribute('data-tab')
        if (!targetMonth) return

        // すべてのタブのスタイルを非アクティブに
        monthTabs.forEach(t => {
          t.classList.remove('bg-gray-600', 'ring-2', 'ring-white', 'font-bold')
          t.classList.add('bg-gray-700')
        })

        // クリックされたタブのスタイルをアクティブに
        clickedTab.classList.add('bg-gray-600', 'ring-2', 'ring-white', 'font-bold')
        clickedTab.classList.remove('bg-gray-700')

        // すべてのコンテンツを非表示に
        monthContents.forEach(content => {
          content.classList.add('hidden')
          content.classList.remove('block') // blockクラスも削除
        })

        // 対応するコンテンツを表示
        const targetContent = document.querySelector(`.month-content[data-content="${targetMonth}"]`) as HTMLElement | null
        if (targetContent) {
          targetContent.classList.remove('hidden')
          targetContent.classList.add('block') // blockクラスを追加して表示
        }
      })
    })

    // 初期状態（最初のタブ）はSSR側で設定されている ('block' classが付与されている)
    // ため、クライアントサイドでの初期クリックは不要
  }


  // 各機能のセットアップ関数を呼び出す
  setupProfileToggle()
  setupTranscriptToggle()
  setupTabs() // 汎用タブ用
  setupBlogMonthTabs() // ブログ年月タブ用

  // BlogDetailV3 のグラフ表示（クライアントのみで描画が必要な場合）
  const initScript = document.getElementById('blog-detail-init') as HTMLScriptElement | null
  if (initScript) {
    try {
      const props = JSON.parse(initScript.textContent || '{}')
      const rootEl = document.getElementById('blog-detail-v3-root')
      if (rootEl) {
        import('./components/BlogDetailV3').then(mod => {
          const BlogDetailV3 = mod.BlogDetailV3 as any
          hydrateRoot(rootEl, <BlogDetailV3 {...props} />)
        })
      }
    } catch (e) {
      console.error('Failed to hydrate BlogDetailV3', e)
    }
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap)
  } else {
    bootstrap()
  }
} 