import { EntityManager } from '@mikro-orm/core'
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common'
import ArticleTagPayload from 'src/dtos/payload/article-tag.payload'
import ArticleTagResponse from 'src/dtos/response/article-tag.response'
import { ArticleTag } from 'src/entities/article-tag.entity'
import ArticleTagRepository from 'src/repositories/article-tag.repository'
import { ArticleService } from './article.service'
import { TagService } from './tag.service'

@Injectable()
export class ArticleTagService {
  constructor(
    private readonly articleTagRepository: ArticleTagRepository,
    @Inject(forwardRef(() => ArticleService))
    private readonly articleService: ArticleService,
    @Inject(forwardRef(() => TagService))
    private readonly tagService: TagService,

    private readonly em: EntityManager
  ) {}

  async create(articleTagPayload: ArticleTagPayload): Promise<ArticleTagResponse> {
    const articleTag = ArticleTag.create(articleTagPayload)
    const response = await this.articleTagRepository.create(articleTag)
    const articleTagResponse: ArticleTagResponse = new ArticleTagResponse(response)
    return articleTagResponse
  }

  async findAll() {
    const articleTags = await this.articleTagRepository.findAll()
    const articleTagResponse: ArticleTagResponse[] = articleTags.map((tag) => new ArticleTagResponse(tag))
    return articleTagResponse
  }

  async findByArticleId(articleId: number) {
    const articleTags = await this.articleTagRepository.findByArticleId(articleId)
    const articleTagResponse: ArticleTagResponse[] = articleTags.map((tag) => new ArticleTagResponse(tag))
    return articleTagResponse
  }

  async findByTagId(tagId: number) {
    const articleTags = await this.articleTagRepository.findByTagId(tagId)
    const articleTagResponses: ArticleTagResponse[] = []

    for (const articleTag of articleTags) {
      const article = await this.articleService.findOne(articleTag.article.id)
      const tag = await this.tagService.findOne(articleTag.tag.id)
      const articleTagResponse = new ArticleTagResponse(articleTag)
      articleTagResponse.article = article
      articleTagResponse.tag = tag
      articleTagResponses.push(articleTagResponse)
    }
    return articleTagResponses
  }

  async findOne(id: number) {
    const articleTag = await this.articleTagRepository.findOne(id)

    if (!articleTag) {
      throw new NotFoundException(`ArticleTag with ID ${id} not found`)
    }

    const articleTagResponse: ArticleTagResponse = new ArticleTagResponse(articleTag)
    return articleTagResponse
  }

  async update(id: number, articleTagPayload: ArticleTagPayload) {
    const articleTag = ArticleTag.create(articleTagPayload)

    await this.findOne(id)
    await this.articleService.findOne(articleTag.article.id)
    await this.tagService.findOne(articleTag.tag.id)

    return await this.articleTagRepository.update(id, articleTag)
  }

  async delete(id: number) {
    return await this.articleTagRepository.delete(id)
  }
}
