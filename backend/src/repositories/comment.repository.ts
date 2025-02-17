import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Comment } from 'src/entities/comment.entity';

@Injectable()
export default class CommentRepository {
  private commentRepo: EntityRepository<Comment>;

  constructor(private readonly em: EntityManager) {
    this.commentRepo = this.em.getRepository(Comment);
  }

  async create(data: Comment): Promise<Comment> {
    const comment = this.commentRepo.create(data);
    await this.em.persistAndFlush(comment);
    return comment;
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepo.find({});
  }

  async findOne(id: number): Promise<Comment | null> {
    return this.commentRepo.findOne({ id });
  }

  async update(id: number, data: Comment): Promise<number> {
    return this.commentRepo.nativeUpdate({ id, status: true }, data);
  }

  async delete(id: number): Promise<number> {
    return this.commentRepo.nativeUpdate(
      { id, status: true },
      { status: false },
    );
  }
}
