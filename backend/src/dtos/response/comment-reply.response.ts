import { CommentReply } from 'src/entities/comment-reply.entity';
import CommentResponse from './comment.response';

export default class CommentReplyResponse {
  id: number;
  content: string;
  comment: CommentResponse;

  constructor(commentReply: CommentReply) {
    this.id = commentReply.id;
    this.content = commentReply.content;
    this.comment = new CommentResponse(commentReply.comment);
  }
}
