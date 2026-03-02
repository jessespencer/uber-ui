import { type ReactNode } from 'react'

interface ToastProps {
  children: ReactNode
  className?: string
}

const gradientStroke = {
  background: 'linear-gradient(to bottom, #253039, #151B21)',
  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  maskComposite: 'exclude',
  WebkitMaskComposite: 'xor',
} as const

export function Toast({ children, className }: ToastProps) {
  return (
    <div className={`relative h-[40px] ${className ?? ''}`}>
      {/* Gradient stroke */}
      <div
        className="absolute -inset-px rounded-[5px] p-px pointer-events-none"
        style={gradientStroke}
      />
      {/* Surface */}
      <div className="absolute inset-0 rounded-[4px] bg-gradient-to-b from-surface-raised-from to-surface-raised-to shadow-[0_3px_5px_rgba(0,0,0,0.4)]">
        <div className="absolute inset-0 rounded-[inherit] pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]" />
      </div>
      {/* Content */}
      <div className="relative flex items-center h-full px-[16px] gap-[10px]">
        {/* Accent indicator dot */}
        <div className="w-[8px] h-[8px] rounded-full bg-accent shadow-[0_0_8px_var(--color-accent-glow)]" />
        <span className="font-normal text-[14px] text-text-primary [text-shadow:0_-1px_0_rgba(0,0,0,0.7)] whitespace-nowrap">
          {children}
        </span>
      </div>
    </div>
  )
}
