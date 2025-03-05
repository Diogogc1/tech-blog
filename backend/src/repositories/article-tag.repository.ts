import { EntityManager, EntityRepository } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { ArticleTag } from 'src/entities/article-tag.entity'

@Injectable()
export default class ArticleTagRepository {
  private articleTagRepo: EntityRepository<ArticleTag>

  constructor(private readonly em: EntityManager) {
    this.articleTagRepo = this.em.getRepository(ArticleTag)
  }

  async create(data: ArticleTag): Promise<ArticleTag> {
    const articleTag = this.articleTagRepo.create(data)
    await this.em.persistAndFlush(articleTag)
    return articleTag
  }

  async findAll(): Promise<ArticleTag[]> {
    return this.articleTagRepo.find({})
  }

  async findByArticleId(articleId: number): Promise<ArticleTag[]> {
    return this.articleTagRepo.find({ article: articleId })
  }

  async findByTagId(tagId: number): Promise<ArticleTag[]> {
    return this.articleTagRepo.find({ tag: tagId })
  }

  async findOne(id: number): Promise<ArticleTag | null> {
    return this.articleTagRepo.findOne({ id })
  }

  async update(id: number, data: ArticleTag): Promise<number> {
    return this.articleTagRepo.nativeUpdate({ id, status: true }, data)
  }

  async delete(id: number): Promise<number> {
    return this.articleTagRepo.nativeUpdate({ id, status: true }, { status: false })
  }
}
