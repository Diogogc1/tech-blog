import ArticleTagPayload from 'src/dtos/payload/article-tag.payload';
import ArticleTagRepository from 'src/repositories/article-tag.repository';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import ArticleTagResponse from 'src/dtos/response/article-tag.response';
import { ArticleTag } from 'src/entities/article-tag.entity';
import { ArticleService } from './article.service';
import { TagService } from './tag.service';
import { EntityManager } from '@mikro-orm/core';
import { Article } from 'src/entities/article.entity';
import { Tag } from 'src/entities/tag.entity';

@Injectable()
export class ArticleTagService {
  constructor(
    private readonly articleTagRepository: ArticleTagRepository,
    @Inject(forwardRef(() => ArticleService))
    private readonly articleService: ArticleService,
    @Inject(forwardRef(() => TagService))
    private readonly tagService: TagService,

    private readonly em: EntityManager,
  ) { }

  async create(articleTagPayload: ArticleTagPayload): Promise<ArticleTagResponse> {
    const articleReference = this.em.getReference(Article, articleTagPayload.articleId);
    const tagReference = this.em.getReference(Tag, articleTagPayload.tagId);

    const articleTag = ArticleTag.create(articleTagPayload, articleReference, tagReference);
    const response = await this.articleTagRepository.create(articleTag);
    const articleTagResponse: ArticleTagResponse = new ArticleTagResponse(response);
    return articleTagResponse;
  }

  async findAll() {
    const articleTags = await this.articleTagRepository.findAll();
    const articleTagResponse: ArticleTagResponse[] = articleTags.map(tag => new ArticleTagResponse(tag));
    return articleTagResponse;
  }

  async findByArticleId(articleId: number) {
    const articleTags = await this.articleTagRepository.findByArticleId(articleId);
    const articleTagResponse: ArticleTagResponse[] = articleTags.map(tag => new ArticleTagResponse(tag));
    return articleTagResponse;
  }

  async findByTagId(tagId: number) {
    const articleTags = await this.articleTagRepository.findByTagId(tagId);
    const articleTagResponse: ArticleTagResponse[] = articleTags.map(tag => new ArticleTagResponse(tag));
    return articleTagResponse;
  }

  async findOne(id: number) {
    const articleTag = await this.articleTagRepository.findOne(id);

    if(!articleTag) {
      throw new NotFoundException(`ArticleTag with ID ${id} not found`);
    }

    const articleTagResponse: ArticleTagResponse = new ArticleTagResponse(articleTag);
    return articleTagResponse;
  }

  async update(id: number, articleTagPayload: ArticleTagPayload) {
    const articleReference = this.em.getReference(Article, articleTagPayload.articleId);
    const tagReference = this.em.getReference(Tag, articleTagPayload.tagId);
    const articleTag = ArticleTag.create(articleTagPayload, articleReference, tagReference);
 
    await this.findOne(id);
    await this.articleService.findOne(articleTag.article.id);
    await this.tagService.findOne(articleTag.tag.id);

    return await this.articleTagRepository.update(id, articleTag);
  }

  async delete(id: number) {
    return await this.articleTagRepository.delete(id);
  }
}