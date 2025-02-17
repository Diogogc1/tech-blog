import ArticlePayload from 'src/dtos/payload/article.payload';
import ArticleRepository from 'src/repositories/article.repository';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import ArticleResponse from 'src/dtos/response/article.response';
import { Article } from 'src/entities/article.entity';
import { UserService } from './user.service';
import { ArticleTagService } from './article-tag.service';
import { User } from 'src/entities/user.entity';
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly userService: UserService,
    private readonly em: EntityManager,

    @Inject(forwardRef(() => ArticleTagService))
    private readonly articleTagService: ArticleTagService,
  ) { }

  async create(articlePayload: ArticlePayload): Promise<ArticleResponse> {
    await this.userService.findById(articlePayload.authorId);
    const authorReference = this.em.getReference(User, articlePayload.authorId);

    const article = Article.create(articlePayload, authorReference);

    const response = await this.articleRepository.create(article);

    for (const tag of articlePayload.tags) {
      const articleTagPayload = {
        articleId: response.id,
        tagId: tag,
      };
      await this.articleTagService.create(articleTagPayload);
    }

    const articleResponse: ArticleResponse = new ArticleResponse(response);
    return articleResponse;
  }

  async findAll(): Promise<ArticleResponse[]> {
    const articles = await this.articleRepository.findAll();
    const articleResponse: ArticleResponse[] = articles.map((article) => new ArticleResponse(article));
    return articleResponse;
  }

  async findOne(id: number): Promise<ArticleResponse> {
    const article = await this.articleRepository.findOne(id);

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    const articleResponse: ArticleResponse = new ArticleResponse(article);
    return articleResponse;
  }

  async update(id: number, articlePayload: ArticlePayload): Promise<number> {
    const authorReference = this.em.getReference(User, articlePayload.authorId);
    const article = Article.create(articlePayload, authorReference);

    await this.findOne(id);

    return await this.articleRepository.update(id, article);
  }

  async delete(id: number): Promise<number> {
    await this.findOne(id);
    const articleTags = await this.articleTagService.findByArticleId(id);
    for (const articleTag of articleTags) {
      await this.articleTagService.delete(articleTag.id);
    }
    return await this.articleRepository.delete(id);
  }

  async search(title: string): Promise<ArticleResponse[]> {
    const articles = await this.articleRepository.search(title);
    const articleResponse: ArticleResponse[] = articles.map((article) => new ArticleResponse(article));
    return articleResponse;
  }
}
