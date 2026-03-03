import { useState, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { iconState } from './icons'
import { gradientStroke } from './theme-utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'normal' | 'hover' | 'focus' | 'active'
  size?: 'default' | 'small'
  children: ReactNode
}

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

  const focusGlow = isFocus
    ? 'overflow-clip shadow-[var(--shadow-focus)]'
    : ''

  const surface = isPressed
    ? `from-surface-pressed-from to-surface-pressed-to ${isFocus ? focusGlow : 'shadow-[var(--shadow-pressed-outer)]'}`
    : isFocus
      ? `from-surface-raised-from to-surface-raised-to ${focusGlow}`
      : isHovered
        ? 'from-surface-hover-from to-surface-hover-to shadow-[var(--shadow-raised)]'
        : disabled
          ? 'from-[var(--surface-disabled-from)] to-[var(--surface-disabled-to)] shadow-[var(--shadow-raised)]'
          : 'from-surface-raised-from to-surface-raised-to shadow-[var(--shadow-raised)]'

  const innerShadow = isPressed
    ? 'shadow-[var(--shadow-inner-pressed)]'
    : 'shadow-[var(--shadow-inner-highlight)]'

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
        ? 'text-text-primary/30 [text-shadow:var(--text-shadow-primary)]'
        : 'text-text-primary [text-shadow:var(--text-shadow-primary)]'

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
      {showStroke && (
        <div
          className="absolute -inset-px rounded-[5px] p-px pointer-events-none"
          style={gradientStroke}
        />
      )}
      <div className={`absolute inset-0 rounded-[4px] bg-gradient-to-b transition-all duration-100 ${surface}`}>
        <div className={`absolute inset-0 rounded-[inherit] pointer-events-none transition-shadow duration-100 ${innerShadow}`} />
      </div>
      <div className={`relative flex items-center justify-center h-full px-[16px] font-normal text-[16px] transition-all duration-100 ${contentCls} ${isIcon ? '[&>svg]:w-[24px] [&>svg]:h-[24px] [&>svg]:shrink-0' : ''}`}>
        {children}
      </div>
    </button>
  )
}
