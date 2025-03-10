import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { User } from './user.entity'
import { Comment } from './comment.entity'

@Entity()
export class UserMention {
  @PrimaryKey({ autoincrement: true })
  id: number

  @ManyToOne(() => User)
  user: User

  @ManyToOne(() => Comment)
  comment: Comment

  @Property({ default: true })
  status: boolean

  @Property({ onCreate: () => new Date() })
  createdAt: Date
}
