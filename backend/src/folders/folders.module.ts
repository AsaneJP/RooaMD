import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { FolderRepository } from './folder.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([FolderRepository]), AuthModule],
  providers: [FoldersService],
  controllers: [FoldersController],
})
export class FoldersModule {}
