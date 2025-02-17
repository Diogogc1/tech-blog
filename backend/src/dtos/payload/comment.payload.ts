import { ApiProperty } from '@nestjs/swagger';

export default class CommentPayload {
  @ApiProperty()
  content: string;

  @ApiProperty()
  userId: number;
}
