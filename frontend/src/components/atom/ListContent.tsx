import { memo, ReactElement, VFC } from 'react'
import { ListItem, ListItemText } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ListItemIcon from '@mui/material/ListItemIcon'
import { useRecoilState } from 'recoil'
import { listCheckState } from '../../globalState/listCheckState'

type Props = {
  id: string
  name: string
  parentId?: string
  url: string
  icon: ReactElement
}

export const ListContent: VFC<Props> = memo((props) => {
  const { id, name, parentId, icon, url } = props

  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = useRecoilState(listCheckState)

  let path = ''

  if (parentId == null || parentId === '') {
    if (id === 'setting' || id === 'user' || id === 'default') {
      path = id
    } else {
      path = `./${id}.md`
    }
  } else {
    path = `${parentId}/${id}.md`
  }

  const handleClick = () => {
    setSelectedIndex(path)
    navigate(url)
  }

  return (
    <ListItem button selected={selectedIndex === path} onClick={handleClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  )
})
