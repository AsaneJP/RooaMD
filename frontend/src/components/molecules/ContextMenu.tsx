import { useState } from 'react'
import { Menu, MenuItem } from '@mui/material'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { addContentState } from '../../globalState/addContentState'
import { contextMenuState } from '../../globalState/contextMenuState'
import { listCheckState } from '../../globalState/listCheckState'
import { AddContent } from './AddContent'

export const ContextMenu = () => {
  const [contextMenu, setContextMenu] = useRecoilState(contextMenuState)
  const setOpen = useSetRecoilState(addContentState)
  const [judge, setJudge] = useState(false);
  const [selectedIndex, setSelectedIndex] = useRecoilState(listCheckState);

  const handleCreateFile = () => {
    setContextMenu(null)
    setJudge(false);
    setOpen(true)
  }

  const handleCreateFolder = () => {
    setContextMenu(null)
    setJudge(true)
    setOpen(true)
  }

  const handleClose = () => {
    setContextMenu(null)
  }

  return (
    <>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}
      >
        <MenuItem onClick={handleCreateFile}>
          <NoteAddIcon  sx={{ marginRight: "10px" }} />
          Create File
        </MenuItem>
        <MenuItem onClick={handleCreateFolder}>
          <CreateNewFolderIcon sx={{ marginRight: "10px" }} />
          Create Folder
        </MenuItem>
      </Menu>
      <AddContent judge={judge} />
    </>
  )
}
