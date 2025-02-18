import { ApiProperty } from "@nestjs/swagger";

export default class AuthPayload {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}