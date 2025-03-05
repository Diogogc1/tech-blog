import { Injectable, NotFoundException } from '@nestjs/common'
import NotificationPayload from 'src/dtos/payload/notification.payload'
import NotificationResponse from 'src/dtos/response/notification.response'
import { Notification } from 'src/entities/notification.entity'
import NotificationRepository from 'src/repositories/notification.repository'

@Injectable()
export class NotificationService {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async create(notificationPayload: NotificationPayload): Promise<NotificationResponse> {
    const notification = Notification.create(notificationPayload)
    const response = await this.notificationRepository.create(notification)
    return new NotificationResponse(response)
  }

  async findAll(): Promise<NotificationResponse[]> {
    const notifications = await this.notificationRepository.findAll()
    return notifications.map((notification) => new NotificationResponse(notification))
  }

  async findOne(id: number): Promise<NotificationResponse> {
    const notification = await this.notificationRepository.findOne(id)
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`)
    }
    return new NotificationResponse(notification)
  }

  async update(id: number, notificationPayload: NotificationPayload): Promise<number> {
    const notification = Notification.create(notificationPayload)
    await this.findOne(id)
    return this.notificationRepository.update(id, notification)
  }

  async delete(id: number): Promise<number> {
    await this.findOne(id)
    return this.notificationRepository.delete(id)
  }
}
