import { ApiProperty } from '@nestjs/swagger';

export default class ArticlePayload {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty({ type: [Number] })
  tags: number[];

  @ApiProperty()
  authorId: number;
}
