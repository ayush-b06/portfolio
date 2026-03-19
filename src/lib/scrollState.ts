// Mutable singleton read by R3F components each frame — no React context needed
const scrollState = {
  progress: 0,  // 0–1, how far toward scroll threshold
  direction: 0, // 1 = scrolling down, -1 = scrolling up, 0 = idle
}

export default scrollState
