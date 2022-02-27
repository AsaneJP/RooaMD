import { atom } from 'recoil'

export const addContentState = atom<boolean>({
  key: 'addContentState',
  default: false,
})
