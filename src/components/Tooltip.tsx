import { useState, type ReactNode } from 'react'

interface TooltipProps {
  content: string
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export function Tooltip({
  content,
  children,
  position = 'top',
}: TooltipProps) {
  const [visible, setVisible] = useState(false)

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  const arrowPositionStyles = {
    top: 'top-full left-1/2 -translate-x-1/2 border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-y-transparent border-l-transparent',
  }

  // Arrow border direction that needs the surface color
  const arrowColorProp = {
    top: 'borderTopColor',
    bottom: 'borderBottomColor',
    left: 'borderLeftColor',
    right: 'borderRightColor',
  } as const

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={`absolute z-50 ${positionStyles[position]} pointer-events-none`}
        >
          <div className="relative">
            {/* Outline */}
            <div className="absolute inset-0 rounded-[4px] border border-border-dark-alt" />
            {/* BG — raised surface */}
            <div
              className="absolute inset-0 rounded-[4px] bg-gradient-to-b from-surface-raised-from to-surface-raised-to shadow-[var(--shadow-raised)]"
            >
              <div className="absolute inset-0 rounded-[inherit] shadow-[var(--shadow-inner-highlight)]" />
            </div>
            <div className="relative px-[12px] py-[7px]">
              <span className="font-normal text-[16px] text-text-primary [text-shadow:var(--text-shadow-primary)] whitespace-nowrap">
                {content}
              </span>
            </div>
            {/* Arrow */}
            <div
              className={`absolute w-0 h-0 border-[6px] ${arrowPositionStyles[position]}`}
              style={{ [arrowColorProp[position]]: 'var(--color-surface-raised-from)' }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
