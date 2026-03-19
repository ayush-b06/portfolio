import { useState, useEffect } from 'react'
import { onSectionChange, getSectionIndex } from './sectionState'

export function useSectionActive(index: number) {
  const [active, setActive] = useState(getSectionIndex() === index)
  useEffect(() => {
    return onSectionChange(idx => setActive(idx === index))
  }, [index])
  return active
}
