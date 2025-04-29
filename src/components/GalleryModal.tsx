import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useGalleryModalContext } from '../context/GalleryModalContext'

export function GalleryModal() {
  const { isOpen, items, currentIndex, prev, next, closeModal } = useGalleryModalContext()
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  useEffect(() => {
    if (!isOpen) return

    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Escape') closeModal()
    }

    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('keydown', keyHandler)
    }
  }, [isOpen, prev, next, closeModal])

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.changedTouches[0].screenX
  }

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.changedTouches[0].screenX
    const diff = touchEndX.current - touchStartX.current
    const threshold = 50
    if (Math.abs(diff) > threshold) {
      if (diff > 0) prev()
      else next()
    }
  }

  if (!isOpen || typeof document === 'undefined') return null

  const item = items[currentIndex]
  if (!item) return null

  const content = (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={closeModal}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Prev Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          prev()
        }}
        className="fixed left-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 z-[60]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          next()
        }}
        className="fixed right-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 z-[60]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="max-w-[95vw] h-[95vh] p-2 flex items-center justify-center relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <img src={item.src} alt={item.caption} className="max-w-full max-h-full object-contain rounded-lg" />

        {/* Caption1 */}
        {(item.caption || item.url) && (
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md flex items-center gap-2">
            {item.caption && <span>{item.caption}</span>}
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        )}

        {/* Caption2 */}
        {item.caption2 && (
          <div className="absolute bottom-16 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md flex items-center gap-2">
            <span>{item.caption2}</span>
            {item.url2 && (
              <a
                href={item.url2}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )

  return createPortal(content, document.body)
} 