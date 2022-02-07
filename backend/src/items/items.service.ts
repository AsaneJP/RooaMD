import { ItemRepository } from './item.repository';
import { CreateItemDto } from './dto/create-item.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from '../entities/item.entity';
import { ItemModel } from './item.model';

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}
  private items: Item[] = [];

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async findById(id: string): Promise<Item> {
    const found = await this.itemRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemRepository.createItem(createItemDto);
  }

  async update(item: ItemModel): Promise<Item> {
    const updateItem = await this.findById(item.id);
    updateItem.contents = item.contents;
    updateItem.updatedAt = new Date().toISOString();
    await this.itemRepository.save(updateItem);
    return updateItem;
  }

  async delete(id: string): Promise<void> {
    const item = await this.findById(id);
    await this.itemRepository.remove(item);
  }
}
