import { Property } from "@mikro-orm/core";
import { IsNotEmpty, IsString } from "class-validator";

export default class notificationPayload{
  @Property({ type: String })
  @IsString()
  @IsNotEmpty()
  title: string;

  @Property({ type: String })
  @IsString()
  @IsNotEmpty()
  content: string;
}