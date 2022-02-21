import { atom } from 'recoil'

export const listCheckState = atom<string>({
  key: 'ListCheckState',
  default: 'default',
})
