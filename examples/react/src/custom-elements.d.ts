import type { HTMLAttributes, RefAttributes } from 'react'
import type { CustomElements } from '@my-ds/components/dist/custom-elements.js'

// Standard React HTML attributes (onClick, className, style, …) plus the
// component props from the generated custom elements manifest.
type ReactCustomElement<Props> = HTMLAttributes<HTMLElement> &
  RefAttributes<HTMLElement> &
  Omit<Props, keyof HTMLAttributes<HTMLElement> | 'ref'>

type DsElements = {
  [Tag in keyof CustomElements]: ReactCustomElement<CustomElements[Tag]>
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends DsElements {}
  }
}
