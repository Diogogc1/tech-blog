import { Article } from 'src/entities/article.entity';
import UserResponse from './user.response';

export default class ArticleResponse {
  id: number;
  title: string;
  content: string;
  author: UserResponse;

  constructor(article: Article) {
    this.id = article.id;
    this.title = article.title;
    this.content = article.content;
    this.author = article.author;
  }
}