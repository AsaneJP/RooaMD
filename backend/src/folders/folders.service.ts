import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder';
import { Folder } from 'src/entities/folder.entity';
import { FolderRepository } from './folder.repository';
import { User } from 'src/entities/user.entity';

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

  async create(createFolderDto: CreateFolderDto, user: User): Promise<Folder> {
    return await this.folderRepository.createFolder(createFolderDto, user);
  }
}
