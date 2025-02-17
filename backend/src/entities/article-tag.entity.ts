import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Tag } from './tag.entity';
import { Article } from './article.entity';
import ArticleTagPayload from 'src/dtos/payload/article-tag.payload';

@Entity()
export class ArticleTag {
  @PrimaryKey({ autoincrement: true })
  id: number;

  @ManyToOne()
  tag: Tag;

  @ManyToOne()
  article: Article;

  @Property({ default: true })
  status: boolean;

  @Property({ default: new Date().toISOString() })
  createdAt: Date;

  static create(articleTagPayload: ArticleTagPayload, article: Article, tag: Tag): ArticleTag {
    const articleTag = new ArticleTag();
    articleTag.tag = tag;
    articleTag.article = article;
    return articleTag;
  }
}
