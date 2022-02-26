import { User } from 'src/entities/user.entity';
import { ItemRepository } from './item.repository';
import { CreateItemDto } from './dto/create-item.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Item } from '../entities/item.entity';
import { ItemModel } from './item.model';

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}
  private items: Item[] = [];

  async findAll(user: User): Promise<Item[]> {
    const found = await this.itemRepository.find({ userId: user.id });
    if (!found) {
      throw new NotFoundException('アイテムが見つかりません');
    }
    return found;
  }

  async findById(id: string, user: User): Promise<Item> {
    const found = await this.itemRepository.findOne(id);
    if (!found) {
      throw new NotFoundException('アイテムが見つかりません');
    }
    if (found.userId !== user.id) {
      throw new BadRequestException('アクセス権がありません');
    }
    return found;
  }

  async create(createItemDto: CreateItemDto, user: User): Promise<Item> {
    return await this.itemRepository.createItem(createItemDto, user);
  }

  async update(item: ItemModel, user: User): Promise<Item> {
    const updateItem = await this.findById(item.id, user);
    updateItem.name = item.name;
    updateItem.parentId = item.parentId;
    updateItem.contents = item.contents;
    updateItem.updatedAt = new Date().toISOString();
    await this.itemRepository.save(updateItem);
    return updateItem;
  }

  async delete(id: string, user: User): Promise<Item> {
    const item = await this.findById(id, user);
    await this.itemRepository.remove(item);
    return item;
  }
}
