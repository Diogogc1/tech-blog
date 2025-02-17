import { ApiProperty } from "@nestjs/swagger';

export default class ArticlePayload {
  @ApiProperty()
  title!: string;

  @ApiProperty()
  content!: string;

  @ApiProperty()
  tags!: number[];

  @ApiProperty()
  authorId!: number;
}
