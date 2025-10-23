import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import Chart from 'chart.js/auto'; // Chart.jsをインポート
import { GalleryModalProvider } from './context/GalleryModalContext'
import { GalleryModal } from './components/GalleryModal'
import type { GalleryModalItem } from './context/GalleryModalContext'

// Motion.js initial styles fix for LP
function fixMotionStyles() {
  // Find all elements with motion/react initial styles and apply visible state
  setTimeout(() => {
    const elements = document.querySelectorAll('[style*="opacity:0"], [style*="opacity: 0"]')
    elements.forEach(el => {
      const element = el as HTMLElement
      if (element.style.opacity === '0') {
        element.style.opacity = '1'
        element.style.transform = 'none'
        element.style.transition = 'all 0.5s ease'
      }
    })
  }, 100)
}

let dailyMetricsChartInstance: Chart | null = null; // チャートインスタンスを保持する変数

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
        profileButtons.forEach((btn) => {
          btn.classList.remove('active', 'bg-gradient-to-r', 'from-purple-500', 'to-pink-500', 'text-white', 'shadow-lg')
          btn.classList.add('text-gray-300', 'hover:text-white')
        })
        target.classList.add('active', 'bg-gradient-to-r', 'from-purple-500', 'to-pink-500', 'text-white', 'shadow-lg')
        target.classList.remove('text-gray-300', 'hover:text-white')
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

  // ヘッダの「Other」ドロップダウン（クリック開閉）
  function setupHeaderOtherDropdown() {
    const trigger = document.getElementById('other-menu-trigger') as HTMLButtonElement | null
    const menu = document.getElementById('other-menu') as HTMLElement | null
    if (!trigger || !menu) return

    let open = false
    const openMenu = () => {
      menu.classList.remove('hidden')
      trigger.setAttribute('aria-expanded', 'true')
      open = true
    }
    const closeMenu = () => {
      menu.classList.add('hidden')
      trigger.setAttribute('aria-expanded', 'false')
      open = false
    }

    trigger.addEventListener('click', (e) => {
      e.preventDefault()
      open ? closeMenu() : openMenu()
    })

    // メニュー外クリックで閉じる
    document.addEventListener('click', (e) => {
      if (!open) return
      const target = e.target as Node
      if (!menu.contains(target) && !trigger.contains(target)) {
        closeMenu()
      }
    })

    // Escキーで閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && open) closeMenu()
    })
  }

  // 汎用コピー機能（data-copy-text属性を持つボタンに対応）
  function setupCopyButtons() {
    const buttons = document.querySelectorAll<HTMLButtonElement>('[data-copy-text]')
    if (buttons.length === 0) return

    buttons.forEach(button => {
      const defaultLabel = button.getAttribute('data-copy-default') ?? button.textContent ?? ''
      const successLabel = button.getAttribute('data-copy-success') ?? 'Copied!'
      const errorLabel = button.getAttribute('data-copy-error') ?? 'コピーに失敗しました'

      button.addEventListener('click', async () => {
        const text = button.getAttribute('data-copy-text')
        if (!text) return

        button.disabled = true

        const restore = () => {
          setTimeout(() => {
            button.textContent = defaultLabel
            button.disabled = false
          }, 1500)
        }

        try {
          if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text)
          } else {
            const textarea = document.createElement('textarea')
            textarea.value = text
            textarea.style.position = 'fixed'
            textarea.style.top = '-9999px'
            document.body.appendChild(textarea)
            textarea.focus()
            textarea.select()
            document.execCommand('copy')
            document.body.removeChild(textarea)
          }

          button.textContent = successLabel
        } catch (err) {
          console.error('Failed to copy text', err)
          button.textContent = errorLabel
        } finally {
          restore()
        }
      })
    })
  }

  // モバイルメニュー（Menuボタンの開閉）
  function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-button') as HTMLButtonElement | null
    const panel = document.getElementById('mobile-menu') as HTMLElement | null
    if (!btn || !panel) return

    let open = false
    const openMenu = () => {
      panel.classList.remove('hidden')
      btn.setAttribute('aria-expanded', 'true')
      open = true
    }
    const closeMenu = () => {
      panel.classList.add('hidden')
      btn.setAttribute('aria-expanded', 'false')
      open = false
    }

    btn.addEventListener('click', (e) => {
      e.preventDefault()
      open ? closeMenu() : openMenu()
    })

    // 外側クリックで閉じる
    document.addEventListener('click', (e) => {
      if (!open) return
      const target = e.target as Node
      if (!panel.contains(target) && !btn.contains(target)) {
        closeMenu()
      }
    })

    // Esc で閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && open) closeMenu()
    })

    // メニュー内のリンククリックで閉じる
    panel.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => closeMenu())
    })

    // 画面幅がmd以上になったら閉じる（レイアウト切替時の取りこぼし防止）
    const mq = window.matchMedia('(min-width: 768px)')
    const handleMq = (e: MediaQueryListEvent | MediaQueryList) => {
      if ((e as MediaQueryList).matches || (e as MediaQueryListEvent).matches) {
        closeMenu()
      }
    }
    // 初期と変更時
    handleMq(mq)
    mq.addEventListener('change', handleMq)
  }

  // ブログページの年月タブ切り替え機能
  function setupBlogMonthTabs() {
    const monthTabsContainer = document.querySelector('[data-month-tabs]') // クラスセレクタをdata属性に置き換え
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
          // active styles
          button.classList.toggle('bg-purple-600', page === currentPage)
          button.classList.toggle('text-white', page === currentPage)
          button.classList.toggle('border-purple-600', page === currentPage)
          button.classList.toggle('font-semibold', page === currentPage)
          // inactive styles
          button.classList.toggle('bg-white/70', page !== currentPage)
          button.classList.toggle('text-zinc-700', page !== currentPage)
          button.classList.toggle('hover:bg-zinc-50', page !== currentPage)
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

  // BlogDetailV3 のハイドレーション
  function setupBlogDetailHydration() {
    const container = document.getElementById('blog-detail-v3-container')
    if (!container) return
    const propsStr = container.getAttribute('data-props')
    if (!propsStr) return
    let props: any
    try {
      props = JSON.parse(propsStr)
    } catch (e) {
      console.error('Failed to parse BlogDetailV3 props:', e)
      return
    }

    import('./components/BlogDetailV3').then(mod => {
      const BlogDetailV3 = mod.BlogDetailV3 as any
      hydrateRoot(container, <BlogDetailV3 {...props} />)
    }).catch(err => {
      console.error('Failed to hydrate BlogDetailV3:', err)
    })
  }

  // NikeLog チャート初期化機能
  function setupNikeLogChart() {
    // 既存のチャートがあれば破棄する
    if (dailyMetricsChartInstance) {
      dailyMetricsChartInstance.destroy();
      dailyMetricsChartInstance = null; // 念のためnullに戻す
    }

    const canvas = document.getElementById('dailyMetricsChart') as HTMLCanvasElement | null;
    if (!canvas) {
      // Chart.jsはインポート済みなので typeof Chart === 'undefined' は不要
      console.warn('NikeLog chart canvas not found.');
      return;
    }

    const metricsDataString = canvas.dataset.metrics;
    if (!metricsDataString) {
      console.warn('No metrics data found on canvas.');
      return;
    }

    let rawData: { date: string; sessions: number; messages: number; repeats: number }[];
    try {
      rawData = JSON.parse(metricsDataString);
    } catch (e) {
      console.error('Failed to parse metrics data:', e);
      return;
    }

    // 日付表示用の関数
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('ja-JP', {
        month: '2-digit',
        day: '2-digit'
      }).replace('/', '/');
    };

    // 指定日数以内のデータだけを抽出する関数
    const filterByDays = (data: typeof rawData, days: number) => {
      const now = new Date();
      const msPerDay = 1000 * 60 * 60 * 24;
      return data.filter(m => {
        const date = new Date(m.date);
        const diffDays = Math.floor((now.getTime() - date.getTime()) / msPerDay);
        // 未来の日付は除外し、範囲内の日付のみ含める
        return diffDays >= 0 && diffDays <= days;
      });
    };

    // 画面サイズに応じたデータのフィルタリング
    const getFilteredData = () => {
      if (window.innerWidth >= 1024) {
        return filterByDays(rawData, 120); // PC: 当日含めて120日分
      } else if (window.innerWidth >= 768) {
        return filterByDays(rawData, 90); // タブレット: 当日含めて90日分
      } else {
        return filterByDays(rawData, 30); // スマホ: 当日含めて30日分
      }
    };

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let currentData = getFilteredData();
    dailyMetricsChartInstance = new Chart(ctx, { 
      type: 'line',
      data: {
        labels: currentData.map(m => formatDate(m.date)),
        datasets: [
          {
            label: 'セッション数',
            data: currentData.map(m => m.sessions),
            borderColor: '#4ECDC4',
            tension: 0.1,
            yAxisID: 'y1',
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4
          },
          {
            label: 'メッセージ数',
            data: currentData.map(m => m.messages),
            borderColor: '#FF6B6B',
            tension: 0.1,
            yAxisID: 'y2',
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4
          },
          {
            label: 'リピートユーザー数',
            data: currentData.map(m => m.repeats),
            borderColor: '#FFD93D',
            tension: 0.1,
            yAxisID: 'y1',
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            borderDash: [5, 5]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'top',
            align: 'start',
            labels: {
              boxWidth: 15,
              padding: 15
            }
          },
          tooltip: {
            callbacks: {
              afterBody: function(context: any) { // Tooltip コールバックの型付け
                const index = context[0].dataIndex;
                // currentData はクロージャで参照される
                const dataPoint = currentData[index];
                if (!dataPoint) return ''; // データポイントが存在しない場合
                const sessions = dataPoint.sessions;
                const repeats = dataPoint.repeats;
                const repeatRate = sessions > 0 ? ((repeats / sessions) * 100).toFixed(1) : '0.0';
                return `リピート率: ${repeatRate}%`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: true,
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              maxRotation: 45,
              minRotation: 45,
              padding: 5,
              color: 'rgba(255, 255, 255, 0.8)',
              font: {
                size: 11
              }
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'セッション数・リピート数',
              color: '#4ECDC4',
              font: {
                size: 12
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.8)',
              padding: 8,
              font: {
                size: 11
              }
            }
          },
          y2: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'メッセージ数',
              color: '#FF6B6B',
              font: {
                size: 12
              }
            },
            grid: {
              display: false
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.8)',
              padding: 8,
              font: {
                size: 11
              }
            }
          }
        }
      }
    });

    // リサイズイベントの処理
    let resizeTimeout: number;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(function() { // window.setTimeout を使用
        currentData = getFilteredData(); // 再計算
        // インスタンスが存在するか確認してから更新
        if (dailyMetricsChartInstance) {
          dailyMetricsChartInstance.data.labels = currentData.map(m => formatDate(m.date));
          dailyMetricsChartInstance.data.datasets[0].data = currentData.map(m => m.sessions);
          dailyMetricsChartInstance.data.datasets[1].data = currentData.map(m => m.messages);
          dailyMetricsChartInstance.data.datasets[2].data = currentData.map(m => m.repeats);
          dailyMetricsChartInstance.update();
        }
      }, 250);
    });
  }

  // DOMContentLoaded で各種セットアップを実行
  document.addEventListener('DOMContentLoaded', () => {
    setupProfileToggle()
    setupTranscriptToggle()
    setupTabs()
    setupCopyButtons()
    setupBlogMonthTabs()
    setupCategoryTabs()
    setupTechBlogPagination()
    setupNikeLogChart() // NikeLogチャートの初期化を追加
    setupBlogDetailHydration() // BlogDetailV3 をハイドレート
    setupHeaderOtherDropdown() // Header: Other ドロップダウン
    setupMobileMenu() // Header: モバイルメニュー
  })
}

// アプリケーションのブートストラップを実行
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      bootstrap()
      fixMotionStyles()
    })
  } else {
    bootstrap()
    fixMotionStyles()
  }
}  
