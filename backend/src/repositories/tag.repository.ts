import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { Tag } from 'src/entities/tag.entity';

export default class TagRepository {
  private tagRepo: EntityRepository<Tag>;

  constructor(private readonly em: EntityManager) {
    this.tagRepo = this.em.getRepository(Tag);
  }

  async create(data: any) {
    return this.em.persistAndFlush(this.tagRepo.create(data));
  }

  async findAll() {
    return this.tagRepo.find({});
  }

  async findOne(id: number) {
    return this.tagRepo.findOne({ id });
  }

  async update(id: number, data: any) {
    return this.tagRepo.nativeUpdate({ id }, data);
  }

  async delete(id: number) {
    return this.tagRepo.nativeDelete({ id });
  }
}
