import { Injectable, NotFoundException } from '@nestjs/common'
import CommentReplyPayload from 'src/dtos/payload/comment-reply.payload'
import CommentReplyResponse from 'src/dtos/response/comment-reply.response'
import { CommentReply } from 'src/entities/comment-reply.entity'
import { notificationGateway } from 'src/gateways/notification-gateway'
import CommentReplyRepository from 'src/repositories/comment-reply.repository'

@Injectable()
export class CommentReplyService {
  constructor(
    private readonly commentReplyRepository: CommentReplyRepository,
    private readonly notificationGateway: notificationGateway
  ) {}

  async create(commentReplyPayload: CommentReplyPayload): Promise<CommentReplyResponse> {
    const commentReply = CommentReply.create(commentReplyPayload)
    const response = await this.commentReplyRepository.create(commentReply)
    this.notificationGateway.sendNotification('Novo comentário no seu post')
    const commentReplyResponse = new CommentReplyResponse(response)
    return commentReplyResponse
  }

  async findAll(): Promise<CommentReplyResponse[]> {
    const commentReplies = await this.commentReplyRepository.findAll()
    const commentReplyResponses: CommentReplyResponse[] = commentReplies.map(
      (commentReply) => new CommentReplyResponse(commentReply)
    )
    return commentReplyResponses
  }

  async findAllByCommentId(commentId: number): Promise<CommentReplyResponse[]> {
    const commentReplies = await this.commentReplyRepository.findAllByCommentId(commentId)
    const commentReplyResponses: CommentReplyResponse[] = commentReplies.map(
      (commentReply) => new CommentReplyResponse(commentReply)
    )
    return commentReplyResponses
  }

  async findOne(id: number): Promise<CommentReplyResponse> {
    const commentReply = await this.commentReplyRepository.findOne(id)

    if (!commentReply) {
      throw new NotFoundException(`CommentReply with ID ${id} not found`)
    }

    const commentReplyResponse = new CommentReplyResponse(commentReply)
    return commentReplyResponse
  }

  async update(id: number, commentReplyPayload: CommentReplyPayload): Promise<number> {
    const commentReply = CommentReply.create(commentReplyPayload)
    await this.findOne(id)

    return await this.commentReplyRepository.update(id, commentReply)
  }

  async delete(id: number): Promise<number> {
    await this.findOne(id)

    return await this.commentReplyRepository.delete(id)
  }
}
