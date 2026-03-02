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
    top: 'top-full left-1/2 -translate-x-1/2 border-t-[#414344] border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[#414344] border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-[#414344] border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-[#414344] border-y-transparent border-l-transparent',
  }

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
            <div className="absolute inset-0 rounded-[4px] border border-[#1d262d]" />
            {/* BG — raised surface */}
            <div
              className={[
                'absolute inset-0 rounded-[4px]',
                'bg-gradient-to-b from-[#414344] to-[#2b2d2e]',
                'shadow-[0_3px_5px_rgba(0,0,0,0.4)]',
              ].join(' ')}
            >
              <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]" />
            </div>
            <div className="relative px-[12px] py-[7px]">
              <span className="font-normal text-[16px] text-[#f4f4f4] [text-shadow:0_-1px_0_rgba(0,0,0,0.7)] whitespace-nowrap">
                {content}
              </span>
            </div>
            {/* Arrow */}
            <div className={`absolute w-0 h-0 border-[6px] ${arrowPositionStyles[position]}`} />
          </div>
        </div>
      )}
    </div>
  )
}
