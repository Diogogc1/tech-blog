import CommentPayload from "@/dtos/payload/comment.payload";
import api from "./api.service";
import CommentReplyResponse from "@/dtos/response/comment-reply.response";

export class CommentService {
  async create(commentPayload: CommentPayload): Promise<CommentReplyResponse> {
    const response = await api.post("/comment", commentPayload);
    return response.data;
  }

  async findAll(): Promise<CommentReplyResponse[]> {
    const response = await api.get("/comment");
    return response.data;
  }

  async findByCommentId(commentId: number): Promise<CommentReplyResponse[]> {
    const response = await api.get(`/comment/comment/${commentId}`);
    return response.data;
  }

  async findOne(id: number): Promise<CommentReplyResponse> {
    const response = await api.get(`/comment/${id}`);
    return response.data;
  }

  async update(
    id: number,
    commentPayload: CommentPayload
  ): Promise<CommentReplyResponse> {
    const response = await api.put(`/comment/${id}`, commentPayload);
    return response.data;
  }

  async delete(id: number): Promise<CommentReplyResponse> {
    const response = await api.delete(`/comment/${id}`);
    return response.data;
  }
}

const commentService = new CommentService();
export default commentService;
