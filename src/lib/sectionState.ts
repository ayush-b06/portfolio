type Listener = (idx: number) => void
const listeners: Listener[] = []
let current = 0

export const onSectionChange = (fn: Listener) => {
  listeners.push(fn)
  return () => {
    const i = listeners.indexOf(fn)
    if (i > -1) listeners.splice(i, 1)
  }
}

export const setSectionIndex = (idx: number) => {
  current = idx
  listeners.forEach(fn => fn(idx))
}

export const getSectionIndex = () => current
