import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Reference } from '@mikro-orm/core'
import ArticlePayload from 'src/dtos/payload/article.payload'
import { ArticleTag } from './article-tag.entity'
import { User } from './user.entity'

@Entity()
export class Article {
  @PrimaryKey({ autoincrement: true })
  id: number

  @Property()
  title: string

  @Property({ type: 'text' })
  content: string

  @ManyToOne(() => User)
  user: User

  @OneToMany(() => ArticleTag, (articleTag) => articleTag.article)
  tags = new Collection<ArticleTag>(this)

  @Property({ onCreate: () => new Date() })
  createdAt: Date

  @Property({ default: true })
  status: boolean

  constructor(articlePayload: ArticlePayload) {
    this.title = articlePayload.title
    this.content = articlePayload.content
    this.user = Reference.createNakedFromPK(User, articlePayload.authorId)
  }

  static create(articlePayload: ArticlePayload): Article {
    return new Article(articlePayload)
  }
}
