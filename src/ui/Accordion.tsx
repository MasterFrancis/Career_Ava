import { useId, useEffect, useRef, type ReactNode } from 'react'

export function Accordion({
  title,
  children,
  defaultOpen = false,
  forceOpen,
}: {
  title: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  forceOpen?: boolean
}) {
  const id = useId()
  const detailsRef = useRef<HTMLDetailsElement>(null)
  
  useEffect(() => {
    if (detailsRef.current && forceOpen !== undefined) {
      detailsRef.current.open = forceOpen
    }
  }, [forceOpen])

  return (
    <details className="accordion" open={defaultOpen} ref={detailsRef}>
      <summary className="accordionSummary" aria-controls={id}>
        <span>{title}</span>
        <span className="accordionRight">
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
