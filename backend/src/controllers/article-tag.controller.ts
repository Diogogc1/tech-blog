import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import ArticleTagPayload from 'src/dtos/payload/article-tag.payload';
import ArticleTagResponse from 'src/dtos/response/article-tag.response';
import { ArticleTagService } from 'src/services/article-tag.service';

@Controller('article-tag')
export class ArticleTagController {
  constructor(private readonly articleTagService: ArticleTagService) {}

  @Post()
  create(
    @Body() articleTagPayload: ArticleTagPayload,
  ): Promise<ArticleTagResponse> {
    return this.articleTagService.create(articleTagPayload);
  }

  @Get()
  getAll(): Promise<ArticleTagResponse[]> {
    return this.articleTagService.findAll();
  }

  @Get('article/:id')
  getByArticleId(@Param('id') id: string): Promise<ArticleTagResponse[]> {
    return this.articleTagService.findByArticleId(Number(id));
  }

  @Get('tag/:id')
  getByTagId(@Param('id') id: string): Promise<ArticleTagResponse[]> {
    return this.articleTagService.findByTagId(Number(id));
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<ArticleTagResponse> {
    return this.articleTagService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() articleTagPayload: ArticleTagPayload,
  ): Promise<number> {
    return this.articleTagService.update(Number(id), articleTagPayload);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<number> {
    return this.articleTagService.delete(Number(id));
  }
}
