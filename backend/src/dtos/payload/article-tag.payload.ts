import { ApiProperty } from '@nestjs/swagger';

export default class ArticleTagPayload {
  @ApiProperty()
  articleId: number;

  @ApiProperty()
  tagId: number;
}
