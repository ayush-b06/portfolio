type Listener = () => void
const listeners: Listener[] = []

export const onEasterEgg = (fn: Listener) => {
  listeners.push(fn)
  return () => { const i = listeners.indexOf(fn); if (i > -1) listeners.splice(i, 1) }
}

export const triggerEasterEgg = () => listeners.forEach(fn => fn())
