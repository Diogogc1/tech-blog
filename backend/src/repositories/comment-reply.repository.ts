import { EntityManager, EntityRepository } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { CommentReply } from 'src/entities/comment-reply.entity'

@Injectable()
export default class CommentReplyRepository {
  private commentReplyRepo: EntityRepository<CommentReply>

  constructor(private readonly em: EntityManager) {
    this.commentReplyRepo = this.em.getRepository(CommentReply)
  }

  async create(data: CommentReply): Promise<CommentReply> {
    const commentReply = this.commentReplyRepo.create(data)
    await this.em.persistAndFlush(commentReply)
    return commentReply
  }

  async findAll(): Promise<CommentReply[]> {
    return this.commentReplyRepo.find({})
  }

  async findAllByCommentId(commentId: number): Promise<CommentReply[]> {
    return this.commentReplyRepo.find({ comment: commentId })
  }

  async findOne(id: number): Promise<CommentReply | null> {
    return this.commentReplyRepo.findOne({ id })
  }

  async update(id: number, data: CommentReply): Promise<number> {
    return this.commentReplyRepo.nativeUpdate({ id, status: true }, data)
  }

  async delete(id: number): Promise<number> {
    return this.commentReplyRepo.nativeUpdate({ id, status: true }, { status: false })
  }
}
