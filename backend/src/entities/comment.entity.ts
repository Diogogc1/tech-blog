import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Reference } from '@mikro-orm/core'
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

  @ManyToOne(() => Comment, { nullable: true })
  parentComment?: Comment

  @OneToMany(() => Comment, (comment) => comment.parentComment)
  childComments = new Collection<Comment>(this)

  @OneToMany(() => UserMention, (userMention) => userMention.comment)
  userMentions = new Collection<UserMention>(this)

  @Property({ onCreate: () => new Date() })
  createdAt: Date

  @Property({ default: true })
  status: boolean

  constructor(commentPayload: CommentPayload) {
    this.content = commentPayload.content
    this.user = Reference.createNakedFromPK(User, commentPayload.userId)
    if (commentPayload.parentCommentId) {
      this.parentComment = Reference.createNakedFromPK(Comment, commentPayload.parentCommentId)
    }
  }

  static create(commentPayload: CommentPayload): Comment {
    return new Comment(commentPayload)
  }
}
