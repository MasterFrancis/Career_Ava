import { useId, type ReactNode } from 'react'

export function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}) {
  const id = useId()
  return (
    <details className="accordion" open={defaultOpen}>
      <summary className="accordionSummary" aria-controls={id}>
        <span>{title}</span>
        <span className="accordionHint">展开</span>
      </summary>
      <div id={id} className="accordionBody">
        {children}
      </div>
    </details>
  )
}

