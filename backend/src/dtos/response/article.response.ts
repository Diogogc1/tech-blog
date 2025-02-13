import { User } from 'src/entities/user.entity';

export default interface ArticleResponse {
  id: number;
  title: string;
  content: string;
  author: User;
}
