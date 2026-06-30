import { CSSProperties } from 'react'
import { StampMeta } from '../../helpers/stamp'

interface StampFaceProps {
  meta: StampMeta
  visited: boolean
}

const ink = '#17150f'

const Mint = ({ meta }: { meta: StampMeta }) => (
  <div style={{ position: 'absolute', inset: 0, backgroundColor: '#e8e2d3', backgroundImage: 'repeating-linear-gradient(135deg,#d8d0bd 0 2px,#e8e2d3 2px 7px)', overflow: 'hidden' }}>
    <span style={{ position: 'absolute', left: 8, bottom: 8, fontFamily: 'monospace', fontSize: '0.6rem', color: '#8b8473', background: '#faf8f1', padding: '1px 4px' }}>{meta.tag}</span>
    <span style={{ position: 'absolute', right: 12, bottom: 7, fontSize: '2.6rem', fontWeight: 700, color: ink, opacity: 0.85, lineHeight: 1 }}>{meta.glyph}</span>
    <div style={{ position: 'absolute', top: 6, right: 6, width: 46, height: 46, border: `1.5px solid ${ink}`, borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-12deg)', opacity: 0.55, lineHeight: 1 }}>
      <span style={{ fontSize: '0.42rem', letterSpacing: '1px' }}>BR</span>
      <span style={{ fontSize: '0.4rem', letterSpacing: '0.5px', borderTop: `0.5px solid ${ink}`, borderBottom: `0.5px solid ${ink}`, padding: '1px 0', margin: '1px 0' }}>{meta.year}</span>
      <span style={{ fontSize: '0.36rem', letterSpacing: '0.5px' }}>MINT</span>
    </div>
  </div>
)

const Canceled = ({ meta }: { meta: StampMeta }) => {
  const k = meta.ink
  const g = meta.ground
  const center: CSSProperties = { position: 'absolute', left: 0, right: 0, textAlign: 'center' }

  return (
    <div style={{ position: 'absolute', inset: 0, background: g, overflow: 'hidden', opacity: 0.95 }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(135deg,${k}24 0 1.5px,transparent 1.5px 6px)` }} />
      <div style={{ position: 'absolute', inset: 7, border: `1.5px solid ${k}` }} />
      <span style={{ ...center, top: 12, fontSize: '0.5rem', letterSpacing: '3px', fontWeight: 700, color: k }}>BRASIL</span>
      <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.1rem', fontWeight: 700, color: k }}>{meta.glyph}</span>
      <span style={{ ...center, bottom: 13, fontSize: '0.46rem', letterSpacing: '2px', color: k, textTransform: 'uppercase' }}>{meta.name}</span>
      <span style={{ position: 'absolute', top: 10, right: 12, fontSize: '0.72rem', fontWeight: 700, color: k }}>{meta.denom}</span>
      <span style={{ position: 'absolute', bottom: 10, left: 12, fontSize: '0.7rem', fontWeight: 700, color: k }}>&rsquo;{meta.year}</span>
      <div style={{ position: 'absolute', top: 9, right: -4, width: 88, height: 44, transform: 'rotate(-15deg)', opacity: 0.5, mixBlendMode: 'multiply', background: `repeating-linear-gradient(0deg,${k} 0 2px,transparent 2px 7px)` }} />
      <div style={{ position: 'absolute', top: 5, right: 5, width: 52, height: 52, border: `2px solid ${k}`, borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-13deg)', opacity: 0.72, mixBlendMode: 'multiply', lineHeight: 1.05 }}>
        <span style={{ fontSize: '0.38rem', letterSpacing: '0.5px', color: k }}>CORREIOS</span>
        <span style={{ fontSize: '0.5rem', fontWeight: 700, color: k, borderTop: `1px solid ${k}`, borderBottom: `1px solid ${k}`, padding: '1px 3px', margin: '1px 0' }}>·BR·</span>
        <span style={{ fontSize: '0.38rem', color: k }}>20{meta.year}</span>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(125% 125% at 50% 38%,transparent 52%,${k}38 100%)`, mixBlendMode: 'multiply', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${k}14 0.5px,transparent 0.6px)`, backgroundSize: '3px 3px', mixBlendMode: 'multiply', opacity: 0.5, pointerEvents: 'none' }} />
    </div>
  )
}

export const StampFace = ({ meta, visited }: StampFaceProps) =>
  visited ? <Canceled meta={meta} /> : <Mint meta={meta} />
