import { Entity, ManyToOne, PrimaryKey, Property, Reference } from '@mikro-orm/core'
import CommentReplyPayload from 'src/dtos/payload/comment-reply.payload'
import { Comment } from './comment.entity'
import { User } from './user.entity'

@Entity()
export class CommentReply {
  @PrimaryKey({ autoincrement: true })
  id!: number

  @Property({ type: 'text' })
  content: string

  @ManyToOne()
  comment: Comment

  @ManyToOne()
  user: User

  @Property({ onCreate: () => new Date() })
  createdAt: Date

  @Property({ default: true })
  status: boolean

  constructor(commentReplyPayload: CommentReplyPayload) {
    this.content = commentReplyPayload.content
    this.comment = Reference.createNakedFromPK(Comment, commentReplyPayload.commentId)
    this.user = Reference.createNakedFromPK(User, commentReplyPayload.userId)
  }

  static create(commentReplyPayload: CommentReplyPayload): CommentReply {
    return new CommentReply(commentReplyPayload)
  }
}
