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
});
