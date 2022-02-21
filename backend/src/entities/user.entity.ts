import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserStatus } from 'src/auth/user-status.enum';
import { Folder } from './folder.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  status: UserStatus;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @OneToMany(() => Folder, (folder) => folder.user)
  folders: Folder[];
}
