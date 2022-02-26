import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  parentId: string;

  @IsString()
  @IsOptional()
  contents: string;
}
