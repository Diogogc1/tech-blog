import { Entity, OneToOne, PrimaryKey } from '@mikro-orm/core';
import { Tag } from './tag.entity';
import { Article } from './article.entity';

@Entity()
export class ArticleTag {
  @PrimaryKey({ autoincrement: true })
  id: number;

  @OneToOne()
  tag: Tag;

  @OneToOne()
  article: Article;
}
