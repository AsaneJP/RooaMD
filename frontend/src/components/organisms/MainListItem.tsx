import { memo, useEffect, useState } from 'react'
import { ListSubheader, List } from '@mui/material'
import axios, { AxiosError } from 'axios'
import { useCookies } from 'react-cookie'
import DescriptionIcon from '@mui/icons-material/Description'
import { FolderList } from '../molecules/FolderList'
import { ListContent } from '../atom/ListContent'
import { Folder } from '../../types/api/Folder'

export const MainListItem = memo(() => {
  const [folders, setFolders] = useState<Folder[]>([])
  const cookie = useCookies(['accessToken'])

  useEffect(() => {
    axios
      .get<Array<Folder>>(`${process.env.REACT_APP_API_URL || 'local'}/folders`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie[0].accessToken}`,
        },
      })
      .then((res) => {
        setFolders(res.data)
      })
      .catch((error: AxiosError<{ additionalInfo: string }>) => {
        // eslint-disable-next-line no-console
        console.log(error.message)
      })
  }, [folders, cookie])

  return (
    <List dense>
      <ListSubheader inset>Folder</ListSubheader>
      <ListContent url="/editor" icon={<DescriptionIcon />} selectIndex="SampleFile">
        SampleFile
      </ListContent>
      {folders.map((folder) => (
        <FolderList key={folder.id} folderId={folder.id} folderName={folder.name} />
      ))}
    </List>
  )
})
