import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class TagPayload {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;
}
