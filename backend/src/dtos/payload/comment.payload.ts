import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class CommentPayload {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
