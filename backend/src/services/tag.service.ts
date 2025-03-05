import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common'
import TagPayload from 'src/dtos/payload/tag.payload'
import TagResponse from 'src/dtos/response/tag.response'
import { Tag } from 'src/entities/tag.entity'
import TagRepository from 'src/repositories/tag.repository'
import { ArticleTagService } from './article-tag.service'

@Injectable()
export class TagService {
  constructor(
    private readonly tagRepository: TagRepository,

    @Inject(forwardRef(() => ArticleTagService))
    private readonly articleTagService: ArticleTagService
  ) {}

  async create(tagPayload: TagPayload): Promise<TagResponse> {
    const tag = Tag.create(tagPayload)
    const response = await this.tagRepository.create(tag)
    const tagResponse: TagResponse = response
    return tagResponse
  }

  async findAll(): Promise<TagResponse[]> {
    const tags = await this.tagRepository.findAll()
    const tagResponses: TagResponse[] = tags.map((tag) => new TagResponse(tag))
    return tagResponses
  }

  async findOne(id: number): Promise<TagResponse> {
    const tag = await this.tagRepository.findOne(id)

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`)
    }

    const tagResponse = new TagResponse(tag)
    return tagResponse
  }

  async update(id: number, tagPayload: TagPayload): Promise<number> {
    const tag = Tag.create(tagPayload)
    await this.findOne(id)

    return await this.tagRepository.update(id, tag)
  }

  async delete(id: number): Promise<number> {
    await this.findOne(id)

    const articleTags = await this.articleTagService.findByTagId(id)

    for (const articleTag of articleTags) {
      await this.articleTagService.delete(articleTag.id)
    }

    return await this.tagRepository.delete(id)
  }
}
