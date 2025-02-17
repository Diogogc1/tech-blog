import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Reference,
} from '@mikro-orm/core';
import CommentReplyPayload from 'src/dtos/payload/comment-reply.payload';
import { Comment } from './comment.entity';

@Entity()
export class CommentReply {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ type: 'text' })
  content: string;

  @ManyToOne()
  comment: Comment;

  @Property({ onCreate: () => new Date() })
  createdAt: Date;

  @Property({ default: true })
  status: boolean;

  static create(commentReplyPayload: CommentReplyPayload): CommentReply {
    const commentReply = new CommentReply();
    commentReply.content = commentReplyPayload.content;
    commentReply.comment = Reference.createNakedFromPK(
      Comment,
      commentReplyPayload.commentId,
    );
    return commentReply;
  }
}
