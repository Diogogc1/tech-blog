import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { Injectable} from '@nestjs/common';
import { Article } from 'src/entities/article.entity';

@Injectable()
export default class ArticleRepository {
  private articleRepo: EntityRepository<Article>;

  constructor(private readonly em: EntityManager) {
    this.articleRepo = this.em.getRepository(Article);
  }

  async create(article: Article): Promise<Article> {
    await this.em.persistAndFlush(article);
    return article;
  }

  async findAll(): Promise<Article[]> {
    return this.articleRepo.find({status: true});
  }

  async findOne(id: number): Promise<Article | null> {
    return this.articleRepo.findOne({ id, status: true });
  }

  async update(id: number, data: any): Promise<number> {
    return this.articleRepo.nativeUpdate({ id, status: true }, data);
  }

  async delete(id: number): Promise<number> {
    return this.articleRepo.nativeUpdate({ id, status: true }, { status: false });
  }

  async search(title: string): Promise<Article[]> { 
    return this.articleRepo.find({ title: { $like: `%${title}%` } });
  }
}
