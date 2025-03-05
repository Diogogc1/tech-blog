import { EntityManager, EntityRepository } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import TagPayload from 'src/dtos/payload/tag.payload'
import { Tag } from 'src/entities/tag.entity'

@Injectable()
export default class TagRepository {
  private tagRepo: EntityRepository<Tag>

  constructor(private readonly em: EntityManager) {
    this.tagRepo = this.em.getRepository(Tag)
  }

  async create(data: Tag): Promise<Tag> {
    const tag = Tag.create(data)
    await this.em.persistAndFlush(tag)
    return tag
  }

  async findAll(): Promise<Tag[]> {
    return this.tagRepo.find({})
  }

  async findOne(id: number): Promise<Tag | null> {
    return this.tagRepo.findOne({ id })
  }

  async update(id: number, data: TagPayload): Promise<number> {
    return this.tagRepo.nativeUpdate({ id, status: true }, data)
  }

  async delete(id: number): Promise<number> {
    return this.tagRepo.nativeUpdate({ id, status: true }, { status: false })
  }
}
