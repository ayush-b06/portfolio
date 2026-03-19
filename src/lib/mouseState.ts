// Global mouse position — updated by ScrollController, read by R3F every frame
const mouseState = {
  x: 0, // -1 (left) to +1 (right)
  y: 0, // -1 (bottom) to +1 (top)  — THREE.js convention
}
export default mouseState
