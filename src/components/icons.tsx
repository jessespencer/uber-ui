import { useId, type SVGProps } from 'react'

type IconProps = Omit<SVGProps<SVGSVGElement>, 'path'>

// All icons are 24×24 filled shapes to match the Figma skeuomorphic style

/**
 * Tailwind class fragments for SkeuoIcon state styling.
 * Apply to the PARENT container of any SkeuoIcon to control its visual state.
 */
export const iconState = {
  default: '',
  hover: '[&_svg]:[filter:brightness(1.3)]',
  pressed: [
    '[&_.icon-fill]:[fill:var(--icon-pressed-color)]',
    '[&_.icon-stroke]:[display:none]',
    '[&_.icon-shape]:[fill:var(--icon-pressed-color)]',
    '[&_.icon-shape]:[stroke:none]',
    '[&_g]:[filter:var(--skeuo-pressed-filter)]',
  ].join(' '),
  disabled: '[&_svg]:opacity-30',
} as const

/** Shared wrapper for skeuomorphic icons (gradient fill, gradient stroke, drop shadow) */
type SkeuoIconProps = IconProps & { viewBox?: string } & (
  | { fillPath: string; strokePath: string; path?: never }
  | { path: string; fillPath?: never; strokePath?: never }
)

function SkeuoIcon({ fillPath, strokePath, path, viewBox = '0 0 24 24', ...props }: SkeuoIconProps) {
  const id = useId()
  const [vbX, vbY, vbW, vbH] = viewBox.split(' ').map(Number)
  const pad = 5
  const filterX = vbX - pad
  const filterY = vbY - pad
  const filterW = vbW + pad * 2
  const filterH = vbH + pad * 2 + 3
  const gradX = vbX + vbW / 2
  const gradY1 = vbY + vbH * 0.15
  const gradY2 = vbY + vbH * 0.85

  return (
    <svg
      width="24" height="24" viewBox={viewBox} fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg"
      style={{ '--skeuo-pressed-filter': `url(#${id}-fp)` } as React.CSSProperties}
      {...props}
    >
      <defs>
        {/* Default filter: metallic drop shadow */}
        <filter id={`${id}-f`} x={filterX} y={filterY} width={filterW} height={filterH} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="ha"/>
          <feOffset dy="3"/>
          <feGaussianBlur stdDeviation="2.5"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"/>
          <feBlend in2="bg" result="ds"/>
          <feBlend in="SourceGraphic" in2="ds"/>
        </filter>
        {/* Pressed filter: drop shadow + inner shadow */}
        <filter id={`${id}-fp`} x={filterX} y={filterY} width={filterW} height={filterH} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="sa"/>
          <feOffset in="sa" dy="2" result="dsOff"/>
          <feGaussianBlur in="dsOff" stdDeviation="1" result="dsBlur"/>
          <feColorMatrix in="dsBlur" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" result="ds"/>
          <feBlend in="SourceGraphic" in2="ds" result="withDrop"/>
          <feComponentTransfer in="SourceAlpha" result="invAlpha">
            <feFuncA type="table" tableValues="1 0"/>
          </feComponentTransfer>
          <feOffset in="invAlpha" dy="3" result="isOff"/>
          <feGaussianBlur in="isOff" stdDeviation="0.5" result="isBlur"/>
          <feComposite in="isBlur" in2="SourceAlpha" operator="in" result="isMask"/>
          <feFlood floodColor="white" floodOpacity="0.7" result="isColor"/>
          <feComposite in="isColor" in2="isMask" operator="in" result="innerShadow"/>
          <feBlend in="innerShadow" in2="withDrop"/>
        </filter>
        <linearGradient id={`${id}-gf`} x1={gradX} y1={gradY1} x2={gradX} y2={gradY2} gradientUnits="userSpaceOnUse">
          <stop style={{ stopColor: 'var(--icon-fill-from)' }}/>
          <stop offset="1" style={{ stopColor: 'var(--icon-fill-to)' }}/>
        </linearGradient>
        <linearGradient id={`${id}-gs`} x1={gradX} y1={gradY1} x2={gradX} y2={gradY2} gradientUnits="userSpaceOnUse">
          <stop style={{ stopColor: 'var(--icon-stroke-from)' }}/>
          <stop offset="1" style={{ stopColor: 'var(--icon-stroke-to)' }}/>
        </linearGradient>
      </defs>
      <g filter={`url(#${id}-f)`}>
        {path ? (
          <path
            className="icon-shape"
            d={path}
            fill={`url(#${id}-gf)`}
            stroke={`url(#${id}-gs)`}
            strokeWidth="1"
            paintOrder="stroke fill"
          />
        ) : (
          <>
            <path className="icon-fill" d={fillPath!} fill={`url(#${id}-gf)`}/>
            <path className="icon-stroke" d={strokePath!} stroke={`url(#${id}-gs)`} fill="none"/>
          </>
        )}
      </g>
    </svg>
  )
}

