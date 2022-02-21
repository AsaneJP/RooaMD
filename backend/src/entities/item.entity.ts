import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Folder } from './folder.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  contents: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @ManyToOne(() => Folder, (folder) => folder.items)
  folder: Folder;

  @Column()
  folderId: string;
}
