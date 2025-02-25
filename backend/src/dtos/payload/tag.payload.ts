import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class TagPayload {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
