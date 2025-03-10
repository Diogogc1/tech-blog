import { EntityManager, EntityRepository } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { Comment } from 'src/entities/comment.entity'

@Injectable()
export default class CommentRepository {
  private commentRepository: EntityRepository<Comment>

  constructor(private readonly em: EntityManager) {
    this.commentRepository = this.em.getRepository(Comment)
  }

  async create(data: Comment): Promise<Comment> {
    const comment = this.commentRepository.create(data)
    await this.em.persistAndFlush(comment)
    return comment
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({})
  }

  async findOne(id: number): Promise<Comment | null> {
    return this.commentRepository.findOne({ id })
  }

  async update(id: number, data: Comment): Promise<number> {
    return this.commentRepository.nativeUpdate({ id, status: true }, data)
  }

  async delete(id: number): Promise<number> {
    return this.commentRepository.nativeUpdate({ id, status: true }, { status: false })
  }
}
