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

  // カテゴリタブ切り替え機能 (NIKELOG / TECHBLOG)
  function setupCategoryTabs() {
    const categoryTabs = document.querySelectorAll<HTMLButtonElement>('.category-tab')
    if (categoryTabs.length === 0) return // ブログページ以外では何もしない

    const categoryContents = document.querySelectorAll<HTMLElement>('.category-content')

    categoryTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const clickedTab = e.currentTarget as HTMLButtonElement
        const targetCategory = clickedTab.getAttribute('data-category')
        if (!targetCategory) return

        // タブのスタイルを更新
        categoryTabs.forEach(t => {
          t.classList.remove('active', 'bg-white/20')
        })
        clickedTab.classList.add('active', 'bg-white/20')

        // コンテンツの表示切り替え
        categoryContents.forEach(ct => {
          const contentCat = ct.getAttribute('data-content')
          if (contentCat === targetCategory) {
            ct.classList.remove('hidden')
            ct.classList.add('block')
          } else {
            ct.classList.add('hidden')
            ct.classList.remove('block')
          }
        })
      })
    })
  }

  // Tech Blog ページネーション機能
  function setupTechBlogPagination() {
    const techBlogContainer = document.getElementById('category-techblog')
    if (!techBlogContainer) return // TechBlogコンポーネントがない場合は何もしない

    const paginationControls = techBlogContainer.querySelector('.pagination-controls') as HTMLElement | null
    const articleList = techBlogContainer.querySelector('.article-list') as HTMLElement | null
    const paginationInfo = techBlogContainer.querySelector('.pagination-info') as HTMLElement | null

    if (!paginationControls || !articleList || !paginationInfo) return

    const totalPages = parseInt(paginationControls.dataset.totalPages || '1', 10)
    const totalArticles = parseInt(paginationInfo.dataset.totalArticles || '0', 10)
    const articlesPerPage = parseInt(paginationInfo.dataset.articlesPerPage || '15', 10)
    let currentPage = parseInt(paginationControls.dataset.currentPage || '1', 10)

    const updateView = () => {
      // 記事の表示/非表示を切り替え
      const articles = articleList.querySelectorAll('.article-item') as NodeListOf<HTMLElement>
      articles.forEach(article => {
        const pageItem = parseInt(article.dataset.pageItem || '0', 10)
        article.classList.toggle('hidden', pageItem !== currentPage)
      })

      // ページネーションボタンの状態を更新
      const buttons = paginationControls.querySelectorAll('.pagination-button') as NodeListOf<HTMLButtonElement>
      buttons.forEach(button => {
        const page = parseInt(button.dataset.page || '0', 10)
        const action = button.dataset.pageAction

        // ページ番号ボタンのアクティブ状態
        if (page > 0) {
          button.classList.toggle('active', page === currentPage)
          button.classList.toggle('bg-gray-500', page === currentPage)
          button.classList.toggle('text-white', page === currentPage)
          button.classList.toggle('font-bold', page === currentPage)
          button.classList.toggle('bg-gray-700', page !== currentPage)
          button.classList.toggle('hover:bg-gray-600', page !== currentPage)
        }

        // 表示するページ番号ボタンの範囲を調整 (常に5つ表示)
        const maxVisibleButtons = 5
        const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - maxVisibleButtons + 1))
        const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1)
        if (button.classList.contains('page-number')) {
            const pageNum = parseInt(button.dataset.page || '0', 10);
            button.classList.toggle('hidden', pageNum < startPage || pageNum > endPage);
        }
        
        // アクションボタンの表示/非表示
        if (action === 'first' || action === 'prev') {
          button.classList.toggle('hidden', currentPage <= 1)
        }
        if (action === 'next' || action === 'last') {
          button.classList.toggle('hidden', currentPage >= totalPages)
        }
      })

      // 表示件数情報を更新
      const startArticleIndex = (currentPage - 1) * articlesPerPage + 1
      const endArticleIndex = Math.min(currentPage * articlesPerPage, totalArticles)
      paginationInfo.textContent = `全${totalArticles}件中 ${startArticleIndex}〜${endArticleIndex}件を表示`

      // 現在のページをデータ属性に保存
      paginationControls.dataset.currentPage = currentPage.toString()
    }

    paginationControls.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      const button = target.closest('.pagination-button') as HTMLButtonElement | null
      if (!button) return

      const page = parseInt(button.dataset.page || '0', 10)
      const action = button.dataset.pageAction
      let newPage = currentPage

      if (page > 0) {
        newPage = page
      } else if (action) {
        switch (action) {
          case 'first': newPage = 1; break;
          case 'prev': newPage = Math.max(1, currentPage - 1); break;
          case 'next': newPage = Math.min(totalPages, currentPage + 1); break;
          case 'last': newPage = totalPages; break;
        }
      }

      if (newPage !== currentPage) {
        currentPage = newPage
        updateView()
        // ページトップにスクロール (TechBlogコンテナのトップが良いかも)
        // techBlogContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.scrollTo({ top: techBlogContainer.offsetTop - 80, behavior: 'smooth' }) // ヘッダー分オフセット
      }
    })

    // 初期表示更新 (不要かもしれないが念のため)
    // updateView(); 
  }

  // 各機能のセットアップ関数を呼び出す
  setupProfileToggle()
  setupTranscriptToggle()
  setupTabs() // 汎用タブ用
  setupBlogMonthTabs() // ブログ年月タブ用
  setupCategoryTabs() // カテゴリタブ用
  setupTechBlogPagination() // Tech Blog ページネーション用

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