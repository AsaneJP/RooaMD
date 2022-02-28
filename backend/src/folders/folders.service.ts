import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder';
import { Folder } from 'src/entities/folder.entity';
import { FolderRepository } from './folder.repository';
import { User } from 'src/entities/user.entity';
import { FolderModel } from './folder.model';

@Injectable()
export class FoldersService {
  constructor(private readonly folderRepository: FolderRepository) {}
  private folders: Folder[] = [];

  async findAll(user: User): Promise<Folder[]> {
    const found = await this.folderRepository.find({ userId: user.id });
    if (!found) {
      throw new NotFoundException('Folders not found');
    }
    return found;
  }

  async findById(id: string, user: User): Promise<Folder> {
    const found = await this.folderRepository.findOne(id);
    if (!found) {
      throw new NotFoundException('フォルダーが見つかりません');
    }
    if (found.userId !== user.id) {
      throw new BadRequestException('アクセス権がありません');
    }
    return found;
  }

  async create(createFolderDto: CreateFolderDto, user: User): Promise<Folder> {
    return await this.folderRepository.createFolder(createFolderDto, user);
  }

  async update(folder: FolderModel, user: User): Promise<Folder> {
    const updateFolder = await this.findById(folder.id, user);
    updateFolder.name = folder.name;
    updateFolder.parentId = folder.parentId;
    updateFolder.updatedAt = new Date().toISOString();
    updateFolder.header1 = folder.header1;
    updateFolder.header2 = folder.header2;
    updateFolder.header3 = folder.header3;
    updateFolder.header4 = folder.header4;
    updateFolder.header5 = folder.header5;
    updateFolder.header6 = folder.header6;
    await this.folderRepository.save(updateFolder);
    return updateFolder;
  }

  async delete(id: string, user: User): Promise<Folder> {
    const folder = await this.findById(id, user);
    await this.folderRepository.remove(folder);
    return folder;
  }
}
