import { Entity, ManyToOne, PrimaryKey, Property, Reference } from '@mikro-orm/core'
import notificationPayload from 'src/dtos/payload/notification.payload'
import { User } from './user.entity'

@Entity()
export class Notification {
  @PrimaryKey({ autoincrement: true })
  id!: number

  @Property({ type: 'text' })
  title: string

  @Property({ type: 'text' })
  content: string

  @ManyToOne()
  user: User

  @Property({ onCreate: () => new Date() })
  createdAt: Date

  @Property({ default: true })
  status: boolean

  constructor(notificationPayload: notificationPayload) {
    this.title = notificationPayload.title
    this.content = notificationPayload.content
    this.user = Reference.createNakedFromPK(User, notificationPayload.userId)
  }

  static create(notificationPayload: notificationPayload): Notification {
    return new Notification(notificationPayload)
  }
}
