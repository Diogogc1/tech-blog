import { CommentReply } from 'src/entities/comment-reply.entity';
import CommentResponse from './comment.response';
import UserResponse from './user.response';

export default class CommentReplyResponse {
  id: number;
  content: string;
  comment: CommentResponse;
  user: UserResponse;

  constructor(commentReply: CommentReply) {
    this.id = commentReply.id;
    this.content = commentReply.content;
    this.comment = new CommentResponse(commentReply.comment);
    this.user = new UserResponse(commentReply.user);
  }
}
