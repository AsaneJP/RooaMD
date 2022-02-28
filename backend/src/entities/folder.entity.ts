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

  @Column({ nullable: true })
  header1: string;

  @Column({ nullable: true })
  header2: string;

  @Column({ nullable: true })
  header3: string;

  @Column({ nullable: true })
  header4: string;

  @Column({ nullable: true })
  header5: string;

  @Column({ nullable: true })
  header6: string;
}
