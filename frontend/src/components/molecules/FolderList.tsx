import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { ReactElement, useEffect, useState, VFC } from 'react'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import FolderIcon from '@mui/icons-material/Folder'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ListCheckState } from '../../globalState/ListCheckState'
import { menuOpenState } from '../../globalState/menuOpenState'

type Props = {
  folderName: string
  children: ReactElement
}

export const FolderList: VFC<Props> = (props) => {
  const { folderName, children } = props
  const [open, setOpen] = useState(false)

  const [selectedIndex, setSelectedIndex] = useRecoilState(ListCheckState)
  const menuOpen = useRecoilValue(menuOpenState)

  useEffect(() => {
    if (!menuOpen) {
      setOpen(menuOpen)
    }
  }, [menuOpen])

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: string) => {
    setOpen(!open)
    setSelectedIndex(index)
  }

  return (
    <>
      <ListItem button onClick={(event) => handleClick(event, folderName)} selected={selectedIndex === folderName}>
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
}
