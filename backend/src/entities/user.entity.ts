import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core'
import UserPayload from 'src/dtos/payload/user.payload'
import { Article } from './article.entity'
import { Notification } from './notification.entity'
import { UserMention } from './user-mention.entity'

@Entity()
export class User {
  @PrimaryKey({ autoincrement: true })
  id: number

  @Property()
  name: string

  @Property()
  email: string

  @Property()
  password: string

  @OneToMany(() => Article, (article) => article.user)
  articles = new Collection<Article>(this)

  @OneToMany(() => UserMention, (UserMention) => UserMention.user)
  mentions = new Collection<UserMention>(this)

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications = new Collection<Notification>(this)

  @Property({ onCreate: () => new Date() })
  createdAt: Date

  @Property({ default: true })
  status: boolean

  constructor(userPayload: UserPayload) {
    this.name = userPayload.name
    this.email = userPayload.email
    this.password = userPayload.password
  }

  static create(userPayload: UserPayload) {
    return new User(userPayload)
  }
}
