import { ArticleTag } from 'src/entities/article-tag.entity';
import ArticleResponse from './article.response';
import TagResponse from './tag.response';

export default class ArticleTagResponse {
  id: number;
  article: ArticleResponse;
  tag: TagResponse;

  constructor(articleTag: ArticleTag) {
    this.id = articleTag.id;
    this.article = new ArticleResponse(articleTag.article);
    this.tag = new TagResponse(articleTag.tag);
  }
}
