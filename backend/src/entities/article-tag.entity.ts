import { Entity, ManyToOne, PrimaryKey, Property, Reference } from '@mikro-orm/core'
import ArticleTagPayload from 'src/dtos/payload/article-tag.payload'
import { Article } from './article.entity'
import { Tag } from './tag.entity'

@Entity()
export class ArticleTag {
  @PrimaryKey({ autoincrement: true })
  id: number

  @ManyToOne(() => Tag)
  tag: Tag

  @ManyToOne(() => Article)
  article: Article

  @Property({ default: true })
  status: boolean

  @Property({ onCreate: () => new Date() })
  createdAt: Date

  constructor(articleTagPayload: ArticleTagPayload) {
    this.tag = Reference.createNakedFromPK(Tag, articleTagPayload.tagId)
    this.article = Reference.createNakedFromPK(Article, articleTagPayload.articleId)
  }

  static create(articleTagPayload: ArticleTagPayload): ArticleTag {
    return new ArticleTag(articleTagPayload)
  }
}
