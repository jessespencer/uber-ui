import { type ReactNode } from 'react'
import { gradientStroke } from './theme-utils'

interface ToastProps {
  children: ReactNode
  className?: string
}

export function Toast({ children, className }: ToastProps) {
  return (
    <div className={`relative h-[40px] ${className ?? ''}`}>
      {/* Gradient stroke */}
      <div
        className="absolute -inset-px rounded-[5px] p-px pointer-events-none"
        style={gradientStroke}
      />
      {/* Surface */}
      <div className="absolute inset-0 rounded-[4px] bg-gradient-to-b from-surface-raised-from to-surface-raised-to shadow-[var(--shadow-raised)]">
        <div className="absolute inset-0 rounded-[inherit] pointer-events-none shadow-[var(--shadow-inner-highlight)]" />
      </div>
      {/* Content */}
      <div className="relative flex items-center h-full px-[16px] gap-[10px]">
        {/* Accent indicator dot */}
        <div className="w-[8px] h-[8px] rounded-full bg-accent shadow-[0_0_8px_var(--color-accent-glow)]" />
        <span className="font-normal text-[14px] text-text-primary [text-shadow:var(--text-shadow-primary)] whitespace-nowrap">
          {children}
        </span>
      </div>
    </div>
  )
}
