import { ApiProperty } from '@nestjs/swagger'
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export default class ArticlePayload {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  content: string

  @ApiProperty({ type: [Number] })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  tags: number[]

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  authorId: number
}
