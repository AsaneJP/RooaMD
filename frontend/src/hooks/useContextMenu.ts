import { MouseEvent } from 'react'
import { useRecoilState } from 'recoil'
import { contextMenuState } from '../globalState/contextMenuState'

export const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useRecoilState(contextMenuState)
  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault()
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : null
    )
  }

  return { handleContextMenu }
}
