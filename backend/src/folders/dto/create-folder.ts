import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFolderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  parentId: string;

  @IsString()
  @IsOptional()
  header1: string;

  @IsString()
  @IsOptional()
  header2: string;

  @IsString()
  @IsOptional()
  header3: string;

  @IsString()
  @IsOptional()
  header4: string;

  @IsString()
  @IsOptional()
  header5: string;

  @IsString()
  @IsOptional()
  header6: string;
}
