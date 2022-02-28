import { CreateFolderDto } from './dto/create-folder';
import { Folder } from 'src/entities/folder.entity';
import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@EntityRepository(Folder)
export class FolderRepository extends Repository<Folder> {
  async createFolder(createFolderDto: CreateFolderDto, user: User) {
    const {
      name,
      parentId,
      header1,
      header2,
      header3,
      header4,
      header5,
      header6,
    } = createFolderDto;
    const folder = this.create({
      name,
      parentId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user,
      header1,
      header2,
      header3,
      header4,
      header5,
      header6,
    });
    await this.save(folder);

    return folder;
  }
}
