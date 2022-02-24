import { memo, ReactElement, VFC } from 'react'
import { ListItem, ListItemText } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ListItemIcon from '@mui/material/ListItemIcon'
import { useRecoilState } from 'recoil'
import { listCheckState } from '../../globalState/listCheckState'

type Props = {
  children: string
  url: string
  icon: ReactElement
  selectIndex: string
}

export const ListContent: VFC<Props> = memo((props) => {
  const { children, icon, selectIndex, url } = props

  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = useRecoilState(listCheckState)

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: string) => {
    setSelectedIndex(index)
    navigate(url)
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
})
