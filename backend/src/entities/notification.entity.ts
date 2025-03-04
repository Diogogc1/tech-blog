import { Entity, ManyToOne, PrimaryKey, Property, Reference } from "@mikro-orm/core";
import { User } from "./user.entity";

@Entity()
export class Notification {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ type: 'text' })
  title: string;

  @Property({ type: 'text' })
  content: string;

  @ManyToOne()
  user: User;

  @Property({ onCreate: () => new Date() })
  createdAt: Date;

  @Property({ default: true })
  status: boolean;

  static create(notificationPayload: any): Notification {
    const notification = new Notification();
    notification.title = notificationPayload.title;
    notification.content = notificationPayload.content;
    notification.user = Reference.createNakedFromPK(User, notificationPayload.userId);
    return notification;
  }
}