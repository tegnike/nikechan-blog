import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react'

export type GalleryModalItem = {
  src: string
  caption: string
  url?: string
  caption2?: string
  url2?: string
}

interface GalleryModalContextValue {
  isOpen: boolean
  items: GalleryModalItem[]
  currentIndex: number
  openModal: (item: GalleryModalItem) => void
  closeModal: () => void
  prev: () => void
  next: () => void
}

const GalleryModalContext = createContext<GalleryModalContextValue | undefined>(undefined)

export function GalleryModalProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<GalleryModalItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const isOpen = items.length > 0

  const buildItemsFromDom = () => {
    const elements = Array.from(document.querySelectorAll('.gallery-item')) as HTMLElement[]
    return elements.map(el => ({
      src: el.getAttribute('data-src') || '',
      caption: el.getAttribute('data-caption') || '',
      url: el.getAttribute('data-url') || undefined,
      caption2: el.getAttribute('data-caption2') || undefined,
      url2: el.getAttribute('data-url2') || undefined,
    }))
  }

  const openModal = useCallback((clickedItem: GalleryModalItem) => {
    const allItems = buildItemsFromDom()
    const index = allItems.findIndex(i => i.src === clickedItem.src)
    setItems(allItems)
    setCurrentIndex(index >= 0 ? index : 0)
  }, [])

  // expose to global for vanilla trigger
  useEffect(() => {
    ;(window as any).openGalleryModal = (item: GalleryModalItem) => openModal(item)
    return () => {
      delete (window as any).openGalleryModal
    }
  }, [])

  const closeModal = () => {
    setItems([])
  }

  const prev = () => {
    setCurrentIndex(i => (i - 1 + items.length) % items.length)
  }

  const next = () => {
    setCurrentIndex(i => (i + 1) % items.length)
  }

  return (
    <GalleryModalContext.Provider value={{ isOpen, items, currentIndex, openModal, closeModal, prev, next }}>
      {children}
    </GalleryModalContext.Provider>
  )
}

export function useGalleryModalContext() {
  const context = useContext(GalleryModalContext)
  if (!context) {
    throw new Error('useGalleryModalContext must be used within a GalleryModalProvider')
  }
  return context
} 