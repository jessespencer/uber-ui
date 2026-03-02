import { useState, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { iconState } from './icons'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'normal' | 'hover' | 'focus' | 'active'
  size?: 'default' | 'small'
  children: ReactNode
}

const gradientStroke = {
  background: 'linear-gradient(to bottom, #253039, #151B21)',
  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  maskComposite: 'exclude',
  WebkitMaskComposite: 'xor',
} as const

export function Button({
  variant = 'normal',
  size = 'default',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [focused, setFocused] = useState(false)

  const w = size === 'small' ? 'w-[40px]' : 'w-[96px]'

  const isPressed = !disabled && (pressed || variant === 'active')
  const isHovered = !disabled && (hovered || variant === 'hover') && !isPressed
  const isFocus = !disabled && (variant === 'focus' || focused)

  // Surface: gradient + outer shadow (no border — stroke is a separate div)
  // Focus glow can combine with pressed
  const focusGlow = isFocus
    ? 'overflow-clip shadow-[0_0_4px_4px_rgba(146,211,0,0.25),0_0_0_2px_#e0f97d,0_3px_5px_rgba(0,0,0,0.4)]'
    : ''

  const surface = isPressed
    ? `from-surface-pressed-from to-surface-pressed-to ${isFocus ? focusGlow : 'shadow-[0_1px_0_rgba(255,255,255,0.3)]'}`
    : isFocus
      ? `from-surface-raised-from to-surface-raised-to ${focusGlow}`
      : isHovered
        ? 'from-surface-hover-from to-surface-hover-to shadow-[0_3px_5px_rgba(0,0,0,0.4)]'
        : disabled
          ? 'from-[rgba(65,67,68,0.5)] to-[rgba(43,45,46,0.5)] shadow-[0_3px_5px_rgba(0,0,0,0.4)]'
          : 'from-surface-raised-from to-surface-raised-to shadow-[0_3px_5px_rgba(0,0,0,0.4)]'

  // Inner highlight
  const innerShadow = isPressed
    ? 'shadow-[inset_0_2px_3px_rgba(0,0,0,0.5)]'
    : 'shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]'

  // Content color — icons (small) vs text labels
  const isIcon = size === 'small'
  const contentCls = isIcon
    ? isPressed
      ? iconState.pressed
      : disabled
        ? iconState.disabled
        : isHovered
          ? iconState.hover
          : iconState.default
    : isPressed
      ? 'text-accent-active [filter:drop-shadow(0_0_8px_var(--color-accent-glow))]'
      : disabled
        ? 'text-[rgba(244,244,244,0.3)] [text-shadow:0_-1px_0_rgba(0,0,0,0.7)]'
        : 'text-text-primary [text-shadow:0_-1px_0_rgba(0,0,0,0.7)]'

  // Gradient stroke: visible on normal, hover, pressed, disabled — hidden on focus
  const showStroke = !isFocus

  return (
    <button
      className={`relative ${w} h-[40px] ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} outline-none ${className}`}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false) }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setPressed(true) }}
      onKeyUp={(e) => { if (e.key === 'Enter' || e.key === ' ') setPressed(false) }}
      onFocus={(e) => { if (e.target.matches(':focus-visible')) setFocused(true) }}
      onBlur={() => setFocused(false)}
      {...props}
    >
      {/* Gradient stroke — #1D262D top → #12161A bottom */}
      {showStroke && (
        <div
          className="absolute -inset-px rounded-[5px] p-px pointer-events-none"
          style={gradientStroke}
        />
      )}
      {/* Surface */}
      <div className={`absolute inset-0 rounded-[4px] bg-gradient-to-b transition-all duration-100 ${surface}`}>
        <div className={`absolute inset-0 rounded-[inherit] pointer-events-none transition-shadow duration-100 ${innerShadow}`} />
      </div>
      {/* Content */}
      <div className={`relative flex items-center justify-center h-full px-[16px] font-normal text-[16px] transition-all duration-100 ${contentCls} ${isIcon ? '[&>svg]:w-[24px] [&>svg]:h-[24px] [&>svg]:shrink-0' : ''}`}>
        {children}
      </div>
    </button>
  )
}
