/** Shared gradient stroke style — used by raised surface components for the outer border effect */
export const gradientStroke = {
  background: 'linear-gradient(to bottom, var(--gradient-stroke-from), var(--gradient-stroke-to))',
  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  maskComposite: 'exclude',
  WebkitMaskComposite: 'xor',
} as const
