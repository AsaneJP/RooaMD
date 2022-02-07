import { CreateItemDto } from './dto/create-item.dto';
import { Item } from 'src/entities/item.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  async createItem(createItemDto: CreateItemDto) {
    const { contents } = createItemDto;
    const item = this.create({
      contents,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    await this.save(item);

    return item;
  }
}
