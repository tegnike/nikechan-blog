import { NikeProfile } from './NikeProfile'

export function Developer() {
  // Developer ページはニケのプロフィールのみを表示
  return (
    <div className="min-h-screen">
      <div className="pt-12 pb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground">DEVELOPER</h1>
      </div>
      <div className="max-w-4xl mx-auto">
        <NikeProfile />
      </div>
    </div>
  )
}
