import { CreateItemDto } from './dto/create-item.dto';
import { Item } from 'src/entities/item.entity';
import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  async createItem(createItemDto: CreateItemDto, user: User) {
    const { name, parentId, contents } = createItemDto;
    const item = this.create({
      name,
      parentId,
      contents,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user,
    });
    await this.save(item);

    return item;
  }
}
