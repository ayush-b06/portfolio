// Module-level navigation — registered by ScrollController, called by Navbar
let _goTo: ((idx: number) => void) | null = null

export const registerGoTo = (fn: (idx: number) => void) => { _goTo = fn }
export const goTo = (idx: number) => { _goTo?.(idx) }

export const SECTIONS = ['About', 'Berkeley', 'Projects', 'Experience', 'Contact']
