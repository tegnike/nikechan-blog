import { FC } from 'react'

interface PageHeaderProps {
  title: string
}

export const PageHeader: FC<PageHeaderProps> = ({ title }) => {
  return (
    <div className="character-header relative overflow-hidden">
      <div className="character-header-bg absolute inset-0" />
      <div className="character-header-pattern absolute inset-0" />
      <div className="relative z-10 py-8 text-center">
        <h1 className="character-title text-6xl md:text-8xl font-black tracking-wider text-white drop-shadow-lg">
          {title}
        </h1>
      </div>
    </div>
  )
}
