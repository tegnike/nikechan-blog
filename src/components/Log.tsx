import type { Summary } from '../lib/supabase'
import { NikeLog } from './NikeLog'

type Props = {
  summaries: Summary[]
}

export const Log = ({ summaries }: Props) => (
  <>
    <div className="pt-12 pb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-white">LOG</h1>
    </div>
    <NikeLog summaries={summaries} />
  </>
)
