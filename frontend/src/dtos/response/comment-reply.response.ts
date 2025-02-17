import CommentResponse from './comment.response';

export default interface CommentReplyResponse {
  id: number;
  content: string;
  comment: CommentResponse;
}
