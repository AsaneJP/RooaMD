import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  parentId: string;

  @Column({ nullable: true })
  contents: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @ManyToOne(() => User, (user) => user.items)
  user: User;

  @Column()
  userId: string;
}
