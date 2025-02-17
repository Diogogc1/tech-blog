import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from './user.entity';
import ArticlePayload from 'src/dtos/payload/article.payload';

@Entity()
export class Article {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  title: string;

  @Property({ type: 'text' })
  content: string;

  @ManyToOne()
  author: User;

  @Property({ default: new Date().toISOString() })
  createdAt: Date;

  @Property({ default: true })
  status: boolean;

  static create(articlePayload: ArticlePayload, author: User): Article {
    const article = new Article();
    article.title = articlePayload.title;
    article.content = articlePayload.content;
    article.author = author;
    return article;
  }
}