import { User } from "src/entities/user.entity";

export default class UserResponse {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.createdAt = user.createdAt;
  }
}
