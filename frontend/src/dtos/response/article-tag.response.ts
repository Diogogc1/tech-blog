import ArticleResponse from "./article.response";
import TagResponse from "./tag.response";

export default interface ArticleTagResponse {
  id: number;
  article: ArticleResponse;
  tag: TagResponse;
}
