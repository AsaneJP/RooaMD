import { memo } from 'react'
import { useSetRecoilState } from 'recoil'
import { ListSubheader, List } from '@mui/material'
import DescriptionIcon from '@mui/icons-material/Description'
import { ListContent } from '../atom/ListContent'
import { listCheckState } from '../../globalState/listCheckState'
import { useGetContent } from '../../hooks/useGetContent'
import { FolderList } from '../molecules/FolderList'

export const MainListItem = memo(() => {
  const setSelectedIndex = useSetRecoilState(listCheckState)

  const { folders, items } = useGetContent()

  const handleListClear = () => {
    setSelectedIndex('default')
  }

  return (
    <List dense>
      <ListSubheader inset onClick={handleListClear} sx={{ cursor: 'default' }}>
        Folder
      </ListSubheader>
      {folders
        ? folders.map((folder) => {
            if (folder.parentId === null || folder.parentId === '') {
              return (
                <FolderList key={folder.id} folderId={folder.id} folderName={folder.name} parentId={folder.parentId} />
              )
            }
            return null
          })
        : null}
      {items
        ? items.map((item) => {
            if (item.parentId === null || item.parentId === '') {
              return (
                <ListContent
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  parentId={item.parentId}
                  url="/editor"
                  icon={<DescriptionIcon />}
                />
              )
            }
            return null
          })
        : null}
    </List>
  )
})
