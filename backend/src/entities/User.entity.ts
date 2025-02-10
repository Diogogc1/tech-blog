import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ unique: true })
  email!: string;

  @Property({ unique: true })
  senha!: string;

  @Property({ default: new Date().toISOString() })
  createdAt = new Date();
}
