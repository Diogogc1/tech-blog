import { Injectable, NotFoundException } from '@nestjs/common'
import CommentPayload from 'src/dtos/payload/comment.payload'
import CommentResponse from 'src/dtos/response/comment.response'
import { Comment } from 'src/entities/comment.entity'
import { notificationGateway } from 'src/gateways/notification-gateway'
import CommentRepository from 'src/repositories/comment.repository'

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly notificationGateway: notificationGateway
  ) {}

  async create(commentPayload: CommentPayload): Promise<CommentResponse> {
    const comment = Comment.create(commentPayload)
    const response = await this.commentRepository.create(comment)
    this.notificationGateway.sendNotification('Novo comentário no seu post')
    const commentResponse: CommentResponse = response
    return commentResponse
  }

  async findAll(): Promise<CommentResponse[]> {
    const comments = await this.commentRepository.findAll()
    const commentResponses: CommentResponse[] = comments.map((comment) => new CommentResponse(comment))
    return commentResponses
  }

  async findOne(id: number): Promise<CommentResponse> {
    const comment = await this.commentRepository.findOne(id)

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`)
    }

    const commentResponse = new CommentResponse(comment)
    return commentResponse
  }

  async update(id: number, commentPayload: CommentPayload): Promise<number> {
    const comment = Comment.create(commentPayload)
    await this.findOne(id)

    return await this.commentRepository.update(id, comment)
  }

  async delete(id: number): Promise<number> {
    await this.findOne(id)

    return await this.commentRepository.delete(id)
  }
}
