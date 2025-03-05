import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export default class UserPayload {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  email: string

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  password: string
}
