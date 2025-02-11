import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from './user.entity';

@Entity()
export class Article {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  title: string;

  @Property()
  content: string;

  @ManyToOne({ fieldName: 'authorId' })
  author: User;
}
