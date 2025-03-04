import { Comment } from 'src/entities/comment.entity';
import UserResponse from './user.response';

export default class CommentResponse {
  id: number;
  content: string;
  user: UserResponse;

  constructor(comment: Comment) {
    this.id = comment.id;
    this.content = comment.content;
    this.user = new UserResponse(comment.user);
  }
}
