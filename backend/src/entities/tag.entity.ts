import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import TagPayload from 'src/dtos/payload/tag.payload'

@Entity()
export class Tag {
  @PrimaryKey({ autoincrement: true })
  id: number

  @Property()
  name: string

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
