import { ReactElement, VFC } from 'react'
import { ListItem, ListItemText } from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import { useRecoilState } from 'recoil'
import { listCheckState } from '../../globalState/listCheckState'

type Props = {
  children: string
  icon: ReactElement
  selectIndex: string
}

export const ListContent: VFC<Props> = (props) => {
  const { children, icon, selectIndex } = props

  const [selectedIndex, setSelectedIndex] = useRecoilState(listCheckState)

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: string) => {
    setSelectedIndex(index)
  }

  return (
    <ListItem
      button
      selected={selectedIndex === selectIndex}
      onClick={(event) => handleListItemClick(event, selectIndex)}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={children} />
    </ListItem>
  )
}
