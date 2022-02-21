import { atom } from 'recoil'

export const contextMenuState = atom < {
  mouseX: number
  mouseY: number
} | null >({
  key: 'contextMenuState',
  default: null,
})
