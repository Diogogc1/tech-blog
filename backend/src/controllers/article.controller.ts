import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import ArticlePayload from 'src/dtos/payload/article.payload';
import ArticleResponse from 'src/dtos/response/article.response';
import { ArticleService } from 'src/services/article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiBody({ type: ArticlePayload })
  create(@Body() articlePayload: ArticlePayload): Promise<ArticleResponse> {
    return this.articleService.create(articlePayload);
  }

  @Get()
  getAll(): Promise<ArticleResponse[]> {
    return this.articleService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<ArticleResponse> {
    return this.articleService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() articlePayload: ArticlePayload,
  ): Promise<number> {
    return this.articleService.update(Number(id), articlePayload);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<number> {
    return this.articleService.delete(Number(id));
  }

  @Get('search/:title')
  search(@Param('title') title: string): Promise<ArticleResponse[]> {
    return this.articleService.search(title);
  }
}
