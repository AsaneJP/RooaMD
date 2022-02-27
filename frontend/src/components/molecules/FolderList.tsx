import { memo, VFC } from 'react'
import DescriptionIcon from '@mui/icons-material/Description'
import { useGetContent } from '../../hooks/useGetContent'
import { FolderContent } from '../atom/FolderContent'
import { ListContent } from '../atom/ListContent'

type Props = {
  folderId: string
  folderName: string
  parentId: string
  url: string
}

export const FolderList: VFC<Props> = memo((props) => {
  const { folderId, folderName, parentId, url } = props
  const { folders, items } = useGetContent()

  return (
    <FolderContent folderId={folderId} folderName={folderName} parentId={parentId} url={url}>
      <>
        {folders
          ? folders.map((folder) => {
              if (folder.parentId === folderId) {
                return (
                  <FolderList
                    key={folder.id}
                    folderId={folder.id}
                    folderName={folder.name}
                    parentId={folder.parentId}
                    url={`/folder/${folder.id}`}
                  />
                )
              }
              return null
            })
          : null}
        {items
          ? items.map((item) => {
              if (item.parentId === folderId) {
                return (
                  <ListContent
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    parentId={item.parentId}
                    url={`/editor/${item.id}`}
                    icon={<DescriptionIcon />}
                  />
                )
              }
              return null
            })
          : null}
      </>
    </FolderContent>
  )
})
