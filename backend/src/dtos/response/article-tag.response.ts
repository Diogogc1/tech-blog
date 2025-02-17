import { ArticleTag } from "src/entities/article-tag.entity";

export default class ArticleTagResponse {
  id: number;
  articleId: number;
  tagId: number;

  constructor(articleTag: ArticleTag) {
    this.id = articleTag.id;
    this.articleId = articleTag.article.id;
    this.tagId = articleTag.tag.id;
  }
}
