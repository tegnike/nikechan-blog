type Props = {
  active: 'fan' | 'commissioned'
}

export function GalleryToggle({ active }: Props) {
  const base = 'px-4 py-2 rounded-lg text-sm font-medium transition-colors';
  const activeClass = 'bg-purple-600 text-white';
  const inactiveClass = 'bg-white/50 border border-purple-200 text-gray-800 hover:bg-purple-50';

  return (
    <div className="w-full flex items-center justify-center gap-3 mt-2">
      <a
        href="/gallery"
        className={`${base} ${active === 'fan' ? activeClass : inactiveClass}`}
      >
        生成AIファンアート
      </a>
      <a
        href="/gallery/commissioned"
        className={`${base} ${active === 'commissioned' ? activeClass : inactiveClass}`}
      >
        コミッション作品
      </a>
    </div>
  )
}

