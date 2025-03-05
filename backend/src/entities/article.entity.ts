import { Entity, ManyToOne, PrimaryKey, Property, Reference } from '@mikro-orm/core'
import { User } from './user.entity'
import ArticlePayload from 'src/dtos/payload/article.payload'

@Entity()
export class Article {
  @PrimaryKey({ autoincrement: true })
  id!: number

  @Property()
  title: string

  @Property({ type: 'text' })
  content: string

  @ManyToOne()
  author: User

  @Property({ onCreate: () => new Date() })
  createdAt: Date

  @Property({ default: true })
  status: boolean

  constructor(articlePayload: ArticlePayload) {
    this.title = articlePayload.title
    this.content = articlePayload.content
    this.author = Reference.createNakedFromPK(User, articlePayload.authorId)
  }

  static create(articlePayload: ArticlePayload): Article {
    return new Article(articlePayload)
  }
}
