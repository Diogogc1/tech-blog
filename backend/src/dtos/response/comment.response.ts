import { Comment } from 'src/entities/comment.entity';

export default class CommentResponse {
  id: number;
  content: string;

  constructor(comment: Comment) {
    this.id = comment.id;
    this.content = comment.content;
  }
}
