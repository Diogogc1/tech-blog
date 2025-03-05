import { EntityManager, EntityRepository } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { Notification } from 'src/entities/notification.entity'

@Injectable()
export default class NotificationRepository {
  private notificationRepo: EntityRepository<Notification>

  constructor(private readonly em: EntityManager) {
    this.notificationRepo = this.em.getRepository(Notification)
  }

  async create(data: Notification): Promise<Notification> {
    const notification = this.notificationRepo.create(data)
    await this.em.persistAndFlush(notification)
    return notification
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationRepo.find({})
  }

  async findOne(id: number): Promise<Notification | null> {
    return this.notificationRepo.findOne({ id })
  }

  async update(id: number, data: Notification): Promise<number> {
    return this.notificationRepo.nativeUpdate({ id, status: true }, data)
  }

  async delete(id: number): Promise<number> {
    return this.notificationRepo.nativeUpdate({ id, status: true }, { status: false })
  }
}
