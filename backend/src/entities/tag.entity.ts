import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import TagPayload from 'src/dtos/payload/tag.payload';

@Entity()
export class Tag {
  @PrimaryKey({ autoincrement: true })
  id: number;

  @Property()
  name: string;

  @Property({ default: new Date().toISOString() })
  createdAt: Date;

  @Property({ default: true })
  status: boolean;

  static create(tagPayload: TagPayload): Tag {
    const tag = new Tag();
    tag.name = tagPayload.name;
    return tag;
  }
}