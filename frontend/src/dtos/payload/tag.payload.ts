import { ApiProperty } from "@nestjs/swagger";

export default class TagPayload {
  @ApiProperty()
  name: string;
}
