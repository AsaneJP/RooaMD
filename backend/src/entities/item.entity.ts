import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  contents: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
