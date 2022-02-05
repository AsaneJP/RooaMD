import { atom } from 'recoil'

export const ListCheckState = atom<string>({
  key: 'ListCheckState',
  default: 'default',
})
