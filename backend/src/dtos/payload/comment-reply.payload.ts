import { ApiProperty } from '@nestjs/swagger';

export default class CommentReplyPayload {
  @ApiProperty()
  content: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  commentId: number;
}
