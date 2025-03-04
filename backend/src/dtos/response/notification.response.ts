import { Notification } from "src/entities/notification.entity";

export default class NotificationResponse {
  title: string;
  content: string;
  userId: number;

  constructor(notification: Notification) {
    this.title = notification.title;
    this.content = notification.content;
    this.userId = notification.user.id;
  }
}