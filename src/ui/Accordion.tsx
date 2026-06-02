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
        <span className="accordionRight">
          <span className="accordionHint">展开</span>
          <svg
            className="accordionChevron"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            role="presentation"
            aria-hidden="true"
          >
            <path
              d="M7 10l5 5 5-5"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </summary>
      <div id={id} className="accordionBody">
        {children}
      </div>
    </details>
  )
}
