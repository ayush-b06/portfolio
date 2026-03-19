// Module-level navigation — registered by ScrollController, called by Navbar
let _goTo: ((idx: number) => void) | null = null

export const registerGoTo = (fn: (idx: number) => void) => { _goTo = fn }
export const goTo = (idx: number) => { _goTo?.(idx) }

export const SECTIONS = ['About', 'Berkeley', 'Projects', 'Experience', 'Contact']
export const NAV_LINKS = [
  { label: 'Berkeley', idx: 1 },
  { label: 'Projects', idx: 2 },
  { label: 'Experience', idx: 3 },
  { label: 'Contact', idx: 4 },
]
