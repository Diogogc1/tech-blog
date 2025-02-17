import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import UserPayload from 'src/dtos/payload/user.payload';

@Entity()
export class User {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  name!: string;

  @Property({ unique: true })
  email!: string;

  @Property({ unique: true })
  password!: string;

  @Property({ onCreate: () => new Date() })
  createdAt: Date;

  @Property({ default: true })
  status: boolean;

  static create(userPayload: UserPayload) {
    const user = new User();
    user.name = userPayload.name;
    user.email = userPayload.email;
    user.password = userPayload.password;
    return user;
  }
}
