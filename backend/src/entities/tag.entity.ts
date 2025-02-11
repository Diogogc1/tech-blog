import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Tag {
  @PrimaryKey({ autoincrement: true })
  id: number;

  @Property()
  name: string;
}
