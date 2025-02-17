import { ApiProperty } from "@nestjs/swagger";

export default class UserPayload {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
