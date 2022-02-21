import { CreateFolderDto } from './dto/create-folder';
import { Folder } from 'src/entities/folder.entity';
import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@EntityRepository(Folder)
export class FolderRepository extends Repository<Folder> {
  async createFolder(createFolderDto: CreateFolderDto, user: User) {
    const { name, parentId } = createFolderDto;
    const folder = this.create({
      name,
      parentId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user,
    });
    await this.save(folder);

    return folder;
  }
}
