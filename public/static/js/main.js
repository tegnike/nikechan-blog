document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalCaptionText = document.getElementById('modalCaptionText');
  const modalCaptionLink = document.getElementById('modalCaptionLink');
  const modalCaptionText2 = document.getElementById('modalCaptionText2');
  const modalCaptionLink2 = document.getElementById('modalCaptionLink2');
  const modalCaption2area = document.getElementById('modalCaption2');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src');
      const caption = item.getAttribute('data-caption');
      const url = item.getAttribute('data-url');
      const caption2 = item.getAttribute('data-caption2');
      const url2 = item.getAttribute('data-url2');

      if (modal && modalImage && modalCaptionText && modalCaptionLink) {
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

        modal.classList.remove('hidden');
      }
    });
  });

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

  // 初期状態のアクティブボタンのスタイルを設定
  profileButtons.forEach(button => {
    if (button.classList.contains('active')) {
      button.classList.add('bg-white/20');
      button.classList.remove('bg-white/10');
    }
  });

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
          btn.classList.add('bg-white/20');
          btn.classList.remove('bg-white/10');
        } else {
          btn.classList.remove('active');
          btn.classList.remove('bg-white/20');
          btn.classList.add('bg-white/10');
        }
      });
    });
  });
});
