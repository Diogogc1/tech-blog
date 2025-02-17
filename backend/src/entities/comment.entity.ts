import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Reference,
} from '@mikro-orm/core';
import { User } from './user.entity';
import CommentPayload from 'src/dtos/payload/comment.payload';

@Entity()
export class Comment {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ type: 'text' })
  content: string;

  @ManyToOne()
  user: User;

  @Property({ onCreate: () => new Date() })
  createdAt: Date;

  @Property({ default: true })
  status: boolean;

  static create(commentPayload: CommentPayload): Comment {
    const comment = new Comment();
    comment.content = commentPayload.content;
    comment.user = Reference.createNakedFromPK(User, commentPayload.userId);
    return comment;
  }
}
