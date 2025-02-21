import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export default class ArticleTagPayload {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  articleId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  tagId: number;
}
