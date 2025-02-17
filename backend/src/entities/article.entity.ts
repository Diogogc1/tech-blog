import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Reference,
} from '@mikro-orm/core';
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

  @Property({ onCreate: () => new Date() })
  createdAt: Date;

  @Property({ default: true })
  status: boolean;

  static create(articlePayload: ArticlePayload): Article {
    const article = new Article();
    article.title = articlePayload.title;
    article.content = articlePayload.content;
    article.author = Reference.createNakedFromPK(User, articlePayload.authorId);
    return article;
  }
}
