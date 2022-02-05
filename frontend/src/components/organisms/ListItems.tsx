import { ListSubheader, List } from '@mui/material'
import DescriptionIcon from '@mui/icons-material/Description'
import { FolderList } from '../molecules/FolderList'
import { ListContent } from '../atom/ListContent'

export const MainListItems = () => (
  <List dense>
    <ListSubheader inset>Folder</ListSubheader>
    <ListContent icon={<DescriptionIcon />} selectIndex="SampleFile">
      SampleFile
    </ListContent>
    <FolderList folderName="SampleFolder">
      <ListContent icon={<DescriptionIcon />} selectIndex="Sample2File">
        Sample2File
      </ListContent>
    </FolderList>
    <FolderList folderName="Sample2Folder">
      <>
        <ListContent icon={<DescriptionIcon />} selectIndex="Sample3File">
          Sample3File
        </ListContent>
        <FolderList folderName="Sample3Folder">
          <ListContent icon={<DescriptionIcon />} selectIndex="Sample4File">
            Sample4File
          </ListContent>
        </FolderList>
      </>
    </FolderList>
    <FolderList folderName="Sample2Folder">
      <>
        <ListContent icon={<DescriptionIcon />} selectIndex="Sample3File">
          Sample3File
        </ListContent>
        <FolderList folderName="Sample3Folder">
          <ListContent icon={<DescriptionIcon />} selectIndex="Sample4File">
            Sample4File
          </ListContent>
        </FolderList>
      </>
    </FolderList>
    <FolderList folderName="Sample2Folder">
      <>
        <ListContent icon={<DescriptionIcon />} selectIndex="Sample3File">
          Sample3File
        </ListContent>
        <FolderList folderName="Sample3Folder">
          <ListContent icon={<DescriptionIcon />} selectIndex="Sample4File">
            Sample4File
          </ListContent>
        </FolderList>
      </>
    </FolderList>
    <FolderList folderName="Sample2Folder">
      <>
        <ListContent icon={<DescriptionIcon />} selectIndex="Sample3File">
          Sample3File
        </ListContent>
        <FolderList folderName="Sample3Folder">
          <ListContent icon={<DescriptionIcon />} selectIndex="Sample4File">
            Sample4File
          </ListContent>
        </FolderList>
      </>
    </FolderList>
    <FolderList folderName="Sample2Folder">
      <>
        <ListContent icon={<DescriptionIcon />} selectIndex="Sample3File">
          Sample3File
        </ListContent>
        <FolderList folderName="Sample3Folder">
          <ListContent icon={<DescriptionIcon />} selectIndex="Sample4File">
            Sample4File
          </ListContent>
        </FolderList>
      </>
    </FolderList>
    <FolderList folderName="Sample2Folder">
      <>
        <ListContent icon={<DescriptionIcon />} selectIndex="Sample3File">
          Sample3File
        </ListContent>
        <FolderList folderName="Sample3Folder">
          <ListContent icon={<DescriptionIcon />} selectIndex="Sample4File">
            Sample4File
          </ListContent>
        </FolderList>
      </>
    </FolderList>
  </List>
)
