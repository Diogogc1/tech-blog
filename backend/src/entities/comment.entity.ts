import { Entity, ManyToOne, PrimaryKey, Property, Reference, OneToMany, Collection } from '@mikro-orm/core'
import CommentPayload from 'src/dtos/payload/comment.payload'
import { Article } from './article.entity'
import { UserMention } from './user-mention.entity'
import { User } from './user.entity'

@Entity()
export class Comment {
  @PrimaryKey({ autoincrement: true })
  id: number

  @Property({ type: 'text' })
  content: string

  @ManyToOne(() => User)
  user: User

  @ManyToOne(() => Article)
  article: Article

  @OneToMany(() => UserMention, (userMention) => userMention.comment)
  userMentions = new Collection<UserMention>(this)

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
