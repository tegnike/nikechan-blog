import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface GalleryItem {
  src: string;
  caption: string;
  url?: string;
  caption2?: string;
  url2?: string;
}

export const GalleryViewer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState<GalleryItem[]>([]);

  // ギャラリーアイテムの更新
  const updateGalleryItems = useCallback(() => {
    const galleryElements = document.querySelectorAll('.gallery-item');
    const newItems: GalleryItem[] = [];

    galleryElements.forEach((item) => {
      if (item instanceof HTMLElement) {
        newItems.push({
          src: item.getAttribute('data-src') || '',
          caption: item.getAttribute('data-caption') || '',
          url: item.getAttribute('data-url') || undefined,
          caption2: item.getAttribute('data-caption2') || undefined,
          url2: item.getAttribute('data-url2') || undefined,
        });
      }
    });

    setItems(newItems);
  }, []);

  // 画像を表示
  const showImage = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  // 次の画像を表示
  const showNextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  // 前の画像を表示
  const showPrevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // モーダルを閉じる
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // キーボードイベントのハンドラー
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowLeft') {
        showPrevImage();
      } else if (e.key === 'ArrowRight') {
        showNextImage();
      } else if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, showNextImage, showPrevImage, closeModal]);

  // タッチスワイプのハンドラー
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const swipeLength = touchEndX - touchStartX;

      if (Math.abs(swipeLength) > swipeThreshold) {
        if (swipeLength > 0) {
          showPrevImage();
        } else {
          showNextImage();
        }
      }
    };

    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      modalElement.addEventListener('touchstart', handleTouchStart);
      modalElement.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener('touchstart', handleTouchStart);
        modalElement.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [showNextImage, showPrevImage]);

  // ギャラリーアイテムのクリックイベントを設定
  useEffect(() => {
    const galleryElements = document.querySelectorAll('.gallery-item');
    
    const handleClick = (index: number) => {
      updateGalleryItems();
      showImage(index);
    };

    galleryElements.forEach((item, index) => {
      item.addEventListener('click', () => handleClick(index));
    });

    return () => {
      galleryElements.forEach((item, index) => {
        item.removeEventListener('click', () => handleClick(index));
      });
    };
  }, [updateGalleryItems, showImage]);

  // DOMContentLoadedと同等の処理
  useEffect(() => {
    updateGalleryItems();
  }, [updateGalleryItems]);

  // 現在の画像アイテム
  const currentItem = items[currentIndex] || {
    src: '',
    caption: '',
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      id="imageModal" 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      onClick={closeModal}
    >
      <div className="relative w-full h-full flex flex-col justify-center items-center p-4">
        {/* 閉じるボタン */}
        <button 
          data-action="close-modal"
          className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
          onClick={closeModal}
        >
          <i className="fas fa-times"></i>
        </button>

        {/* 前へボタン */}
        <button 
          data-action="prev-image"
          className="absolute left-4 text-white text-4xl hover:text-gray-300 z-10"
          onClick={(e) => {
            e.stopPropagation();
            showPrevImage();
          }}
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        {/* 画像 */}
        <img 
          id="modalImage"
          src={currentItem.src}
          alt={currentItem.caption}
          className="max-h-[80vh] max-w-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />

        {/* 次へボタン */}
        <button 
          data-action="next-image"
          className="absolute right-4 text-white text-4xl hover:text-gray-300 z-10"
          onClick={(e) => {
            e.stopPropagation();
            showNextImage();
          }}
        >
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* キャプション */}
        <div className="absolute bottom-8 left-0 right-0 text-center text-white bg-black bg-opacity-50 p-4">
          <p id="modalCaptionText" className="text-lg font-semibold mb-2">
            {currentItem.caption}
          </p>
          {currentItem.url && (
            <a 
              id="modalCaptionLink"
              href={currentItem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
              onClick={(e) => e.stopPropagation()}
            >
              詳細を見る
            </a>
          )}

          {/* 2つ目のキャプションエリア */}
          {currentItem.caption2 && (
            <div id="modalCaption2" className="mt-4">
              <p id="modalCaptionText2" className="text-lg font-semibold mb-2">
                {currentItem.caption2}
              </p>
              {currentItem.url2 && (
                <a 
                  id="modalCaptionLink2"
                  href={currentItem.url2}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  詳細を見る
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
