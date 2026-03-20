// Module-level navigation — registered by ScrollController, called by Navbar
let _goTo: ((idx: number) => void) | null = null

export const registerGoTo = (fn: (idx: number) => void) => { _goTo = fn }
export const goTo = (idx: number) => { _goTo?.(idx) }

export const SECTIONS = ['About', 'Currently', 'Berkeley', 'Projects', 'Experience', 'Contact']
export const NAV_LINKS = [
  { label: 'Currently', idx: 1 },
  { label: 'Berkeley', idx: 2 },
  { label: 'Projects', idx: 3 },
  { label: 'Experience', idx: 4 },
  { label: 'Contact', idx: 5 },
]
