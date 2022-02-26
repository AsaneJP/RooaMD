import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { memo, ReactElement, useEffect, useState, VFC } from 'react'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import FolderIcon from '@mui/icons-material/Folder'
import { useRecoilState, useRecoilValue } from 'recoil'
import { menuOpenState } from '../../globalState/menuOpenState'
import { listCheckState } from '../../globalState/listCheckState'

type Props = {
  folderId: string
  folderName: string
  parentId: string
  children?: ReactElement
}

export const FolderContent: VFC<Props> = memo((props) => {
  const { folderId, folderName, parentId, children } = props
  const [open, setOpen] = useState(false)

  const [selectedIndex, setSelectedIndex] = useRecoilState(listCheckState)
  const menuOpen = useRecoilValue(menuOpenState)

  let path = ''
  if (parentId == null || parentId === '') {
    path = `./${folderId}`
  } else {
    path = `${parentId}/${folderId}`
  }

  useEffect(() => {
    if (menuOpen) {
      setOpen(!menuOpen)
    }
  }, [menuOpen])

  const handleClick = () => {
    setOpen(!open)
    setSelectedIndex(path)
  }

  return (
    <>
      <ListItem button onClick={handleClick} selected={selectedIndex === path}>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={folderName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense sx={{ pl: 2 }}>
          {children}
        </List>
      </Collapse>
    </>
  )
})
