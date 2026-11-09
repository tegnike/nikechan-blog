type Props = {
  className: string;
  shape?: 1 | 2;
}

/** ジャケットの水玉模様をもとにした不定形の図形。形の定義は BlobDefs に置く */
export function Blob({ className, shape = 1 }: Props) {
  return (
    <svg className={className} viewBox={shape === 1 ? '0 0 540 480' : '0 0 540 540'} aria-hidden="true">
      <use href={`#nk-blob${shape}`} />
    </svg>
  );
}

export function BlobDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <path id="nk-blob1" d="M421 68c62 38 97 112 92 186-5 78-52 152-124 187-76 37-172 34-243-12C77 384 34 303 40 222c5-75 53-146 122-178 82-38 186-21 259 24z" />
        <path id="nk-blob2" d="M388 52c71 30 118 104 112 181-4 60-45 106-66 160-22 58-74 103-138 104-71 2-140-37-180-95-41-60-55-142-26-209 26-60 86-96 144-123 49-23 104-39 154-18z" />
      </defs>
    </svg>
  );
}