export function SearchIcon(props: IconProps) {
  return (
    <SkeuoIcon
      path="M17.2195 15.9139L19.8585 18.5529C20.0421 18.7365 20.0512 19.0251 19.8614 19.2148L19.2148 19.8614C19.0328 20.0434 18.7444 20.0499 18.5529 19.8585L15.914 17.2195C14.6634 18.1916 13.0919 18.7705 11.3853 18.7705C7.3065 18.7705 4 15.464 4 11.3853C4 7.3065 7.3065 4 11.3853 4C15.464 4 18.7705 7.3065 18.7705 11.3853C18.7705 13.0919 18.1916 14.6634 17.2195 15.9139V15.9139ZM11.3853 16.9242C14.4443 16.9242 16.9242 14.4443 16.9242 11.3853C16.9242 8.32619 14.4443 5.84632 11.3853 5.84632C8.32619 5.84632 5.84632 8.32619 5.84632 11.3853C5.84632 14.4443 8.32619 16.9242 11.3853 16.9242Z"
      {...props}
    />
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <SkeuoIcon
      fillPath="M15.6923 12L20 16.3077L16.3077 20L12 15.6923L7.69231 20L4 16.3077L8.30769 12L4 7.69231L7.69231 4L12 8.30769L16.3077 4L20 7.69231L15.6923 12Z"
      strokePath="M20.707 7.69238L16.3994 12L20.707 16.3076L16.3076 20.707L12 16.3994L7.69238 20.707L3.29297 16.3076L7.60059 12L3.29297 7.69238L7.69238 3.29297L12 7.60059L16.3076 3.29297L20.707 7.69238Z"
      {...props}
    />
  )
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <SkeuoIcon
      fillPath="M12.9677 12L18 7.27273L14.5161 4L6 12L14.5161 20L18 16.7273L12.9677 12Z"
      strokePath="M14.8584 3.63574L18.3428 6.9082L18.7305 7.27246L18.3428 7.63672L13.6982 12L18.3428 16.3633L18.7305 16.7275L18.3428 17.0918L14.8584 20.3643L14.5166 20.6855L14.1738 20.3643L5.65723 12.3643L5.26953 12L5.65723 11.6357L14.1738 3.63574L14.5166 3.31445L14.8584 3.63574Z"
      {...props}
    />
  )
}

export function PlusIcon(props: IconProps) {
  return (
    <SkeuoIcon
      fillPath="M14.4 9.6H20V14.4H14.4V20H9.6V14.4H4V9.6H9.6V4H14.4V9.6Z"
      strokePath="M14.9004 3.5V9.09961H20.5V14.9004H14.9004V20.5H9.09961V14.9004H3.5V9.09961H9.09961V3.5H14.9004Z"
      {...props}
    />
  )
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <SkeuoIcon
      fillPath="M12 11.6129L7.27273 7L4 10.1935L12 18L20 10.1935L16.7273 7L12 11.6129Z"
      strokePath="M3.65039 9.83594L6.92383 6.64258L7.27246 6.30176L7.62207 6.64258L12 10.9141L16.3779 6.64258L16.7275 6.30176L17.0762 6.64258L20.3496 9.83594L20.7158 10.1934L20.3496 10.5518L12.3496 18.3574L12 18.6982L11.6504 18.3574L3.65039 10.5518L3.28418 10.1934L3.65039 9.83594Z"
      {...props}
    />
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <SkeuoIcon
      path="M18.0591 4.36821C18.352 3.96842 18.885 3.87395 19.2863 4.18517L20.654 5.24545C21.0389 5.54399 21.1145 6.11026 20.821 6.51108L10.9455 20L3.33753 14.0993C2.96342 13.8088 2.88249 13.2689 3.18482 12.856L4.21643 11.4486C4.50647 11.0524 5.05607 10.9748 5.41942 11.2566L10.2644 15.0156L18.0591 4.36821Z"
      {...props}
    />
  )
}

export function HomeIcon(props: IconProps) {
  return (
    <SkeuoIcon
      path="M22.6794 11.4502V20.4997C22.6794 20.771 22.454 21 22.176 21H16.1828C15.9123 21 15.6794 20.7772 15.6794 20.5023V16H13.6794V20.5023C13.6794 20.7852 13.454 21 13.176 21H7.1828C6.91228 21 6.67938 20.776 6.67938 20.4997V11.4238L6.39872 11.6315C6.17245 11.7989 5.86171 11.7626 5.68882 11.5289L5.09957 10.7326C4.93378 10.5085 4.97821 10.1946 5.20908 10.0237L11.6244 5.27666C11.6544 5.25446 11.6859 5.23584 11.7183 5.22079L14.2717 3.3058C14.4973 3.1366 14.8619 3.13691 15.0871 3.3058L18.9084 6.17179L24.114 10.0237C24.3403 10.1912 24.3964 10.499 24.2235 10.7326L23.6343 11.5289C23.4685 11.753 23.1553 11.8023 22.9244 11.6315L22.6794 11.4502Z"
      viewBox="4 2 22 20"
      {...props}
    />
  )
}

