import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { ArticleTag } from 'src/entities/article-tag.entity';

export default class ArticleTagRepository {
  private articleTagRepo: EntityRepository<ArticleTag>;

  constructor(private readonly em: EntityManager) {
    this.articleTagRepo = this.em.getRepository(ArticleTag);
  }

  async create(data: any) {
    return this.em.persistAndFlush(this.articleTagRepo.create(data));
  }

  async findAll() {
    return this.articleTagRepo.find({});
  }

  async findOne(id: number) {
    return this.articleTagRepo.findOne({ id });
  }

  async update(id: number, data: any) {
    return this.articleTagRepo.nativeUpdate({ id }, data);
  }

  async delete(id: number) {
    return this.articleTagRepo.nativeDelete({ id });
  }
}
