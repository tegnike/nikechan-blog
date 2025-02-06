// Chart.jsのグローバル設定
Chart.defaults.color = '#ffffff';
Chart.defaults.borderColor = '#666666';

// アニメーション設定
const barChartAnimation = {
  animation: {
    y: {
      from: 1000 // スケールの外側から開始
    }
  }
};

// チャート用のカラーパレット
const chartColors = [
  '#FF6B6B', // 赤系
  '#FFEEAD', // 黄系
  '#4ECDC4', // ターコイズ
  '#9B89B3', // 紫系
  '#E9B872', // オレンジ系
  '#45B7D1', // 青系
  '#D4A5A5', // ピンク系
  '#96CEB4', // 緑系
  '#84B1ED', // 水色系
  '#B3E5BE'  // 薄緑系
];

// チャート初期化機能
function initializeCharts(chartData) {
  // ユーザータイプ分布の円グラフ
  const userTypeCtx = document.getElementById('userTypeChart')?.getContext('2d');
  if (userTypeCtx) {
    const userTypes = {
      '新規': chartData.user_metrics.user_types.new_user,
      'リピート': chartData.user_metrics.user_types.repeat_user
    };
    const total = Object.values(userTypes).reduce((sum, value) => sum + value, 0);
    
    new Chart(userTypeCtx, {
      type: 'pie',
      data: {
        labels: Object.keys(userTypes),
        datasets: [{
          data: Object.values(userTypes),
          backgroundColor: chartColors.slice(0, 2)
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'ユーザータイプ分布',
            color: '#fff',
            font: {
              size: 16,
              weight: 'bold'
            },
            padding: {
              bottom: 20
            }
          },
          legend: {
            position: 'right',
            labels: {
              color: '#fff',
              generateLabels: (chart) => {
                const data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map((label, i) => {
                    const value = data.datasets[0].data[i];
                    const percentage = ((value / total) * 100).toFixed(1);
                    return {
                      text: `${label}: ${value}人 (${percentage}%)`,
                      fillStyle: chartColors[i],
                      strokeStyle: chartColors[i],
                      lineWidth: 1,
                      hidden: false,
                      index: i,
                      fontColor: '#fff'
                    };
                  });
                }
                return [];
              }
            }
          }
        }
      }
    });
  }

  // 言語分布の円グラフ
  const languageCtx = document.getElementById('languageChart')?.getContext('2d');
  if (languageCtx) {
    // 固定の言語順序と色の定義
    const fixedLanguages = {
      '日本語': '#FF6B6B',  // 赤系
      '英語': '#4ECDC4',    // ターコイズ
      '中国語': '#FFEEAD',  // 黄系
      '韓国語': '#9B89B3'   // 紫系
    };

    // その他の言語用のカラーパレット（固定言語の色は除外）
    const otherColors = [
      '#E9B872', // オレンジ系
      '#45B7D1', // 青系
      '#D4A5A5', // ピンク系
      '#96CEB4', // 緑系
      '#84B1ED', // 水色系
      '#B3E5BE'  // 薄緑系
    ];

    // 言語データを整理
    let languages = Object.entries(chartData.user_metrics.languages.languages);
    const total = languages.reduce((sum, [, value]) => sum + value, 0);
    
    // 固定言語を優先的に並び替え
    languages = languages.sort((a, b) => {
      const aIndex = Object.keys(fixedLanguages).indexOf(a[0]);
      const bIndex = Object.keys(fixedLanguages).indexOf(b[0]);
      
      if (aIndex === -1 && bIndex === -1) return 0;
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });

    // 色の割り当て
    let otherColorIndex = 0;
    const colors = languages.map(([name]) => {
      if (name in fixedLanguages) {
        return fixedLanguages[name];
      }
      const color = otherColors[otherColorIndex % otherColors.length];
      otherColorIndex++;
      return color;
    });

    new Chart(languageCtx, {
      type: 'pie',
      data: {
        labels: languages.map(([name]) => name),
        datasets: [{
          data: languages.map(([, value]) => value),
          backgroundColor: colors
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: '使用言語分布',
            color: '#fff',
            font: {
              size: 16,
              weight: 'bold'
            },
            padding: {
              bottom: 20
            }
          },
          legend: {
            position: 'right',
            labels: {
              color: '#fff',
              generateLabels: (chart) => {
                const data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map((label, i) => {
                    const value = data.datasets[0].data[i];
                    const percentage = ((value / total) * 100).toFixed(1);
                    return {
                      text: `${label}: ${value}件 (${percentage}%)`,
                      fillStyle: colors[i],
                      strokeStyle: colors[i],
                      lineWidth: 1,
                      hidden: false,
                      index: i,
                      fontColor: '#fff'
                    };
                  });
                }
                return [];
              }
            }
          }
        }
      }
    });
  }

  // 会話ターン数分布の棒グラフ
  const turnDistributionCtx = document.getElementById('turnDistributionChart')?.getContext('2d');
  if (turnDistributionCtx) {
    const turnLabels = {
      '1-3_turns': '1-3回',
      '4-7_turns': '4-7回',
      '8-10_turns': '8-10回',
      '11-15_turns': '11-15回',
      'over_15_turns': '15回以上'
    };
    const turns = Object.entries(chartData.conversation_metrics.turn_distribution);
    
    new Chart(turnDistributionCtx, {
      type: 'bar',
      data: {
        labels: turns.map(([key]) => turnLabels[key]),
        datasets: [{
          label: 'セッション数',
          data: turns.map(([, value]) => value),
          backgroundColor: '#8884d8'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }

  // 時間帯別会話傾向の複合グラフ
  const timeDistributionSessionCtx = document.getElementById('timeDistributionSessionChart')?.getContext('2d');
  const timeDistributionTurnCtx = document.getElementById('timeDistributionTurnChart')?.getContext('2d');
  
  if (timeDistributionSessionCtx && timeDistributionTurnCtx) {
    const timeLabels = {
      'morning': '0-3時',
      'afternoon': '4-7時',
      'evening': '8-11時',
      'night': '12-15時',
      'late_night': '16-19時',
      'midnight': '20-23時'
    };
    
    // 時間帯の順序を固定
    const timeOrder = ['morning', 'afternoon', 'evening', 'night', 'late_night', 'midnight'];
    const sortedTimes = timeOrder.map(key => [
      key,
      chartData.conversation_metrics.time_distribution[key]
    ]);
    
    // セッション数のグラフ
    new Chart(timeDistributionSessionCtx, {
      type: 'bar',
      data: {
        labels: sortedTimes.map(([key]) => timeLabels[key]),
        datasets: [{
          label: 'セッション数',
          data: sortedTimes.map(([, data]) => data.count),
          backgroundColor: '#8884d8'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });

    // 平均ターン数のグラフ
    new Chart(timeDistributionTurnCtx, {
      type: 'bar',
      data: {
        labels: sortedTimes.map(([key]) => timeLabels[key]),
        datasets: [{
          label: '平均ターン数',
          data: sortedTimes.map(([, data]) => data.avg_turns),
          backgroundColor: '#82ca9d'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }

  // トピック別セッション数の棒グラフ
  const topicCtx = document.getElementById('topicChart')?.getContext('2d');
  if (topicCtx) {
    const topicCategories = {
      'technical': '技術・開発',
      'education': '教育・学習',
      'hobby': '趣味・エンターテイメント',
      'business': '仕事・ビジネス',
      'lifestyle': '生活・健康',
      'system': 'システム関連',
      'other': 'その他'
    };
    
    const topicSummary = Object.entries(chartData.topic_metrics).map(([category, items]) => ({
      name: topicCategories[category],
      value: items.reduce((sum, item) => sum + item.count, 0)
    }));

    new Chart(topicCtx, {
      type: 'bar',
      data: {
        labels: topicSummary.map(item => item.name),
        datasets: [{
          label: 'トピック数',
          data: topicSummary.map(item => item.value),
          backgroundColor: '#82ca9d'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

// アナリティクスダッシュボード機能とギャラリー機能
document.addEventListener('DOMContentLoaded', () => {
  // 月別タブ切り替え機能
  const monthTabs = document.querySelectorAll('.month-tab');
  const monthContents = document.querySelectorAll('.month-content');

  // 初期表示時に最初のタブをアクティブにする
  if (monthTabs.length > 0) {
    const firstTab = monthTabs[0];
    firstTab.classList.remove('bg-gray-700');
    firstTab.classList.add('bg-gray-600', 'ring-2', 'ring-white', 'font-bold');
  }

  monthTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetMonth = tab.getAttribute('data-tab');
      
      // タブのアクティブ状態を切り替え
      monthTabs.forEach(t => {
        t.classList.remove('bg-gray-600', 'ring-2', 'ring-white', 'font-bold');
        t.classList.add('bg-gray-700');
      });
      tab.classList.remove('bg-gray-700');
      tab.classList.add('bg-gray-600', 'ring-2', 'ring-white', 'font-bold');
      
      // コンテンツの表示/非表示を切り替え
      monthContents.forEach(content => {
        if (content.getAttribute('data-content') === targetMonth) {
          content.classList.remove('hidden');
          content.classList.add('block');
        } else {
          content.classList.remove('block');
          content.classList.add('hidden');
        }
      });
    });
  });

  // タブ切り替え機能
  const tabTriggers = document.querySelectorAll('.tab-trigger');
  const tabContents = document.querySelectorAll('.tab-content');

  tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const targetTab = trigger.getAttribute('data-tab');
      
      // タブトリガーのアクティブ状態を切り替え
      tabTriggers.forEach(t => t.classList.remove('active'));
      trigger.classList.add('active');
      
      // タブコンテンツの表示/非表示を切り替え
      tabContents.forEach(content => {
        if (content.id === `${targetTab}-tab`) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // ギャラリー機能
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalCaptionText = document.getElementById('modalCaptionText');
  const modalCaptionLink = document.getElementById('modalCaptionLink');
  const modalCaptionText2 = document.getElementById('modalCaptionText2');
  const modalCaptionLink2 = document.getElementById('modalCaptionLink2');
  const modalCaption2area = document.getElementById('modalCaption2');
  let currentImageIndex = 0;
  let galleryItemsArray = [];

  // ギャラリーアイテムの配列を更新する関数
  function updateGalleryItems() {
    galleryItemsArray = Array.from(document.querySelectorAll('.gallery-item'));
  }

  // 画像を表示する関数
  function showImage(index) {
    const item = galleryItemsArray[index];
    if (!item) return;

    const src = item.getAttribute('data-src');
    const caption = item.getAttribute('data-caption');
    const url = item.getAttribute('data-url');
    const caption2 = item.getAttribute('data-caption2');
    const url2 = item.getAttribute('data-url2');

    modalImage.setAttribute('src', src);
    modalCaptionText.textContent = caption;

    if (url) {
      modalCaptionLink.setAttribute('href', url);
      modalCaptionLink.classList.remove('hidden');
    } else {
      modalCaptionLink.classList.add('hidden');
    }

    if (caption2) {
      modalCaptionText2.textContent = caption2;
      if (url2) {
        modalCaptionLink2.setAttribute('href', url2);
        modalCaptionLink2.classList.remove('hidden');
        modalCaption2area.classList.remove('hidden');
      } else {
        modalCaption2area.classList.add('hidden');
      }
    } else {
      modalCaption2area.classList.add('hidden');
    }
  }

  // 次の画像を表示
  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryItemsArray.length;
    showImage(currentImageIndex);
  }

  // 前の画像を表示
  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryItemsArray.length) % galleryItemsArray.length;
    showImage(currentImageIndex);
  }

  // クリックイベントの更新
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      updateGalleryItems();
      currentImageIndex = galleryItemsArray.indexOf(item);
      showImage(currentImageIndex);
      modal.classList.remove('hidden');
    });
  });

  // ナビゲーションボタンのイベントリスナー
  const prevButton = modal?.querySelector('[data-action="prev-image"]');
  const nextButton = modal?.querySelector('[data-action="next-image"]');

  prevButton?.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrevImage();
  });

  nextButton?.addEventListener('click', (e) => {
    e.stopPropagation();
    showNextImage();
  });

  // キーボードイベント
  document.addEventListener('keydown', (e) => {
    if (modal?.classList.contains('hidden')) return;

    if (e.key === 'ArrowLeft') {
      showPrevImage();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    } else if (e.key === 'Escape') {
      modal.classList.add('hidden');
    }
  });

  // タッチスワイプ対応
  let touchStartX = 0;
  let touchEndX = 0;

  modal?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  modal?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);

  function handleSwipe() {
    const swipeThreshold = 50;
    const swipeLength = touchEndX - touchStartX;

    if (Math.abs(swipeLength) > swipeThreshold) {
      if (swipeLength > 0) {
        showPrevImage();
      } else {
        showNextImage();
      }
    }
  }

  // モーダル閉じる操作
  modal?.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest('[data-action="close-modal"]')) {
      modal.classList.add('hidden');
    }
  });

  // プロフィール切り替え機能
  const profileButtons = document.querySelectorAll('[data-profile]');
  const profiles = {
    nike: document.getElementById('nike-profile'),
    ai_nike: document.getElementById('ai_nike-profile')
  };

  profileButtons.forEach(button => {
    button.addEventListener('click', () => {
      const profileType = button.getAttribute('data-profile');
      
      // プロフィールの表示/非表示を切り替え
      Object.entries(profiles).forEach(([type, element]) => {
        if (type === profileType) {
          element?.classList.remove('hidden');
        } else {
          element?.classList.add('hidden');
        }
      });

      // ボタンのアクティブ状態を切り替え
      profileButtons.forEach(btn => {
        if (btn === button) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    });
  });

  // データが利用可能になったらチャートを初期化
  window.initializeAnalyticsDashboard = function(data) {
    if (data) {
      initializeCharts(data);
    }
  };
});