export function BoltIcon(props: IconProps) {
  return (
    <SkeuoIcon
      path="M18.1911 3C18.5627 3 18.8045 3.39116 18.6383 3.72361L16.0001 9H18.5253C18.9505 9 19.1816 9.49688 18.9078 9.82207L7.99535 22.7806C7.66632 23.1713 7.03222 22.8754 7.1204 22.3722L8.50007 14.5H5.64724C5.31984 14.5 5.08079 14.1906 5.16343 13.8738L7.90256 3.37379C7.95999 3.15362 8.15883 3 8.38637 3H18.1911Z"
      viewBox="4 2 16 22"
      {...props}
    />
  )
}

export function StarIcon(props: IconProps) {
  return (
    <SkeuoIcon
      path="M14.5783 18.2043C14.4137 18.0986 14.2025 18.0986 14.0379 18.2043L9.1559 21.3397C8.77935 21.5815 8.29909 21.2448 8.3981 20.8084L9.74324 14.879C9.78329 14.7025 9.72478 14.5181 9.59025 14.3969L5.16608 10.4121C4.84077 10.1191 5.02244 9.57911 5.4587 9.54233L11.218 9.05685C11.4073 9.04089 11.5711 8.91912 11.641 8.74253L13.8432 3.17539C14.0099 2.75395 14.6063 2.75395 14.7731 3.17539L16.9752 8.74253C17.0451 8.91912 17.2089 9.04089 17.3982 9.05685L23.1575 9.54233C23.5938 9.57911 23.7754 10.1191 23.4501 10.4121L19.026 14.3969C18.8914 14.5181 18.8329 14.7025 18.873 14.879L20.2181 20.8084C20.3171 21.2448 19.8369 21.5815 19.4603 21.3397L14.5783 18.2043Z"
      viewBox="3.5 1.5 22 21"
      {...props}
    />
  )
}

export function BellIcon(props: IconProps) {
  return (
    <SkeuoIcon
      path="M10 18.9931L5.49639 18.9903C5.22224 18.9901 5 18.7617 5 18.4878V17C5 17 7 15 7 13V9.00006C7 6.57978 8.71222 4.56114 11.0024 4.09928C11.0008 4.0664 11 4.0333 11 4C11 2.89543 11.8877 2 13 2C14.1046 2 15 2.88773 15 4C15 4.03362 14.9992 4.06704 14.9976 4.10025C17.2811 4.56489 19 6.58894 19 9.00006V13C19 15 21 17 21 17V18.4953C21 18.774 20.7738 18.9999 20.5036 18.9997L16 18.9969V19C16 20.6569 14.6569 22 13 22C11.3431 22 10 20.6569 10 19V18.9931Z"
      viewBox="3 1 20 22"
      {...props}
    />
  )
}

export function ProfileIcon(props: IconProps) {
  return (
    <SkeuoIcon
      path="M16.5 7.5A4.5 4.5 0 1 1 7.5 7.5A4.5 4.5 0 1 1 16.5 7.5ZM3.5 21a8.5 8.5 0 0117 0H3.5z"
      {...props}
    />
  )
}

export function PasswordIcon(props: IconProps) {
  return (
    <SkeuoIcon
      path="M12 2a5 5 0 00-5 5v3H5a1 1 0 00-1 1v9a2 2 0 002 2h12a2 2 0 002-2v-9a1 1 0 00-1-1h-2V7a5 5 0 00-5-5zM10 7a2 2 0 114 0v3h-4V7zm3.5 8a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"
      {...props}
    />
  )
}

export function XCircleIcon(props: IconProps) {
  return (
    <SkeuoIcon
      path="M13 0C20.1797 0 26 5.8203 26 13C26 20.1797 20.1797 26 13 26C5.8203 26 0 20.1797 0 13C0 5.8203 5.8203 0 13 0ZM12.8809 9.917L9.4229 6.45898L6.458 9.4238L9.916 12.8818L6.458 16.3398L9.4229 19.3037L12.8809 15.8457L16.3398 19.3047L19.3037 16.3408L15.8457 12.8818L19.3037 9.4229L16.3398 6.45801L12.8809 9.917Z"
      viewBox="0 0 26 26"
      {...props}
    />
  )
}

export function LogoutIcon(props: IconProps) {
  return (
    <SkeuoIcon
      path="M3 4a2 2 0 012-2h6a1.5 1.5 0 010 3H6v14h5a1.5 1.5 0 010 3H5a2 2 0 01-2-2V4zM16.44 7.44a1.5 1.5 0 012.12 0l3.5 3.5a1.5 1.5 0 010 2.12l-3.5 3.5a1.5 1.5 0 01-2.12-2.12l.94-.94H10a1.5 1.5 0 010-3h7.38l-.94-.94a1.5 1.5 0 010-2.12z"
      {...props}
    />
  )
}
