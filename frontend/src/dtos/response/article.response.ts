import UserResponse from "./user.response";

export default interface ArticleResponse {
  id: number;
  title: string;
  content: string;
  author: UserResponse;
}