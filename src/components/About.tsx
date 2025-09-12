import { FC } from 'react'
import { AINikeProfile } from './AINikeProfile'

export const About: FC = () => {
  return (
    <div className="min-h-screen px-4">
      {/* Heading (aligned with Gallery/License) */}
      <div className="pt-12 pb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground">ABOUT</h1>
      </div>
      <div className="max-w-4xl mx-auto">
        {/* AIニケちゃんのプロフィールのみを表示 */}
        <AINikeProfile />
      </div>
    </div>
  )
}
