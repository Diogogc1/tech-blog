import { Entity, ManyToOne, PrimaryKey, Property, Reference } from '@mikro-orm/core'
import CommentPayload from 'src/dtos/payload/comment.payload'
import { Article } from './article.entity'
import { User } from './user.entity'

@Entity()
export class Comment {
  @PrimaryKey({ autoincrement: true })
  id!: number

  @Property({ type: 'text' })
  content: string

  @ManyToOne()
  user: User

  @ManyToOne()
  article: Article

  @Property({ onCreate: () => new Date() })
  createdAt: Date

  @Property({ default: true })
  status: boolean

  constructor(commentPayload: CommentPayload) {
    this.content = commentPayload.content
    this.user = Reference.createNakedFromPK(User, commentPayload.userId)
  }

  static create(commentPayload: CommentPayload): Comment {
    return new Comment(commentPayload)
  }
}
