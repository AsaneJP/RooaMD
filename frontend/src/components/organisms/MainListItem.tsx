import { ListSubheader, List } from '@mui/material'
import DescriptionIcon from '@mui/icons-material/Description'
import { FolderList } from '../molecules/FolderList'
import { ListContent } from '../atom/ListContent'


export const MainListItem = () => {
  return (
    <List dense>
      <ListSubheader inset>Folder</ListSubheader>
      <ListContent icon={<DescriptionIcon />} selectIndex="SampleFile">
        SampleFile
      </ListContent>
    </List>
  )
}
