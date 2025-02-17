import { Tag } from 'src/entities/tag.entity';

export default class TagResponse {
  id: number;
  name: string;

  constructor(tag: Tag) {
    this.id = tag.id;
    this.name = tag.name;
  }
}
