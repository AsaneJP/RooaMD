import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item.entity';
import { User } from './user.entity';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  parentId: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @OneToMany(() => Item, (item) => item.folder)
  items: Item[];

  @ManyToOne(() => User, (user) => user.folders)
  user: User;

  @Column()
  userId: string;
}
