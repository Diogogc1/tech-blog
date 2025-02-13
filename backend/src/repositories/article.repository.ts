import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { Article } from 'src/entities/article.entity';

export default class ArticleRepository {
  private articleRepo: EntityRepository<Article>;

  constructor(private readonly em: EntityManager) {
    this.articleRepo = this.em.getRepository(Article);
  }

  async create(data: any) {
    return this.em.persistAndFlush(this.articleRepo.create(data));
  }

  async findAll() {
    return this.articleRepo.find({});
  }

  async findOne(id: number) {
    return this.articleRepo.findOne({ id });
  }

  async update(id: number, data: any) {
    return this.articleRepo.nativeUpdate({ id }, data);
  }

  async delete(id: number) {
    return this.articleRepo.nativeDelete({ id });
  }
}
