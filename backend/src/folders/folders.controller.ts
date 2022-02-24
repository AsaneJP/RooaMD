import { GetUser } from './../auth/decorator/get-user.decorator';
import { CreateFolderDto } from './dto/create-folder';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Folder } from 'src/entities/folder.entity';
import { FoldersService } from './folders.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/entities/user.entity';

@Controller('folders')
@UseGuards(JwtAuthGuard)
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get()
  async findAll(@GetUser() user: User): Promise<Folder[]> {
    return await this.foldersService.findAll(user);
  }

  @Post()
  async create(
    @Body() createFolderDto: CreateFolderDto,
    @GetUser() user: User,
  ): Promise<Folder> {
    return await this.foldersService.create(createFolderDto, user);
  }
}
