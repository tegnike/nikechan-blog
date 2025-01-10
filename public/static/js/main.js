document.addEventListener('DOMContentLoaded', () => {
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
  const prevButton = modal.querySelector('[data-action="prev-image"]');
  const nextButton = modal.querySelector('[data-action="next-image"]');

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
    if (modal.classList.contains('hidden')) return;

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

  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  modal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);

  function handleSwipe() {
    const swipeThreshold = 50; // スワイプを検知する閾値
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
  if (modal) {
    modal.addEventListener('click', (event) => {
      const target = event.target;
      // data-action="close-modal"が付いている要素をクリックしたらモーダル閉鎖
      if (target instanceof Element && target.closest('[data-action="close-modal"]')) {
        modal.classList.add('hidden');
      }
      // modal-content部分はstopPropagationで対応するか、 
      // または上のclosest条件で背景クリック時のみ反応するように設計します。
    });
  }

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
          element.classList.remove('hidden');
        } else {
          element.classList.add('hidden');
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
});
