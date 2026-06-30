import { theme } from '../../styles/theme'

interface SealProps {
  size?: number
  rotate?: number
}

const ink = theme.colors.dark

export const Seal = ({ size = 118, rotate = 0 }: SealProps) => (
  <svg
    viewBox="0 0 130 130"
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}
  >
    <defs>
      <path id="sealTop" d="M 17,65 A 48,48 0 0 1 113,65" fill="none" />
      <path id="sealBot" d="M 20,65 A 45,45 0 0 0 110,65" fill="none" />
    </defs>
    <circle cx="65" cy="65" r="60" fill="none" stroke={ink} strokeWidth="2.5" />
    <circle cx="65" cy="65" r="51" fill="none" stroke={ink} strokeWidth="1" />
    <text fontFamily="JetBrains Mono,monospace" fontSize="9.5" fontWeight="600" letterSpacing="3.2" fill={ink}>
      <textPath href="#sealTop" startOffset="50%" textAnchor="middle">PEDRO QUEIROZ</textPath>
    </text>
    <text fontFamily="JetBrains Mono,monospace" fontSize="9.5" fontWeight="600" letterSpacing="3.2" fill={ink}>
      <textPath href="#sealBot" startOffset="50%" textAnchor="middle">— BRAZIL —</textPath>
    </text>
    <text x="65" y="56" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="19" fontWeight="700" letterSpacing="1" fill={ink}>PEAM</text>
    <line x1="44" y1="69" x2="86" y2="69" stroke={ink} strokeWidth="1" />
    <text x="65" y="83" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="9" letterSpacing="3" fontWeight="600" fill={ink}>EST 2017</text>
    <text x="65" y="24" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="11" fill={ink}>&#9733;</text>
  </svg>
)
