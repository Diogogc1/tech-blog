import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core'
import { ArticleTag } from './article-tag.entity'
import TagPayload from 'src/dtos/payload/tag.payload'

@Entity()
export class Tag {
  @PrimaryKey({ autoincrement: true })
  id: number

  @Property()
  name: string

  @OneToMany(() => ArticleTag, (articleTag) => articleTag.tag)
  articles = new Collection<ArticleTag>(this)

  @Property({ onCreate: () => new Date() })
  createdAt: Date

  @Property({ default: true })
  status: boolean

  constructor(tagPayload: TagPayload) {
    this.name = tagPayload.name
  }

  static create(tagPayload: TagPayload): Tag {
    return new Tag(tagPayload)
  }
}
