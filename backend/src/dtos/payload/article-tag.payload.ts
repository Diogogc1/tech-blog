import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export default class ArticleTagPayload {
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  articleId: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  tagId: number;
}
