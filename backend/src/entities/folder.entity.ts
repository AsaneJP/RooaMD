import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  parentId: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @ManyToOne(() => User, (user) => user.folders)
  user: User;

  @Column()
  userId: string;
}
