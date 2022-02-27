import { GetUser } from './../auth/decorator/get-user.decorator';
import { CreateFolderDto } from './dto/create-folder';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Folder } from 'src/entities/folder.entity';
import { FoldersService } from './folders.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/entities/user.entity';
import { FolderModel } from './folder.model';

@Controller('folders')
@UseGuards(JwtAuthGuard)
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get()
  async findAll(@GetUser() user: User): Promise<Folder[]> {
    return await this.foldersService.findAll(user);
  }

  @Get(':id')
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<Folder> {
    return await this.foldersService.findById(id, user);
  }

  @Post()
  async create(
    @Body() createFolderDto: CreateFolderDto,
    @GetUser() user: User,
  ): Promise<Folder> {
    return await this.foldersService.create(createFolderDto, user);
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
    @Body('name') name: string,
    @Body('parentId') parentId: string,
  ): Promise<Folder> {
    const folder: FolderModel = { id, name, parentId };
    return await this.foldersService.update(folder, user);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<Folder> {
    return await this.foldersService.delete(id, user);
  }
}
